// @flow
import * as React from 'react';
import type { Services } from '../types/Services';

type Props = {}

type State = {
    services: Services[]
}

class Service extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            services: [],
        };
    }

    componentDidMount(): void {
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default Service;
