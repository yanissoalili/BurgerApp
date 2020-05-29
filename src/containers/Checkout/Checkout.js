import React, { Component }  from 'react'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component{

    componentWillMount(){
        //get params from Search  query without Redux
        // const query = new URLSearchParams(this.props.location.search)
        // const ingredients = {}
        // let price =0
        
        // for (let param of query.entries()){
        //     console.log(param)
            
            
        //     // ['Salad', '1']
        //     if(param[0] === 'price'){
        //         price= param[1]
                
                 
        //     }else{

        //         ingredients[param[0]] = +param[1]
                

        //     }
            
            
        // }
        // this.setState({
        //     ingredients:ingredients,
        //     totalPrice:price
        // })
    }

    checkoutCancelledHandler =() =>{
        
        this.props.history.goBack()
    }
    checkoutContinueHandler = () =>{
        this.props.history.replace('/checkout/contact-data')
    }
   
 
    render(){
        return (
            <div>
                <CheckoutSummary 
                    ingredients ={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinue={this.checkoutContinueHandler}
                 />
                 <Route path={this.props.match.path+'/contact-data'} exact component={ContactData}
                     // without Redux  <ContactData ingredients = {this.props.ings} price={this.props.totalPrice} {...props}
                        
                     
                     />
                 )} />
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }

}

export default connect(mapStateToProps)(Checkout)