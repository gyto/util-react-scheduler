// @flow
import * as React from 'react';
import FirebaseRealDB, { DATABASE_REF } from '../utils/FirebaseRealDB';

type Props = {}

type State = {
    service: string,
    services: Array<Object>
}

class Firebase extends React.Component<Props, State> {
    fdb: FirebaseRealDB;

    constructor(props: Props) {
        super(props);

        this.state = {
            service: '',
            services: [],
        };

        this.fdb = new FirebaseRealDB();
    }

    componentDidMount(): void {
        this.fdb.readInstance(DATABASE_REF.services)
            .on('value', (snapshot) => {
                let items = snapshot.val();
                let newState = [];
                for (let item in items) {
                    if (items.hasOwnProperty(item)) {
                        newState.push({
                            id: item,
                            serviceName: items[item].serviceName,
                        });
                    }
                }

                this.setState({
                    services: newState,
                });
            });
    }

    handleChange = (e: Event): void => {
        let target = e.target;
        if (target instanceof HTMLInputElement) {
            this.setState({
                [target.name]: target.value,
            });
        }
    };

    handleSubmit = (e: SyntheticEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        const item = {
            serviceName: this.state.service,
        };
        this.fdb.createInstance(DATABASE_REF.services, item);
        this.setState({
            service: '',
        });
    };

    handleRemove = (itemId: string) => {
        this.fdb.deleteInstance(DATABASE_REF.services, itemId);
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="service"
                        onChange={this.handleChange}
                        value={this.state.service}
                    />
                    <button>Submit</button>
                </form>

                <ul>
                    {this.state.services.map((item) => {
                        return (
                            <li key={item.id}>
                                <p>{item.serviceName}</p>
                                <button onClick={() => this.handleRemove(item.id)}>Remove</button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default Firebase;
