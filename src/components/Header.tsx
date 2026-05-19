import { Link, useLocation } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";
import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { AuthModal } from "./AuthModal";
import logo from "@/assets/logo.png";

const navLinks = [
  { to: "/", label: "Αρχική" },
  { to: "/shop", label: "Κατάστημα" },
  { to: "/producers", label: "Παραγωγοί" },
  { to: "/wellness-guide", label: "Wellness Guide" },
  { to: "/about", label: "About" },
  { to: "/become-producer", label: "Γίνε Παραγωγός" },
  { to: "/contact", label: "Επικοινωνία" },
];

export const Header = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Agrognosis" className="h-[55px] w-auto" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm tracking-wide transition-colors duration-200 ${
                  location.pathname === link.to
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setAuthOpen(true)}
              className="p-2 text-foreground hover:opacity-70 transition-opacity duration-200"
              aria-label="Σύνδεση"
            >
              <User className="w-5 h-5" />
            </button>
            <CartDrawer />
            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="lg:hidden border-t border-border bg-background py-4">
            <div className="container mx-auto flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm py-2 transition-colors ${
                    location.pathname === link.to
                      ? "text-primary font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};
