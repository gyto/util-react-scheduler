import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import './index.scss';
import Root from './config/Root';
import * as serviceWorker from './serviceWorker';
import { getPersistor, getStore } from './store/configureStore';
import i18n from './utils/i18n';

const store = getStore();
const persistor = getPersistor();

ReactDOM.render(
    <I18nextProvider i18n={i18n}>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Root/>
            </PersistGate>
        </Provider>
    </I18nextProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
