// @flow
import * as React from 'react';
import Select from 'react-select';
import FirebaseRealDB, { DATABASE_REF } from "../../../utils/FirebaseRealDB";
import { connect } from 'react-redux';
import styles from "../containers/FormInput.module.scss";

type LabelValueObject = Object & {
    value: string,
    label: string,
}

type Props = {
    menu: boolean,
}

type State = {
    options: LabelValueObject[]
}

export class ServiceDropdown extends React.Component<Props, State> {
    fdb: FirebaseRealDB;

    constructor(props: Props) {
        super(props);

        this.state = {
            options: [],
        };

        this.fdb = new FirebaseRealDB();
    }

    componentDidUpdate(prevProps: Props) {
        if (this.props.menu === true && this.props.menu !== prevProps.menu) {
            this.fdb.readInstance(DATABASE_REF.services)
                .on('value', (snapshot) => {
                    let items = snapshot.val();
                    let options: LabelValueObject[] = [];
                    for (let item in items) {
                        if (items.hasOwnProperty(item)) {
                            options.push({
                                value: item,
                                label: items[item].name,
                            });
                        }
                    }
                    this.setState({ options });
                });
        }
    }

    handleChange = (e) => {
        console.log(e);
    };

    render() {
        return (
            <>
                <label
                    className={styles.label}
                >Services</label>
                <Select
                    isMulti
                    isSearchable
                    onChange={this.handleChange}
                    options={this.state.options}
                />
            </>
        );
    }
}

const ServiceDropdownRedux = connect(
    state => ({
        menu: state.menu,
    })
)(ServiceDropdown);

export default ServiceDropdownRedux;
