import React from 'react';
import { HashRouter  as Router,Route,Switch} from 'react-router-dom';
import routes from './routes'


class App extends React.Component {
    render(){
        return(
            <HashRouter >
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
            </HashRouter>
        )
    }
}
export default App;
