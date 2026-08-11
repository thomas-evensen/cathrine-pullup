// Delt lagring via kvdb.io (gratis nøkkel-verdi-lager, ingen innlogging).
// Bucket-ID fungerer som en uoffisiell hemmelighet: alle som har denne URL-en kan lese/skrive.
const KV_BASE = 'https://kvdb.io/JX69b38cxqLSCsdE2sqic5';

async function kvGetProgress() {
  const res = await fetch(KV_BASE + '/pullup', { cache: 'no-store' });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('kv-get-failed:' + res.status);
  const n = parseInt(await res.text(), 10);
  return Number.isFinite(n) ? Math.max(0, Math.min(100, n)) : null;
}

async function kvGetUpdatedAt() {
  const res = await fetch(KV_BASE + '/pullup_updated', { cache: 'no-store' });
  if (!res.ok) return null;
  const text = await res.text();
  return text || null;
}

async function kvSetProgress(value) {
  const v = Math.max(0, Math.min(100, Math.round(value)));
  const res = await fetch(KV_BASE + '/pullup', { method: 'PUT', body: String(v) });
  if (!res.ok) throw new Error('kv-set-failed:' + res.status);
  await fetch(KV_BASE + '/pullup_updated', { method: 'PUT', body: new Date().toISOString() });
  return v;
}
