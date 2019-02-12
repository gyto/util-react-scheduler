// @flow

import * as React from 'react';

class TopicInputs extends React.Component<{}> {
    render() {
        return (
            <React.Fragment>
                <h2>Topic:</h2>
                <label>
                    Topic Name <input type="text"/>
                </label><br/>
                <label>
                    Topic Tags
                </label>
                <hr/>
                {this.props.children}
            </React.Fragment>
        );
    }
}

export default TopicInputs;
