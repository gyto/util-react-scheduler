// @flow
import * as React from 'react';
import FirebaseRealDB, { DATABASE_REF } from '../../../utils/FirebaseRealDB';
import moment from 'moment';
import styles from './EventPanel.module.scss';
import MenuContainer from '../containers/MenuContainer';
import { connect } from 'react-redux';
import { toggleMenu } from '../../../actions/toggleMenu';
import type { Events } from '../types/Events';
import type { Services } from "../types/Services";
import FormInput from "../containers/FormInput";
import ServiceDropdown from "./ServiceDropdown";


type Props = {
    serviceId?: ?string,
    toggleMenu: (boolean) => void,
    menu: boolean,
}

type State = {
    ...Events,
    submitType: string,
}

const SUBMIT_TYPE = {
    save: 'save',
    edit: 'edit',
};

export class EventPanel extends React.Component<Props, State> {
    fdb: FirebaseRealDB;

    constructor(props: Props) {
        super(props);

        this.state = {
            name: '',
            startIn: null,
            endsIn: null,
            serviceIds: [],
            status: '',
            total: 0,
            timeModified: null,
            open: false,
            submitType: SUBMIT_TYPE.save,
        };

        this.fdb = new FirebaseRealDB();
    }

    componentDidUpdate(prevProps: Props) {
        if (this.props.serviceId !== prevProps.serviceId) {
            if (this.props.serviceId) this.fetchData(this.props.serviceId);
        }
    }

    fetchData = (id: string) => {
        this.fdb.readSingleInstance(DATABASE_REF.events, id)
            .then(snapshot => {
                let item = snapshot.val();
                this.setState({
                    name: item.name,
                    startIn: item.startIn,
                    endsIn: item.endsIn,
                    serviceIds: item.serviceIds,
                    total: item.total,
                    status: item.status,
                    timeModified: item.timeModified,
                    submitType: SUBMIT_TYPE.edit,
                });
            });
    };

    handleSubmit = (e: SyntheticEvent<HTMLButtonElement>, submitOption: string): void => {
        e.preventDefault();
        return;

        // const { name, duration, price, desc } = this.state;
        // let item = {
        //     name: name,
        //     duration: duration,
        //     price: price,
        //     desc: desc,
        //     timeModified: moment().format(),
        // };
        //
        // if (submitOption === SUBMIT_TYPE.save) {
        //     item = { ...item, timeCreated: moment().format() };
        //     this.fdb.createInstance(DATABASE_REF.events, item);
        // }
        //
        // if ( submitOption === SUBMIT_TYPE.edit && this.props.serviceId) {
        //     this.fdb.updateInstance(DATABASE_REF.events, this.props.serviceId, item);
        // }
        //
        // this.props.toggleMenu(false);
        // this.setState({
        //     name: '',
        //     duration: 0,
        //     price: 0,
        //     desc: '',
        //     submitType: SUBMIT_TYPE.save,
        // });
    };

    handleInputChange = (e: Event) => {
        let target = e.target;
        if (target instanceof HTMLInputElement ||
            target instanceof HTMLTextAreaElement) {
            this.setState({
                [target.name]: target.value,
            });
        }
    };

    handleDelete = () => {
        if (this.props.serviceId) {
            this.fdb.deleteInstance(DATABASE_REF.events, this.props.serviceId);
            this.props.toggleMenu(false);
            this.setState({ submitType: SUBMIT_TYPE.save });
        }
    };

    handleStateChange = (state: {isOpen: boolean}) => {
        if (this.props.menu && !state.isOpen) {
            this.props.toggleMenu(false);
            // this.setState({
            //     name: '',
            //     duration: 0,
            //     price: 0,
            //     desc: '',
            //     submitType: SUBMIT_TYPE.save,
            // });
        }
    };

    render() {
        const {
            name,
            startIn,
            endsIn,
            serviceIds,
            status,
            total,
            timeModified,
            submitType,
        } = this.state;

        const {
            menu,
            serviceId,
        } = this.props;

        return <>
            <MenuContainer
                open={menu}
                onStateChange={this.handleStateChange}
            >
                <div className={styles.menu}>
                    <h2>{serviceId ? 'Edit Event' : 'Create Event'}</h2>
                    <form onSubmit={event => this.handleSubmit(event, submitType)}>
                        <FormInput
                            labelName='name'
                            onChange={this.handleInputChange}
                            inputValue={name}
                            required
                        />

                        <ServiceDropdown />

                        <div className={styles.buttons}>
                            <button
                                className={styles.save}
                                type='submit'
                            >Submit</button>
                            {!serviceId ? '' : <span
                                className={styles.delete}
                                onClick={this.handleDelete}
                                role='button'
                            >Delete</span>}
                        </div>
                        {!serviceId ? '' : <p><small
                            className={styles.lastMod}
                        >Modified: {moment(timeModified).calendar()}</small></p>}
                    </form>
                </div>
            </MenuContainer>
        </>;
    }
}

const EventPanelRedux = connect(
    state => ({
        menu: state.menu,
    }),
    dispatch => ({
        toggleMenu: (toggle: boolean) => {
            dispatch(toggleMenu(toggle));
        },
    })
)(EventPanel);

export default EventPanelRedux;
