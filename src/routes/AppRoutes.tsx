import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import SignUpPage from '../pages/SignUpPage';
import OTPVerificationPage from '../pages/OTPVerificationPage';
import SignInPage from '../pages/SignInPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import DashboardPage from '../pages/DashboardPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import AuthLayout from '../layouts/AuthLayout';

const AppRoutes = () => (
  <Router>
    <Routes>
      {/* Wrap public authentication routes with AuthLayout */}
      <Route element={<AuthLayout />}>
        <Route
          path='/signup'
          element={
            <PublicRoute>
              <SignUpPage />
            </PublicRoute>
          }
        />
        <Route
          path='/verify-otp'
          element={
            <PublicRoute>
              <OTPVerificationPage />
            </PublicRoute>
          }
        />
        <Route
          path='/signin'
          element={
            <PublicRoute>
              <SignInPage />
            </PublicRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <PublicRoute>
              <ForgotPasswordPage />
            </PublicRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <PublicRoute>
              <ResetPasswordPage />
            </PublicRoute>
          }
        />
      </Route>

      <Route
        path='/dashboard'
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />
      <Route path='*' element={<Navigate to='/signin' />} />
    </Routes>
  </Router>
);

export default AppRoutes;
