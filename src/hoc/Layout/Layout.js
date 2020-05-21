import React, { Component } from 'react'
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
        <Toolbar clicked={this.handleDrawerToggle} />

        <SideDrawer 
        open={this.state.showSideDrawer}
        closed={this.handleSideDrawerClosed}/>
        <main className={Styles.content}>
          {this.props.children}
        </main>
      </Aux>)
  }
}
export default Layout
