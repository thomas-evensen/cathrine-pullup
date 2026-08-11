// Delt lagring via Firebase Realtime Database (REST API, ingen SDK).
// Databasereglene begrenser lese/skrivetilgang til kun "pullup" og "pullup_updated".
const KV_BASE = 'https://cathrine-909d8-default-rtdb.europe-west1.firebasedatabase.app';

async function kvGetProgress() {
  const res = await fetch(KV_BASE + '/pullup.json', { cache: 'no-store' });
  if (!res.ok) throw new Error('kv-get-failed:' + res.status);
  const value = await res.json();
  if (value === null) return null;
  const n = Number(value);
  return Number.isFinite(n) ? Math.max(0, Math.min(100, n)) : null;
}

async function kvGetUpdatedAt() {
  const res = await fetch(KV_BASE + '/pullup_updated.json', { cache: 'no-store' });
  if (!res.ok) return null;
  return await res.json();
}

async function kvSetProgress(value) {
  const v = Math.max(0, Math.min(100, Math.round(value)));
  const res = await fetch(KV_BASE + '/pullup.json', { method: 'PUT', body: JSON.stringify(v) });
  if (!res.ok) throw new Error('kv-set-failed:' + res.status);
  await fetch(KV_BASE + '/pullup_updated.json', {
    method: 'PUT',
    body: JSON.stringify(new Date().toISOString()),
  });
  return v;
}
