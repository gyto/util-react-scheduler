import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import Cart from './Cart';
import serviceMenu from './serviceMenu';

const rootReducer = combineReducers({
    cart: Cart,
    serviceMenu: serviceMenu,
});

const reducer = persistReducer(
    {
        key: 'root',
        storage: require('localforage'),
        whitelist: ['cart'],
    },
    rootReducer,
);

export default reducer;
