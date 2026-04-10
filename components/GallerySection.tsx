import React from 'react';
import { Instagram, Facebook } from 'lucide-react';

export const GallerySection: React.FC = () => {
  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/20 rounded-full mix-blend-screen filter blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-primary/20 rounded-full mix-blend-screen filter blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
           <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-brand-orange font-bold text-sm mb-4 tracking-wide uppercase border border-white/10 backdrop-blur-sm">
            Notre Quotidien
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Découvrez nos <span className="text-brand-orange">interventions</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Plongez au cœur de notre activité et suivez nos dernières réalisations sur nos réseaux sociaux.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Central Social Overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col sm:flex-row gap-4 w-[280px] sm:w-auto items-center justify-center pointer-events-none">
            
            <a 
              href="https://www.instagram.com/demenagement_bh_/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="pointer-events-auto group relative flex items-center justify-center gap-3 bg-gradient-to-tr from-pink-600 via-purple-600 to-orange-500 p-[2px] rounded-2xl shadow-2xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto overflow-hidden animate-scale-in"
            >
              <div className="bg-slate-900/40 backdrop-blur-md px-6 py-4 sm:py-4 rounded-xl flex items-center gap-3 w-full h-full group-hover:bg-slate-900/20 transition-colors">
                 <Instagram className="text-white shrink-0" size={28} />
                 <div className="text-left">
                   <p className="text-white font-bold leading-tight text-sm sm:text-base">Suivez-nous</p>
                   <p className="text-white/80 text-[10px] sm:text-xs">sur Instagram</p>
                 </div>
              </div>
            </a>

            <a 
              href="https://www.facebook.com/profile.php?id=61587194676207" 
              target="_blank" 
              rel="noopener noreferrer"
              className="pointer-events-auto group relative flex items-center justify-center gap-3 bg-blue-600 p-[2px] rounded-2xl shadow-2xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto overflow-hidden animate-scale-in [animation-delay:200ms]"
            >
               <div className="bg-slate-900/20 backdrop-blur-md px-6 py-4 sm:py-4 rounded-xl flex items-center gap-3 w-full h-full group-hover:bg-transparent transition-colors">
                 <Facebook className="text-white fill-current shrink-0" size={28} />
                 <div className="text-left">
                   <p className="text-white font-bold leading-tight text-sm sm:text-base">Rejoignez-nous</p>
                   <p className="text-white/80 text-[10px] sm:text-xs">sur Facebook</p>
                 </div>
               </div>
            </a>

          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 relative">
             {/* Overlay to darken images slightly to make center buttons pop */}
             <div className="absolute inset-0 bg-slate-900/20 z-10 rounded-3xl pointer-events-none"></div>

            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="aspect-[4/5] relative rounded-3xl overflow-hidden group shadow-lg">
                <div className="absolute inset-0 bg-slate-800 animate-pulse">
                   {/* Placeholder background while true images load or if missing */}
                </div>
                <img 
                  src={`/images/gallery-${num}.jpg`} 
                  alt={`Déménagement BH en action ${num}`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  onError={(e) => {
                    // Fallback to beautiful placeholders if the user hasn't added images yet
                    e.currentTarget.src = `https://images.unsplash.com/photo-${num === 1 ? '1600585154340-be6161a56a0c' : num === 2 ? '1586864387789-628af9de87e1' : num === 3 ? '1558000143-bc97eec4e43e' : '1497366216548-37526070297c'}?auto=format&fit=crop&w=600&q=80`;
                    e.currentTarget.classList.add("grayscale");
                  }}
                />
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
};
