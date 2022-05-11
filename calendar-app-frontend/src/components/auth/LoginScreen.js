import React from 'react';
import { useForm } from '../../hooks/useForm';
import './login.css';
import { useDispatch } from 'react-redux';
import { startLogin, startRegister } from '../../actions/auth';
import Swal from 'sweetalert2';

export const LoginScreen = () => {
  const dispatch = useDispatch();

  const [formLoginValues, handleLoginInputChange] = useForm({
    // lEmail: 'pedro@gmail.com',
    // lPassword: '1234567',
  });

  const { lEmail, lPassword } = formLoginValues;

  const [formRegisterValues, handleRegisterInputChange] = useForm({
    // rName: 'Maria',
    // rEmail: 'maria@gmail.com',
    // rPassword: '1234567',
    // rPasswordConfirm: '1234567',
  });

  const { rName, rEmail, rPassword, rPasswordConfirm } = formRegisterValues;

  /**
   * Function to send the login action
   * @param {Event} e
   */
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(lEmail, lPassword));
  };

  /**
   * Function to send the register action and check the password fields
   * @param {Event} e
   * @returns Swal with the error if password doesnt match
   */
  const handleRegister = (e) => {
    e.preventDefault();

    if (rPassword !== rPasswordConfirm) {
      return Swal.fire('Error', 'Passwords do not match', 'error');
    }
    dispatch(startRegister(rEmail, rPassword, rName));
  };

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="lEmail"
                value={lEmail}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="lPassword"
                value={lPassword}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="rName"
                value={rName}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="rEmail"
                value={rEmail}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="rPassword"
                value={rPassword}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="rPasswordConfirm"
                value={rPasswordConfirm}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
