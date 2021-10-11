/**
 * 路由守卫校验
 */
 import React, {Component} from "react";
 import {Route} from "react-router-dom";
  
 class Nav extends Component {
     // eslint-disable-next-line no-useless-constructor
     constructor(props) {
         super(props);
     }
  
     render() {
         const {routerConfig, location} = this.props;
         const {pathname} = location;
         console.log(location);
         // 如果该路由不用进行权限校验，登录状态下登陆页除外
         // 因为登陆后，无法跳转到登陆页
         // 这部分代码，是为了在非登陆状态下，访问不需要权限校验的路由
         const targetRouterConfig = routerConfig.find(
             (item) => item.path === pathname
         );
         console.log(targetRouterConfig);
         if (targetRouterConfig) {
             const {component} = targetRouterConfig;
             return <Route exact path={pathname} component={component}/>;
         }
     }
 }
  
 export default Nav;