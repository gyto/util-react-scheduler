// @flow

import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Scheduler from '../components/Scheduler';
import SchedulerBuilder from '../components/SchedulerBuilder';
import Sort from '../components/Sort';
import Algolia from '../components/Algolia';
import Analytics from '../components/Analytics';
import CreateRawData from '../components/CreateRawData';
import TableFilter from '../components/TableFilter';
import RestApiLoop from '../components/RestAPILoop';

class Root extends React.Component<{}> {
    render() {
        return (
            <Router>
                <nav>
                    <ul>
                        <li><Link to='/'>Scheduler Builder</Link></li>
                        <li><Link to='/scheduler'>Scheduler</Link></li>
                        <li><Link to='/algolia'>Algolia</Link></li>
                        <li><Link to='/sort'>Sort</Link></li>
                        <li><Link to='/analytics'>Analytics</Link></li>
                        <li><Link to='/rawData'>rawData</Link></li>
                        <li><Link to='/table'>Table Filtering</Link></li>
                        <li><Link to='/rest-api-loop'>Rest API Loop with Log</Link></li>
                    </ul>

                    <Route path='/' exact component={SchedulerBuilder} />
                    <Route path='/scheduler' component={Scheduler} />
                    <Route path='/algolia' component={Algolia} />
                    <Route path='/sort' component={Sort} />
                    <Route path='/analytics' component={Analytics} />
                    <Route path='/rawData' component={CreateRawData} />
                    <Route path='/table' component={TableFilter} />
                    <Route path='/rest-api-loop' component={RestApiLoop} />
                </nav>
            </Router>
        );
    }
}

export default Root;
