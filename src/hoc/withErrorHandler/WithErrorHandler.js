import React, { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Auxilary'
const withErrorHandler = (WrappedComponenet, axios) => {
  return class extends Component {
      state = {
          error: null
      }
    componentWillMount () {
      this.reqInterceptor= axios.interceptors.request.use(config => {
      this.setState({
          error:null
      })
      return config;
      },error => {
      // Do something with request error
      return Promise.reject(error);
      });
      this.resInterceptor=axios.interceptors.response.use(response => {
      // Do something before response is sent
      return response;
      },error => {
      // Do something with response error
      this.setState({
        error:error
    })
      return Promise.reject(error);
      });
    }
    componentWillUnmount(){
        
        axios.interceptors.request.eject(this.reqInterceptor)
        axios.interceptors.response.eject(this.resInterceptor)

    }
    errorConfirmHandler= () =>{
        this.setState({
            error: null
        })
    }
    render () {
      return (
        <Aux>
          <Modal 
          show={this.state.error}
          modalClosed={this.errorConfirmHandler}
          >
                 <p style={{textAlign:'center'}}>   {this.state.error? this.state.error.message : null}</p>
          </Modal>
          <WrappedComponenet {...this.props} />
        </Aux>

      )
    }
  }
}
export default withErrorHandler
