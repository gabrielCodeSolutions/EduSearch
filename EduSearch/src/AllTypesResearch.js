import React, {Component} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity, ScrollView, Text} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import axios from 'axios';
import strings from './util/Strings';
import RNPickerSelect from 'react-native-picker-select';


export default class AllTypesResearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            searchType: ""
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

openArticle = () => {

};
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
                <View style={styles.researchSelectContainer}>
                    <RNPickerSelect
                        useNativeAndroidPickerStyle={false}
                        style={{...pickerSelectStyles}}
                        placeholder={{}}
                        hideIcon={true}
                        items={[{
                            label: "Autor",
                            value: 'Autor',
                        },
                            {
                                label: "Palavra-chave",
                                value: 'Palavra-chave',
                            },
                            {
                                label: "Revista",
                                value: "Revista"
                            }

                        ]}
                        onValueChange={(value) => {
                            this.setState({searchType: value});
                        }}
                        onUpArrow={() => {
                            //  this.inputRefs.name.focus();
                        }}
                        onDownArrow={() => {
                            //  this.inputRefs.picker2.togglePicker();
                        }}

                        value={this.state.searchType}

                    />
                    <View style={styles.dropDownIcon}>
                        <Icon
                            name={'sort-desc'} size={25} color={'#ffb131'}/>
                    </View>
                </View>
                <ScrollView style={styles.articleListScrollContainer}>
                    {
                        this.state.articles.map((content, index) => {
                            return (
                                <View key={index} style={styles.articleListCell}>
                                    <View style={{flex: 1}}>
                                        <TouchableOpacity style={styles.seeArticleTitleButton}>
                                            <Text style={styles.articleTitle}>
                                                {content.title}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                                        <TouchableOpacity style={styles.seeArticleDetails}>
                                            <Text style={styles.articleDetailsText}>
                                                Ver detalhes
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )


                        })
                    }


                </ScrollView>
            </View>

        );
    }
}


const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#fafafa',
        flex: 1
    },
    articleListScrollContainer: {
        backgroundColor: "#fafafa",
        marginTop: 20},
    articleListCell: {
        flex: 1,
        height: 100,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderBottomWidth: 1
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
    researchSelectContainer: {
        backgroundColor: '#3866b5',
        borderBottomWidth: 2,
        borderBottomColor: '#ffb131',
        height: 60,
        marginRight: 50,
        marginLeft: 50,
        marginTop: 10,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
    dropDownIcon: {
        position: 'absolute',
        right: 0,
        marginRight: 20,
        paddingBottom: 8
    },
    researchInput: {
        paddingLeft: 10,
        paddingRight: 14,
        fontFamily: 'NotoSansSC-Black',
        color: "#fff"
    },
    articleTitle: {
        fontSize: 10,
        fontFamily: 'NotoSansSC-Bold'
    },
    seeArticleDetails: {
        marginRight: 20,
        marginTop: 32,

    },
    articleDetailsText: {
        color: "#3866b5",
        fontFamily: 'NotoSansSC-Light'

    },
    seeArticleTitleButton: {
        marginLeft: 10,
        marginTop: 30
    }

});
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 15,
        paddingTop: 18,
        paddingHorizontal: 50,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 4,
        backgroundColor: 'transparent',
        color: 'white',
        fontFamily: 'NotoSansSC-Black',

    },
    inputAndroid: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 4,
        backgroundColor: 'transparent',
        color: 'white',
    },
});
