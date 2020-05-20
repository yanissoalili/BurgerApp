import React from 'react'
import Aux from '../../hoc/Auxilary'
import Styles from './Layout.module.css'
const layout = props => (
  <Aux>
    <div> Toolbar - sidebar - Backdrop</div>
    <main className={Styles.content}>
      {props.children}
    </main>
  </Aux>

)
export default layout
