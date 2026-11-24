const C="turnier-v11";const FILES=["./","./index.html","./manifest.webmanifest","./icon-180.png","./icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;
 const nav=e.request.mode==="navigate"||/index\.html$/.test(new URL(e.request.url).pathname);
 e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>{const net=fetch(e.request).then(r=>{if(r&&(r.ok||r.type==="opaque")){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));}return r;}).catch(()=>hit);return nav?net.then(r=>r||hit):(hit||net);}));});
