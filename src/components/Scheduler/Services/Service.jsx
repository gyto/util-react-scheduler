// @flow
import * as React from 'react';
import type { Services } from '../types/Services';
import FirebaseRealDB, { DATABASE_REF } from '../../../utils/FirebaseRealDB';
import styles from './Service.module.scss';

type Props = {}

type State = {
    services: Services[],
}

class Service extends React.Component<Props, State> {
    fdb: FirebaseRealDB;

    constructor(props: Props) {
        super(props);

        this.state = {
            services: [],
        };

        this.fdb = new FirebaseRealDB();
    }

    componentDidMount(): void {
        this.fdb.readInstance(DATABASE_REF.services)
            .on('value', (snapshot) => {
                let items = snapshot.val();
                let newState: Services[] = [];
                for (let item in items) {
                    if (items.hasOwnProperty(item)) {
                        newState.push({
                            id: item,
                            name: items[item].name,
                            duration: items[item].duration,
                            price: items[item].price,
                            desc: items[item].desc,
                        });
                    }
                }

                this.setState({
                    services: newState,
                });
            });
    }

    render() {
        const {
            services,
        } = this.state;
        return (
            <div className={styles.boxes}>
                {services.map(service => {
                    const serviceDesc = service.desc
                        ? <p className={styles.desc}>{service.desc}</p>
                        : '';
                    return (
                        <div key={service.id} className={styles.box}>
                            <div className={styles.item}>
                                <h4 className={styles.name}>{service.name}</h4>
                                <p className={styles.osm}>{service.duration} min - ${service.price}</p>
                                {serviceDesc}
                            </div>
                            <button className={styles.button}>Manage</button>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Service;
