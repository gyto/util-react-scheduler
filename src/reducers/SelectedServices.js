// @flow

import type { ServicedService } from '../components/Scheduler/types/Services';
import { SET_SELECTED_SERVICES} from '../actions/setSelectedServices';

const State = [];

export default (
    state: ServicedService[] = State,
    action
) => {
    switch (action.type) {
        case SET_SELECTED_SERVICES:
            return action.selectedServices;
        default:
            return state;
    }
};
