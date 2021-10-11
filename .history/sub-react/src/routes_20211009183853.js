import Music from './music/index';
import Collect from './music/collect';
import { name } from '../package.json'
let prefix = window.__POWERED_BY_QIANKUN__ ? `/micrApp/${name}` : '/';
let routes = [
    {path: prefix, component: Music, exact: true},
    {path: prefix+'/login', component: Collect},
]

export default routes