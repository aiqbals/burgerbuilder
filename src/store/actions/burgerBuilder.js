import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';


export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
};

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-my-burger-b7e9a.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch( setIngredients(response.data) ); // it updates the state once the dataloding is finished, means initially ingredients has no data. 
            }).catch(error => { 
                dispatch(fetchIngredientsFailed());
            });
    };
};