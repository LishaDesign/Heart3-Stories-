var V='sd-v6',SHELL=['./','index.html','doodle-creatures.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(SHELL)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==V}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){var r=e.request;if(r.method!=='GET')return;var u=new URL(r.url);
  if(u.origin!==location.origin&&!/(^|\.)(googleapis|gstatic)\.com$/.test(u.hostname))return;
  e.respondWith(caches.open(V).then(function(c){return c.match(r,{ignoreSearch:true}).then(function(hit){
    var net=fetch(r).then(function(res){if(res&&(res.ok||res.type==='opaque'))c.put(r,res.clone());return res}).catch(function(){return hit});
    return hit||net})}))});
