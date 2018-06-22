import React from 'react'

import {
  View,
  StyleSheet,
  PanResponder,
  Animated,
  FlatList,
  Image,
  Dimensions
} from 'react-native'

export default class Stage extends React.Component {
  window = Dimensions.get('window')

  constructor() {
    super();

    this.state = {
      translate: new Animated.Value(10),
      pan: new Animated.ValueXY(),
      figures: [
        { id: 3, nome: 'java', image: require('../assets/java.png') },
        { id: 1, nome: 'react', image: require('../assets/react.png') },
        { id: 2, nome: 'angular', image: require('../assets/angular.png') }
      ]
    };

    // DRAG AND DROP
    this._val = { x: 0, y: 0 }
    this.state.pan.addListener((value) => this._val = value);

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan.x, dy: 0 }
      ])
    });

    this.state.pan.setValue({ x: 0, y: 0 })
  }

  componentDidMount() {
    Animated.timing(this.state.translate, {
      toValue: this.window.height,
      duration: 10000
    }).start()
  }

  render() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    }

    const translateY = {
      transform: [{
        translateY: this.state.translate
      }]
    }

    return (
      <View style={style.content}>
        <FlatList
          numColumns={3}
          contentContainerStyle={{ flex: 1, width: this.window.width }}
          data={this.state.figures}
          renderItem={({ item, index }) => (
            <Animated.View style={[translateY, { width: 50, height: 50, zIndex: 999999, position: 'absolute', backgroundColor: "#000" }]} source={item.image} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />

        <Animated.View
          style={[style.square, panStyle,]}
          {...this.panResponder.panHandlers}
        />
      </View>
    )
  }
}

const style = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  square: {
    width: 80,
    height: 50,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#424242'
  },
})