import React, {Component, Fragment} from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Text,
    Platform,
    SafeAreaView,
    FlatList,
    ActivityIndicator,
    Dimensions,
    Alert
} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import axios from 'axios';
import strings from './util/Strings';
import RNPickerSelect from 'react-native-picker-select';
import Pdf from 'react-native-pdf';
import Modal from "react-native-modal";

const {height} = Dimensions.get('window');

export default class AllTypesResearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            searchType: "",
            articlePDFVisibility: false,
            documentUrl: "",
            loading: false,
            offset: 0,
            isArticleDetailsModalVisible: false,
            articleTitle:"",
            articleISSN: "",
            articleJournalName: "",
            articleAuthors: []

        }
    }

    componentDidMount() {
        /*\
        * Ex: Primeira chamada a API
        * Os trabalhos estão em res.data.message.items
        * */
        this.loadArticles();

    }

    loadArticles = async () => {
        if (this.state.loading) return;
        const {offset} = this.state;

        this.setState({loading: true});
        axios.get(`https://api.crossref.org/journals/0101-7330/works?filter=type:journal-article&offset=${this.state.offset}`)
            .then(res => {
                const works = res.data.message.items;
                if(works.length === 0){
                    //Abrir alerta informando que não há mais artigos disponíveis.
                }
                this.setState({
                    articles: [...this.state.articles, ...works],
                    loading: false,
                    offset: offset + 20
                });
            })


    }

    // Resto da classe


    openArticle(link) {
        this.setState({documentUrl: link[0].URL});
        this.setState({articlePDFVisibility: true});
    }
    ;
    openDetailsModal(title,issn,articleAuthors,articleJournal) {
        console.log("Autores",articleAuthors);
        this.setState({isArticleDetailsModalVisible: true});
        this.setState({articleTitle: title});
        this.setState({articleISSN: issn});
        this.setState({articleJournalName: articleJournal});
        this.setState({articleAuthors: articleAuthors});

    }
    renderItem = ({item}) => (
        <View key={item.key} style={styles.articleListCell}>
            <View style={{flex: 1}}>
                <TouchableOpacity onPress={() => this.openArticle(item.link)}
                                  style={styles.seeArticleTitleButton}>
                    <Text style={styles.articleTitle}>
                        {item.title[0]}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
                <TouchableOpacity onPress={() => this.openDetailsModal(item.title[0],item.ISSN[0],item.author,item['container-title'][0])}
                style={styles.seeArticleDetails}>
                    <Text style={styles.articleDetailsText}>
                        {strings.see_details}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );

  
    renderFooter = () => {
        if (!this.state.loading) return null;
        return (
            <View style={styles.loading}>
                <ActivityIndicator/>
            </View>
        );
    };
    renderModalContent = () => (
        <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
        <TouchableOpacity 
         style={styles.closeModalButton}
        onPress= {
            () => this.setState({isArticleDetailsModalVisible:false})
        }>
        <Icon
         name={'window-close-o'} 
         size={25} 
         color={'#3866b5'}/>
        </TouchableOpacity>
         <Icon
        
         name={'file-text'} size={45} 
         color={'#3866b5'}/>
            </View>
           
            <View style={styles.modalBody}>
            <ScrollView>
            <Text style={styles.modalItensTitles}>{strings.journal_name}</Text>
            <Text style={styles.completeArticleTitle}>{this.state.articleJournalName}</Text>
            <Text style={styles.modalItensTitles}>{strings.complete_title}</Text>
            <Text style={styles.completeArticleTitle}>{this.state.articleTitle}</Text>
            <Text style={styles.modalItensTitles}>{strings.ISSN}</Text>
            <Text style={styles.completeArticleTitle}>{this.state.articleISSN}</Text>
            
            <Text style={styles.modalItensTitles}>{strings.authors}</Text>
            {
                this.state.articleAuthors.map((item, i) => {
                  return (
                    <Text key={i} style={styles.completeArticleTitle}>{item.family}, {item.given}</Text>
                  )
                })
              }
               </ScrollView>
            </View>
           
        </View>
      )
    render() {

        return (


            <SafeAreaView style={styles.mainContainer}>
                            <Modal
                             isVisible={this.state.isArticleDetailsModalVisible}
                             style={styles.bottomModal}
                            >
                         {this.renderModalContent()}
                        </Modal>
                {!this.state.articlePDFVisibility ?
                    <Fragment>
                            
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

                        <FlatList
                            style={{marginTop: 30}}
                            contentContainerStyle={styles.list}
                            data={this.state.articles}
                            renderItem={this.renderItem}
                            keyExtractor={item => item.id}
                            onEndReached={this.loadArticles}
                            onEndReachedThreshold={0.2}
                            ListFooterComponent={this.renderFooter}

                        />


                    </Fragment> :
                    <SafeAreaView style={{flex: 1}}>
                        <TouchableOpacity onPress={() => this.setState({articlePDFVisibility: false})}>
                            <Icon
                                style={{marginLeft: 30, marginTop: 10, paddingBottom: 10}}
                                name={'window-close-o'} size={25} color={'#3866b5'}/>
                        </TouchableOpacity>
                        <Pdf
                            source={{uri: this.state.documentUrl}}
                            onLoadProgress={() => {
                            }}
                            onLoadComplete={() => {
                            }}
                            onError={(error) => {
                                Alert.alert("Erro", "Link indisponível");
                                this.setState({articlePDFVisibility: false})
                            }}
                            style={{flex: 1}}/>

                    </SafeAreaView>
                }


            </SafeAreaView>

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
        marginTop: 20
    },
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
        marginTop: 60,
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
        paddingTop: 20,
        fontFamily: 'NotoSansSC-Black',
        color: "#fff",
    },
    articleTitle: {
        fontSize: 10,
        fontFamily: 'NotoSansSC-Bold',
        height: 50
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
        marginTop: 25,
    },
    modalHeader:{
        flex:1,
        flexDirection: 'row',
        backgroundColor: "#fff",
        justifyContent: 'center',
        paddingTop: 20
    },
    bottomModal: {
        justifyContent: "flex-end",
        margin: 0,
      },
      modalContent: {
        backgroundColor: "#fff",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)",
        height: height/2,
    },
    closeModalButton:{
        position:'absolute',
        left:20,
        top:20
    },
    modalBody:{
        flex:4,
        alignItems: "center",
        paddingRight:20,
        paddingLeft:20,
    },
    completeArticleTitle:{
        textAlign: "center",
        fontFamily: 'NotoSansSC-Black',
    },
    modalItensTitles:{
        fontFamily: 'NotoSansSC-Bold',
        color: '#3866b5',
        textAlign: "center"

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
