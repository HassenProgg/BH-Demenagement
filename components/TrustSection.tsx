import React, { useState, useEffect } from 'react';
import { Star, Quote, Plus, X } from 'lucide-react';
import { Review } from '../types';

const defaultReviews: Review[] = [
  {
    id: 1,
    name: "Mohamed Dridi",
    city: "Tunis",
    rating: 5,
    text: "Service impeccable ! L'équipe est arrivée à l'heure, très professionnelle. Aucun objet cassé, tout a été emballé avec soin. Je recommande vivement !"
  },
  {
    id: 2,
    name: "Sonia Ben Ali",
    city: "Sousse",
    rating: 5,
    text: "Wallah rat7ouni, déménagement ken s3yb 3liya ama m3akom t3ada sehel barcha. Metrobin w yekhdmou b 9alb w rab."
  },
  {
    id: 3,
    name: "Karim Mahjoub",
    city: "Ariana",
    rating: 5,
    text: "Service tayara ! jewni fil wa9t w 3awnouni fi kol chay. Prix ma39oul par rapport la qualité. Nans7ekom bihom wlh."
  }
];

export const TrustSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(defaultReviews);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', city: '', rating: 5, text: '' });

  useEffect(() => {
    const saved = localStorage.getItem('bh_demenagement_reviews');
    if (saved) {
      setReviews(JSON.parse(saved));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.city || !newReview.text) return;
    
    const review: Review = {
      id: Date.now(),
      ...newReview
    };
    
    // Add new review to the beginning of the list
    const updated = [review, ...reviews];
    setReviews(updated);
    localStorage.setItem('bh_demenagement_reviews', JSON.stringify(updated));
    setShowForm(false);
    setNewReview({ name: '', city: '', rating: 5, text: '' });
  };

  return (
    <section className="py-20 bg-slate-50 overflow-hidden" id="avis-clients">
      <div className="container mx-auto px-4 relative">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm mb-6">
            <img src="https://cdn.worldvectorlogo.com/logos/google-g-2015.svg" alt="Google" className="w-5 h-5" />
            <span className="text-sm font-bold text-slate-700">4.9/5 sur Google Avis</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
            Ils nous font <span className="text-brand-orange">confiance</span>
          </h2>
          <p className="text-slate-600 text-lg mb-8">
            Découvrez les retours de nos clients satisfaits à travers toute la Tunisie.
          </p>
          <button 
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-brand-primary border-2 border-brand-primary px-6 py-3 rounded-full font-bold transition-all shadow-sm hover:shadow-md"
          >
            <Plus size={20} />
            Ajouter un avis
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-8 text-slate-100 group-hover:text-brand-orange/10 transition-colors">
                <Quote size={40} fill="currentColor" />
              </div>

              <div className="flex gap-1 mb-6 text-yellow-400">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              
              <p className="text-slate-600 mb-6 leading-relaxed relative z-10 italic">
                "{review.text}"
              </p>
              
              <div className="flex items-center gap-4 border-t border-slate-50 pt-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-500 font-bold text-lg">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{review.name}</h4>
                  <p className="text-xs text-brand-orange font-medium uppercase tracking-wide">{review.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Form */}
        {showForm && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="bg-brand-primary p-6 text-white flex justify-between items-center">
                <h3 className="text-xl font-bold">Votre Avis Compte</h3>
                <button onClick={() => setShowForm(false)} className="text-white/80 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Nom Complet</label>
                  <input
                    required
                    type="text"
                    value={newReview.name}
                    onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all text-sm"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Ville</label>
                  <input
                    required
                    type="text"
                    value={newReview.city}
                    onChange={(e) => setNewReview({...newReview, city: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all text-sm"
                    placeholder="Ex: Tunis"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Note</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewReview({...newReview, rating: star})}
                        className={`transition-colors ${newReview.rating >= star ? 'text-yellow-400' : 'text-slate-200'}`}
                      >
                        <Star size={28} fill="currentColor" />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Commentaire</label>
                  <textarea
                    required
                    value={newReview.text}
                    onChange={(e) => setNewReview({...newReview, text: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all text-sm h-28 resize-none"
                    placeholder="Partagez votre expérience..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-brand-primary hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/30 transition-all mt-4"
                >
                  Publier l'avis
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};