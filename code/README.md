# Black Aura Trading Frontend

A modern React trading platform built with Vite and Tailwind CSS.

## Features

- **Authentication**: Login, registration, and password reset
- **Strategies**: Browse and filter trading strategies
- **Stock Recommendations**: Get AI-powered stock recommendations with entry, target, and stop-loss prices
- **Responsive Design**: Mobile-friendly interface with sidebar navigation
- **Real-time Updates**: Spinner loading states during API calls
- **Pagination**: Browse strategies and recommendations with pagination

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

### Running the Application

Development:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── pages/          # Page components (Login, Dashboard, etc.)
│   ├── components/     # Reusable components (Layout, ProtectedRoute)
│   ├── services/       # API integration (endpoints, axios setup)
│   ├── hooks/          # Custom React hooks
│   ├── App.jsx         # Main app with routing
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## Technologies

- **React 18**: UI framework
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Styling
- **React Router**: Navigation
- **Axios**: HTTP client
- **Lucide React**: Icons

## API Integration

The app connects to the Flask backend at `http://localhost:5000/api`. Configure the API URL in your `.env` file.

### Available Endpoints

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/forgot-password` - Password reset request
- `GET /strategies` - List all strategies
- `GET /strategies/{id}` - Get strategy details
- `GET /stocks/recommendations` - Get stock recommendations
- `GET /users/profile` - Get user profile

## Color Scheme

- **Primary**: Green (Trading positive)
- **Accent Yellow**: Important highlights
- **Blue**: Secondary elements
- **Dark**: Background (dark theme)

## Future Enhancements

- Blog section
- Screener tool
- Company annual reports
- Quarterly reports
- Advanced charts
- Alerts and notifications
