import React from 'react';

import { configure, shallow } from 'enzyme'; 
/* To test the component standalone, otherwise whole application needs to be rendered. 
Shallow component here doenst not inspect nested component, only the main component */
import Adapter from 'enzyme-adapter-react-16'; 
// to configure enzyme and connect it to react applicaton

import { BurgerBuilder } from './Burgerbuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure( { adapter: new Adapter()});

describe('<BurgerBuilder />', () => {
    let wrapper;
    beforeEach( () => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={ () => {} } />)
    });

    it('should render <BuildControls /> when receiving ingredients', () => {
        wrapper.setProps({ings: {salat: 0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});