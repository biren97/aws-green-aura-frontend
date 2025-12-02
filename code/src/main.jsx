import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthProvider } from "react-oidc-context";
import './index.css'

const CLIENT_ID = import.meta.env.VITE_USERPOOL_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_CALLBACK_URL;
const TOKEN_SIGN_IN_URI = import.meta.env.VITE_TOKEN_SIGN_IN_URL;

const cognitoAuthConfig = {
  authority: TOKEN_SIGN_IN_URI,
  client_id: CLIENT_ID,
  redirect_uri: `${REDIRECT_URI}/callback`,
  response_type: "code",
  scope: "aws.cognito.signin.user.admin email openid phone profile",
};


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
    <App />
     </AuthProvider>
  </React.StrictMode>,
)
