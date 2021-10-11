import React from 'react';
import { HashRouter  as Router,Route} from 'react-router-dom';
import routes from './routes'


class App extends React.Component {
    render(){
        return(
            <Router >
                <div>
                    {
                        routes.map ((route, key) => {
                            // console.log(route)
                            if(route.exact) {
                                return (
                                <Route 
                                    key = {key} 
                                    exact
                                    path = {route.path} 
                                    component={route.component}
                                />
                                )
                            }else{
                                return (
                                <Route 
                                    key = {key} 
                                    path = {route.path} 
                                    component={route.component}
                                />
                                )
                            }
                        })
                }
                </div>
            </Router>
        )
    }
}
export default App;
