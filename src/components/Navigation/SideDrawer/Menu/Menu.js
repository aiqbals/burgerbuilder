import React from 'react';
import classes from './menu.module.css';

const Menu = (props) => (
    <div className={classes.Menu} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default Menu;
