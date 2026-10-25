import React from 'react';

export interface QuoteFormData {
  fullName: string;
  phone: string;
  departureCity: string;
  arrivalCity: string;
  moveType: 'Villa' | 'Appartement' | 'Bureau' | 'Petit déménagement';
  date?: string;
}

export interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  city: string;
}

export interface ServiceFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}