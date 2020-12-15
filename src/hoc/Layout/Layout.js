//import React from 'react';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Aux/Aux';
import classes from './layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    SideDrawerClosedHandler = () => {
        this.setState ({showSideDrawer: false})
    }

    sideDrawerToggleHandler = () => {
            //this.setState ({showSideDrawer: !this.state.showSideDrawer});
            //using this.state in setState method will lead to an unexpected outcome. Instead use the function form 
            this.setState ( (prevState) =>{
               return { showSideDrawer: !prevState.showSideDrawer };
            } );
    }


    render () {
        return (
            <Aux>
                <Toolbar isAuth={this.props.isAutheticated} drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer isAuth={this.props.isAutheticated} open={this.state.showSideDrawer} closed={this.SideDrawerClosedHandler}/>

                <main className={classes.Content}>
                    {this.props.children} 
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAutheticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);