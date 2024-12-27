// public/apiMockServiceWorker.js
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    const basePath = location.pathname.split('/').slice(0, -1).join('/');

    if (!url.pathname.startsWith(`${basePath}/api/`)) {
      // Do not propagate this event to other listeners (from MSW)
      event.stopImmediatePropagation();
    }
  });
  
  importScripts('./mockServiceWorker.js');