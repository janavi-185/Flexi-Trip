import { Link } from 'react-router-dom';

const footerLinks = {
  Product: ['Features', 'How It Works', 'Pricing', 'Changelog'],
  Company: ['About', 'Blog', 'Careers', 'Press'],
  Support: ['Help Centre', 'Community', 'Contact Us', 'Status'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
};

export default function Footer() {
  return (
    <footer className="bg-secondary text-muted-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">F</span>
              </div>
              <span className="text-foreground font-bold text-lg">FlexiTrip</span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              AI-powered travel planning for the modern explorer.
            </p>
          </div>

          {/* Link groups */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-foreground text-sm font-semibold mb-4">{group}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} FlexiTrip. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {['Twitter', 'Instagram', 'LinkedIn'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

