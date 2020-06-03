import React, { Component } from 'react'
import { connect } from 'react-redux'

import Order from '../../components/Order/Order'
import axios from '../../Axios-Order'
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler'
import { fetchOrders } from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {
  componentWillMount () {
        this.props.onInitOrders(this.props.token)

    // axios.get('/orders.json')
    // .then(res => {
    //     const fetchedOrders = []
    //     for (let key in res.data) {
    //         fetchedOrders.push({
    //             ...res.data[key],
    //             id : key
    //         })

    //     }
    //     this.setState({
    //         loading:false,
    //         orders: fetchedOrders

    //     })
    // })
    // .catch(err => {
    //     console.error(err);
    //     this.setState({
    //         loading:false
    //     })

    // })

  }

  render () {
    const orders = this.props.loading ? <Spinner /> : this.props.orders.map(order => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={+order.price}
      />
    ))
    return (
      <div>
        {orders}
      </div>

    )
  }
}
const mapStateToProps = (state) => {
  return {
    orders: state.orders.orders,
    loading: state.orders.loading,
    token: state.auth.token

  }
}
const mapDispatchToProps = dispatch => {
  return {
    onInitOrders: (token) => { dispatch(fetchOrders(token)) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))
