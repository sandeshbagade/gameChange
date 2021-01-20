import { AuthActions } from '../model';
import axios from 'axios';
import { history } from '../configureStore';
const arrayOfBlob = new Array<Blob>();
const file = new File(arrayOfBlob, 'Mock.png', { type: 'image/png' });
export const showAlert = (message: string) => (dispatch: any): void => {
  dispatch({
    type: AuthActions.ALERT,
    payload: { message, status: true },
  });
  setTimeout(() => {
    dispatch({
      type: AuthActions.HIDE_ALERT,
    });
  }, 1500);
};
export const userLogin = (username: string, password: string) => (dispatch: any): Promise<void> => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ username, password });
  return axios
    .post(`${process.env.REACT_APP_URL}/v1/authentications/login`, body, config)
    .then((res) => {
      dispatch({
        type: AuthActions.LOGIN_SUCCESS,
        payload: res.data,
      });
      history.push('/dashboard/preview');
    })
    .catch((e) => {
      dispatch(showAlert('Login Failed'));
      dispatch({
        type: AuthActions.LOGIN_FAIL,
      });
    });
};

export const userLogout = () => async (dispatch: any): Promise<void> => {
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .post(`${process.env.REACT_APP_URL}/v1/authentications/logout`, JSON.stringify({}), config)
    .then((res) => {
      dispatch({
        type: AuthActions.LOGOUT_SUCCESS,
      });
      history.push('/');
    })
    .catch((e) => {
      history.push('/');
    });
};
