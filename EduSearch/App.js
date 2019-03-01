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
import firebase from "react-native-firebase";


const AppContainer = createAppContainer(MenuNavigator);

type Props = {};
export default class App extends Component<Props> {


    render() {

        var config = {
            databaseURL: "https://edusearch-32e40.firebaseio.com",
            projectId: "edusearch-32e40",
        };

        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }


        return (
            <AppContainer/>
        );
    }
}