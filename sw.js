self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("pura-essencia-store").then((cache) => {
      return cache.addAll([
        "index.html",
        "catalogo.html",
        "estoque.html",
        "movimentacoes.html",
        "relatorios.html",
        "configuracoes.html",
        "style.css",
        "app.js"
      ]);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});

