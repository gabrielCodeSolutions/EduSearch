import React, {Component} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import axios from 'axios';
import strings from './util/Strings';

export default class AllTypesResearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: []
        }
    }

    componentDidMount(): void {
        /*\
        * Ex: Primeira chamada a API
        * Os trabalhos estão em res.data.message.items
        * */
        axios.get(`https://api.crossref.org/journals/0101-7330/works`)
            .then(res => {
                const works = res.data.message.items;
                this.setState({articles: works});
            })
    }


    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.researchInputContainer}>
                    <View style={{flex: 1}}>

                        <TouchableOpacity>
                            <Icon
                                style={{paddingLeft: 30}}
                                name={'search'} size={25} color={'#ffb131'}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 4}}>
                        <TextInput style={styles.researchInput}
                                   placeholder={strings.type_here}
                                   placeholderTextColor="#2A5082"
                        />
                    </View>
                </View>
                <ScrollView>



                </ScrollView>

            </View>

        );
    }
}


const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#fdfdfd',
        flex: 1
    },
    researchInputContainer: {
        backgroundColor: '#3866b5',
        borderBottomWidth: 2,
        borderBottomColor: '#ffb131',
        height: 60,
        marginRight: 50,
        marginLeft: 50,
        marginTop: 70,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
    researchInput: {
        paddingLeft: 10,
        paddingRight: 14,
        fontFamily: 'NotoSansSC-Black',
        color: "#fff"
    }
});
