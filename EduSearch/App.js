/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import MenuNavigator from './src/Navigation';
import {createAppContainer} from 'react-navigation';


const AppContainer = createAppContainer(MenuNavigator);

type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <AppContainer/>
        );
    }
}