import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

class Logout extends Component {
    componentDidMount() {
        //this.props.onLogout(this.props.history.push("/")); // one way of redirecting - not elegant way Instead use Redirect component
        this.props.onLogout();
    }

    render () {
        return <Redirect to="/"/>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    };
};

export default connect(null, mapDispatchToProps)(Logout);