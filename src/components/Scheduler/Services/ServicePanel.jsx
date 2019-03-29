// @flow
import * as React from 'react';
import FirebaseRealDB, { DATABASE_REF } from '../../../utils/FirebaseRealDB';
import moment from 'moment';
import styles from './ServicePanle.module.scss';
import MenuContainer from '../containers/MenuContainer';


type Props = {}

type State = {
    name: string,
    duration: ?number,
    price: ?number,
    desc: ?string,
    openPanel: boolean,
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
            openPanel: false,
        };

        this.fdb = new FirebaseRealDB();
    }

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
            openPanel,
        } = this.state;

        return <>
            <button
                className={styles.addButton}
                onClick={() => this.setState({openPanel: true})}
            >Add</button>
            <MenuContainer open={openPanel}>
                <div className={styles.menu}>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            type="text"
                            name='name'
                            onChange={this.handleInputChange}
                            value={name}
                            required
                            autoFocus={openPanel}
                            className={styles.input}
                        />
                        <input
                            type="number"
                            name='duration'
                            min='1'
                            onChange={this.handleInputChange}
                            value={duration}
                            required
                            className={styles.input}
                        />
                        <input
                            type="number"
                            name='price'
                            min='1'
                            onChange={this.handleInputChange}
                            value={price}
                            required
                            className={styles.input}
                        />
                        <textarea
                            name='desc'
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
