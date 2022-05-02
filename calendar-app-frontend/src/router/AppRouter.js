import React from 'react';
import { LoginScreen } from '../components/auth/LoginScreen';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { CalendarScreen } from '../components/calendar/CalendarScreen';

export const AppRouter = () => {
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
