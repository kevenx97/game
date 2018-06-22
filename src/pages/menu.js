import React from 'react'

import { View, Text, TouchableNativeFeedback, StyleSheet, Image } from 'react-native'

export const Menu = () => (
  <View style={style.content}>
    <View style={style.logoTipo}>
      <Image style={style.logo} source={require('../assets/react.png')} />
      <Text style={style.title}>Just React</Text>
    </View>
    <TouchableNativeFeedback>
      <View style={style.button}>
        <Text style={style.buttonText}>INICAR</Text>
      </View>
    </TouchableNativeFeedback>
  </View>
)

const style = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2d2d2d'
  },
  logoTipo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14
  },
  logo: {
    marginBottom: 25,
    marginRight: 5
  },
  title: {
    fontSize: 32,
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

export default Menu