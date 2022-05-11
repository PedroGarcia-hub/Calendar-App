import React, { useEffect } from 'react';
import { LoginScreen } from '../components/auth/LoginScreen';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { useDispatch } from 'react-redux';
import { startChecking } from '../actions/auth';

export const AppRouter = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route exact path="/login" element={<LoginScreen />} />
            <Route exact path="/" element={<CalendarScreen />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};
