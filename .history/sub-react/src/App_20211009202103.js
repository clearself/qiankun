import React, {Fragment} from "react";
import { HashRouter  as Router,Route,Switch} from 'react-router-dom';
import Nav from "./Nav";
import routes from './routes'


class App extends React.Component {
    render(){
        return(
            <Router >
                <Switch>
                    {
                        routes.map ((route, key) => {
                            // console.log(route)
                            if(route.exact) {
                                return (
                                <Route 
                                    key = {key} 
                                    exact
                                    path = {route.path} 
                                    render = {props => (
                                    <route.component {...props} />
                                    )}
                                />
                                )
                            }else{
                                return (
                                <Route 
                                    key = {key} 
                                    path = {route.path} 
                                    render = {props => (
                                    <route.component {...props} />
                                    )}
                                />
                                )
                            }
                        })
                }
                </Switch>
            </Router>
        )
    }
}
export default App;
