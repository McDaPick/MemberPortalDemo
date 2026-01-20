import React from 'react';
import { ShieldCheck, Github, Globe, Circle } from 'lucide-react';

const Footer = () => {
  return (
      <footer className="footer-base">
        <div className="footer-container">
          <div className="footer-grid">

            {/* Column 1: Brand */}
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="h-6 w-6 text-blue-700" />
                <span className="text-lg font-bold text-gray-900">Member Portal</span>
              </div>
              <p className="text-gray-500 text-sm">
                Secure Group Membership and Association Direct portal.
                Built with Spring Boot 3 & React.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="footer-heading">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="footer-link">Policy Documents</a></li>
                <li><a href="#" className="footer-link">Coverage Lookup</a></li>
                <li><a href="#" className="footer-link">Contact Support</a></li>
              </ul>
            </div>

            {/* Column 3: Legal */}
            <div>
              <h3 className="footer-heading">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="footer-link">Privacy Policy</a></li>
                <li><a href="#" className="footer-link">Terms of Service</a></li>
                <li><a href="#" className="footer-link">Security Standards</a></li>
              </ul>
            </div>

            {/* Column 4: System Status */}
            <div>
              <h3 className="footer-heading">System Status</h3>
              <div className="status-indicator">
                <Circle className="h-3 w-3 fill-green-500 text-green-500" />
                <span className="status-text">All Systems Operational</span>
              </div>
              <p className="text-[10px] text-gray-400 mt-2">Last Sync: {new Date().toLocaleTimeString()}</p>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom-bar">
            <p className="text-gray-400 text-xs">
              © 2026 Michael Nielsen Insurance Company. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Github className="social-icon" />
              <Globe className="social-icon" />
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;