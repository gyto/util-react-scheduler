// @flow

export const TOGGLE_SERVICE_MENU: 'TOGGLE_SERVICE_MENU' = 'TOGGLE_SERVICE_MENU';

export const toggleServiceMenu = (toggleServiceMenu: boolean) => ({
    type: TOGGLE_SERVICE_MENU,
    toggleServiceMenu: toggleServiceMenu,
});
