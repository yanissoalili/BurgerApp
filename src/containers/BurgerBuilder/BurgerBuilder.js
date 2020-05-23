import React, { Component } from 'react'
import Aux from '../../hoc/Auxilary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../Axios-Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler'
const INGREDIENT_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon: 0.7

} 
class BurgerBuilder extends Component {

    state={
        ingredients:null,
        totalPrice: 4,
        purchasable: false,
        purchasing :false,
        Loading:false,
        error:false
    }
    componentDidMount(){
      axios.get('/ingrdients.json')
      .then(res => {
        console.log('hellllo')
        this.setState({
          ingredients:res.data
        })
      })
      .catch(err => {
      
        this.setState({
          error:true
        }) 
      })
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
  purchaseHandler = () =>{
      this.setState({purchasing:true})
  }
  purchaseCancelHandler= () =>{
      this.setState({purchasing:false})
  }
  purchaseContinuehandler= () =>{
    this.setState({Loading:true})
    const order = {
      ingredients : this.state.ingredients,
      price: this.state.totalPrice,
      customer:{
        name:'Yanis Alili',
        adress:{
          street: ' 13 Danielle Casanova',
          ZipCode: '92500',
          deliveryMethod:'fastest'
        }
      }
    }
      axios.post('/orders.json',order)
      .then(res => {
        this.setState({Loading:false, purchasing:false})
      })
      .catch(err => {
        this.setState({Loading:false,purchasing:false})
      })
  }
  render () {

      const disabledInfo = {...this.state.ingredients}
      for (let key in disabledInfo){
          disabledInfo[key] = disabledInfo[key] <= 0
      }
      let orderSummary=null
      let burger = this.state.error ? <p>Ingredients can't be loaded </p> : <Spinner/>
      if(this.state.ingredients){
      burger = (
        <Aux>
          <Burger ingredients ={this.state.ingredients}/>
          <BuildControls 
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabledInfo={disabledInfo}
            price= {this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
        />
        </Aux>)
       orderSummary = <OrderSummary ingredients = {this.state.ingredients} 
       purchaseCanceled={this.purchaseCancelHandler}
       purchaseContinue={this.purchaseContinuehandler}
       price={this.state.totalPrice}
     />
       if(this.state.Loading){
         orderSummary=<Spinner/>
       }  
      }
      
    return (

      <Aux>
          <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
              {orderSummary}
          </Modal>
          {burger}
        
      </Aux>
    )
  }
}
export default withErrorHandler(BurgerBuilder, axios)
