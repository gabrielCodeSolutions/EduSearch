import React, {Component} from 'react';
import {View,StyleSheet,Text} from 'react-native';

export default class ImpactResearch extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={{backgroundColor: 'blue',flex:1}}>
                <Text style={{color: "white"}}> Olá</Text>
            </View>

        );
    }
}


const styles = StyleSheet.create({
    principal: {
        flex: 1,
        marginTop: 20
    },

});
