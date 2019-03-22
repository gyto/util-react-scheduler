import { createStore } from 'redux';
import reducer from '../reducers';
import { persistStore } from 'redux-persist';

// const persistConfig = {
//     key: 'root',
//     storage: require('localforage'),
//     // whitelist: ['cart'],
// };

let _persistor;
let _store;

export const getStore = (props) => {
    if (_store) {
        return _store;
    }
    const initialState = (props) ? {...props} : {};
    _store = createStore(
        reducer,
        initialState,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    _persistor = persistStore(_store);

    return _store;
};

export const getPersistor = () => {
    return _persistor;
};
