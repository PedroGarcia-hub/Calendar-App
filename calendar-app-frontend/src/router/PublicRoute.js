import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

/**
 * Function to check auth in public route and redirecto to /
 * @param {*} param0
 * @returns
 */
const PublicRoute = ({ children }) => {
  const { uid } = useSelector((state) => state.auth);

  return !!uid ? <Navigate to="/" /> : children;
};

export default PublicRoute;
