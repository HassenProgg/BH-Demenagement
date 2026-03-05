import React, { useEffect } from 'react';
import { X, FileText, Shield, ScrollText } from 'lucide-react';

export type LegalPageType = 'mentions' | 'confidentialite' | 'cgv' | null;

interface LegalModalProps {
  page: LegalPageType;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ page, onClose }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (page) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [page]);

  if (!page) return null;

  const content = {
    mentions: {
      title: "Mentions Légales",
      icon: <FileText className="text-brand-orange" size={24} />,
      body: (
        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <p><strong>Raison sociale :</strong> BH Déménagement</p>
          <p><strong>Siège social :</strong> Kalaât el Andalous, Tunisie</p>
          <p><strong>Téléphone :</strong> +216 94 318 659</p>
          <p><strong>Email :</strong> contact@demenagement-bh.tn</p>
          <h4 className="font-bold text-slate-900 mt-6 mb-2">Propriété intellectuelle</h4>
          <p>L'ensemble de ce site relève de la législation tunisienne et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés.</p>
        </div>
      )
    },
    confidentialite: {
      title: "Politique de Confidentialité",
      icon: <Shield className="text-brand-orange" size={24} />,
      body: (
        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <h4 className="font-bold text-slate-900 mt-4 mb-2">1. Collecte des données</h4>
          <p>Nous collectons les informations que vous nous fournissez lors de l'utilisation de notre formulaire de devis (nom, numéro de téléphone, villes de départ/arrivée).</p>
          
          <h4 className="font-bold text-slate-900 mt-4 mb-2">2. Utilisation des données</h4>
          <p>Ces données sont exclusivement utilisées pour :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Vous recontacter suite à votre demande de devis.</li>
            <li>Préparer et organiser votre déménagement.</li>
            <li>Améliorer notre service client.</li>
          </ul>

          <h4 className="font-bold text-slate-900 mt-4 mb-2">3. Protection des données</h4>
          <p>BH Déménagement s'engage à ne jamais vendre, louer ou partager vos données personnelles à des tiers sans votre consentement explicite.</p>
          
          <h4 className="font-bold text-slate-900 mt-4 mb-2">4. Vos droits</h4>
          <p>Conformément à la loi, vous disposez d'un droit d'accès, de modification et de suppression de vos données. Pour l'exercer, contactez-nous à : contact@demenagement-bh.tn.</p>
        </div>
      )
    },
    cgv: {
      title: "Conditions Générales de Vente (CGV)",
      icon: <ScrollText className="text-brand-orange" size={24} />,
      body: (
        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <h4 className="font-bold text-slate-900 mt-4 mb-2">Article 1 : Objet</h4>
          <p>Les présentes Conditions Générales de Vente s'appliquent à tous les contrats de déménagement conclus entre BH Déménagement et ses clients.</p>

          <h4 className="font-bold text-slate-900 mt-4 mb-2">Article 2 : Devis</h4>
          <p>Le devis est gratuit et sans engagement. Il précise le volume à transporter, la distance, le type de prestation et le prix de la prestation.</p>

          <h4 className="font-bold text-slate-900 mt-4 mb-2">Article 3 : Assurance et Responsabilité</h4>
          <p>BH Déménagement souscrit une assurance garantissant les marchandises transportées contre la perte ou les dommages survenus pendant le transport, sous réserve d'une déclaration de valeur préalablement établie par le client.</p>

          <h4 className="font-bold text-slate-900 mt-4 mb-2">Article 4 : Paiement</h4>
          <p>Sauf accord spécifique, le règlement de la prestation s'effectue intégralement à la fin du déménagement.</p>

          <h4 className="font-bold text-slate-900 mt-4 mb-2">Article 5 : Litiges</h4>
          <p>En cas de litige, les parties s'engagent à rechercher une solution à l'amiable. À défaut, le litige sera porté devant les tribunaux tunisiens compétents.</p>
        </div>
      )
    }
  };

  const currentContent = content[page];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-xl shadow-sm">
              {currentContent.icon}
            </div>
            <h2 className="text-xl font-bold text-slate-900">{currentContent.title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-grow">
          {currentContent.body}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors shadow-md"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
