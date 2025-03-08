import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Instagram, Twitter, Facebook, Youtube, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white border-t-[3px] border-primary">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <ChefHat className="h-8 w-8 text-primary" />
              <span className="text-24-white">Flavour Fusion</span>
            </Link>
            <p className="text-white-100 mb-6">
              Discover, create, and share amazing recipes from around the world.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-primary transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-white hover:text-primary transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-white hover:text-primary transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-white hover:text-primary transition-colors">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-18-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/recipes" className="text-white-100 hover:text-primary transition-colors">
                  Recipes
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-white-100 hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/create" className="text-white-100 hover:text-primary transition-colors">
                  Create Recipe
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-white-100 hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-18-bold mb-4 text-white">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/recipes?category=breakfast" className="text-white-100 hover:text-primary transition-colors">
                  Breakfast
                </Link>
              </li>
              <li>
                <Link to="/recipes?category=lunch" className="text-white-100 hover:text-primary transition-colors">
                  Lunch
                </Link>
              </li>
              <li>
                <Link to="/recipes?category=dinner" className="text-white-100 hover:text-primary transition-colors">
                  Dinner
                </Link>
              </li>
              <li>
                <Link to="/recipes?category=dessert" className="text-white-100 hover:text-primary transition-colors">
                  Dessert
                </Link>
              </li>
              <li>
                <Link to="/recipes?category=vegan" className="text-white-100 hover:text-primary transition-colors">
                  Vegan
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-18-bold mb-4 text-white">Stay Updated</h3>
            <p className="text-white-100 mb-4">
              Subscribe to our newsletter for the latest recipes and cooking tips.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-white-900 text-white border-2 border-white-800 rounded-l-lg px-4 py-2 w-full focus:outline-none focus:border-primary"
              />
              <button className="bg-primary text-black font-medium px-4 py-2 rounded-r-lg hover:bg-primary-600 transition-colors">
                Subscribe
              </button>
            </div>
            <div className="mt-6 flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              <a href="mailto:contact@flavourfusion.com" className="text-white-100 hover:text-primary transition-colors">
                contact@flavourfusion.com
              </a>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-white-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white-100 text-sm mb-4 md:mb-0">
            © {currentYear} Flavour Fusion. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/about" className="text-white-100 text-sm hover:text-primary transition-colors">
              About Us
            </Link>
            <Link to="/privacy" className="text-white-100 text-sm hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-white-100 text-sm hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/contact" className="text-white-100 text-sm hover:text-primary transition-colors">
              Contact Us
            </Link>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-1 text-white-100 text-sm">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-primary" />
            <span>by Flavour Fusion Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 