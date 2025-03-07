import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChefHat, Sun, Moon, LogIn } from 'lucide-react';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  if (isAuthPage) return null;

  return (
    <nav className="w-full bg-white border-b-[3px] border-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <ChefHat className="h-8 w-8 text-primary" />
            <span className="text-24-black">Flavour Fusion</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/create" className="text-16-medium hover:text-primary transition-colors">
              Create Recipe
            </Link>
            <Link to="/dashboard" className="text-16-medium hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link
              to="/login"
              className="startup-card_btn flex items-center gap-2 !py-2"
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;