import React from 'react'

import { 
  View,
  Text,
  TouchableNativeFeedback,
  StyleSheet,
  Image,
  ImageBackground
} from 'react-native'

import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'

import { handleAuth } from '../actions'

const Menu = props => (
  <ImageBackground resizeMode="cover" source={require('../assets/bg.png')} style={style.content}>
    <View style={style.logoTipo}>
      <Image style={style.logo} source={require('../assets/react.png')} />
      <Text style={style.title}>React Native</Text>
    </View>
    <TouchableNativeFeedback onPress={props.handleAuth}>
      <View style={style.button}>
        <Text style={style.buttonText}>INICAR</Text>
      </View>
    </TouchableNativeFeedback>
  </ImageBackground>
)

const style = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoTipo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14
  },
  logo: {
    marginBottom: 25,
    marginRight: 3
  },
  title: {
    fontSize: 27,
    color: '#fafafa',
    fontWeight: 'bold',
    marginBottom: 30
  },
  button: {
    borderRadius: 3,
    elevation: 3,
    backgroundColor: '#05a5d1',
    justifyContent: 'center',
    padding: 10,
    marginBottom: 20,
    width: 220,
    height: 50
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff'
  }
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ handleAuth }, dispatch)
}

export default connect(null, mapDispatchToProps)(Menu)