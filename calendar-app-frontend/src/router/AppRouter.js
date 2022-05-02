import React from 'react';
import { LoginScreen } from '../components/auth/LoginScreen';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CalendarScreen } from '../components/calendar/CalendarScreen';

export const AppRouter = () => {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route exact path="/login" element={<LoginScreen />} />
            <Route exact path="/" element={<CalendarScreen />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};
