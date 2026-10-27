const C='linux-v1',A=['./','index.html','app.js','manifest.webmanifest','icon-180.png','icon-512.png','v86/libv86.js','v86/v86.wasm','v86/seabios.bin','v86/vgabios.bin','img/linux.iso'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
// v86 may request ranges; always answer from full cached file
self.addEventListener('fetch',e=>e.respondWith((async()=>{const u=new URL(e.request.url);u.search='';
  const r=await caches.match(u.href)||await caches.match(e.request);if(!r)return fetch(e.request);
  const range=e.request.headers.get('range');if(!range)return r;
  const b=await r.arrayBuffer(),m=/bytes=(\d+)-(\d*)/.exec(range),s=+m[1],en=m[2]?+m[2]:b.byteLength-1;
  return new Response(b.slice(s,en+1),{status:206,headers:{'Content-Range':`bytes ${s}-${en}/${b.byteLength}`,'Content-Length':en-s+1}});})()));
