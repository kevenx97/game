import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Dimensions
} from 'react-native'

export const GameOver = props => (
  <View style={style.modal}>
    <Text style={style.title}>FIM DE JOGO!</Text>

    <View style={style.scoreContent}>
      <Text style={style.text}>Pontuação: </Text>
      <Text style={style.score}>{props.score}</Text>
    </View>

    <TouchableNativeFeedback onPress={() => props.buttonBack()}>
      <View style={style.button}>
        <Text style={style.buttonText}>Voltar</Text>
      </View>
    </TouchableNativeFeedback>
  </View>
)

const style = StyleSheet.create({
  modal: {
    width: 280,
    height: 200,
    paddingHorizontal: 10,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f7f7'
  },
  scoreContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  score: {
    fontSize: 18,
    color: '#595a5d',
    fontWeight: 'bold'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#05a5d1'
  },
  text: {
    fontSize: 18,
    marginVertical: 30
  },
  button: {
    borderRadius: 3,
    backgroundColor: '#05a5d1',
    justifyContent: 'center',
    padding: 10,
    width: 220,
    height: 40
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff'
  }
})

export default GameOver