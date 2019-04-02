// @flow

export const TOGGLE_MENU: 'TOGGLE_MENU' = 'TOGGLE_MENU';

export const toggleMenu = (toggleMenu: boolean) => ({
    type: TOGGLE_MENU,
    toggleMenu: toggleMenu,
});
