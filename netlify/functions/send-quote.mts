import type { Config } from "@netlify/functions";

export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const BOT_TOKEN = Netlify.env.get("TELEGRAM_BOT_TOKEN");
  const CHAT_ID = Netlify.env.get("TELEGRAM_CHAT_ID");

  if (!BOT_TOKEN || !CHAT_ID) {
    console.error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID env vars");
    return Response.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  let data;
  try {
    data = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { fullName, phone, departureCity, arrivalCity, moveType, date } = data;

  if (!fullName || !phone || !departureCity || !arrivalCity || !moveType) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  const message = `🚚 *Nouvelle demande de devis !*
*Nom:* ${fullName}
*Tél:* ${phone}
*De:* ${departureCity}
*Vers:* ${arrivalCity}
*Type:* ${moveType}
*Date:* ${date || "Non spécifiée"}`;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: "Markdown",
        }),
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Telegram API error:", errorBody);
      return Response.json(
        { error: "Failed to send message" },
        { status: 502 }
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Telegram request failed:", error);
    return Response.json({ error: "Failed to send message" }, { status: 502 });
  }
};

export const config: Config = {
  path: "/api/send-quote",
  method: "POST",
};
