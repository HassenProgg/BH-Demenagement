import React, { useState } from 'react';
import { MapPin, Clock, ShieldCheck, Navigation } from 'lucide-react';

// Coordinates for each governorate [lat, lng] for Google Maps
const governorates = [
  { name: "Tunis", lat: 36.8190, lng: 10.1660 },
  { name: "Ariana", lat: 36.8625, lng: 10.1956 },
  { name: "Ben Arous", lat: 36.7533, lng: 10.2282 },
  { name: "Manouba", lat: 36.8084, lng: 9.9999 },
  { name: "Nabeul", lat: 36.4513, lng: 10.7357 },
  { name: "Zaghouan", lat: 36.4029, lng: 10.1432 },
  { name: "Bizerte", lat: 37.2746, lng: 9.8739 },
  { name: "Béja", lat: 36.7256, lng: 9.1817 },
  { name: "Jendouba", lat: 36.5011, lng: 8.7802 },
  { name: "Le Kef", lat: 36.1824, lng: 8.7147 },
  { name: "Siliana", lat: 36.0842, lng: 9.3709 },
  { name: "Kairouan", lat: 35.6781, lng: 10.0963 },
  { name: "Kasserine", lat: 35.1729, lng: 8.8304 },
  { name: "Sidi Bouzid", lat: 35.0389, lng: 9.4847 },
  { name: "Sousse", lat: 35.8256, lng: 10.6367 },
  { name: "Monastir", lat: 35.7643, lng: 10.8113 },
  { name: "Mahdia", lat: 35.5047, lng: 11.0622 },
  { name: "Sfax", lat: 34.7478, lng: 10.7661 },
  { name: "Gafsa", lat: 34.4250, lng: 8.7842 },
  { name: "Tozeur", lat: 33.9197, lng: 8.1335 },
  { name: "Kebili", lat: 33.7046, lng: 8.9701 },
  { name: "Gabès", lat: 33.8815, lng: 10.0982 },
  { name: "Medenine", lat: 33.3548, lng: 10.5055 },
  { name: "Tataouine", lat: 32.9211, lng: 10.4509 },
];

const HOME_LAT = 37.0659;
const HOME_LNG = 10.0975;
const HOME_ZOOM = 14;

function buildMapSrc(lat: number, lng: number, zoom: number = 13) {
  return `https://maps.google.com/maps?q=${lat},${lng}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`;
}

export const MapSection: React.FC = () => {
  const [activeGov, setActiveGov] = useState<string | null>(null);
  const [mapSrc, setMapSrc] = useState(buildMapSrc(HOME_LAT, HOME_LNG, HOME_ZOOM));

  const handleGovClick = (gov: typeof governorates[0]) => {
    setActiveGov(gov.name);
    setMapSrc(buildMapSrc(gov.lat, gov.lng));
  };

  const handleReset = () => {
    setActiveGov(null);
    setMapSrc(buildMapSrc(HOME_LAT, HOME_LNG, HOME_ZOOM));
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="localisation">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_theme(colors.brand-primary/5),_transparent_60%)]"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-sm mb-4 tracking-wide uppercase border border-brand-primary/10">
            Couverture Nationale
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            Nous couvrons <span className="text-brand-orange">toute la Tunisie</span>
          </h2>
          <p className="text-slate-500 text-lg font-light">
            Cliquez sur un gouvernorat pour explorer la carte. Service disponible <strong className="text-slate-700">24h/24</strong> dans toutes les régions.
          </p>
        </div>

        <div className="flex flex-col xl:flex-row gap-10 items-stretch">

          {/* LEFT: Tunisia map image + Info cards */}
          <div className="xl:w-[320px] flex flex-col items-center gap-6 shrink-0">
            {/* Tunisia coverage illustration */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl border border-slate-200 p-4 w-full flex justify-center items-center shadow-inner hover:shadow-md transition-shadow">
              <img
                src="/images/A.jpeg"
                alt="Couverture nationale Tunisie"
                className="w-full max-w-[260px] object-contain mix-blend-multiply drop-shadow-2xl hover:scale-105 transition-transform duration-500 cursor-pointer"
                title="Service dans toute la Tunisie"
              />
            </div>
            {/* Mini info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4 w-full">
              <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-brand-orange/30 hover:shadow-md transition-all group cursor-default">
                <div className="bg-brand-orange/10 p-2.5 rounded-xl text-brand-orange shrink-0 group-hover:bg-brand-orange group-hover:text-white transition-colors">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Disponibilité 24h/7j</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mt-0.5">Même les jours fériés et la nuit.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-brand-primary/30 hover:shadow-md transition-all group cursor-default">
                <div className="bg-brand-primary/10 p-2.5 rounded-xl text-brand-primary shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Assurance sur chaque km</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mt-0.5">Transport 100% couvert partout.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-brand-primary text-white p-4 rounded-2xl sm:col-span-2 xl:col-span-1 shadow-lg shadow-brand-primary/20 cursor-pointer hover:bg-blue-700 transition-colors" onClick={handleReset}>
                <div className="bg-white/20 p-2.5 rounded-xl shrink-0">
                  <Navigation size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Notre siège principal</h4>
                  <p className="text-xs text-white/80 leading-relaxed mt-0.5">Kalaât el Andalous, Tunisie — <span className="font-bold underline">Cliquez pour voir</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* CENTER: Map */}
          <div className="flex-grow min-h-[420px] relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 group">
            <iframe
              key={mapSrc}
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 transition-all duration-500"
            ></iframe>
            {/* Map Overlay card */}
            <div className="absolute top-4 left-4 z-20 pointer-events-none">
              <div className={`bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-white/50 flex items-center gap-3 transition-all duration-500 ${activeGov ? 'border-brand-orange/30' : 'border-white/50'}`}>
                <div className={`p-2 rounded-xl text-white shrink-0 transition-colors ${activeGov ? 'bg-brand-orange' : 'bg-brand-primary'}`}>
                  <MapPin size={18} />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 text-sm leading-tight">
                    {activeGov ? activeGov : 'Kalaât el Andalous'}
                  </h5>
                  <p className="text-[10px] text-slate-500">
                    {activeGov ? 'Gouvernorat - Zone desservie' : 'Siège BH Déménagement'}
                  </p>
                </div>
              </div>
            </div>
            {activeGov && (
              <button
                onClick={handleReset}
                className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-md text-slate-700 hover:text-brand-orange px-3 py-2 rounded-xl shadow-lg border border-white/50 text-xs font-bold transition-colors"
              >
                ← Retour au siège
              </button>
            )}
          </div>

          {/* RIGHT: Governorate chips */}
          <div className="xl:w-[280px] shrink-0 flex flex-col gap-3">
            <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wider mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
              Cliquez pour explorer
            </h4>
            <div className="grid grid-cols-2 xl:grid-cols-1 gap-2 overflow-y-auto xl:max-h-[480px] pr-1 custom-scrollbar">
              {governorates.map((gov) => (
                <button
                  key={gov.name}
                  onClick={() => handleGovClick(gov)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all duration-200 border group
                    ${activeGov === gov.name
                      ? 'bg-brand-orange text-white border-brand-orange shadow-md shadow-orange-500/20 scale-[1.02]'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-brand-orange/50 hover:bg-brand-orange/5 hover:text-brand-orange hover:-translate-y-0.5 hover:shadow-sm'
                    }`}
                >
                  <MapPin size={13} className={`shrink-0 ${activeGov === gov.name ? 'text-white' : 'text-brand-orange'}`} />
                  {gov.name}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
