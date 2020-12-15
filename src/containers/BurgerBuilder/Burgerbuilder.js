import React, { Component } from 'react';
import { connect } from 'react-redux';
//connect component to rcv the data or updated state from reducer. This burgerbuild comp. is already connected by Provider component in index.js file

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spiner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'; 
//starting with lower case cuz it is not being used in jsx
import * as actions from '../../store/actions/index';


export class BurgerBuilder extends Component { //export is added only for testing reason to avoid the conn from redux even if default export is there
    state = {
        purchaging: false,
    }

    componentDidMount() {
        //console.log(this.props); //to check all the props provided by this function in the console
        this.props.onInitIngredients();
    } //used for fethcing data from server

    updatePurchageState (ingredients) {
        //const ingred = { ...this.state.ingredients}; 
        //this doesnt work since this is old state it might holds. setState works when add or remove function is executed and they only get the updated state
        const sum = Object.keys(ingredients).map(ingrdKey => {
                        return ingredients[ingrdKey];
                    }).reduce( (res, el) => {
                        return res + el;
                    }, 0);
        
        return sum > 0;
    } 

    purchageHandler = () =>{
        if (this.props.isAutheticated) {
            this.setState({ purchaging: true } );
        } else {
            this.props.history.push('/auth');
            this.props.onSetAuthRedirectPath('/checkout');
        }       
    }

    purchageCancelHandler = () => {
        this.setState({purchaging: false});
    }

    purchageContinuedHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        const disableInfo = { ...this.props.ings};
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0 // return true or false, checks the value of each item e.g., salad, meat
        }
        // to desable to button when no item in the burger added

        /* let orderSummary = <OrderSummary 
            ingredients={this.state.ingredients}
            purchageContinued={this.purchageContinuedHandler}
            purchageCancelled={this.purchageCancelHandler}
            price={this.state.totalPrice} /> */
        /* if (this.state.loading) {
            orderSummary = <Spinner />;
        } */
        let orderSummary = null;  
        let burger = this.props.error ? <p style={{textAlign: 'center'}}> Ingredients can't be loaded </p> : <Spinner />;
        if (this.props.ings) {
        //Reason of this check: it updates the state once the dataloding is finished, means initially ingredients has no data.
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
    
                    <BuildControls 
                            ingredAdd={this.props.onIngredientAdded}
                            ingredRemove={this.props.onIngredientRemoved} 
                            disabled={disableInfo}
                            purchasable={this.updatePurchageState(this.props.ings)}
                            price={this.props.price}
                            isAuth={this.props.isAutheticated}
                            ordered={this.purchageHandler} />
                </Aux>
            );
            orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                purchageContinued={this.purchageContinuedHandler}
                purchageCancelled={this.purchageCancelHandler}
                price={this.props.price} />;
        }

        return (
            <Aux>

                <Modal show={this.state.purchaging} modalClosed={this.purchageCancelHandler} >
                    {/* <OrderSummary 
                        ingredients={this.state.ingredients}
                        purchageContinued={this.purchageContinuedHandler}
                        purchageCancelled={this.purchageCancelHandler}
                        price={this.state.totalPrice} /> */}
                        {orderSummary}
                </Modal> 
                
                {burger}

            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAutheticated: state.auth.token !== null
    };
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }; // passing the payload e.g., ingredientName created in reducer
}

//export default BurgerBuilder;
export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios)); // passing entire withErrHandler as an argument to the funtion this conncet function call returns us. withErrHandle still rcv all the props as its a hoc
//wrap with errorHandling componenent
