// @flow
import * as React from 'react';
import Select from 'react-select';
import FirebaseRealDB, { DATABASE_REF } from '../../../utils/FirebaseRealDB';
import { connect } from 'react-redux';
import formInputStyles from '../containers/FormInput.module.scss';
import { setSelectedServices } from '../../../actions/setSelectedServices';
import type { ServicedService } from '../../../components/Scheduler/types/Services';
import eventPanelStyles from './EventPanel.module.scss';
import { ReactSelectStyles } from '../containers/ReactSelectStyles';

type LabelValueObject = Object & {
    value: string,
    label: string,
}

type Props = {
    menu: boolean,
    setSelectedServices: (selectedServices: ServicedService[]) => void,
    selectedServices: ServicedService[]
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
                                label: `${items[item].name} - ${items[item].duration}min`,
                                duration: items[item].duration,
                                price: items[item].price,
                            });
                        }
                    }
                    this.setState({ options });
                });
        }
    }

    handleSum = (a: number, b: number) => {
        return a + b;
    };

    handleChange = (selectedOptions: LabelValueObject[]) => {
        let selectedId = [];
        selectedOptions.map(item => selectedId.push({
            id: item.value,
            duration: item.duration,
            price: item.price,
        }));
        this.props.setSelectedServices(selectedId);
    };

    render() {
        const { selectedServices } = this.props;
        const checkSelectedServices = selectedServices === undefined
            || selectedServices.length === 0;

        // TODO: remove this nonsense
        let sumTime: Array<number> = [];
        let sumTotal: Array<number> = [];
        let viewTime: number;
        let viewTotal: number;

        if (!checkSelectedServices) {
            selectedServices && selectedServices.map(item => {
                sumTime.push(Number(item.duration));
                sumTotal.push(Number(item.price));
            });

            viewTime = sumTime.reduce(this.handleSum);
            viewTotal = sumTotal.reduce(this.handleSum);
        }

        return (
            <>
                <label
                    className={formInputStyles.label}
                >Services</label>
                <Select
                    isMulti
                    isSearchable
                    onChange={this.handleChange}
                    options={this.state.options}
                    styles={ReactSelectStyles}
                />
                {checkSelectedServices ? '' : <p
                    className={eventPanelStyles.lastMod}
                >
                    <small>Time: {viewTime}min</small>
                    <br/>
                    <small>Appx. Total: ${viewTotal}</small>
                </p>}
            </>
        );
    }
}

const ServiceDropdownRedux = connect(
    state => ({
        menu: state.menu,
        selectedServices: state.selectedServices,
    }),
    dispatch => ({
        setSelectedServices: (selectedServices: ServicedService[]) => {
            dispatch(setSelectedServices(selectedServices));
        },
    })
)(ServiceDropdown);

export default ServiceDropdownRedux;
