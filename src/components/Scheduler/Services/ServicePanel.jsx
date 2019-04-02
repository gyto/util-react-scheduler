// @flow
import * as React from 'react';
import FirebaseRealDB, { DATABASE_REF } from '../../../utils/FirebaseRealDB';
import moment from 'moment';
import styles from './ServicePanel.module.scss';
import MenuContainer from '../containers/MenuContainer';
import { connect } from 'react-redux';
import { toggleMenu } from '../../../actions/toggleMenu';


type Props = {
    serviceId?: ?string,
    toggleMenu: (boolean) => void,
    menu: boolean,
}

type State = {
    name: string,
    duration: ?number,
    price: ?number,
    desc: ?string,
    timeModified: ?Date,
    submitType: string,
}

const SUBMIT_TYPE = {
    save: 'save',
    edit: 'edit',
};

export class ServicePanel extends React.Component<Props, State> {
    fdb: FirebaseRealDB;

    constructor(props: Props) {
        super(props);

        this.state = {
            name: '',
            duration: 0,
            price: 0,
            desc: '',
            open: false,
            timeModified: null,
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
        this.fdb.readSingleInstance(DATABASE_REF.services, id)
            .then(snapshot => {
                let item = snapshot.val();
                this.setState({
                    name: item.name,
                    duration: item.duration,
                    price: item.price,
                    desc: item.desc,
                    timeModified: item.timeModified,
                    submitType: SUBMIT_TYPE.edit,
                });
            });
    };

    handleSubmit = (e: SyntheticEvent<HTMLButtonElement>, submitOption: string): void => {
        e.preventDefault();
        const { name, duration, price, desc } = this.state;
        let item = {
            name: name,
            duration: duration,
            price: price,
            desc: desc,
            timeModified: moment().format(),
        };

        if (submitOption === SUBMIT_TYPE.save) {
            item = { ...item, timeCreated: moment().format() };
            this.fdb.createInstance(DATABASE_REF.services, item);
        }

        if ( submitOption === SUBMIT_TYPE.edit && this.props.serviceId) {
            this.fdb.updateInstance(DATABASE_REF.services, this.props.serviceId, item);
        }

        this.props.toggleMenu(false);
        this.setState({
            name: '',
            duration: 0,
            price: 0,
            desc: '',
            submitType: SUBMIT_TYPE.save,
        });
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
            this.fdb.deleteInstance(DATABASE_REF.services, this.props.serviceId);
            this.props.toggleMenu(false);
            this.setState({ submitType: SUBMIT_TYPE.save });
        }
    };

    handleStateChange = (state: {isOpen: boolean}) => {
        if (this.props.menu && !state.isOpen) {
            this.props.toggleMenu(false);
            this.setState({
                name: '',
                duration: 0,
                price: 0,
                desc: '',
                submitType: SUBMIT_TYPE.save,
            });
        }
    };

    render() {
        const {
            name,
            duration,
            price,
            desc,
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
                    <h2>{serviceId ? 'Edit Service' : 'Create Service'}</h2>
                    <form onSubmit={event => this.handleSubmit(event, submitType)}>
                        <label
                            htmlFor="nameInput"
                            className={styles.label}
                        >Name</label>
                        <input
                            type="text"
                            name='name'
                            id='nameInput'
                            onChange={this.handleInputChange}
                            value={name}
                            required
                            autoFocus={menu}
                            className={styles.input}
                        />
                        <label
                            htmlFor="durationInput"
                            className={styles.label}
                        >Duration</label>
                        <input
                            type="number"
                            name='duration'
                            id='durationInput'
                            min='1'
                            onChange={this.handleInputChange}
                            value={duration}
                            required
                            className={styles.input}
                        />
                        <label
                            htmlFor="priceInput"
                            className={styles.label}
                        >Price</label>
                        <input
                            type="number"
                            name='price'
                            id='priceInput'
                            min='1'
                            onChange={this.handleInputChange}
                            value={price}
                            required
                            className={styles.input}
                        />
                        <label
                            htmlFor="descInput"
                            className={styles.label}
                        >Desc</label>
                        <textarea
                            name='desc'
                            id='descInput'
                            onChange={this.handleInputChange}
                            value={desc}
                            className={styles.textArea}
                        />
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

const ServicePanelRedux = connect(
    state => ({
        menu: state.menu,
    }),
    dispatch => ({
        toggleMenu: (toggle: boolean) => {
            dispatch(toggleMenu(toggle));
        },
    })
)(ServicePanel);

export default ServicePanelRedux;
