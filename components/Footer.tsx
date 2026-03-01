import React from 'react';
import { Facebook, Instagram, Phone, Mail, MapPin, Linkedin, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-brand-orange">Déménagement</span> 
              <span className="bg-white/10 px-2 py-1 rounded text-white text-sm font-black tracking-widest border border-white/10">BH</span>
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 font-light">
              Votre partenaire de confiance pour un déménagement sans stress. Nous allions expertise, sécurité et rapidité pour vous offrir la meilleure expérience.
            </p>
            <div className="flex space-x-3">
              <a href="https://www.facebook.com/profile.php?id=61587194676207" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-orange hover:text-white transition-all duration-300 border border-white/10">
                <Facebook size={18} />
              </a>
              <a href="https://www.instagram.com/demenagement_bh_/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-orange hover:text-white transition-all duration-300 border border-white/10">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="md:col-span-1">
            <h4 className="text-white font-bold mb-6 text-lg relative inline-block">
              Contact
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-brand-orange rounded-full"></span>
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start group">
                <div className="mt-1 mr-3 p-1.5 rounded-full bg-brand-orange/10 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors">
                  <Phone size={14} />
                </div>
                <a href="tel:+21694318659" className="hover:text-brand-orange transition-colors">
                  <span className="block text-white font-medium mb-1 group-hover:text-brand-orange transition-colors">Téléphone</span>
                  +216 94 318 659
                </a>
              </li>
              <li className="flex items-start group">
                <div className="mt-1 mr-3 p-1.5 rounded-full bg-brand-orange/10 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors">
                  <Mail size={14} />
                </div>
                <a href="mailto:contact@demenagement-bh.tn" className="hover:text-brand-orange transition-colors">
                  <span className="block text-white font-medium mb-1 group-hover:text-brand-orange transition-colors">Email</span>
                  contact@demenagement-bh.tn
                </a>
              </li>
              <li className="flex items-start group">
                 <div className="mt-1 mr-3 p-1.5 rounded-full bg-brand-orange/10 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors">
                  <MapPin size={14} />
                </div>
                <span>
                  <span className="block text-white font-medium mb-1">Adresse</span>
                  Tunis, Tunisie
                </span>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div className="md:col-span-1">
             <h4 className="text-white font-bold mb-6 text-lg relative inline-block">
              Navigation
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-brand-orange rounded-full"></span>
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'Accueil', href: '#' },
                { label: 'Nos Services', href: '#services' },
                { label: 'Demander un Devis', href: '#quote-section' },
                { label: 'Avis Clients', href: '#avis-clients' }
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-brand-orange transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 bg-brand-orange rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

           {/* Newsletter/Info */}
           <div className="md:col-span-1">
             <h4 className="text-white font-bold mb-6 text-lg relative inline-block">
              Info
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-brand-orange rounded-full"></span>
            </h4>
            <div className="bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-sm">
              <p className="text-xs text-slate-400 mb-4">
                Disponible 7j/7 pour répondre à toutes vos questions et vous accompagner.
              </p>
              <div className="flex items-center gap-2 text-green-400 text-xs font-bold uppercase tracking-wide">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Service Ouvert
              </div>
            </div>
           </div>

        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} BH Déménagement. Tous droits réservés.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
             <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
             <a href="#" className="hover:text-white transition-colors">Politique de Confidentialité</a>
             <a href="#" className="hover:text-white transition-colors">CGV</a>
          </div>
        </div>
      </div>
    </footer>
  );
};