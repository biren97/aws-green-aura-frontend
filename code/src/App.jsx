import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import ProtectedRoute from './components/ProtectedRoute'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './pages/Dashboard'
import Strategies from './pages/Strategies'
import Recommendations from './pages/Recommendations'

// Tools Pages
import EMICalculator from './pages/Tools/EMICalculator'
import SIPCalculator from './pages/Tools/SIPCalculator'
import StockAverageCalculator from './pages/Tools/StockAverageCalculator'
import TimezoneConverter from './pages/Tools/TimezoneConverter'
import { useAuth } from "react-oidc-context";

const LOGOUT_URL = import.meta.env.VITE_LOGOUT_REDIRECT_URL;
const CLIENT_ID = import.meta.env.VITE_USERPOOL_CLIENT_ID;
function App() {
   const auth = useAuth();
   const signOutRedirect = () => {
    const clientId = `${CLIENT_ID}`;
    const logoutUri = `${LOGOUT_URL}/logout`;
    const cognitoDomain = "https://mobileauth-demo-12345.auth.ap-south-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }
  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={auth.isAuthenticated}>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/strategies"
          element={
            <ProtectedRoute isAuthenticated={auth.isAuthenticated}>
              <AppLayout>
                <Strategies />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/recommendations"
          element={
            <ProtectedRoute isAuthenticated={auth.isAuthenticated}>
              <AppLayout>
                <Recommendations />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* Tools (Public) */}
        <Route path="/tools/emi" element={<AppLayout><EMICalculator /></AppLayout>} />
        <Route path="/tools/sip" element={<AppLayout><SIPCalculator /></AppLayout>} />
        <Route path="/tools/stock-average" element={<AppLayout><StockAverageCalculator /></AppLayout>} />
        <Route path="/tools/timezone" element={<AppLayout><TimezoneConverter /></AppLayout>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Auth buttons visible always */}
      <div style={{ padding: "20px" }}>
        {!auth.isAuthenticated && (
          <button onClick={() => auth.signinRedirect()}>
            Sign In2s
          </button>
        )}

        {auth.isAuthenticated && (
          <>
            <button onClick={() => auth.signoutRedirect()}>
              OIDC Logout
            </button>

            <button onClick={signOutRedirect} style={{ marginLeft: "10px" }}>
              Cognito Hosted Logout
            </button>
          </>
        )}
      </div>
    </Router>
  );
}

export default App
