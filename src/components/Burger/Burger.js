import React from 'react'
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
const Burger = (props) => {
  let transformIngredients = Object.keys(props.ingredients).map(igKey => {
    return [...Array(props.ingredients[igKey])].map((_, i) =>
      <BurgerIngredient type={igKey} key={igKey + i} />
    )
  }).reduce((arr, el) => {
    return arr.concat(el)
  }, [])
  console.log(transformIngredients)
  if(transformIngredients.length === 0){
      transformIngredients = <p> please enter Ingredients</p>
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top' />
      {transformIngredients}
      <BurgerIngredient type='bread-bottom' />

    </div>
  )
}
export default Burger
