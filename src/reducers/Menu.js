// @flow

import { TOGGLE_MENU } from '../actions/toggleMenu';

const State = false;

export default (
    state: boolean = State,
    action
) => {
    switch (action.type) {
        case TOGGLE_MENU:
            return !state;
        default:
            return state;
    }
};
