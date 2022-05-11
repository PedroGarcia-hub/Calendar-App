import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * Function to check auth in private route and redirect to login if not
 * @param {*} param0
 * @returns
 */
const PrivateRoute = ({ children }) => {
  const { uid } = useSelector((state) => state.auth);
  return !!uid ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
