// @flow

export const ADD_TO_CART = 'ADD_TO_CART';

export const addToCart = (productId: number) => ({
    type: ADD_TO_CART,
    productId: productId,
});

