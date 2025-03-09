import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import SignUp from '../pages/SignUp';
import OTPVerification from '../pages/OTPVerification';
import SignIn from '../pages/SignIn';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Dashboard from '../pages/Dashboard';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import ConnectBank from '@/pages/ConnectBank';
import Transactions from '@/pages/Transactions';
import Balances from '@/pages/Balances';
import BankAccounts from '@/pages/BankAccounts';

const AppRoutes = () => (
  <Router>
    <Routes>
      {/* Wrap public authentication routes with AuthLayout */}
      <Route element={<AuthLayout />}>
        <Route
          path='/signup'
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />
        <Route
          path='/verify-otp'
          element={
            <PublicRoute>
              <OTPVerification />
            </PublicRoute>
          }
        />
        <Route
          path='/signin'
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route
          path='/dashboard'
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path='/connect-bank'
          element={
            <PrivateRoute>
              <ConnectBank />
            </PrivateRoute>
          }
        />
        <Route
          path='/bank-accounts'
          element={
            <PrivateRoute>
              <BankAccounts />
            </PrivateRoute>
          }
        />
        <Route
          path='/balances'
          element={
            <PrivateRoute>
              <Balances />
            </PrivateRoute>
          }
        />
        <Route
          path='/transactions'
          element={
            <PrivateRoute>
              <Transactions />
            </PrivateRoute>
          }
        />
      </Route>

      <Route path='*' element={<Navigate to='/signin' />} />
    </Routes>
  </Router>
);

export default AppRoutes;
