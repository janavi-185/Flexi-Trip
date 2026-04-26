# Flexi-Trip

An AI-powered personalized trip itinerary generator that transforms travel planning into an intelligent, interactive experience.

## Overview

Flexi-Trip leverages artificial intelligence to create customized travel itineraries tailored to your preferences, budget, and travel style. Whether you're planning a beach vacation, cultural exploration, or adventure trip, our AI travel planner analyzes thousands of travel possibilities to build the perfect itinerary for you.

## Key Features

🧠 **AI-Powered Itineraries**
- Intelligent AI analyzes your preferences, budget, and travel style to generate personalized day-by-day itineraries
- Adaptive planning that learns from your choices

💰 **Smart Budget Planning**
- Define your budget and let the system optimize accommodation, transport, and activities
- Real-time cost tracking and recommendations within your financial constraints

🗺️ **Day-by-Day Planning**
- Structured hour-by-hour plans with integrated maps and travel times
- Activity recommendations with opening hours and practical details

🔀 **Flexible & Editable**
- Easily modify activities, adjust dates, or explore alternative destinations
- Dynamic itinerary updates as your preferences change

🌍 **Destination Discovery**
- Intelligent recommendations for hidden gems and popular destinations
- Travel preferences analysis to match you with ideal locations

👥 **Multi-User Support**
- Secure user authentication and session management
- Personalized trip histories and saved itineraries

## Tech Stack

### Backend
- **Runtime**: Node.js (ES modules)
- **Framework**: Express.js v5
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing
- **Development**: Nodemon for hot reloading

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Animations**: Framer Motion
- **UI Components**: Custom component library with dark mode support

## Project Structure

```
flexi-trip/
├── backend/
│   ├── index.js                 # Server entry point
│   ├── loadenv.js              # Environment configuration
│   ├── package.json
│   └── src/
│       ├── config/
│       │   └── db.js           # Database configuration
│       ├── controllers/
│       │   └── auth.js         # Authentication logic
│       ├── middleware/
│       │   └── auth.js         # JWT verification middleware
│       ├── models/
│       │   ├── user.js         # User model
│       │   └── schema.sql      # Database schema
│       └── routes/
│           └── auth.js         # Authentication routes
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx            # React entry point
│       ├── App.jsx             # Main app component
│       ├── pages/
│       │   ├── Home.jsx        # Landing page
│       │   ├── Login.jsx       # Login page
│       │   ├── Signup.jsx      # Registration page
│       │   ├── Account.jsx     # User account page
│       │   └── Dashboard.jsx   # Main dashboard
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── auth/
│       │   │   ├── AuthForm.jsx
│       │   │   └── Routes.jsx  # Protected route guard
│       │   └── dashboard/
│       │       ├── ChatPanel.jsx         # AI chat interface
│       │       ├── DashboardLayout.jsx   # Dashboard layout
│       │       ├── ItineraryView.jsx     # Itinerary display
│       │       ├── Sidebar.jsx
│       │       └── TripFormView.jsx      # Trip details display
│       ├── pages/
│       │   └── home/
│       │       ├── Hero.jsx
│       │       ├── Features.jsx
│       │       ├── HowItWorks.jsx
│       │       ├── Testimonials.jsx
│       │       ├── CallToAction.jsx
│       │       └── Footer.jsx
│       └── utils/
│           ├── api.js          # API client utilities
│           ├── authStore.js    # Auth state management
│           └── axios.js        # Axios configuration
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn package manager

### Installation

#### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5002
DATABASE_URL=postgresql://user:password@localhost:5432/flexitrip
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

Initialize the database:
```bash
psql -U postgres -d flexitrip -f src/models/schema.sql
```

Start the backend server:
```bash
npm run dev
```

The server will run on `http://localhost:5002`

#### Frontend Setup
```bash
cd frontend
npm install
```

Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Usage

### User Flow

1. **Landing Page** - Explore features and benefits
2. **Sign Up / Login** - Create account or authenticate
3. **Dashboard** - Access the main planning interface
   - **Chat Panel**: Communicate with the AI travel planner
   - **Trip Details**: View saved trip preferences
   - **My Itinerary**: Review generated day-by-day plans

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Authenticate user
- `GET /api/auth/me` - Get current user profile (protected)

#### Health Check
- `GET /api/health` - Server health status

## Development

### Available Scripts

**Backend**
```bash
npm start      # Production server
npm run dev    # Development with auto-reload
npm test       # Run tests
```

**Frontend**
```bash
npm run dev     # Development server
npm run build   # Production build
npm run preview # Preview production build
npm run lint    # Run ESLint
```

## Architecture Highlights

### Frontend Architecture
- **Component-based UI** with React functional components
- **Protected routes** for authenticated pages
- **State persistence** using localStorage via Zustand
- **Session restoration** on app load
- **Responsive design** with Tailwind CSS utilities
- **Smooth animations** powered by Framer Motion

### Backend Architecture
- **RESTful API** design with Express.js
- **Middleware stack** for CORS, JSON parsing, and authentication
- **JWT-based auth** with configurable expiration
- **Password hashing** using bcryptjs (10 salt rounds)
- **PostgreSQL** for persistent data storage
- **Environment-based configuration** for different deployments

## Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Protected API endpoints requiring valid tokens
- CORS enabled for trusted origins
- Secure HTTP-only cookie support
- Input validation on authentication routes

## Performance Optimizations

- Vite for fast HMR and optimized builds
- Code splitting and lazy loading
- Tailwind CSS purging for minimal CSS
- Optimized component rendering with React
- Efficient state management with Zustand

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please follow these guidelines:
1. Create a feature branch (`git checkout -b feature/YourFeature`)
2. Commit changes (`git commit -m 'Add YourFeature'`)
3. Push to the branch (`git push origin feature/YourFeature`)
4. Submit a Pull Request

## License

ISC

---

**Flexi-Trip** - Making travel planning intelligent and personalized.
