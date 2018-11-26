import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import { TeamListComponent } from './components/team-list/team-list.component';
import { TeamInfoComponent } from './components/team-info/team-info.component';

class App extends React.Component {

    public render() {
        return (
            <Router>
                <Switch>
                    <Route exact={true} path="/" render={() => (
                        <Redirect to="/teams" />
                    )} />
                    <Route exact={true} path="/teams" component={TeamListComponent} />
                    <Route exact={true} path="/teams/:id" component={TeamInfoComponent} />
                </Switch>
            </Router>
        );
    }
}

export default App;
