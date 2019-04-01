// @flow
import * as React from 'react';
import Service from './Services/Service';
import ServicePanel from './Services/ServicePanel';
import styles from './Services.module.scss';

type Props = {}

type State = {
    openPanel: boolean,
    serviceId: ?string,
}

type onStateChange = {
    isOpen: boolean
}

class Services extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            openPanel: false,
            serviceId: null,
        };
    }

    onStateChange = (state: onStateChange) => {
        this.setState({ openPanel: state.isOpen });
    };

    manageService = (id: string) => {
        this.setState({
            openPanel: true,
            serviceId: id,
        });
    };

    render() {
        const { openPanel, serviceId} = this.state;
        return (
            <div id='outer-container'>
                <div className={styles.container}>
                    <ServicePanel
                        openPanel={openPanel}
                        onStateChange={this.onStateChange}
                        serviceId={serviceId}
                    />
                    <div id="page-wrap">
                        <Service
                            callbackId={this.manageService}
                        />
                    </div>
                    <button
                        className={styles.addButton}
                        onClick={() => this.setState({ openPanel: true })}
                    >Add</button>
                </div>
            </div>
        );
    }
}

export default Services;
