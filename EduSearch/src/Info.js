import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  ScrollView
} from 'react-native'
import ElevatedView from 'react-native-elevated-view'
import unitLogo from '../src/images/unit_logo.jpg'
export default class Info extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <SafeAreaView style={styles.principal}>
        <View style={styles.imagesContainer}>
          <Image
            source={unitLogo}
            style={styles.unitImageStyle}
            resizeMethod={'scale'}
            resizeMode={'contain'}
          />
          <Image
            source={unitLogo}
            style={styles.gpticImageStyile}
            resizeMethod={'scale'}
            resizeMode={'contain'}
          />
        </View>
        <ElevatedView elevation={10} style={styles.textElevationView}>
          <ScrollView>
            <Text style={styles.mainTextStyle}>
              O EduSearch consiste em um produto do GPTIC, desenvolvido pelo
              aluno Gabriel Menezes da Silva como seu Trabalho de Conclusão de
              Curso. Esse aplicativo possibilita ao usuário a pesquisa e
              visualização dos artigos de periódicos científicos da Qualis
              Periódicos da Educação do quadriênio (2013-2016). Fornecendo
              também como funcionalidade a visualização das classificações dos
              impactos internacionais dessas produções que são atribuídas pelos
              diversos e principais índices bibliométricos internacionais
              (Eigenfactor, H-Index, JIF, entre outros). Com o EduSearch a vida
              de um pesquisador brasileiro será facilitada pois, na palma de sua
              mão, está o meio pelo qual ele pode visualizar diversos artigos
              nacionais da área da educação e também é o meio pelo qual ele irá
              realizar a escolha do próximo periódico que publicará seu próximo
              artigo, visto que o aplicativo também fornece os valores dos
              principais impactos internacionais e do estrato da Qualis do
              periódico pesquisado, permitindo a análise desses valores que dão
              uma boa noção de qual o periódico que dará mais visibilidade ao
              pesquisador.
            </Text>
          </ScrollView>
        </ElevatedView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  principal: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  imagesContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 50
  },
  textElevationView: {
    flex: 2,
    backgroundColor: '#DCDCDC',
    marginHorizontal: 20,
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingTop: 10
  },
  mainTextStyle: {
    textAlign: 'justify',
    fontFamily: 'NotoSansSC-Light'
  },
  gpticImageStyile: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
    borderWidth: 2,
    borderColor: '#cecece',
    borderColor: '#3866b5'
  },
  unitImageStyle: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
    borderWidth: 2,
    borderColor: '#cecece',
    borderColor: '#ffb131'
  }
})
