import React from 'react';
import { PackageOpen, Hammer, Box, Home, Warehouse, Shield, Truck, Lightbulb } from 'lucide-react';

const services = [
  {
    icon: PackageOpen,
    title: "Emballage et déballage des meubles",
    description: "Utilisation de matériaux d'emballage robustes pour protéger vos affaires. Une expérience sans accrocs avec nos équipes expertes."
  },
  {
    icon: Hammer,
    title: "Démontage et remontage des meubles",
    description: "Nous nous occupons du démontage et remontage de tous vos meubles. La sécurité et l'intégrité de votre mobilier sont garanties."
  },
  {
    icon: Box,
    title: "Chargement et déchargement",
    description: "Équipements professionnels pour charger et décharger vos articles en toute sécurité et en un rien de temps."
  },
  {
    icon: Home,
    title: "Transfert résidentiel",
    description: "Un service entièrement clés en main pour un transfert rapide et très sécurisé de votre domicile partout en Tunisie."
  },
  {
    icon: Warehouse,
    title: "Stockage temporaire",
    description: "Options de stockage flexibles et sécurisées. Des solutions parfaites pour vos besoins sur courte ou longue durée."
  },
  {
    icon: Shield,
    title: "Emballage d'objets fragiles",
    description: "Emballage professionnel et sûr pour vos télés, ordinateurs, œuvres d'art et objets de décoration."
  },
  {
    icon: Truck,
    title: "Transport par camions dédiés",
    description: "Des camions récents, confortables et bien entretenus pour assurer la solution de transport la plus sécurisée."
  },
  {
    icon: Lightbulb,
    title: "Montage de lustres et rideaux",
    description: "Nous nous occupons du retrait et de l'installation de vos objets de décoration (rideaux, lustres, tableaux, étagères)."
  }
];

export const ServicesSection: React.FC = () => {
  return (
    <section className="py-24 bg-white" id="services">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-sm mb-4 tracking-wide uppercase">
            Nos Services
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            Faites confiance à nos experts pour un 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-600 block mt-2">déménagement réussi en Tunisie</span>
          </h2>
          <p className="text-lg text-slate-600">
            Nous vous accompagnons tout au long du processus avec des prestations sur-mesure pour tous vos besoins.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <div 
              key={idx} 
              className="bg-slate-50 border border-slate-100 p-8 rounded-3xl hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-primary/20 hover:border-brand-primary/30 transition-all duration-300 group animate-fade-in-up hover:shadow-glow"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="bg-white w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300 mb-6">
                <service.icon size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-brand-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
