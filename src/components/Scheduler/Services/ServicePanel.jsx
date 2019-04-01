// @flow
import * as React from 'react';
import FirebaseRealDB, { DATABASE_REF } from '../../../utils/FirebaseRealDB';
import moment from 'moment';
import styles from './ServicePanel.module.scss';
import MenuContainer from '../containers/MenuContainer';


type Props = {
    openPanel: boolean,
    onStateChange: () => void,
    serviceId?: ?string,
}

type State = {
    name: string,
    duration: ?number,
    price: ?number,
    desc: ?string,
}

class ServicePanel extends React.Component<Props, State> {
    fdb: FirebaseRealDB;

    constructor(props: Props) {
        super(props);

        this.state = {
            name: '',
            duration: 0,
            price: 0,
            desc: '',
        };

        this.fdb = new FirebaseRealDB();
    }

    componentDidUpdate(prevProps: Props) {
        if (this.props.serviceId && this.props.serviceId !== prevProps.serviceId) {
            this.fetchData(this.props.serviceId);
        }
    }

    fetchData = (id: string) => {
        this.fdb.readSingleInstance(DATABASE_REF.services, id)
            .then(snapshot => console.log(snapshot.val()));
    };

    handleSubmit = (e: SyntheticEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        const { name, duration, price, desc } = this.state;
        const item = {
            name: name,
            duration: duration,
            price: price,
            desc: desc,
            timeCreated: moment().format(),
            timeModified: moment().format(),
        };
        this.fdb.createInstance(DATABASE_REF.services, item);
        this.setState({
            name: '',
            duration: 0,
            price: 0,
            desc: '',
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

    render() {
        const {
            name,
            duration,
            price,
            desc,
        } = this.state;

        const { openPanel, onStateChange } = this.props;

        return <>
            <MenuContainer
                open={openPanel}
                onStateChange={onStateChange}
            >
                <div className={styles.menu}>
                    <form onSubmit={this.handleSubmit}>
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
                            autoFocus={openPanel}
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
                        <button className={styles.save}>Submit</button>
                    </form>
                </div>
            </MenuContainer>
        </>;
    }
}

export default ServicePanel;
