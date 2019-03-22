import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import Cart from './Cart';

const rootReducer = combineReducers({
    cart: Cart,
});

const reducer = persistReducer(
    {
        key: 'root',
        storage: require('localforage'),
        // whitelist: ['cart'],
    },
    rootReducer,
);

export default reducer;
