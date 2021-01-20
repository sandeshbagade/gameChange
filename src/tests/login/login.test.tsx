import React from 'react';
import Login from '../../login/login';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import { initialState } from '../../reducers/auth';
import * as auth from '../../actions/auth';
import configureStore from '../mockConfigureStore';
import { Auth } from '../../model';
const MockInitialState: Auth = {
  ...initialState,
  isAuthenticated: false,
  isLoading: true,
  user: {},
  token: 'token',
};
const { store } = configureStore(MockInitialState);
describe('Login->', () => {
  it('Login snapshot test', () => {
    const link = renderer
      .create(
        <Provider store={store}>
          <Login />
        </Provider>,
      )
      .toJSON();
    expect(link).toMatchSnapshot();
  });
  it('should call userLogin action on click login button', () => {
    const actions = {
      userLogin: jest.spyOn(auth, 'userLogin'),
    };
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
        <Provider store={store}>
          <Route path="/" render={(): JSX.Element => <Login {...store} actions={actions} />} />
        </Provider>
      </MemoryRouter>,
    );
    const username = wrapper.find('[data-test-id="username"]').first().find('input');
    username.simulate('change', { target: { value: 'somevalue' } });
    const password = wrapper.find('[data-test-id="password"]').first().find('input');
    password.simulate('change', { target: { value: 'somevalue' } });
    const submitButton = wrapper.find('[data-test-id="loginButton"]').first();
    submitButton.simulate('click');
    expect(actions.userLogin).toHaveBeenCalled();
  });
});
