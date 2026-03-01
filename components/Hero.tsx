import React from 'react';
import { ArrowRight, Star, CheckCircle2, Phone, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onQuoteClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onQuoteClick }) => {
  return (
    <div className="relative bg-brand-dark pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-[800px] flex items-center">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-blue to-brand-dark opacity-90"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-orange/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-primary/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 animate-pulse duration-700"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Content */}
          <div className="lg:w-1/2 max-w-2xl text-center lg:text-left">
            {/* Trust Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 mb-8 hover:bg-white/10 transition-colors cursor-default shadow-glow animate-fade-in-up">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} fill="currentColor" className="drop-shadow-sm" />)}
              </div>
              <span className="text-slate-200 text-xs font-bold uppercase tracking-wider pl-3 border-l border-white/20">
                N°1 Déménagement en Tunisie
              </span>
            </div>
            
            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] mb-8 tracking-tight drop-shadow-xl animate-fade-in-up [animation-delay:200ms]">
              Votre déménagement, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-orangeLight">
                Notre Expertise.
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light animate-fade-in-up [animation-delay:400ms]">
              Profitez d'un service <span className="text-white font-semibold">premium</span> et sans stress. 
              Équipe professionnelle, emballage soigné et transport sécurisé partout en Tunisie.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-16 animate-fade-in-up [animation-delay:600ms]">
              <button 
                onClick={onQuoteClick}
                className="bg-brand-orange hover:bg-orange-600 text-white text-lg font-bold px-10 py-5 rounded-2xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group"
              >
                Devis Gratuit
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <a 
                href="tel:+21694318659"
                className="bg-white/5 border border-white/10 text-white hover:bg-white/10 text-lg font-bold px-10 py-5 rounded-2xl backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:shadow-glow"
              >
                <Phone size={20} className="mr-3 text-brand-orange font-bold" />
                94 318 659
              </a>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10">
              {[
                { label: "Service Premium", icon: Star },
                { label: "Assurance Incluse", icon: ShieldCheck },
                { label: "Disponible 7j/7", icon: CheckCircle2 }
              ].map((feature, idx) => (
                 <div key={idx} className="flex items-center justify-center lg:justify-start gap-4 text-slate-300 group hover:text-white transition-colors">
                    <div className="p-2.5 bg-white/5 rounded-xl text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300">
                      <feature.icon size={20} />
                    </div>
                    <span className="font-semibold text-sm tracking-wide">{feature.label}</span>
                 </div>
              ))}
            </div>
          </div>

          {/* Right - Truck Image with Effects */}
          <div className="lg:w-1/2 relative lg:h-auto z-20 hidden md:block">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 group transform hover:scale-[1.02] transition-transform duration-700">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity"></div>
              <img 
                src="/images/truck.jpg" 
                alt="Camion BH Déménagement" 
                className="w-full h-auto object-cover"
              />
              
              {/* Floating Info Card */}
              <div className="absolute bottom-8 left-8 right-8 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-2xl flex items-center justify-between shadow-lg">
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">Flotte Moderne</h3>
                    <div className="flex items-center space-x-2">
                       <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                       <p className="text-slate-200 text-xs font-medium">Disponible maintenant</p>
                    </div>
                  </div>
                  <div className="bg-brand-orange px-4 py-2 rounded-xl text-white text-xs font-bold uppercase tracking-wider shadow-md">
                    Certifié
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-orange/30 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-blob"></div>
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-600/30 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-blob animation-delay-200"></div>
          </div>

        </div>
      </div>
    </div>
  );
};