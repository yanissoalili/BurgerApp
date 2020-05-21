import React from 'react'
import classes from './SideDrawer.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../Backdrop/Backdrop'
import Aux from '../../../../hoc/Auxilary'
const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close].join(' ')
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open].join(' ')
  }
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses}>
        <div className={classes.Logo}>
          <Logo />
        </div>

        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>

  )
}
export default sideDrawer
