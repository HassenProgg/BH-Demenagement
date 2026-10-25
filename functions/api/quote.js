const reply = (status, ok) => Response.json({ ok }, {
  status, headers: { 'Cache-Control': 'no-store' },
});

export async function onRequest({ request, env }) {
  if (request.method !== 'POST') return reply(405, false);
  if (request.headers.get('Origin') !== new URL(request.url).origin) return reply(403, false);
  if (!request.headers.get('Content-Type')?.includes('application/json')) return reply(415, false);
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return reply(503, false);

  let data;
  try {
    const reader = request.body?.getReader();
    if (!reader) return reply(400, false);
    const chunks = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 4096) { await reader.cancel(); return reply(413, false); }
      chunks.push(value);
    }
    data = JSON.parse(await new Blob(chunks).text());
  } catch { return reply(400, false); }

  if (!data || typeof data !== 'object' || Array.isArray(data)) return reply(400, false);
  for (const field of ['fullName', 'phone', 'departureCity', 'arrivalCity', 'moveType']) {
    if (typeof data[field] !== 'string' || !data[field].trim() || data[field].length > 120 || /[\r\n]/.test(data[field])) return reply(400, false);
  }
  if (!/^[+\d ()-]{8,25}$/.test(data.phone)) return reply(400, false);
  if (!['Villa', 'Appartement', 'Bureau', 'Petit déménagement'].includes(data.moveType)) return reply(400, false);
  if (data.date != null && data.date !== '' && (typeof data.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(data.date))) return reply(400, false);

  const message = `Nouvelle demande de devis\nNom : ${data.fullName}\nTéléphone : ${data.phone}\nDépart : ${data.departureCity}\nArrivée : ${data.arrivalCity}\nType : ${data.moveType}\nDate : ${data.date || 'Non spécifiée'}`;
  try {
    const response = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text: message }),
      signal: AbortSignal.timeout(10000),
    });
    await response.body?.cancel();
    return reply(response.ok ? 200 : 502, response.ok);
  } catch { return reply(502, false); }
}
