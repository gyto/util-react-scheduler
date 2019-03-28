// @flow
import * as React from 'react';
import Service from './Services/Service';
import ServicePanel from './Services/ServicePanel';
import styles from './Services.module.scss';

type Props = {}

type State = {}

class Services extends React.Component<Props, State> {
    render() {
        return (
            <div className={styles.container}>
                <Service />
                <ServicePanel />
            </div>
        );
    }
}

export default Services;
