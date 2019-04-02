// @flow

import { TOGGLE_SERVICE_MENU } from '../actions/toggleServiceMenu';

const State = false;

export default (
    state: boolean = State,
    action
) => {
    switch (action.type) {
        case TOGGLE_SERVICE_MENU:
            return !state;
        default:
            return state;
    }
};
