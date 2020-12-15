import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import asyncComponent from './hoc/asyncComp/asyncComp'; 
/* asyncComponent for routing optimization,,loading component or code only when is is needed. Lazy loading is not alwas good 
for example for our case where moudule is very small and we cant gain anything from it, it just for learning reason*/


import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/Burgerbuilder';
/* import Checkout from './containers/Checkout/Checkout'; 
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';*/
//above components import is maintained by asyncComponent - lazily
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

const asyncCheckout = asyncComponent( () => {
  return import('./containers/Checkout/Checkout');
});
const asyncOrders = asyncComponent( () => {
  return import('./containers/Orders/Orders');
});
const asyncAuth = asyncComponent( () => {
  return import('./containers/Auth/Auth');
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  // state = {
  //   show: true
  // }
  // just to test the removing effect from other component interceptor made in withErrorHandler for Burgurbuilder
  
  /* componentDidMount() {
    setTimeout( () => {
      this.setState( {show: false})
    }, 5000);
  } */
  // just to test the removing effect from other component interceptor made in withErrorHandler for Burgurbuilder

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/"/>
      </Switch>
    );

    if ( this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/orders" component={asyncOrders} />
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/"/>
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
            {routes}
        </Layout>
      </div>
    );
  }  
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default connect( mapStateToProps, mapDispatchToProps ) (App);
// if this doesnt work, import withRouter component from react-dom and wrap the wole line with withRouter e.g., withRouter( connect( null, mapDispatchToProps ) (App) );
