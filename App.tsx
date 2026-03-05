import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustSection } from './components/TrustSection';
import { ServicesSection } from './components/ServicesSection';
import { QuoteForm } from './components/QuoteForm';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Footer } from './components/Footer';
import { ShieldCheck, Clock, Award, Phone } from 'lucide-react';

import { GallerySection } from './components/GallerySection';

import { MapSection } from './components/MapSection';
import { LegalModal, LegalPageType } from './components/LegalModal';

const App: React.FC = () => {
  const [activeLegalPage, setActiveLegalPage] = useState<LegalPageType>(null);

  const scrollToQuote = () => {
    const element = document.getElementById('quote-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 bg-slate-50" id="accueil">
      <Navbar onQuoteClick={scrollToQuote} />
      
      <main className="flex-grow">
        <Hero onQuoteClick={scrollToQuote} />
        
        {/* Modern Stats/Value Strip floating over sections */}
        <div className="relative -mt-16 z-20 container mx-auto px-4 mb-16">
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="flex items-center space-x-4 p-2">
              <div className="bg-blue-50 p-3 rounded-xl text-brand-primary">
                <ShieldCheck size={32} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900">Transport Assuré</h3>
                <p className="text-sm text-slate-500">Garantie casse & vol incluse</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-2">
              <div className="bg-orange-50 p-3 rounded-xl text-brand-orange">
                <Clock size={32} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900">Ponctualité</h3>
                <p className="text-sm text-slate-500">Respect strict des horaires</p>
              </div>
            </div>
             <div className="flex items-center space-x-4 p-2">
              <div className="bg-green-50 p-3 rounded-xl text-green-600">
                <Award size={32} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900">Qualité Certifiée</h3>
                <p className="text-sm text-slate-500">Personnel formé et équipé</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 lg:py-20" id="quote-section">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
             {/* Left Content */}
            <div className="lg:w-1/2 space-y-8 lg:sticky lg:top-24">
               <div className="inline-block px-4 py-1.5 rounded-full bg-brand-orange/10 text-brand-orange font-semibold text-sm mb-2">
                 Devis Gratuit & Sans Engagement
               </div>
               <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                 Prêt pour votre <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-600">nouvelle aventure ?</span>
               </h2>
               <p className="text-lg text-slate-600 leading-relaxed">
                 Ne perdez plus de temps à chercher. Obtenez une estimation précise et transparente pour votre déménagement. Remplissez le formulaire ci-contre, c'est gratuit et ça prend moins de 2 minutes.
               </p>
               
               <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex items-start gap-4">
                  <div className="bg-brand-primary/10 p-3 rounded-full text-brand-primary mt-1">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Une question ? Appelez-nous</p>
                    <p className="text-2xl font-bold text-brand-primary">94 318 659</p>
                    <p className="text-xs text-slate-400 mt-1">Disponible 7j/7 de 8h à 20h</p>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                 <img src="/images/truck.jpg" alt="Camion de déménagement" className="rounded-2xl shadow-md w-full h-48 object-cover hover:scale-[1.02] transition-transform duration-500" />
                 <img src="/images/gallery-2.jpg" alt="Cartons déménagement" className="rounded-2xl shadow-md w-full h-48 object-cover hover:scale-[1.02] transition-transform duration-500" />
               </div>
            </div>
            
            {/* Right Content - Form */}
            <div className="lg:w-1/2 w-full">
               <QuoteForm />
            </div>
          </div>
        </div>

        <ServicesSection />
        
        <GallerySection />
        
        <TrustSection />

        <MapSection />
      </main>

      <Footer onOpenLegal={setActiveLegalPage} />
      <WhatsAppButton />

      <LegalModal 
        page={activeLegalPage} 
        onClose={() => setActiveLegalPage(null)} 
      />
    </div>
  );
};

export default App;