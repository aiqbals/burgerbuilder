import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spiner';

class Orders extends Component {
    /* state = {
        orders: [],
        loading: true,
        error: null //local err hndle
    } */ // we dont need that since we are managing through redux

    componentDidMount() {
        /* axios.get('/orders.json').then(res => {
            //console.log(res.data) // it gets the data as js object format not the array, so need to convert to array
            const fetchedOrders = [];
            for(let key in res.data) {
                fetchedOrders.push({...res.data[key], id: key});
            }//here data will store the fetched data and will be push to fetchedOrder arry for a given key
            this.setState({ loading: false, orders: fetchedOrders, error: null });
        })
        .catch(err => { //local err hndle
            this.setState({ loading: false, error: err})
            //console.log(this.state.error ? this.state.error.message : null);
        }); */
        this.props.onFetchOrders(this.props.token, this.props.userId);
    } // its moved to order file in actions folder due to manage through redux


    render() {
        let orders = <Spinner/>;
        if ( !this.props.loading ) {
            orders = this.props.orders.map( order => (
                <Order 
                    key={ order.id }
                    ingredients={ order.ingredients }
                    price={ order.price } />
            ) )
        }

        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => { 
    return {
        orders: state.order.orders, //with 'state.order', it reached to order reducer and with 'orders', we reach out to the state orders:[] of that reducer
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)) //from order actions file
    };
};

//export default Orders;
export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(Orders, axios)); 
// null instead of mapStateToProps if there's no mapToStateProps cuz connect accept two parameter and the first argument is a must