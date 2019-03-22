// @flow

export const UPDATE_CART: 'UPDATE_CART' = 'UPDATE_CART';

export const updateCart = (
    productId,
) => ({
    type: 'UPDATE_CART',
    productId: productId,
});
