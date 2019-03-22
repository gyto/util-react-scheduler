// @flow

import { UPDATE_CART } from '../actions/UpdateCart';
import { ADD_TO_CART, SET_CART } from '../actions/SetCart';

function getCart (newCriteria, state = {}) {
    const productId = { ...state, ...newCriteria };
    for (let key in productId) {
        if (!productId.hasOwnProperty(key)) {
            continue;
        }
        if (!productId[key]) delete productId[key];
    }
    return productId;
}

const initialState = {
    productId: [],
};

export default (
    state = initialState,
    action
) => {
    switch (action.type) {
        case UPDATE_CART:
            return getCart(action.productId, state);

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
