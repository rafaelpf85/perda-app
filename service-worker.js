// Service worker mínimo — só existe para o navegador considerar este site
// "instalável" como PWA. Não faz cache agressivo (o formulário sempre
// precisa buscar dados atualizados do Google, então cache offline real
// não se aplica aqui).

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // passthrough simples — sempre busca da rede
  event.respondWith(fetch(event.request).catch(() => {
    return new Response(
      '<html><body style="background:#0f0f0f;color:#f0f0f0;font-family:sans-serif;padding:40px;text-align:center;">' +
      '<h2>Sem conexão</h2><p>Verifique sua internet e tente novamente.</p></body></html>',
      { headers: { 'Content-Type': 'text/html; charset=UTF-8' } }
    );
  }));
});
