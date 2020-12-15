import React from 'react';

import { configure, shallow } from 'enzyme'; 
/* To test the component standalone, otherwise whole application needs to be rendered. 
Shallow component here doenst not inspect nested component, only the main component */
import Adapter from 'enzyme-adapter-react-16'; 
// to configure enzyme and connect it to react applicaton

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';


configure( { adapter: new Adapter()});

describe( '<NavigationItems />', () => {
    let wrapper;
    beforeEach( () => {
        wrapper = shallow(<NavigationItems/>);
    }); // to avoid setting wrapper variable that holds shallo function

    it( 'should render two <NavigationItem /> elements if not authenticated', () => {
        //const wrapper = shallow(<NavigationItems/>);
        expect( wrapper.find(NavigationItem) ).toHaveLength(2);
    } );

    it( 'should render three <NavigationItem /> elements if authenticated', () => {
        //const wrapper = shallow(<NavigationItems isAuthenticated />);
        wrapper.setProps({isAuthenticated: true}); // setProps method from enzyme
        expect( wrapper.find(NavigationItem) ).toHaveLength(3);
    } );

    it( 'should show <Logout /> elements if authenticated', () => {
        wrapper.setProps({isAuthenticated: true});
        expect( wrapper.contains(<NavigationItem link="/logout"> Logout </NavigationItem>)).toEqual(true);
    } );
} );  

// Test result properties: Test Suites - describe function and Tests - it function