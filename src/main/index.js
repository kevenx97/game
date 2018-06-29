import React from 'react'

import Menu from '../pages/menu'
import Stage from '../pages/stage'

import { connect } from 'react-redux'

class Main extends React.Component {  
  render() {
    return this.props.auth ? <Stage /> : <Menu />
  }
}

const mapStateToProps = (state) => ({
  auth: state.stageReducer.auth
})

export default connect(mapStateToProps)(Main)