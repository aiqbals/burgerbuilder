import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './logo.module.css'

const logo = (props) =>  (
        // <div className={classes.Logo} style={{height: props.height}}>
        <div className={classes.Logo} >
            
                <img src={burgerLogo} alt="MyBurger" className={classes.img} />

            {/* <img src='../../assets/images/burger-logo.png' /> */}
            {/* this will not work as expected since webpace ultmitely takes all the file from src folder and manages diff way */}
        </div>
);


export default logo;
