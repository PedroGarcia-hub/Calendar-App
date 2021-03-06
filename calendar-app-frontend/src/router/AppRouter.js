import React, { useEffect } from 'react';
import { LoginScreen } from '../components/auth/LoginScreen';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { useDispatch, useSelector } from 'react-redux';
import { startChecking } from '../actions/auth';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) {
    return;
  }

  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginScreen />
                </PublicRoute>
              }
            />
            <Route
              path="/*"
              element={
                <PrivateRoute>
                  <CalendarScreen />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};
