import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';
//import classes from '../../UI/Button/button.module.css';

class OrderSummary extends Component { 
    render () {
        const ingredSummaray = Object.keys(this.props.ingredients).map(ingredKey => {
            return (
                <li key={ingredKey}>
                    <span style={{textTransform: 'capitalize'}}> {ingredKey}: </span> {this.props.ingredients[ingredKey]} 
                </li> );
        })

        return (
            <Aux>
                <h3> Your Order </h3>
                <p> A delicious burger with the follwing ingredients:</p>
                <ul>
                    {ingredSummaray}
                </ul>
                <p><strong> Total Price: {this.props.price.toFixed(2)} </strong></p>
                
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchageCancelled}> CENCEL </Button>
                <Button btnType="Success" clicked={this.props.purchageContinued}> CONTINUE </Button>
            </Aux>
        )
    }
}

export default OrderSummary;

