import React from 'react';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import AllTypesResearch from './AllTypesResearch'
import Info from './Info'
import ImpactResearch from './ImpactResearch'
import strings from './util/Strings.js'
import Icon from "react-native-vector-icons/FontAwesome";

const MenuRoutes = {
    Periodics: {
        name: 'Periodics',
        screen: AllTypesResearch,
        navigationOptions: {
            title: strings.periodics,
            tabBarIcon  : ({tintColor}) =>
                <Icon name={'search'} size={30} color={tintColor}/>
        }
    },
    Impacts: {
        name: 'Impacts',
        screen: ImpactResearch,
        navigationOptions: {
            title: strings.impacts,
            tabBarIcon  : ({tintColor}) =>
                <Icon name={'bar-chart'} size={30} color={tintColor}/>
        }
    },

    Info: {
        name: 'Info',
        screen: Info,
        navigationOptions: {
            title: strings.info,
            tabBarIcon  : ({tintColor}) =>
                <Icon name={'info-circle'} size={30} color={tintColor}/>
        }
    }
};

const MenuConfig = {
    initialRouteName: 'Periodics'
};

const MenuNavigator = createBottomTabNavigator(MenuRoutes, MenuConfig);

export default MenuNavigator