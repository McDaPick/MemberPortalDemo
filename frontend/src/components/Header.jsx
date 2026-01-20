import React from 'react';
import { ShieldCheck, User, Menu } from 'lucide-react';

const Header = ({ onOpenAi }) => {
  return (
      <nav className="nav-wrapper">
        <div className="nav-container">
          <div className="nav-content">

            {/* Left: Branding */}
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-8 w-8 text-blue-700" />
              <span className="brand-text">
              Demo <span className="text-blue-700">Member</span> Portal
            </span>
            </div>

            {/* Middle: Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {/*<a href="#" className="nav-link">Dashboard</a>*/}
              {/*<a href="#" className="nav-link">Policies</a>*/}
            </div>

            {/* Right: Actions & Profile */}
            <div className="flex items-center gap-4">
              <button onClick={onOpenAi} className="nav-link">
                AI Assistant
              </button>

              <div className="profile-section">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-gray-900">Michael N.</p>
                  <p className="status-dot">Group Member</p>
                </div>
                <div className="user-avatar">
                  <User className="h-6 w-6" />
                </div>
              </div>

              {/* Mobile Menu Icon */}
              <div className="md:hidden">
                <Menu className="h-6 w-6 text-gray-600" />
              </div>
            </div>

          </div>
        </div>
      </nav>
  );
};

export default Header;