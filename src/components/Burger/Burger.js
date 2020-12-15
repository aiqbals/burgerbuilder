import React from 'react';

import classes from './burger.module.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';


const burger = (props) => {
    let transformedingredients = Object.keys(props.ingredients).map(ingrdKey => {
        //converting ingredients object to an array to apply map method. //key method here extract the key of a given object (e.g.,ingredients) and truns that into an array.
        return [...Array(props.ingredients[ingrdKey])].map(( _, index ) => {
            //this returns turn all ingredients array element e.g., meat(string) to array again e.g., when ingrdKey = meat -> meat[2];
            return <BurgerIngredients key={ingrdKey + index} type={ingrdKey} />;
        });
    } ).reduce((arr, el) => {
        return arr.concat(el)
    }, []); 
    //console.log(transformedingredients);
    if (transformedingredients.length === 0) {
        transformedingredients = <p> No ingredients selected, please add ingredients</p>;
    }
    
    
    return (
            <div className={classes.Burger}>
                <BurgerIngredients type="bread-top" />
                {transformedingredients}
                <BurgerIngredients type="bread-bottom" />
            </div>
    );
};

export default burger;
 
