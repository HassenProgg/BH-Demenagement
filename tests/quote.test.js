import { test } from 'node:test';
import assert from 'node:assert/strict';
import { onRequest } from '../functions/api/quote.js';

const env = { TELEGRAM_BOT_TOKEN: 'test-token', TELEGRAM_CHAT_ID: 'test-chat' };
const data = { fullName: 'Test client', phone: '95527492', departureCity: 'Tunis', arrivalCity: 'Sousse', moveType: 'Appartement' };
const request = (body = data, origin = 'https://example.com') => new Request('https://example.com/api/quote', {
  method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: JSON.stringify(body),
});

test('rejects cross-origin requests, invalid fields, oversized bodies and missing configuration', async () => {
  assert.equal((await onRequest({ request: request(data, 'https://other.example'), env })).status, 403);
  assert.equal((await onRequest({ request: request({ ...data, phone: 'invalid' }), env })).status, 400);
  assert.equal((await onRequest({ request: request({ ...data, fullName: 'x'.repeat(5000) }), env })).status, 413);
  assert.equal((await onRequest({ request: request(), env: {} })).status, 503);
});

test('delivers on the server without returning credentials or customer details', async (t) => {
  let called = false;
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    called = true;
    assert.equal(url, 'https://api.telegram.org/bottest-token/sendMessage');
    const payload = JSON.parse(options.body);
    assert.equal(payload.chat_id, 'test-chat');
    assert.ok(payload.text.includes('Test client'));
    assert.equal(payload.parse_mode, undefined);
    return Response.json({ ok: true });
  });
  const response = await onRequest({ request: request(), env });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.ok(called);
});

test('does not claim success when Telegram rejects or times out', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => new Response('private upstream details', { status: 401 }));
  let response = await onRequest({ request: request(), env });
  assert.equal(response.status, 502);
  assert.deepEqual(await response.json(), { ok: false });
  t.mock.method(globalThis, 'fetch', async () => { throw new Error('secret URL'); });
  response = await onRequest({ request: request(), env });
  assert.equal(response.status, 502);
  assert.deepEqual(await response.json(), { ok: false });
});
