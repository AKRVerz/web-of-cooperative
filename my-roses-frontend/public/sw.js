if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,n)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>a(e,i),d={module:{uri:i},exports:t,require:r};s[i]=Promise.all(c.map((e=>d[e]||r(e)))).then((e=>(n(...e),t)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/Logo.jpg",revision:"33fd76e5162bbfa0c44d0bc843b2427e"},{url:"/Logo.webp",revision:"b47b5b2cc03f4a1861622fb38c912a89"},{url:"/_next/static/VPU4sAP5rSmu9YDJooGSl/_buildManifest.js",revision:"0cc98e370494908355864573716350b8"},{url:"/_next/static/VPU4sAP5rSmu9YDJooGSl/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/0c428ae2-3b1ecdadcfc78c3b.js",revision:"3b1ecdadcfc78c3b"},{url:"/_next/static/chunks/17007de1-f7b4d2279ef1bd24.js",revision:"f7b4d2279ef1bd24"},{url:"/_next/static/chunks/1a48c3c1-1564a3e67450745a.js",revision:"1564a3e67450745a"},{url:"/_next/static/chunks/1bfc9850-d7cc00af51954b05.js",revision:"d7cc00af51954b05"},{url:"/_next/static/chunks/228771e0-5e3c82ad10238b44.js",revision:"5e3c82ad10238b44"},{url:"/_next/static/chunks/231-a438a2a0db8eb37b.js",revision:"a438a2a0db8eb37b"},{url:"/_next/static/chunks/314-077b81b60110140b.js",revision:"077b81b60110140b"},{url:"/_next/static/chunks/398-fa62a9a86e894ac1.js",revision:"fa62a9a86e894ac1"},{url:"/_next/static/chunks/545f34e4-c1135ceb05436843.js",revision:"c1135ceb05436843"},{url:"/_next/static/chunks/65291039-0236f3c19f4fa3ff.js",revision:"0236f3c19f4fa3ff"},{url:"/_next/static/chunks/653-d6ea861010ed255a.js",revision:"d6ea861010ed255a"},{url:"/_next/static/chunks/656-4abd8942e3dbfeb9.js",revision:"4abd8942e3dbfeb9"},{url:"/_next/static/chunks/682-d2ba5a12a89ee40b.js",revision:"d2ba5a12a89ee40b"},{url:"/_next/static/chunks/710-d58f50f998ba5380.js",revision:"d58f50f998ba5380"},{url:"/_next/static/chunks/78e521c3-81940edd57e9c047.js",revision:"81940edd57e9c047"},{url:"/_next/static/chunks/808-5191c6bee09ec849.js",revision:"5191c6bee09ec849"},{url:"/_next/static/chunks/a1b9b43f-bbf6bde16aadbf17.js",revision:"bbf6bde16aadbf17"},{url:"/_next/static/chunks/c9184924-97fb4dad85136c5d.js",revision:"97fb4dad85136c5d"},{url:"/_next/static/chunks/d64684d8-a0b845c4b4dc1515.js",revision:"a0b845c4b4dc1515"},{url:"/_next/static/chunks/framework-8c5acb0054140387.js",revision:"8c5acb0054140387"},{url:"/_next/static/chunks/main-62d1391230fa3096.js",revision:"62d1391230fa3096"},{url:"/_next/static/chunks/pages/404-8fe61855ddd3a33b.js",revision:"8fe61855ddd3a33b"},{url:"/_next/static/chunks/pages/_app-fb1c39a53163476c.js",revision:"fb1c39a53163476c"},{url:"/_next/static/chunks/pages/_error-8353112a01355ec2.js",revision:"8353112a01355ec2"},{url:"/_next/static/chunks/pages/dashboard-14b37d6de7ac3646.js",revision:"14b37d6de7ac3646"},{url:"/_next/static/chunks/pages/dashboard/akun/admins-eec8be0b58722b63.js",revision:"eec8be0b58722b63"},{url:"/_next/static/chunks/pages/dashboard/akun/admins/%5Bid%5D/update-14be3bfc5cf61156.js",revision:"14be3bfc5cf61156"},{url:"/_next/static/chunks/pages/dashboard/akun/admins/create-f6f65d58c5c6eb82.js",revision:"f6f65d58c5c6eb82"},{url:"/_next/static/chunks/pages/dashboard/akun/members-6347eebc888fc344.js",revision:"6347eebc888fc344"},{url:"/_next/static/chunks/pages/dashboard/akun/members/%5Bid%5D/update-6f8ea6725d74c8dd.js",revision:"6f8ea6725d74c8dd"},{url:"/_next/static/chunks/pages/dashboard/akun/members/create-4a5d9e7a24a4b434.js",revision:"4a5d9e7a24a4b434"},{url:"/_next/static/chunks/pages/dashboard/iuran-7971ca7d02937aca.js",revision:"7971ca7d02937aca"},{url:"/_next/static/chunks/pages/dashboard/iuran/%5Bid%5D/update-3d76d5c53daa3200.js",revision:"3d76d5c53daa3200"},{url:"/_next/static/chunks/pages/dashboard/iuran/create-34224332a08d5585.js",revision:"34224332a08d5585"},{url:"/_next/static/chunks/pages/dashboard/pdf/pembukuan-586d2184770483fc.js",revision:"586d2184770483fc"},{url:"/_next/static/chunks/pages/dashboard/pembukuan-f4c944be6bdf8608.js",revision:"f4c944be6bdf8608"},{url:"/_next/static/chunks/pages/dashboard/pembukuan/%5Bid%5D/update-f2f086d7ed543f4a.js",revision:"f2f086d7ed543f4a"},{url:"/_next/static/chunks/pages/dashboard/pembukuan/create-711b9da9ff03146c.js",revision:"711b9da9ff03146c"},{url:"/_next/static/chunks/pages/index-3b1f4d9ca7b1af42.js",revision:"3b1f4d9ca7b1af42"},{url:"/_next/static/chunks/pages/login-195b076f628a9f89.js",revision:"195b076f628a9f89"},{url:"/_next/static/chunks/pages/settings-045ac89991095811.js",revision:"045ac89991095811"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-62c02dad1a6a4cb4.js",revision:"62c02dad1a6a4cb4"},{url:"/_next/static/css/d95efcac78a3c0ed.css",revision:"d95efcac78a3c0ed"},{url:"/_next/static/css/e11c1f2a55fcabd5.css",revision:"e11c1f2a55fcabd5"},{url:"/bg.png",revision:"fee67346d4ce18ac04f97c68303f1c8e"},{url:"/bg.webp",revision:"3198db4dfe1418b505ef2a95c97dfc84"},{url:"/favicon copy.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/icon-192x192.png",revision:"cff9227f9b348e73f8b832b6112b5a19"},{url:"/icon-256x256.png",revision:"f2a845e108e97bfcaebbfd6c7b8601ff"},{url:"/icon-384x384.png",revision:"69362f68ba4654127f2305fc9e3fb6dd"},{url:"/icon-512x512.png",revision:"2bb941b47480bc465e7ab0c40e768793"},{url:"/manifest.json",revision:"a8eef1078fcf9b76a5232456615fd9d1"},{url:"/service-worker.js",revision:"2f841c8cb1014d5a69b1ae2f347f2414"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
