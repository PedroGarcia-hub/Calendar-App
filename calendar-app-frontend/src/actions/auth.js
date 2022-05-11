import { fetchNoToken, fetchToken } from '../helpers/fetch';
import { types } from '../types/types';
import Swal from 'sweetalert2';

/**
 * Function to fetch the login endpoint
 * @param {String} email user email
 * @param {String} password user password
 * @returns Swal error if cant login
 */
export const startLogin = (email, password) => {
  return async (dispatch) => {
    const resp = await fetchNoToken('auth', { email, password }, 'POST');
    const body = await resp.json();

    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(
        login({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      Swal.fire('Error', body.msg, 'error');
    }
  };
};

/**
 * Function to fetch the register endpoint and save the session token in local Storage
 * @param {String} email
 * @param {String} password
 * @param {String} name
 * @returns Swal error if cant register
 */
export const startRegister = (email, password, name) => {
  return async (dispatch) => {
    const resp = await fetchNoToken(
      'auth/new',
      { email, password, name },
      'POST'
    );
    const body = await resp.json();

    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(
        login({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      Swal.fire('Error', body.msg, 'error');
    }
  };
};

/**
 * Function to fetch the auth/renew endpoint and save the new session token in local Storage
 * @returns
 */
export const startChecking = () => {
  return async (dispatch) => {
    const resp = await fetchToken('auth/renew');
    const body = await resp.json();

    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(
        login({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      dispatch(checkingFinish());
    }
  };
};

const checkingFinish = () => ({
  type: types.authCheckingFinish,
});

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
  };
};

const logout = () => ({ type: types.authLogout });
