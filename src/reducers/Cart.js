// @flow


import { ADD_TO_CART } from '../actions/SetCart';

type initialState = {}

const State: initialState = {
    productId: [],
};

export default (
    state: initialState = State,
    action
) => {
    switch (action.type) {
        case ADD_TO_CART:
            if (state.productId.indexOf(action.productId) !== -1) {
                return state;
            }
            return {
                ...state,
                productId: [ ...state.productId, action.productId],
            };

        default:
            return state;
    }
};
