self.addEventListener("install", function(e){ self.skipWaiting(); });
self.addEventListener("activate", function(e){ e.waitUntil(self.clients.claim()); });
self.addEventListener("fetch", function(e){
  var req=e.request;
  if(req.method!=="GET") return;
  e.respondWith(
    fetch(req).then(function(r){ return r; }).catch(function(){
      return caches.match(req).then(function(m){ return m || caches.match("./index.html"); });
    })
  );
});
