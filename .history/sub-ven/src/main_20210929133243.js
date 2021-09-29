import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import App from './App.vue'
import routes from './router'

import Element from 'element-ui'
import './assets/css/base.css'
import './assets/css/element-variables.scss'
import 'element-ui/lib/theme-chalk/index.css'
import VNSUI from 'vns-ui' // 引入组件库
import 'vns-ui/packages/theme-default/lib/index.css'
import { globalRegister } from 'global-state'
import store from './store'
import VueRouter from 'vue-router'
import Debounce from './assets/js/utils.js'

// 自定义全局方法库
import PublicFun from './assets/js/exit_fun.js'

// 自定义过滤器
import filters from './assets/js/filters.js'
// 国际化
// import { i18n } from './i18n/index'

// 指令统一处理加载
import directives from './assets/js/directives.js'
import { name } from '../package.json' // 引入样式库

Vue.use(VNSUI)

Vue.use(Element)
Element.Dialog.props.closeOnClickModal.default = false
Vue.component('Debounce', Debounce)
Vue.use(PublicFun)
// 过滤器统一处理加载
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
Object.keys(directives).forEach(key => {
    Vue.directive(key, {
        bind: directives[key].bind,
        inserted: directives[key].inserted,
        update: directives[key].update,
        componentUpdated: directives[key].componentUpdated,
        unbind: directives[key].unbind
    })
})
Vue.config.productionTip = false
let instance = null
function render(props = {}) {
    const { container } = props
    const router = new VueRouter({
        // base: window.__POWERED_BY_QIANKUN__ ? routerBase : process.env.BASE_URL,
        // mode: 'history',
        routes
    })
    if (window.__POWERED_BY_QIANKUN__) {
        router.beforeEach((to, from, next) => {
            if (!to.path.includes('/micrApp')) {
                next({ path: `/micrApp/${name}${to.path}` })
            } else {
                next()
            }
        })
    }
    instance = new Vue({
        router,
        store,
        render: (h) => h(App)
    }).$mount(container ? container.querySelector('#app') : '#app')
}
if (window.__POWERED_BY_QIANKUN__) {
    // eslint-disable-next-line
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
} else {
    // 这里是子应用独立运行的环境，实现子应用的登录逻辑
    // 独立运行时，也注册一个名为global的store module
    globalRegister(store)
    // 模拟登录后，存储用户信息到global module
    const userInfo = { name: '我是独立运行时名字叫张三' } // 假设登录后取到的用户信息
    store.commit('global/setGlobalState', { user: userInfo })
    render()
}

export async function bootstrap() {
    console.log('[vue] vue app bootstraped')
}

export async function mount(props) {
    console.log('[vue] props from main framework', props)
    //global Register(store, props)
    render(props)
}

export async function unmount() {
    instance.$destroy()
    instance.$el.innerHTML = ''
    instance = null
}

