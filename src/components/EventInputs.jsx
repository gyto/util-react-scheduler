// @flow

import * as React from 'react';

type Props = {
    index: number
}

class EventInputs extends React.Component<Props> {
    // constructor(props: Props) {
    //     super(props);
    // }

    render() {
        const { index } = this.props;

        return (
            <React.Fragment>
                <h2>Events</h2>
                <label>
                    Event Starts
                    <input
                        type="time"
                        name={`event-from-${index}`}
                    />
                </label><br/>
                <label>
                    Event Ends
                    <input
                        type="time"
                        name={`event-to-${index}`}
                    />
                </label><br/>
                <label>
                    Event Name
                    <input
                        type="text"
                        name={`event-name-${index}`}
                    />
                </label><br/>
                <label>
                    Event Tags
                </label>
                <hr/>
            </React.Fragment>
        );
    }
}

export default EventInputs;
