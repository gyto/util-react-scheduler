// @flow

import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Scheduler from '../components/Scheduler';
import SchedulerBuilder from '../components/SchedulerBuilder';

class Root extends React.Component<{}> {
    render() {
        return (
            <Router>
                <nav>
                    <ul>
                        <li><Link to='/'>Scheduler Builder</Link></li>
                        <li><Link to='/scheduler'>Scheduler</Link></li>
                    </ul>

                    <Route path='/' exact component={SchedulerBuilder} />
                    <Route path='/scheduler' component={Scheduler} />
                </nav>
            </Router>
        );
    }
}

export default Root;
