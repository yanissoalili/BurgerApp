import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css'
import {auth} from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'

class Auth extends Component {
    state = {
        controls: {
            email:{
                elementType:'input', 
                elementConfig: {
                  type: 'email', 
                  placeholder:'mail adress'
                }, 
                value:'',
                validation:{
                  required:true,
                  isEmail:true
                },
                valid:false,
                touched:false
    
            },
            password:{
                elementType:'input', 
                elementConfig: {
                  type: 'password', 
                  placeholder:'password'
                }, 
                value:'',
                validation:{
                  required:true,
                  minLength:6
                },
                valid:false,
                touched:false
    
            }
        },
        isSignUp: true

    }
    
    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
  
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
  
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
  
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
  
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
  
        return isValid;
    }
    inputChangeHandler=(event, controlName) =>{  
        // clone deeeply
        const updatedControlForm = {...this.state.controls}
        const updatedControlElement = {...updatedControlForm[controlName]}
        updatedControlElement.value = event.target.value
        updatedControlElement.touched = true
        updatedControlElement.valid = this.checkValidity(updatedControlElement.value, updatedControlElement.validation)
        updatedControlForm[controlName]=updatedControlElement
        this.setState({
          controls: updatedControlForm}
        )
    
      }
  submitHandler = (event) => {
      event.preventDefault()
      this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
  }
  swithAuthModeHandler= () => {
      this.setState(prevState => {
          return {isSignUp:! prevState.isSignUp}
      })
  }
  render () {
      let authRedirect = null
      if(this.props.isAuthenticated){
          authRedirect = <Redirect to='/' />
      }
    let formElementArray= []
    for (let key in this.state.controls){
      formElementArray.push({
        id: key,
        config: this.state.controls[key]

      })
    }
    let form = formElementArray.map(formElement => (
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
      ))
      if (this.props.loading){
          form = <Spinner/>
      }
      let errorMessage = null
      if(this.props.error){
      errorMessage = <p>{this.props.error.message}</p>
      }
    return (
        <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
    <Button btnType="Danger" clicked = {this.swithAuthModeHandler}>SWITCH TO {this.state.isSignUp ? 'SIGN IN'  : 'SIGN UP' }</Button>
            </div>
    )
  }
}
const mapStateToProps = state => {
    
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(auth(email, password, isSignUp))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth)
