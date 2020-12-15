import React from 'react';

import classes from './buildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'}
];


const BuildControls = (props) => (
    <div className={classes.BuildControls}> 
        <p>Current Price: <strong> {props.price.toFixed(2)} </strong></p>

        {controls.map(cntrl => (
            <BuildControl 
                key={cntrl.label} 
                label={cntrl.label}
                added={() => props.ingredAdd(cntrl.type)}
                removed={ () => props.ingredRemove(cntrl.type)}
                disable={props.disabled[cntrl.type]} />
        ))}
        {/* {<BuildControl label="Salad"/>}
        {<BuildControl label="Meat"/>}
        {<BuildControl label="Cheese"/>}
        {<BuildControl label="Bacon"/>} */}

        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered} > { props.isAuth ? 'ORDER NOW' : 'SIGNUP TO ORDER'} </button>
    </div>
);

export default BuildControls;
