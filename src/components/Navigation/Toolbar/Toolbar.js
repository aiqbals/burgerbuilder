import React from 'react';

import classes from './toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Menu from '../../Navigation/SideDrawer/Menu/Menu';
import DrawerToggle from '../../Navigation/SideDrawer/SideDrawer';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <Menu clicked={props.drawerToggleClicked}/>
        <DrawerToggle clicked={props.drawerToggleClicked}/>

        {/* <Logo height="80%"/> */}
        <div className={classes.Logo}>
            <Logo />
        </div>

        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
    </header>
);

export default toolbar;