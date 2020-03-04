import React from 'react';
import ReactDOM from 'react-dom';
import './assets/icons/fontawesome/css/all.min.css'
import './assets/sass/app.css'
import './assets/css/circle.css'
import 'input-moment/dist/input-moment.css'
import 'react-times/css/material/default.css'
import 'react-times/css/classic/default.css'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux'
import createStore from './redux'
import { PersistGate } from 'redux-persist/integration/react'

const { store, persistor } = createStore()

ReactDOM.render(
<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <App />
    </PersistGate>
</Provider>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
