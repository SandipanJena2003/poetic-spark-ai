import React from 'react';
import { Link } from 'react-router-dom';
import { Feather, Heart, Twitter, Instagram, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-poetry border-t border-poetry-lavender">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-white/20 rounded-lg">
                <Feather className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-serif font-bold text-primary">PoetryVerse</span>
            </div>
            <p className="text-muted-foreground font-serif italic leading-relaxed">
              A sanctuary for poets and poetry lovers. Where every word finds its perfect place, 
              and every verse tells a story worth sharing.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-serif font-semibold text-primary">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors font-serif">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-muted-foreground hover:text-primary transition-colors font-serif">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/trending" className="text-muted-foreground hover:text-primary transition-colors font-serif">
                  Trending
                </Link>
              </li>
              <li>
                <Link to="/featured" className="text-muted-foreground hover:text-primary transition-colors font-serif">
                  Featured
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h3 className="font-serif font-semibold text-primary">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/write" className="text-muted-foreground hover:text-primary transition-colors font-serif">
                  Write Poetry
                </Link>
              </li>
              <li>
                <Link to="/authors" className="text-muted-foreground hover:text-primary transition-colors font-serif">
                  Authors
                </Link>
              </li>
              <li>
                <Link to="/contests" className="text-muted-foreground hover:text-primary transition-colors font-serif">
                  Contests
                </Link>
              </li>
              <li>
                <Link to="/workshops" className="text-muted-foreground hover:text-primary transition-colors font-serif">
                  Workshops
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-serif font-semibold text-primary">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors font-serif">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors font-serif">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors font-serif">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors font-serif">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-poetry-lavender mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a href="#" className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                <Twitter className="h-4 w-4 text-primary" />
              </a>
              <a href="#" className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                <Instagram className="h-4 w-4 text-primary" />
              </a>
              <a href="#" className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                <Github className="h-4 w-4 text-primary" />
              </a>
            </div>

            {/* Copyright */}
            <div className="flex items-center space-x-2 text-muted-foreground font-serif">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>for poetry lovers</span>
              <span className="mx-2">•</span>
              <span>© 2024 PoetryVerse</span>
            </div>
          </div>
        </div>

        {/* Inspirational Quote */}
        <div className="text-center mt-8 pt-6 border-t border-poetry-lavender">
          <blockquote className="font-poetry italic text-primary text-lg">
            "Poetry is when an emotion has found its thought and the thought has found words."
          </blockquote>
          <cite className="text-muted-foreground font-serif text-sm mt-2 block">— Robert Frost</cite>
        </div>
      </div>
    </footer>
  );
};

export default Footer;