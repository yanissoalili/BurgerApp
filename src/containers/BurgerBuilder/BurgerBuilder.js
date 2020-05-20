import React, { Component } from 'react'
import Aux from '../../hoc/Auxilary'
import Burger from '../../components/Burger/Burger'
import BuilControls from '../../components/Burger/BuildControls/BuildControls'
const INGREDIENT_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon: 0.7

} 
class BurgerBuilder extends Component {

    state = {
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0,

        },
        totalPrice: 4,
        purchasable: false
    }
  updatePurchaseState(ingredients){
      const sum = Object.keys(ingredients)
      .map((igKey) =>{
        return ingredients[igKey]
      }).reduce((sum, el) =>{
          return sum + el;
      }
      ,0)
    this.setState({
        purchasable: sum > 0
    })
  }
  addIngredientHandler = (type)=>{
      const oldCount = this.state.ingredients[type]
      const updateCount = oldCount + 1
      const updateIngredient = {
        ...this.state.ingredients
    }
    updateIngredient[type] = updateCount
    const priceAddition = INGREDIENT_PRICES[type]
    const oldPrice =this.state.totalPrice
    const newPrice = oldPrice + priceAddition
    
    this.setState({
        totalPrice:newPrice,
        ingredients: updateIngredient
    })
    this.updatePurchaseState(updateIngredient)

  }
  removeIngredientHandler= (type) =>{
    const oldCount = this.state.ingredients[type]
    if(oldCount <=0){
        return;
    }
    const updateCount = oldCount - 1
     const updateIngredient = {
        ...this.state.ingredients
    }
    updateIngredient[type] = updateCount
    const priceDeduction = INGREDIENT_PRICES[type]
    const oldPrice =this.state.totalPrice
    const newPrice = oldPrice - priceDeduction
    this.setState({
        totalPrice:newPrice,
        ingredients: updateIngredient
    })
    this.updatePurchaseState(updateIngredient)
    
    


  }
  render () {
      const disabledInfo = {...this.state.ingredients}
      for (let key in disabledInfo){
          disabledInfo[key] = disabledInfo[key] <= 0
      }
    return (

      <Aux>
        <Burger ingredients ={this.state.ingredients}/>
        <BuilControls 
        ingredientAdded={this.addIngredientHandler}
        ingredientRemoved={this.removeIngredientHandler}
        disabledInfo={disabledInfo}
        price= {this.state.totalPrice}
        purchasable={this.state.purchasable}
        />
      </Aux>
    )
  }
}
export default BurgerBuilder