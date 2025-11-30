import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react'
import { authService } from '../services/endpoints'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!email.includes('@')) {
      setError('Please enter a valid email')
      return
    }

    setLoading(true)
    try {
      await authService.forgotPassword(email)
      setSuccess(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset email. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-accent-dark via-gray-900 to-accent-dark flex items-center justify-center px-4">
        <div className="w-full max-w-md card text-center">
          <CheckCircle size={48} className="mx-auto mb-4 text-primary-500" />
          <h2 className="text-2xl font-bold text-primary-500 mb-2">Check Your Email</h2>
          <p className="text-gray-400 mb-6">We've sent password reset instructions to {email}</p>
          <button 
            onClick={() => navigate('/login')} 
            className="btn-primary w-full"
          >
            Back to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-dark via-gray-900 to-accent-dark flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <button 
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 text-gray-400 hover:text-primary-500 mb-6"
        >
          <ArrowLeft size={20} />
          Back to Login
        </button>

        <div className="card">
          <h1 className="text-3xl font-bold text-primary-500 mb-2">Reset Password</h1>
          <p className="text-gray-400 mb-6">Enter your email to receive reset instructions</p>

          {error && (
            <div className="mb-4 p-4 bg-red-900/50 border border-red-700 rounded-lg flex items-center gap-2 text-red-300">
              <AlertCircle size={20} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-500" size={20} />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError('')
                  }}
                  className="input-field pl-10"
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full mt-6">
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
