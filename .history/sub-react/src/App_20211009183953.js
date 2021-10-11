import React from 'react';
import { BrowserRouter as Router,Route} from 'react-router-dom';
import routes from './routes.js


class App extends React.Component {
    render(){
        return(
            <Router >
                <div>
                    <Route exact path={prefix} component={Music} />
                    <Route path={prefix + '/collect'} component={Collect} />
                </div>
            </Router>
        )
    }
}
export default App;
