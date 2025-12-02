import {
  SignUpCommand,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { cognitoClient } from "./cognitoClient";

const your_userpool_client_id = import.meta.env.VITE_USERPOOL_CLIENT_ID;

const CLIENT_ID = your_userpool_client_id; // from CDK output

export const registerUser = async (data) => {
  const cmd = new SignUpCommand({
    ClientId: CLIENT_ID,
    Username: data.mobile,          // PHONE used for login
    Password: data.password,
    UserAttributes: [
      { Name: "phone_number", Value: `+91${data.mobile}` },
      { Name: "email", Value: data.email },
      { Name: "name", Value: data.first_name },
    ],
  });
  return cognitoClient.send(cmd);
};

export const verifyOtp = async (mobile, otp) => {
  const cmd = new ConfirmSignUpCommand({
    ClientId: CLIENT_ID,
    Username: mobile,
    ConfirmationCode: otp,
  });

  return cognitoClient.send(cmd);
};

export const login = async (mobile, password) => {
  const cmd = new InitiateAuthCommand({
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: CLIENT_ID,
    AuthParameters: {
      USERNAME: mobile,
      PASSWORD: password,
    },
  });

  return cognitoClient.send(cmd);
};


// ✅ Step 5 — Login using Phone Number

// Since your CDK config uses SRP and USER_PASSWORD:

// export const login = async (mobile, password) => {
//   const cmd = new InitiateAuthCommand({
//     AuthFlow: "USER_PASSWORD_AUTH",
//     ClientId: CLIENT_ID,
//     AuthParameters: {
//       USERNAME: mobile,
//       PASSWORD: password,
//     },
//   });

//   return cognitoClient.send(cmd);
// };

// 🔐 Login Response Contains Tokens:

// Cognito returns:

// {
//   "AuthenticationResult": {
//     "AccessToken": "....",
//     "IdToken": "....",
//     "RefreshToken": "...."
//   }
// }


// Store them in localStorage:

// const res = await login(mobile, password);

// const tokens = res.AuthenticationResult;

// localStorage.setItem("idToken", tokens.IdToken);
// localStorage.setItem("accessToken", tokens.AccessToken);
// localStorage.setItem("refreshToken", tokens.RefreshToken);

// 🔐 Step 6 — Call API Gateway With Authorization Header

// Since your API Gateway uses Cognito authorizer:

// export const apiGet = async (url) => {
//   const token = localStorage.getItem("idToken");

//   return fetch(url, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }).then((res) => res.json());
// };