import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

// 1. Updated BHLogo with larger size classes and scroll-responsive sizing
const BHLogo: React.FC<{ scrolled: boolean }> = ({ scrolled }) => (
  <div className="flex items-center group cursor-pointer">
    <div className="relative mr-2 flex flex-col items-center transform group-hover:scale-105 transition-transform duration-300">
      <img 
        src="/images/logo.png"
        alt="BH Déménagement" 
        /* Increased from h-12/h-16 to h-20/h-28 when top, h-14/h-20 when scrolled */
        className={`object-contain mix-blend-multiply filter contrast-125 drop-shadow-sm transition-all duration-300 ${
          scrolled 
            ? 'h-14 md:h-20' 
            : 'h-20 md:h-28'
        }`} 
      />
    </div>
  </div>
);

interface NavbarProps {
  onQuoteClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onQuoteClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-glass py-2 supports-[backdrop-filter]:bg-white/60' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4">
        {/* 2. Increased container height (h-20 md:h-32) to accommodate the larger logo */}
        <div className={`flex justify-between items-center transition-all duration-300 ${scrolled ? 'h-16' : 'h-24 md:h-32'}`}>
          
          {/* Logo */}
          <BHLogo scrolled={scrolled} />

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {['Accueil', 'Services', 'Avis Clients'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '-')}`} 
                className={`text-sm font-medium transition-all duration-300 hover:text-brand-orange relative group ${scrolled ? 'text-slate-700' : 'text-slate-100/90'}`}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-orange transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            
            <a href="tel:+21694318659" className={`hidden lg:flex items-center font-bold transition-colors duration-300 hover:text-brand-orange ${scrolled ? 'text-brand-primary' : 'text-white'}`}>
              <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm mr-2">
                <Phone size={18} />
              </div>
              <span>94 318 659</span>
            </a>

            <button 
              onClick={onQuoteClick}
              className="bg-brand-orange hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transform hover:-translate-y-0.5 active:translate-y-0 text-sm tracking-wide"
            >
              Devis Gratuit
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className={`focus:outline-none transition-colors p-2 rounded-lg hover:bg-white/10 ${scrolled || isOpen ? 'text-slate-800' : 'text-white'}`}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white/95 backdrop-blur-xl z-40 transform transition-all duration-500 ease-in-out md:hidden ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'} pt-24 px-6`}>
         <div className="flex flex-col space-y-6">
            {['Accueil', 'Services', 'Avis Clients'].map((item, i) => (
              <a 
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`} 
                onClick={() => setIsOpen(false)} 
                className={`text-2xl font-bold text-slate-800 border-b border-gray-100 pb-4 hover:text-brand-orange transition-all duration-300 ${isOpen ? 'animate-fade-in-up' : ''}`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {item}
              </a>
            ))}
            
            <a 
              href="tel:+21694318659" 
              className={`text-2xl font-extrabold text-brand-primary flex items-center pt-4 transition-all duration-300 ${isOpen ? 'animate-fade-in-up underline decoration-brand-orange/30 underline-offset-8' : ''}`}
              style={{ animationDelay: '300ms' }}
            >
              <div className="bg-brand-primary/10 p-3 rounded-full mr-4 text-brand-orange">
                <Phone size={24} />
              </div>
              94 318 659
            </a>
            <button 
              onClick={() => {
                onQuoteClick();
                setIsOpen(false);
              }}
              className={`w-full mt-8 bg-gradient-to-r from-brand-orange to-orange-600 text-white px-5 py-4 rounded-xl font-bold text-lg shadow-xl shadow-orange-500/30 active:scale-95 transition-all ${isOpen ? 'animate-fade-in-up' : ''}`}
              style={{ animationDelay: '400ms' }}
            >
              Demander un Devis
            </button>
         </div>
      </div>
    </nav>
  );
};