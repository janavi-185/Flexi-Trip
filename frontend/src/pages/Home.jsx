import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStarted = () => {
    navigate('/signin');
  };
 
  return (
    <div className="home-container">
      {/* Sticky Navbar */}
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-content">
          <div className="navbar-logo">
            <span className="logo-icon">✈️</span>
            <span className="logo-text">FlexiTrip</span>
          </div>
          <div className="navbar-links">
            <a href="#home" className="nav-link">Home</a>
            <a href="#features" className="nav-link">Features</a>
            <a href="#services" className="nav-link">Services</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
          <button className="nav-cta-btn" onClick={handleGetStarted}>
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-icon">🌟</span>
            <span>AI-Powered Travel Planning</span>
          </div>
          <h1 className="hero-title">
            Your Journey Starts with
            <span className="gradient-text"> FlexiTrip</span>
          </h1>
          <p className="hero-description">
            Experience the future of travel planning with our intelligent AI assistant. 
            Create personalized itineraries, discover hidden gems, and make every trip 
            unforgettable with FlexiTrip's smart recommendations.
          </p>
          <button className="cta-button" onClick={handleGetStarted}>
            <span>Get Started</span>
            <span className="button-arrow">→</span>
          </button>
          {/* <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Happy Travelers</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Trips Planned</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">150+</div>
              <div className="stat-label">Destinations</div>
            </div>
          </div> */}
        </div>
        {/* <div className="hero-visual">
          <div className="floating-card card-1">
            <span className="card-icon">🗺️</span>
            <span className="card-text">Smart Routes</span>
          </div>
          <div className="floating-card card-2">
            <span className="card-icon">🤖</span>
            <span className="card-text">AI Assistant</span>
          </div>
          <div className="floating-card card-3">
            <span className="card-icon">💰</span>
            <span className="card-text">Best Prices</span>
          </div>
        </div> */}
      </section>

      {/* AI-Powered Trip Planning Section */}
      <section id="features" className="ai-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-badge">🤖 Powered by AI</span>
            <h2 className="section-title">Intelligent Trip Planning</h2>
            <p className="section-description">
              Our advanced AI analyzes your preferences, budget, and travel style to create 
              the perfect itinerary tailored just for you.
            </p>
          </div>
          <div className="ai-features">
            <div className="ai-feature-card">
              <div className="feature-icon-wrapper">
                <span className="feature-icon">🧠</span>
              </div>
              <h3 className="feature-title">Smart Recommendations</h3>
              <p className="feature-description">
                AI-powered suggestions based on your interests, past trips, and trending destinations.
              </p>
            </div>
            <div className="ai-feature-card">
              <div className="feature-icon-wrapper">
                <span className="feature-icon">⚡</span>
              </div>
              <h3 className="feature-title">Instant Itineraries</h3>
              <p className="feature-description">
                Generate complete travel plans in seconds with optimized routes and schedules.
              </p>
            </div>
            <div className="ai-feature-card">
              <div className="feature-icon-wrapper">
                <span className="feature-icon">🎯</span>
              </div>
              <h3 className="feature-title">Personalized Experience</h3>
              <p className="feature-description">
                Every recommendation is tailored to your unique preferences and travel style.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      {/* <section id="services" className="services-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-badge">✨ Our Services</span>
            <h2 className="section-title">Everything You Need for Perfect Travel</h2>
            <p className="section-description">
              From planning to booking, we've got you covered with comprehensive travel services.
            </p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🏨</div>
              <h3 className="service-title">Hotel Booking</h3>
              <p className="service-description">
                Find and book the best accommodations that match your budget and preferences.
              </p>
              <ul className="service-features">
                <li>Best price guarantee</li>
                <li>Verified reviews</li>
                <li>Instant confirmation</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">✈️</div>
              <h3 className="service-title">Flight Search</h3>
              <p className="service-description">
                Compare flights from multiple airlines and find the best deals for your journey.
              </p>
              <ul className="service-features">
                <li>Real-time pricing</li>
                <li>Flexible dates</li>
                <li>Multi-city options</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">🗓️</div>
              <h3 className="service-title">Itinerary Planning</h3>
              <p className="service-description">
                Create detailed day-by-day plans with attractions, restaurants, and activities.
              </p>
              <ul className="service-features">
                <li>Custom schedules</li>
                <li>Route optimization</li>
                <li>Local insights</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">🎫</div>
              <h3 className="service-title">Activity Booking</h3>
              <p className="service-description">
                Discover and book exciting tours, experiences, and activities at your destination.
              </p>
              <ul className="service-features">
                <li>Skip-the-line tickets</li>
                <li>Local experiences</li>
                <li>Group discounts</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">🚗</div>
              <h3 className="service-title">Transportation</h3>
              <p className="service-description">
                Arrange car rentals, transfers, and local transportation for seamless travel.
              </p>
              <ul className="service-features">
                <li>Airport transfers</li>
                <li>Car rentals</li>
                <li>Public transit info</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">💬</div>
              <h3 className="service-title">24/7 Support</h3>
              <p className="service-description">
                Get assistance anytime, anywhere with our dedicated customer support team.
              </p>
              <ul className="service-features">
                <li>Live chat support</li>
                <li>Emergency assistance</li>
                <li>Travel tips</li>
              </ul>
            </div>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-icon">✈️</span>
              <span className="logo-text">FlexiTrip</span>
            </div>
            <p className="footer-description">
              Your intelligent travel companion for unforgettable journeys around the world.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">📘</a>
              <a href="#" className="social-link" aria-label="Twitter">🐦</a>
              <a href="#" className="social-link" aria-label="Instagram">📷</a>
              <a href="#" className="social-link" aria-label="LinkedIn">💼</a>
            </div>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links">
              <li><a href="#services">Hotel Booking</a></li>
              <li><a href="#services">Flight Search</a></li>
              <li><a href="#services">Itinerary Planning</a></li>
              <li><a href="#services">Activity Booking</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Support</h4>
            <ul className="footer-links">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 FlexiTrip. All rights reserved.</p>
          <p>Made with ❤️ for travelers worldwide</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
