// @flow

import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Scheduler from '../components/Scheduler';
import SchedulerBuilder from '../components/SchedulerBuilder';
import Search from '../components/Search';
import Algolia from '../components/Algolia';

class Root extends React.Component<{}> {
    render() {
        return (
            <Router>
                <nav>
                    <ul>
                        <li><Link to='/'>Scheduler Builder</Link></li>
                        <li><Link to='/scheduler'>Scheduler</Link></li>
                        <li><Link to='/search'>Search</Link></li>
                        <li><Link to='/algolia'>Algolia</Link></li>
                    </ul>

                    <Route path='/' exact component={SchedulerBuilder} />
                    <Route path='/scheduler' component={Scheduler} />
                    <Route path='/search' component={Search} />
                    <Route path='/algolia' component={Algolia} />
                </nav>
            </Router>
        );
    }
}

export default Root;
