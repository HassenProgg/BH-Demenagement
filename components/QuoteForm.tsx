import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Send, MapPin, Calendar, Truck, User, Phone, ChevronDown, Search } from 'lucide-react';
import { QuoteFormData } from '../types';

const GOVERNORATES = [
  "Ariana", "Béja", "Ben Arous", "Bizerte", "Gabès", "Gafsa", 
  "Jendouba", "Kairouan", "Kasserine", "Kébili", "Le Kef", "Mahdia", 
  "La Manouba", "Médenine", "Monastir", "Nabeul", "Sfax", "Sidi Bouzid", 
  "Siliana", "Sousse", "Tataouine", "Tozeur", "Tunis", "Zaghouan"
].sort();

interface SearchableSelectProps {
  label: string;
  icon: any;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  error?: boolean;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({ label, icon: Icon, placeholder, value, onChange, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setSearch("");
    }
  }, [isOpen]);

  const filteredGovs = GOVERNORATES.filter(g => g.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-1.5" ref={dropdownRef}>
      <label className="text-xs font-bold text-slate-700 uppercase tracking-wide ml-1">{label}</label>
      <div className="relative group">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-orange transition-colors z-10" size={18} />
        
        <div 
          className={`w-full pl-10 pr-10 py-3 bg-slate-50 border ${error ? 'border-red-400' : 'border-slate-200'} rounded-xl focus-within:ring-2 focus-within:ring-brand-orange/20 focus-within:border-brand-orange transition-all text-sm font-medium cursor-pointer flex items-center justify-between ${value ? 'text-slate-700' : 'text-slate-400'}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="truncate">{value || placeholder}</span>
          <ChevronDown size={16} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>

        {isOpen && (
          <div className="absolute z-20 w-full mt-2 bg-white border border-slate-100 rounded-xl shadow-xl shadow-slate-200/50 max-h-60 overflow-hidden flex flex-col">
            <div className="p-2 border-b border-slate-100 relative">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                autoFocus
                type="text"
                className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-brand-orange/50 text-sm"
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="overflow-y-auto p-1 custom-scrollbar">
              {filteredGovs.length > 0 ? (
                filteredGovs.map(gov => (
                  <div
                    key={gov}
                    className={`px-3 py-2 text-sm rounded-lg cursor-pointer transition-colors ${value === gov ? 'bg-brand-orange/10 text-brand-orange font-semibold' : 'hover:bg-slate-50 text-slate-700'}`}
                    onClick={() => {
                      onChange(gov);
                      setIsOpen(false);
                    }}
                  >
                    {gov}
                  </div>
                ))
              ) : (
                <div className="px-3 py-4 text-sm text-slate-400 text-center">Aucun résultat</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const QuoteForm: React.FC = () => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<QuoteFormData>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const departureCity = watch("departureCity");
  const arrivalCity = watch("arrivalCity");

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    // Google Analytics - Track Event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'generate_lead', {
        currency: 'TND',
        value: 1,
        event_category: 'form',
        event_label: 'Demande de Devis'
      });
    }

    // Assemble the message
    const message = `🚚 *Nouvelle demande de devis !*
*Nom:* ${data.fullName}
*Tél:* ${data.phone}
*De:* ${data.departureCity}
*Vers:* ${data.arrivalCity}
*Type:* ${data.moveType}
*Date:* ${data.date || 'Non spécifiée'}`;

    // 1. Send to Telegram
    const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;
    
    if (BOT_TOKEN && CHAT_ID) {
      try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'Markdown'
          })
        });

        if (!response.ok) {
          throw new Error("Erreur serveur Telegram");
        }
        setIsSubmitted(true);
      } catch (error) {
        console.error("Erreur Telegram:", error);
        setSubmitError("Une erreur s'est produite lors de l'envoi. Veuillez réessayer ou nous contacter par téléphone.");
      }
    } else {
      // Fallback if no env variables (to allow visual testing locally)
      setTimeout(() => {
        setIsSubmitted(true);
        setIsSubmitting(false);
      }, 800);
      return;
    }
    
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center justify-center text-center py-16 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-3xl font-extrabold text-slate-900 mb-4">Demande Envoyée !</h3>
        <p className="text-slate-600 text-lg max-w-sm mb-8">
          Merci pour votre confiance. Notre équipe traitera votre demande de devis et vous contactera très prochainement.
        </p>
        <button 
          onClick={() => setIsSubmitted(false)}
          className="text-brand-orange font-semibold hover:text-orange-600 transition-colors border-b-2 border-transparent hover:border-orange-600 pb-1"
        >
          Faire une autre demande
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
            <span className="bg-brand-orange/10 text-brand-orange text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">Gratuit</span>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">Sans engagement</span>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Obtenez votre devis</h3>
        <p className="text-slate-500 text-sm">Remplissez le formulaire ci-dessous pour une estimation rapide.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide ml-1">Nom Complet</label>
            <div className="relative group">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-orange transition-colors" size={18} />
              <input
                {...register("fullName", { 
                  required: "Le nom est requis", 
                  minLength: { value: 3, message: "Nom trop court" } 
                })}
                className={`w-full pl-10 pr-4 py-3 bg-slate-50 border ${errors.fullName ? 'border-red-400 focus:ring-red-400/20 focus:border-red-400' : 'border-slate-200 focus:ring-brand-orange/20 focus:border-brand-orange'} rounded-xl outline-none transition-all text-sm font-medium placeholder:text-slate-400 focus:ring-2`}
                placeholder="Votre nom"
              />
            </div>
            {errors.fullName && <p className="text-red-500 text-xs mt-1 ml-1">{errors.fullName.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide ml-1">Téléphone</label>
            <div className="relative group">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-orange transition-colors" size={18} />
              <input
                type="tel"
                {...register("phone", { 
                  required: "Le téléphone est requis",
                  pattern: {
                    value: /^[0-9]{8}$/,
                    message: "Numéro invalide (8 chiffres requis)"
                  }
                })}
                className={`w-full pl-10 pr-4 py-3 bg-slate-50 border ${errors.phone ? 'border-red-400 focus:ring-red-400/20 focus:border-red-400' : 'border-slate-200 focus:ring-brand-orange/20 focus:border-brand-orange'} rounded-xl outline-none transition-all text-sm font-medium placeholder:text-slate-400 focus:ring-2`}
                placeholder="Ex: 22 333 444"
              />
            </div>
            {errors.phone && <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone.message}</p>}
          </div>
        </div>

        {/* Cities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="w-full">
            <input type="hidden" {...register("departureCity", { required: true })} />
            <SearchableSelect
              label="Départ"
              icon={MapPin}
              placeholder="Ville de départ"
              value={departureCity || ""}
              onChange={(val) => setValue("departureCity", val, { shouldValidate: true })}
              error={!!errors.departureCity}
            />
          </div>

          <div className="w-full">
            <input type="hidden" {...register("arrivalCity", { required: true })} />
            <SearchableSelect
              label="Arrivée"
              icon={MapPin}
              placeholder="Ville d'arrivée"
              value={arrivalCity || ""}
              onChange={(val) => setValue("arrivalCity", val, { shouldValidate: true })}
              error={!!errors.arrivalCity}
            />
          </div>
        </div>

        {/* Type & Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide ml-1">Type</label>
            <div className="relative group">
              <Truck className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-orange transition-colors" size={18} />
              <select
                {...register("moveType", { required: true })}
                className={`w-full pl-10 pr-10 py-3 bg-slate-50 border ${errors.moveType ? 'border-red-400' : 'border-slate-200'} rounded-xl focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all text-sm font-medium appearance-none cursor-pointer text-slate-700`}
              >
                <option value="Appartement">Appartement</option>
                <option value="Villa">Villa</option>
                <option value="Bureau">Bureau</option>
                <option value="Petit déménagement">Petit déménagement</option>
              </select>
               <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                <ChevronDown size={16} />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
             <label className="text-xs font-bold text-slate-700 uppercase tracking-wide ml-1">Date Prévue</label>
             <div className="relative group">
               <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-orange transition-colors" size={18} />
               <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                {...register("date")}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all text-sm font-medium text-slate-700"
              />
             </div>
          </div>
        </div>

        {submitError && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
            {submitError}
          </div>
        )}

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-brand-orange to-orange-600 hover:from-orange-500 hover:to-orange-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center mt-4"
        >
          {isSubmitting ? (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <Send size={18} className="mr-2" />
          )}
          {isSubmitting ? 'Traitement en cours...' : 'Envoyer ma demande'}
        </button>
        
        <p className="text-center text-xs text-slate-400 mt-4">
          Vos données sont sécurisées et ne seront jamais partagées.
        </p>
      </form>
    </div>
  );
};