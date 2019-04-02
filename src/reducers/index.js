import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import Cart from './Cart';
import Menu from './Menu';

const rootReducer = combineReducers({
    cart: Cart,
    menu: Menu,
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
