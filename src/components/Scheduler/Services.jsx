// @flow
import * as React from 'react';
import Service from './Services/Service';
import ServicePanel from './Services/ServicePanel';
import { connect } from 'react-redux';
import { toggleServiceMenu } from '../../actions/toggleServiceMenu';
import Header from './containers/Header';
import layoutStyles from './scss/layout.module.scss';
import buttonStyles from './scss/button.module.scss';

type Props = {
    toggleServiceMenu: (boolean) => void,
    serviceMenu: ?boolean,
}

type State = {
    serviceId: ?string,
}

export class Services extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            serviceId: null,
        };
    }

    manageService = (id: string) => {
        this.props.toggleServiceMenu(true);
        this.setState({ serviceId: id });
    };

    render() {
        const { serviceId} = this.state;

        return (
            <div id='outer-container'>
                <Header title={'Services'} />
                <div className={layoutStyles.container}>
                    <ServicePanel
                        serviceId={serviceId}
                    />
                    <div id="page-wrap">
                        <Service
                            callbackId={this.manageService}
                        />
                    </div>
                    <button
                        className={buttonStyles.addButton}
                        onClick={() => {
                            this.props.toggleServiceMenu(true);
                            this.setState({ serviceId: null });
                        }}
                    >Add</button>
                </div>
            </div>
        );
    }
}

const ServicesRedux = connect(
    state => ({
        serviceMenu: state.serviceMenu,
    }),
    dispatch => ({
        toggleServiceMenu: (toggle: boolean) => {
            dispatch(toggleServiceMenu(toggle));
        },
    })
)(Services);

export default ServicesRedux;
