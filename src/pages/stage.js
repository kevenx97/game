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
      pan: new Animated.ValueXY(),
      figures: [
        { id: 1, nome: 'java', image: require('../assets/java.png'), animated: false, translate: new Animated.Value(-80) },
        { id: 2, nome: 'react', image: require('../assets/react.png'), animated: false, translate: new Animated.Value(-80) },
        { id: 3, nome: 'angular', image: require('../assets/angular.png'), animated: false, translate: new Animated.Value(-80) },
        { id: 4, nome: 'python', image: require('../assets/python.png'), animated: false, translate: new Animated.Value(-80) },
        { id: 5, nome: 'xamarin', image: require('../assets/xamarin.png'), animated: false, translate: new Animated.Value(-80) },
        { id: 6, nome: 'ionic', image: require('../assets/ionic.png'), animated: false, translate: new Animated.Value(-80) }
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
    setInterval(() => {
      let figures = this.state.figures
      let figuresRandom = []
      let figuresTemp = [...figures]

      const figureAnimated = figures[Math.floor(Math.random() * figures.length)]

      figures.map((item, index) => {
        if (figureAnimated.animated == true && item.animated == true) {
          return false
        }

        if (item.id === figureAnimated.id) {
          figures[index].animated = true

          Animated.timing(figures[index].translate, {
            toValue: this.window.height,
            duration: 4000,
            useNativeDriver: true
          }).start(() => {
            figures[index].animated = false

            // PEGAR O ITEM DO ARRAY E MUDA-LO DE LUGAR

            // for (let i = 0; i < figures.length - 1; i++) {
            //   figuresRandom.push(figuresTemp.splice(Math.floor(Math.random() * figuresTemp.length), 1)[0])
            // }
      
            // figuresRandom.push(figuresTemp[0])
            // figures = figuresRandom
          })
        }
      })

      this.setState({ figures })
      

    }, 2000)
  }

  render() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    }

    return (
      <View style={style.content} >
        <FlatList
          numColumns={6}
          contentContainerStyle={{ flex: 1, width: this.window.width }}
          data={this.state.figures}
          renderItem={({ item, index }) => {

            const translateY = {
              transform: [{ translateY: this.state.figures[index].translate }]
            }

            return (
              <View style={{ height: this.window.height, flex: 1 }}>
                <Animated.Image style={item.animated ? [translateY, { opacity: 1 }] : { opacity: 0 }} source={item.image} />
              </View>
            )
          }}
          keyExtractor={(item) => item.id.toString()}
        />

        <Animated.View
          style={[style.square, panStyle]}
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