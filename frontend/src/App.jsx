import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import './index.css';
import LandingPage from './components/landingpage';
// import LoginForm from './components/loginPage';
import LoginForm from './components/loginPageNew';
import SignupForm from './components/signupPageNew';
import Dashboard from './components/dashboardNew';
//import Dashboard from './components/dashboard';
//import TripsDashboard from './components/tripsDashboard';
import TripsDashboard from './components/tripDashboardNew';
import TripDashboard from './components/tirpdashboard';
import PayHistory from './components/payHistory';
import IntroPage from './components/intropage';
import TripSuggestion from './components/tripSuggestion';
import "@fontsource/lexend-deca"; 
import GroupDashboard from './components/groupDashboard';
import IndiTripDashboard from './components/indiTripDashboard';
import IndiSpend from './components/test';
//import TripsDashboard from './components/tripsDashboard';



function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Use this logic to only redirect from the root "/" route
  useEffect(() => {
    const token = localStorage.getItem("token");

    // If the current path is the root ("/"), then handle redirection
    if (location.pathname === "/") {
      if (token) {
        // Navigate to the dashboard if a token exists
        navigate("/dashboard", { replace: true });
      } else {
        // Navigate to the intro page if no token exists
        navigate("/intro", { replace: true });
      }
    }
  }, [location, navigate]);

  return null; // Return nothing from this component as it's for redirection only
}

// Component for defining routes
function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/tripsDashboard" element={<TripsDashboard/>} />
      <Route path="/groupDashboard" element={<GroupDashboard />} />
      <Route path="/trip" element={<TripDashboard />} />
      <Route path="/history" element={<PayHistory />} />
      <Route path="/intro" element={<IntroPage />} />
      <Route path="tripSuggestion" element={<TripSuggestion />} />
      <Route path="/indiTripDashboard" element={<IndiTripDashboard />} />
      <Route path="/test"  element={<IndiSpend />}/>
    </Routes>
  );
}

// Main app component
function MainApp() {
  return (
    <Router>
      <App /> {/* Redirection based on token */}
      <AppRoutes /> {/* Route definitions */}
    </Router>
  );
}

export default MainApp;
