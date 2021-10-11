import React from 'react';
import { BrowserRouter as Router,Route} from 'react-router-dom';
import { name } from '../../package.json'
let prefix = window.__POWERED_BY_QIANKUN__ ? `/micrApp/${name}` : '/'
import Music from './music/index';
import Collect from './music/collect';
class App extends React.Component {
    render(){
        return(
            <Router >
                <div>
                    <Route  exact path={prefix} component={Music} />
                    <Route path={prefix+'/collect'} component={Collect} />
                </div>
            </Router>
        )
    }
}
export default App;
