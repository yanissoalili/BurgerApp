import React, { Component } from 'react'
import Aux from '../../../hoc/Auxilary'
import Button from '../../UI/Button/Button'
class OrderSummary extends Component {
  componentWillUpdate () {
    console.log('[orderSummary will update]')
  }

  render () {
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map(igKey =>
        <li key={igKey}>
          <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
        </li>)
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following  ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Price : {this.props.price.toFixed(2)} </strong></p>
        <p>Continue to CheckOut</p>
        <Button btnType='Danger' clicked={this.props.purchaseCanceled}>CANCEL</Button>
        <Button btnType='Success' clicked={this.props.purchaseContinue}>CONTINUE</Button>
      </Aux>
    )
  }
}
export default OrderSummary