// @flow
import * as React from 'react';
import Event from './Events/Event';

type Props = {}

type State = {}

class Events extends React.Component<Props, State> {
    render() {
        return (
            <div>
                <Event/>
            </div>
        );
    }
}

export default Events;
