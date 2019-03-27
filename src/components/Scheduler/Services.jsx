// @flow
import * as React from 'react';
import Service from './Services/Service';

type Props = {}

type State = {}

class Services extends React.Component<Props, State> {
    render() {
        return (
            <div>
                <Service />
            </div>
        );
    }
}

export default Services;
