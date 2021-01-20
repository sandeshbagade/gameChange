import React from 'react';
import { mount } from 'enzyme';
import Dashboard from '../../dashboard/dashboard';
import { Provider } from 'react-redux';
import configureStore from '../../configureStore';
import { MemoryRouter, Route } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import { history } from '../../configureStore';
const { store } = configureStore();
describe('Dashboard->', () => {
  it('Dashboard snapshot test', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
        <Provider store={store}>
          <Route path="/" render={(): JSX.Element => <Dashboard />} />
        </Provider>
      </MemoryRouter>,
    );
    expect(toJson(wrapper.find(Dashboard))).toMatchSnapshot();
  });
  it('Dashboard routes test', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
        <Provider store={store}>
          <Route path="/" render={(): JSX.Element => <Dashboard />} />
        </Provider>
      </MemoryRouter>,
    );
    const dicomPreview = wrapper.find('[data-test-id="preview"]').first();
    dicomPreview.simulate('click');
    expect(history.location.pathname).toEqual('/dashboard/preview');
  });
});
