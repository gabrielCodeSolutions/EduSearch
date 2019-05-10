import React, { Component, Fragment } from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Dimensions
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import strings from './util/Strings'
import Modal from 'react-native-modal'
import firebase from 'react-native-firebase'

const { height } = Dimensions.get('window')

export default class ImpactResearch extends Component {
  constructor (props) {
    super(props)
    this.state = {
      articles: [],
      loading: false,
      isArticleDetailsModalVisible: false,
      stringToSearch: '',
      firebasePapers: [],
      unavailableOrNotFoundPaper: false,
      fiveJIF: '',
      articleInfluence: '',
      eigenfactor: '',
      estrato: '',
      hindexfive: '',
      hindexSjr: '',
      jif: '',
      topsis: '',
      paperTitle: '',
      paperISSN: ''
    }
  }

  componentDidMount () {
    this.readJournalsDataFromFirebase()
  }

  seeAllArticles () {
    this.readJournalsDataFromFirebase()
  }

  readJournalsDataFromFirebase = () => {
    this.setState({ loading: true })
    this.setState({ articles: [] })
    firebase
      .database()
      .ref()
      .once('value')
      .then(snapshot => {
        this.setState({
          articles: snapshot.val(),
          loading: false,
          firebasePapers: snapshot.val()
        })
      })
  }

  openDetailsModal (
    fivejif,
    articleInfluence,
    eigen,
    estrato,
    hindexFive,
    hindexSJR,
    jif,
    paperTitle,
    issn,
    topsis
  ) {
    this.setState({ isArticleDetailsModalVisible: true })
    this.setState({ articleISSN: issn })
    this.setState({ fiveJIFs: fivejif })
    this.setState({ articleInfluence: articleInfluence })
    this.setState({ eigenfactor: eigen })
    this.setState({ estrato: estrato })
    this.setState({ hindexfive: hindexFive })
    this.setState({ hindexSjr: hindexSJR })
    this.setState({ jif: jif })
    this.setState({ paperTitle: paperTitle })
    this.setState({ paperISSN: issn })
    this.setState({ topsis: topsis })
  }

  renderItem = ({ item }) => (
    <View key={item.key} style={styles.articleListCell}>
      <View style={styles.seeArticleTitleButton}>
        <Text style={styles.articleTitle}>{item.Título}</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        <TouchableOpacity
          onPress={() =>
            this.openDetailsModal(
              item['5JIF'],
              item['Article_influence'],
              item['Eigenfactor'],
              item['Estrato'],
              item['Hindex5'],
              item['HindexSJR'],
              item['JIF'],
              item['Título'],
              item['ISSN'],
              item['topsis']
            )
          }
          style={styles.seeArticleDetails}
        >
          <Text style={styles.articleDetailsText}>{strings.see_details}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  renderFooter = () => {
    if (!this.state.loading) return null
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    )
  }
  renderModalContent = () => (
    <View style={styles.modalContent}>
      <View style={styles.modalHeader}>
        <TouchableOpacity
          style={styles.closeModalButton}
          onPress={() => this.setState({ isArticleDetailsModalVisible: false })}
        >
          <Icon name={'window-close-o'} size={25} color={'#3866b5'} />
        </TouchableOpacity>
        <Icon name={'file-text'} size={45} color={'#3866b5'} />
      </View>

      <View style={styles.modalBody}>
        <ScrollView>
          <Text style={styles.modalItensTitles}>{strings.journal_name}</Text>
          <Text style={styles.completeArticleTitle}>
            {this.state.paperTitle}
          </Text>
          <Text style={styles.modalItensTitles}>{strings.ISSN}</Text>
          <Text style={styles.completeArticleTitle}>
            {this.state.paperISSN}
          </Text>
          <Text style={styles.modalItensTitles}>{strings.topsis}</Text>
          <Text style={styles.completeArticleTitle}>{this.state.topsis}</Text>
          <Text style={styles.modalItensTitles}>{strings.fiveJIF}</Text>
          <Text style={styles.completeArticleTitle}>{this.state.fiveJIFs}</Text>
          <Text style={styles.modalItensTitles}>
            {strings.article_influence}
          </Text>
          <Text style={styles.completeArticleTitle}>
            {this.state.articleInfluence}
          </Text>
          <Text style={styles.modalItensTitles}>{strings.eigenfactor}</Text>
          <Text style={styles.completeArticleTitle}>
            {this.state.eigenfactor}
          </Text>
          <Text style={styles.modalItensTitles}>{strings.estrato}</Text>
          <Text style={styles.completeArticleTitle}>{this.state.estrato}</Text>
          <Text style={styles.modalItensTitles}>{strings.hindex_five}</Text>
          <Text style={styles.completeArticleTitle}>
            {this.state.hindexfive}
          </Text>
          <Text style={styles.modalItensTitles}>{strings.hindex_sjr}</Text>
          <Text style={styles.completeArticleTitle}>
            {this.state.hindexSjr}
          </Text>
          <Text style={styles.modalItensTitles}>{strings.jif}</Text>
          <Text style={styles.completeArticleTitle}>{this.state.jif}</Text>
        </ScrollView>
      </View>
    </View>
  )

  doResearch = async () => {
    this.setState({ loading: true })
    this.setState({ articles: [] })
    this.setState({ searchStarted: true })

    let journalFound = false

    for (let i = 0; i < this.state.firebasePapers.length; i++) {
      let stringToSearchWithNoSpace = this.state.stringToSearch
        .replace(/\s/g, '')
        .toUpperCase()
        .trim()
      let articleTitleString = this.state.articles[i].Título.replace(/\s/g, '')
        .toUpperCase()
        .trim()
      if (stringToSearchWithNoSpace === articleTitleString) {
        journalFound = true
        let journalFoundArray = []
        journalFoundArray.push(this.state.articles[i])
        this.setState({
          articles: journalFoundArray,
          loading: false,
          unavailableOrNotFoundPaper: false
        })
        break
      }
    }
    if (journalFound === false) {
      this.setState({ loading: false })
      this.setState({ unavailableOrNotFoundPaper: true })
    }
  }

  render () {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <Modal
          isVisible={this.state.isArticleDetailsModalVisible}
          style={styles.bottomModal}
        >
          {this.renderModalContent()}
        </Modal>

        <View style={styles.researchInputContainer}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => this.doResearch()}>
              <Icon
                style={{ paddingLeft: 30 }}
                name={'search'}
                size={25}
                color={'#ffb131'}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 3 }}>
            <TextInput
              style={styles.researchInput}
              placeholder={strings.type_paper_name}
              placeholderTextColor='#2A5082'
              onChangeText={texto => this.setState({ stringToSearch: texto })}
            />
          </View>
        </View>
        <View style={styles.seeAllArticlesContainer}>
          <TouchableOpacity onPress={() => this.seeAllArticles()}>
            <View style={{ flex: 1 }}>
              <Text style={styles.researchInput}>
                {strings.see_all_articles}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {this.state.unavailableOrNotFoundPaper && (
          <View style={styles.unavailableOrNotFoundJournalContainer}>
            <Icon name={'search'} size={25} color={'#ffb131'} />
            <Text style={styles.unavailableOrNotFoundJournalText}>
              {strings.unavailable_or_not_found_journal}
            </Text>
          </View>
        )}
        {!this.state.unavailableOrNotFoundPaper && (
          <Fragment>
            <FlatList
              style={{ marginTop: 30 }}
              contentContainerStyle={styles.list}
              data={this.state.articles}
              renderItem={this.renderItem}
              keyExtractor={item => item.id}
              onEndReached={this.loadPaperSearchArticles}
              onEndReachedThreshold={0.2}
              ListFooterComponent={this.renderFooter}
            />
          </Fragment>
        )}
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fafafa',
    flex: 1
  },
  articleListScrollContainer: {
    backgroundColor: '#fafafa',
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
    justifyContent: 'center'
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
    justifyContent: 'center'
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
    color: '#fff'
  },
  articleTitle: {
    fontSize: 10,
    fontFamily: 'NotoSansSC-Bold',
    height: 50
  },
  seeArticleDetails: {
    marginRight: 20,
    marginTop: 32
  },
  articleDetailsText: {
    color: '#3866b5',
    fontFamily: 'NotoSansSC-Light'
  },
  seeArticleTitleButton: {
    marginLeft: 10,
    marginTop: 25,
    flex: 1
  },
  modalHeader: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingTop: 20
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    height: height / 2
  },
  closeModalButton: {
    position: 'absolute',
    left: 20,
    top: 20
  },
  modalBody: {
    flex: 4,
    alignItems: 'center',
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20
  },
  completeArticleTitle: {
    textAlign: 'center',
    fontFamily: 'NotoSansSC-Black'
  },
  modalItensTitles: {
    fontFamily: 'NotoSansSC-Bold',
    color: '#3866b5',
    textAlign: 'center'
  },
  searchNotStartedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  unavailableOrNotFoundJournalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: 10,
    marginLeft: 10
  },
  searchNotStartedText: {
    textAlign: 'center',
    fontFamily: 'NotoSansSC-Bold',
    fontSize: 16,
    color: '#3866b5'
  },
  unavailableOrNotFoundJournalText: {
    textAlign: 'center',
    fontFamily: 'NotoSansSC-Bold',
    fontSize: 16,
    color: '#3866b5'
  },
  seeAllArticlesContainer: {
    backgroundColor: '#3866b5',
    borderBottomWidth: 2,
    borderBottomColor: '#ffb131',
    height: 60,
    marginRight: 50,
    marginLeft: 50,
    marginTop: 20,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
