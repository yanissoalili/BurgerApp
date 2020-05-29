import React, { Component } from 'react'
import {connect} from 'react-redux'

import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../Axios-Order'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
class ContactData extends Component {
    state = {
      orderForm:{
          name:{
            elementType:'input', 
            elementConfig: {
              type: 'text', 
              placeholder:'your Name'
            }, 
            value:'',
            validation:{
              required:true
            },
            valid:false,
            touched:false

        },
        street:{
          elementType:'input', 
          elementConfig: {
            type: 'text', 
            placeholder:'your Street'
          }, 
          value:'',
          validation:{
            required:true
          },
          valid:false,
          touched:false

      },
      country:{
        elementType:'input', 
        elementConfig: {
          type: 'text', 
          placeholder:'Country'
        }, 
        value:'',
        validation:{
          required:true
        },
        valid:false,
        touched:false

    },
          ZipCode: {
            elementType:'input', 
            elementConfig: {
              type: 'text', 
              placeholder:'your zip Code'
            },
            value:'',
            validation:{
              required:true,
              minLength: 5,
              maxLength: 5
            },
            valid:false,
            touched:false

        },
        email:{
          elementType:'input', 
          elementConfig: {
            type: 'email', 
            placeholder:'your E-mail'
          }, 
          value:'',
          validation:{
            required:true
          },
          valid:false,
          touched:false

      },
      deliveryMethod:{
        elementType:'select', 
        elementConfig: {
         options:[
           {value:'fastest', displayValue:'Fastest'},
           {value:'cheapest', displayValue:'Cheapest'} 
        ]
        }, 
        value:'fastest',  
        valid: true,
        validation:{
          required:true
        }
        

    },
        },
        formIsValid:false,
         
        Loading: false
    }
    checkValidaty= (value, rules) =>{
       let isValid =true  
       if (rules.required) {
        isValid = value.trim() !== '' && isValid;
      }

      if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
      }

      if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
      }
       return isValid

    }

    orderHandler= (event) => {
        // prevent re load of the page
        event.preventDefault()
        this.setState({Loading:true})
        const formData = {}
          for(let formatElementIdentifier in this.state.orderForm) {
            formData[formatElementIdentifier] =
             this.state.orderForm[formatElementIdentifier].value
           }
            
      
    const order = {
      ingredients : this.props.ings,
      price: this.props.totalPrice,
      orderData: formData
    }
      axios.post('/orders.json',order)
      .then(res => {
        this.setState({Loading:false})
        this.props.history.push('/')


      })
      .catch(err => {
        this.setState({Loading:false})
      })
        }
    
  inputChangeHandler=(event, inputIdentifier) =>{  
    // clone deeeply
    const updatedOrderForm = {...this.state.orderForm}
    const updatedFormElement = {...updatedOrderForm[inputIdentifier]}
    updatedFormElement.value = event.target.value
    updatedFormElement.touched = true
    updatedFormElement.valid = this.checkValidaty(updatedFormElement.value, updatedFormElement.validation)
    updatedOrderForm[inputIdentifier]=updatedFormElement
    let formIsValid = true
    for (let inputIdentifier in updatedOrderForm){
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
    }
    console.log(formIsValid);
    this.setState({
      formIsValid:formIsValid,
      orderForm: updatedOrderForm}
    )



    


  }
  render () {
      let formElementArray= []
      for (let key in this.state.orderForm){
        formElementArray.push({
          id: key,
          config: this.state.orderForm[key]

        })
      }
      let form =(<form onSubmit={this.orderHandler}>
        {formElementArray.map(formElement => (
          <Input
          key={formElement.id }
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          invalid={!formElement.config.valid}
          shouldValidate={ formElement.config.validation }
          touched={ formElement.config.touched }
          value={formElement.config.value}
          handleChange={(event) =>this.inputChangeHandler(event, formElement.id)}
            />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>

      </form>)
      if(this.state.Loading){
          form= <Spinner />

      }
    
    
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact Data</h4>
        {form}
        
      </div>

    )
  }
}
const mapStateToProps = state => {
  return{
    ings : state.ingredients,
    totalPrice: state.totalPrice
  }
}
export default connect(mapStateToProps)(ContactData)
