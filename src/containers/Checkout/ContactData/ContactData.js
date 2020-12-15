import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './contactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spiner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest'},
                        { value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest', // if we dont select, behid the scene value will alsway be empty. So its important to add value = fastest or cheapest 
                valid: true, //valid is used only to avoid undefined cuz when we loop through all the property in orderForm, it goes to delivery as well and if valid property is not found, it weill through err. 
                validation: {} // same reason as valid property here in deliverymethod field
            }
        },
        formIsValid: false
    }

    orderHandler = (event) => {
        event.preventDefault(); //to prevent default which would be sending a request and reload the pg
        console.log(this.props.ingredients);

        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }

        this.props.onOrderBurger(order, this.props.token);
    }

    
    // inputChangedHandler = (event, inputIdentifier) => {
    //     //console.log(event.target.value);
    //     const updatedOrderForm = {
    //         ...this.state.orderForm //it just clone the uper level not the nested object properties
    //     };
    //     const updatedFormElement = {
    //         ...updatedOrderForm[inputIdentifier] // to get value, need to clone second level properties
    //     };
    //     updatedFormElement.value = event.target.value;
    //     updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
    //     updatedFormElement.touched=true;
    //     updatedOrderForm[inputIdentifier] = updatedFormElement;
    //     console.log(updatedFormElement);
        
    //     let formIsValid = true;
    //     for (let inputIdentity in updatedOrderForm) {
    //         formIsValid = updatedOrderForm[inputIdentity].valid && formIsValid;
    //     }
    //     //console.log(formIsValid);
    //     this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    // }
    inputChangedHandler = (event, inputIdentifier) => {      
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched: true,
        }) 
        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement
        });
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIdentity in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentity].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    } //optimized code for inputChangedHandler

    render() {
        const formElementsArray = [];
        for ( let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>

                    {formElementsArray.map(formElement => (
                        <Input 
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                    ))}

                    <Button 
                        btnType="Success" 
                        disabled={!this.state.formIsValid}
                        clicked={this.orderHandler}> ORDER </Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4> Enter your contact data here </h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));