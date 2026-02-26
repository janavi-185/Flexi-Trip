import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/90 backdrop-blur-md shadow-sm border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">F</span>
          </div>
          <span className={`font-bold text-xl tracking-tight transition-colors duration-300 ${scrolled ? 'text-foreground' : 'text-white'}`}>
            FlexiTrip
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {['Features', 'How It Works', 'Testimonials'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, '-')}`}
              className={`text-sm font-medium transition-colors duration-300 hover:text-primary ${
                scrolled ? 'text-muted-foreground' : 'text-white/80'
              }`}
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-300 ${
              scrolled ? 'text-muted-foreground hover:text-primary' : 'text-white/80 hover:text-white'
            }`}
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="text-sm font-semibold px-5 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className={`md:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-foreground' : 'text-white'}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-5 h-0.5 bg-current mb-1.5" />
          <div className="w-5 h-0.5 bg-current mb-1.5" />
          <div className="w-5 h-0.5 bg-current" />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border px-6 py-4 flex flex-col gap-4">
          {['Features', 'How It Works', 'Testimonials'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, '-')}`}
              className="text-foreground font-medium text-sm hover:text-primary"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <Link
            to="/signup"
            className="text-sm font-semibold px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-center hover:bg-primary/90"
            onClick={() => setMenuOpen(false)}
          >
            Get Started Free
          </Link>
        </div>
      )}
    </nav>
  );
}
