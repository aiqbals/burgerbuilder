import React, { Component } from 'react';

import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';
//import Orders from '../../containers/Orders/Orders';


const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        // componentDidMount () {
        //     axios.interceptors.request.use(req => {
        //         this.setState( {error: null});
        //         return req;
        //     }); // whenever i send the request, I dont have my error setup anymore
        //     axios.interceptors.response.use(res => res, error => {
        //         this.setState( {error: error});
        //     }); 
        //     /* use method takes a fn with response and error parameter, we are not
        //     interested with response, so used it as null but error we need. */
        // } this lifecycle hook method is called after the childcomponent have been rendered

        componentWillMount () {
            //this.reqInterceptor = axios.interceptors.request.use(req => { 
            // var reqInterceptor is used in componentWillUnmount
            axios.interceptors.request.use(req => {
                this.setState( { error: null } );
                return req;
            }); 
            //this.resInterceptor = axios.interceptors.response.use(res => res, error => {
            // var reqInterceptor is used in componentWillUnmount
            axios.interceptors.response.use(res => res, error => {
                this.setState( {error: error});
            });  
          } 
        /* This lifecycle hook method is called before the childcomponent have been rendered, 
        so it is used for err handling while retriving data from server. The porlem we might face
        is, whenever withErrorHandler is called to wrap other component, componentWillMount is called
        and it uses the interceptor even if when its not needed which occupy memory unnecessaritly. 
        To solve this problem, we use componentWillUnmount hook used in belwo line*/
        /* componentWillUnmount() {
            console.log('Will Unmount', this.reqInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.request.eject(this.resInterceptor);
        } */

        errorConfirmedHandler() {
            this.setState( {error: null})
        }

        render() {
            return (
                <Aux>
                    <Modal 
                        show={this.setState.error}
                        modalClosed={this.errorConfirmedHandler} >
                        { this.state.error ? this.state.error.message : null } 
                    </Modal>
                    
                    {/* <Orders show={this.state.error} >
                        {this.state.error ? this.state.error.message : null}
                    </Orders> */}

                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;