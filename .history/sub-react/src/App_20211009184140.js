import React from 'react';
import { BrowserRouter as Router,Route} from 'react-router-dom';
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
                </div>
            </Router>
        )
    }
}
export default App;
