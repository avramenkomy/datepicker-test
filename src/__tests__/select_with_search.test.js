import React from 'react';
import { shallow } from 'enzyme';

import SelectWithSearch from '../components/select_with_search';

const props = {
  label: 'test label',
  options: ['test 1', 'test 2', 'test 3'],
  value: null,
  apiHandler: jest.fn(),
  onChange: jest.fn(),
}

it ('should render SelectWithSearch component', () => {
  const component = shallow(<SelectWithSearch className="select_with_search" {...props} />);
  // const wrapper = component.find('.select_with_search');
  // expect(wrapper.length).toBe(1);
  console.log(component.debug());
});

// const setUp = () => shallow(<SelectWithSearch {...props}/>);

// describe('Component tested with airbnb enzyme', () => {
//   let component;
//   let instance;
//   beforeEach(() => {
//     component = setUp();
//     instance = component.instance();
//   });

//   it('should render SelectWithSearch component', () => {
//     expect(component).toMatchSnapshot();
//   });
// });