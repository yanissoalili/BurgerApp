import React, { Component } from 'react'
import {connect} from 'react-redux'


import Aux from '../Auxilary'
import Styles from './Layout.module.css'
import Toolbar from '../../components/UI/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/UI/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
  state={
    showSideDrawer: false
  }
  handleSideDrawerClosed = () =>{
    this.setState({showSideDrawer:false})
  }
  handleDrawerToggle = () =>{
    this.setState(
      (prevState)=>{ return {showSideDrawer:!prevState.showSideDrawer}})
  }
  render () {
    return (
      <Aux>
        <Toolbar
        isAuth = {this.props.isAuthenticated}
        clicked={this.handleDrawerToggle} />

        <SideDrawer
        isAuth = {this.props.isAuthenticated}
        open={this.state.showSideDrawer}
        closed={this.handleSideDrawerClosed}/>
        <main className={Styles.content}>
          {this.props.children}
        </main>
      </Aux>)
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated : state.auth.token !== null
  }
}
export default connect(mapStateToProps)(Layout)

