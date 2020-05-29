import React, { Component } from 'react'
import {connect} from 'react-redux'

import Aux from '../../hoc/Auxilary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../Axios-Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler'
import * as actionTypes from '../../store/action'

class BurgerBuilder extends Component {

    state={
        
        purchasing :false,
        Loading:false,
        error:false
    }
    componentDidMount(){
      

      // console.log(this.props)
      // axios.get('/ingrdients.json')
      // .then(res => {
      //   this.setState(
      //     ingredients:res.data
      //   })
      // })
      // .catch(err => {
      
      //   this.setState({
      //     error:true
      //   }) 
      // })
    }
  updatePurchaseState(ingredients){
      const sum = Object.keys(ingredients)
      .map((igKey) =>{
        return ingredients[igKey]
      }).reduce((sum, el) =>{
          return sum + el;
      }
      ,0)

      return sum > 0
  }
  // addIngredientHandler = (type)=>{
      
  //   this.props.ADD_INGREDIENT(type)
  //   updateIngredient[type] = updateCount
  //   const priceAddition = INGREDIENT_PRICES[type]
  //   const oldPrice =this.state.totalPrice
  //   const newPrice = oldPrice + priceAddition
    
  //   this.setState({
  //       totalPrice:newPrice,
  //       ingredients: updateIngredient
  //   })
  //   this.updatePurchaseState(updateIngredient)

  // }
  // removeIngredientHandler= (type) =>{
  //   const oldCount = this.state.ingredients[type]
  //   if(oldCount <=0){
  //       return;
  //   }
  //   const updateCount = oldCount - 1
  //    const updateIngredient = {
  //       ...this.state.ingredients
  //   }
  //   updateIngredient[type] = updateCount
  //   const priceDeduction = INGREDIENT_PRICES[type]
  //   const oldPrice =this.state.totalPrice
  //   const newPrice = oldPrice - priceDeduction
  //   this.setState({
  //       totalPrice:newPrice,
  //       ingredients: updateIngredient
  //   })
  //   this.updatePurchaseState(updateIngredient)
    
    


  // }
  purchaseHandler = () =>{
      this.setState({purchasing:true})
  }
  purchaseCancelHandler= () =>{
      this.setState({purchasing:false})
  }
  purchaseContinuehandler= () =>{
    this.props.history.push('/checkout')
    // without redux
    //  const queryParams=[]
    //  for(let i in this.state.ingredients){
    //    queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    //  }
    //  queryParams.push('&price=' + this.state.totalPrice )

    //  const queryString =queryParams.join('&')
    
    //  this.props.history.push({
    //    pathname:'/checkout',
    //    search: '?' + queryString
    //  })

  }
  render () {

      const disabledInfo = {...this.props.ings}
      for (let key in disabledInfo){
          disabledInfo[key] = disabledInfo[key] <= 0
      }
      let orderSummary=null
      let burger = this.state.error ? <p>Ingredients can't be loaded </p> : <Spinner/>
      if(this.props.ings){
        
      burger = (
        <Aux>
          <Burger ingredients ={this.props.ings}/> 
          <BuildControls 
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabledInfo={disabledInfo}
            price= {this.props.totalPrice}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
        />
        </Aux>)
       orderSummary = <OrderSummary ingredients = {this.props.ings} 
       purchaseCanceled={this.purchaseCancelHandler}
       purchaseContinue={this.purchaseContinuehandler}
       price={this.props.totalPrice}
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
const mapStatetoProps = state => {
  return {
    ings: state.ingredients,
    totalPrice : state.totalPrice 
  }
}
const mapDispatchToProps = dispatch =>{
  return{
    onIngredientAdded: (ingredientName) => dispatch({type:actionTypes.ADD_INGREDIENT, ingredientName:ingredientName }),
    onIngredientRemoved: (ingredientName) => dispatch ({type: actionTypes.REMOVE_INGREDIENT, ingredientName:ingredientName})
  }


}
export default connect(mapStatetoProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
