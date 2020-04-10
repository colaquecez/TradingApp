/**
 * @format
 */
import React from 'react'
import { AppRegistry } from 'react-native';
import App from './src';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import Store  from './src/state/store';

const ReduxContainer = () => (
    <Provider store={Store}>
        <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => ReduxContainer);
