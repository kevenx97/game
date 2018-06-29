import React from 'react'

import {
  View,
  StyleSheet,
  PanResponder,
  Animated,
  FlatList,
  Image,
  Text,
  Dimensions,
  ImageBackground
} from 'react-native'

import GameOver from './gameOver'

export default class Stage extends React.Component {
  window = Dimensions.get('window')

  constructor() {
    super();
    this.left = (this.window.width / 2) - 40
    this.style = { left: this.left }
    this.state = {
      lose: false,
      score: 0,
      figures: [
        { id: 1, nome: 'java', image: require('../assets/java.png'), animated: false, translate: new Animated.Value(-80), x: 0, y: 0 },
        { id: 2, nome: 'react', image: require('../assets/react.png'), animated: false, translate: new Animated.Value(-80), x: 0, y: 0 },
        { id: 3, nome: 'angular', image: require('../assets/angular.png'), animated: false, translate: new Animated.Value(-80), x: 0, y: 0 },
        { id: 4, nome: 'python', image: require('../assets/python.png'), animated: false, translate: new Animated.Value(-80), x: 0, y: 0 },
        { id: 5, nome: 'xamarin', image: require('../assets/xamarin.png'), animated: false, translate: new Animated.Value(-80), x: 0, y: 0 },
        { id: 6, nome: 'ionic', image: require('../assets/ionic.png'), animated: false, translate: new Animated.Value(-80), x: 0, y: 0 }
      ]
    };

    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponder: (e, gestureState) => true,
      onPanResponderRelease: (e, gestureState) => this.left += gestureState.dx,
      onPanResponderMove: (e, gestureState) => {
        this.style.left = this.left + gestureState.dx
        this.updateNativeProps()
      }
    });
  }

  updateNativeProps() {
    this.view && this.view.setNativeProps(this.style)
  }

  figuresAnimation() {
    let figures = this.state.figures
    let figuresTemp = [...figures]

    const figureAnimated = figures[Math.floor(Math.random() * figures.length)]

    figureAnimated.translate.addListener(({ value }) => {
      const valueInt = Math.round(value)

      const figureX = figureAnimated.x
      const panValue = Math.round(this.style.left)
      const endPoint = this.window.height - 111

      if (valueInt < endPoint && valueInt > (endPoint - 10) && panValue > (figureX - 16) && panValue < (figureX + 16)) {
        if (figureAnimated.nome === 'react') {
          this.setState({ score: this.state.score + 1 })
          figureAnimated.translate.removeAllListeners()
        }
        else {
          this.setState({ lose: true })
        }
      } else if (figureAnimated.nome === 'react' && valueInt === this.window.height) {
        this.setState({ lose: true })
      }
    })

    figures.map((item, index) => {
      if (figureAnimated.animated == true && item.animated == true) {
        return false
      }

      if (item.id === figureAnimated.id) {
        figures[index].animated = true

        Animated.timing(figures[index].translate, {
          toValue: this.window.height,
          duration: 2500,
          useNativeDriver: true
        })
          .start(() => {
            figures[index].animated = false
            figures[index].translate.setValue(-80)
            figures[index].translate.removeAllListeners()

            let newIndex = Math.floor(Math.random() * (+2) - (-index) + 1)

            figures = this.changeIndexPosition(figuresTemp, index, figures[newIndex])

            this.setState({ figures })

            if (!this.state.lose) {
              this.figuresAnimation()
            }
          })
      }
    })
    this.setState({ figures })
  }

  changeIndexPosition(items, oldIndex, newIndex) {
    items.splice(newIndex, 0, items.splice(oldIndex, 1)[0]);
    return items;
  };

  renderFigures = (item, index) => {
    const translateY = {
      transform: [{ translateY: this.state.figures[index].translate }]
    }

    return (
      <View
        style={{ height: this.window.height, flex: 1 }}
        onLayout={({ nativeEvent }) => {
          const figures = [...this.state.figures]
          figures[index].x = nativeEvent.layout.x
          this.setState({ figures })
        }}
      >
        <Animated.View
          ref={ref => this.image = ref}
          style={item.animated ? [translateY, style.figure, { opacity: 1 }] : [style.figure, { opacity: 0 }]}
        >
          <Image
            resizeMode="cover"
            source={item.image}
          />
        </Animated.View>
      </View>
    )
  }

  renderStage = () => (
    <ImageBackground
      resizeMode="cover"
      source={require('../assets/bg-stage.jpg')}
      style={style.content}
    >
      <View style={style.score}>
        <Text style={style.textScore}>Pontos: {this.state.score}</Text>
      </View>

      <FlatList
        numColumns={6}
        contentContainerStyle={{ flex: 1, width: this.window.width }}
        data={this.state.figures}
        renderItem={({ item, index }) => this.renderFigures(item, index)}
        keyExtractor={(item) => item.id.toString()}
      />
      <Image
        source={require('../assets/xicara.png')}
        ref={ref => this.view = ref}
        {...this.panResponder.panHandlers}
        style={[style.xicara]}
      />
    </ImageBackground>
  )

  renderGameOver = () => (
    <View style={style.content}>
      <GameOver 
        buttonBack={() => {
          this.setState({ lose: false, score: 0 })
          this.figuresAnimation()
        }}
        score={this.state.score}
      />
    </View>
  )

  componentDidMount() {
    this.figuresAnimation()
  }

  render() {
    return !this.state.lose ? this.renderStage() : this.renderGameOver()
  }
}

const style = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#666666'
  },
  xicara: {
    width: 80,
    height: 75,
    position: 'absolute',
    bottom: 0
  },
  score: {
    width: '100%',
    height: 35,
    position: 'absolute',
    backgroundColor: '#05a5d1',
    justifyContent: 'center',
    padding: 10,
    bottom: 0
  },
  textScore: {
    fontSize: 18,
    color: '#fafafa',
    fontWeight: 'bold'
  },
  figure: {
    width: 55,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    backgroundColor: '#fff',
    borderRadius: 100
  }
})