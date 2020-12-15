import React, { Component } from 'react';
//import React, { PureComponent } from 'react';

import classes from './modal.module.css';
import Aux from '../../../hoc/Aux/Aux';
import BackDrop from '../BackDrop/BackDrop'

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
         return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }// optimizaton - model component only renders when nxt props are not equel to current props
    componentDidUpdate(){
        //console.log('[Modal] willUpdate');
    }
    // now we dont unnecessesarily(e.g., updating ingredients by clicking) render modal and ordersum component
    // However, it doesnt work for modalClose click listener, we we have to check add the condition for that.
    // we can do it by simply using pure component but we re not doing here becasue it would run more check than 
    // we need. 

    render() {
        const {show, modalClosed} = this.props;//destructuring 

        return(
            <Aux>
                <BackDrop show={show} clicked={modalClosed}/>

                <div 
                    className={classes.Modal} 
                    style={{ 
                            transform: show ? 'translateY(0)' : 'translateY(-100vh)', 
                            opacity: show ? '1' : '0'
                    }} > { this.props.children } </div>
            </Aux>
        );
    }
}

export default Modal;