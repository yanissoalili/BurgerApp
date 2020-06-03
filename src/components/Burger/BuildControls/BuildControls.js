import React from 'react'
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'
const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Meat', type: 'meat' },
  { label: 'Cheese', type: 'cheese' }
]
const buildControls = (props) => (
  <div className={classes.buildControls}>
    <p><strong> current price : {props.price.toFixed(2)}</strong></p>
    {controls.map(ctrl => (
      <BuildControl
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabledInfo[ctrl.type]}
        key={ctrl.label} label={ctrl.label}
      />
    ))}
    <button
            className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}
    ><strong>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</strong>
    </button>
  </div>
)
export default buildControls
