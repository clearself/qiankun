import React from 'react';
import { BrowserRouter as Router,Route} from 'react-router-dom';
import Music from './music/index';
import Collect from './music/collect';
class App extends React.Component {
    render(){
        return(
            <Router >
                <div>
                    <Route  exact path="/" component={Music} />
                    <Route path="/collect" component={Collect} />
                </div>
            </Router>
        )
    }
}
export default App;
