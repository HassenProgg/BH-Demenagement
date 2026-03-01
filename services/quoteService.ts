import { QuoteFormData } from "../types";

// This simulates the "app/api/quote/route.js" functionality requested.
// In a real Next.js app, this would be a fetch call to the backend API route.

export const sendQuoteRequest = async (data: QuoteFormData): Promise<boolean> => {
  console.log("Sending quote request to backend...", data);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // In a real environment, the logic below would be on the Server Side (Node.js)
  // --------------------------------------------------------------------------
  /*
  // app/api/quote/route.js logic mock:
  
  const { fullName, phone, departureCity, arrivalCity, moveType, date } = data;
  const message = `
    Nouveau Devis Déménagement:
    - Nom: ${fullName}
    - Tel: ${phone}
    - De: ${departureCity}
    - Vers: ${arrivalCity}
    - Type: ${moveType}
    - Date souhaitée: ${date || 'Non spécifiée'}
  `;

  // 1. Nodemailer Logic (Pseudo-code)
  // await transporter.sendMail({
  //   from: process.env.GMAIL_USER,
  //   to: 'admin@tunisiedemenagement.tn',
  //   subject: 'Nouvelle demande de devis',
  //   text: message
  // });

  // 2. Telegram Bot Logic (Pseudo-code)
  // await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`, {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     chat_id: process.env.TELEGRAM_CHAT_ID,
  //     text: message
  //   })
  // });
  */
  // --------------------------------------------------------------------------

  // Return success to UI
  return true;
};