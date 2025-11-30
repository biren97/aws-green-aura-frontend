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

function App() {
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
            <ProtectedRoute>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/strategies"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Strategies />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/recommendations"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Recommendations />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* Tools Routes - Public */}
        <Route
          path="/tools/emi"
          element={
            <AppLayout>
              <EMICalculator />
            </AppLayout>
          }
        />
        <Route
          path="/tools/sip"
          element={
            <AppLayout>
              <SIPCalculator />
            </AppLayout>
          }
        />
        <Route
          path="/tools/stock-average"
          element={
            <AppLayout>
              <StockAverageCalculator />
            </AppLayout>
          }
        />
        <Route
          path="/tools/timezone"
          element={
            <AppLayout>
              <TimezoneConverter />
            </AppLayout>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
