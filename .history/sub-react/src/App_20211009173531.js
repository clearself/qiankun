import React from 'react';
class App extends React.Component {
    render(){
    return(
    <Router >
                    <div>
    <Route path="/" component={Home} />
    <Route path="/Page1" component={Page1} />
    <Route path="/Page2" component={Page2} />
    <Route path="/Page3" component={Page3} />
    </div>
    </Router>
    )
    }
    }




export default App;
