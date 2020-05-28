import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.module.css'

const checkoutSummary = (props) => {
    console.log('checkoutSummary ' + props.ingredients);
    

  return (
    <div className={classes.CheckoutSummary}>
      <h1>we hope it tastes  well!</h1>
      <div
        style={{
          width: '100%',
          height: '300px',
          margin: 'auto'

        }}
      >
        <Burger ingredients={props.ingredients} />
      </div>
      <div style={{ width: '100%', marginTop:'100px ' }} />
      <Button btnType='Danger' clicked={props.checkoutCancelled}>CANCEL</Button>
      <Button btnType='Success' clicked={props.checkoutContinue}>CONTINUE</Button>

    </div>

  )
}
export default checkoutSummary
