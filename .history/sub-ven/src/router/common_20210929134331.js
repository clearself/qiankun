import login from '@/pages/login/index.vue'
let prefix = window.__POWERED_BY_QIANKUN__ ? `/micrApp/${name}` : '/'
export default [
    {
        path: '/',
        name: 'login',
        component: login
    }
]
