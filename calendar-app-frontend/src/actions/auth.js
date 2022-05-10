import { fetchNoToken } from '../helpers/fetch';
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
 * Function to fetch the register endpoint
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

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});
