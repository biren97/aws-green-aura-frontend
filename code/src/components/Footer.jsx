import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin, Heart } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-16">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BA</span>
              </div>
              <h3 className="text-lg font-bold text-primary-500">Black Aura</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Advanced trading strategies and AI-powered market analysis for informed investment decisions.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-gray-800 rounded hover:bg-primary-500/20 transition">
                <Facebook size={18} className="text-gray-400 hover:text-primary-500" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded hover:bg-primary-500/20 transition">
                <Twitter size={18} className="text-gray-400 hover:text-primary-500" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded hover:bg-primary-500/20 transition">
                <Linkedin size={18} className="text-gray-400 hover:text-primary-500" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-100 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/dashboard" className="text-sm text-gray-400 hover:text-primary-500 transition">Dashboard</a></li>
              <li><a href="/strategies" className="text-sm text-gray-400 hover:text-primary-500 transition">Strategies</a></li>
              <li><a href="/recommendations" className="text-sm text-gray-400 hover:text-primary-500 transition">Recommendations</a></li>
              <li><a href="/tools/emi" className="text-sm text-gray-400 hover:text-primary-500 transition">Tools</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-gray-100 mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-400 hover:text-primary-500 transition">Blog</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-primary-500 transition">Documentation</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-primary-500 transition">FAQ</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-primary-500 transition">Support</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-gray-100 mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail size={16} className="text-primary-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Email</p>
                  <a href="mailto:support@blackaura.com" className="text-sm text-gray-300 hover:text-primary-500 transition">
                    support@blackaura.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={16} className="text-primary-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Phone</p>
                  <a href="tel:+1234567890" className="text-sm text-gray-300 hover:text-primary-500 transition">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-primary-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Address</p>
                  <p className="text-sm text-gray-300">
                    123 Market Street,<br />
                    Financial District, NY 10001
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          {/* Bottom Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            <a href="#" className="text-xs text-gray-400 hover:text-primary-500 transition">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-400 hover:text-primary-500 transition">Terms of Service</a>
            <a href="#" className="text-xs text-gray-400 hover:text-primary-500 transition">Cookie Policy</a>
            <a href="#" className="text-xs text-gray-400 hover:text-primary-500 transition">Disclaimer</a>
            <a href="#" className="text-xs text-gray-400 hover:text-primary-500 transition">Sitemap</a>
          </div>

          {/* Copyright & Credit */}
          <div className="text-center">
            <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
              © {currentYear} Black Aura Trading. All rights reserved. Built with
              <Heart size={12} className="text-red-500 fill-red-500" />
              by the Black Aura Team
            </p>
            <p className="text-xs text-gray-600 mt-2">
              Disclaimer: Past performance does not guarantee future results. Trading involves risk.
            </p>
          </div>
        </div>
      </div>

      {/* Top Border Accent */}
      <div className="h-1 bg-gradient-to-r from-primary-500/0 via-primary-500/50 to-primary-500/0"></div>
    </footer>
  )
}

export default Footer
