// src/main.js
import { router } from './routes.js';
import './style.css';
import { isServiceWorkerAvailable, updateSubscriptionButton } from './utils/notificationHelper.js';
import { initializeDatabase } from './data/database.js'; // Import fungsi baru

const appContainer = document.getElementById('app');

const handleRouteChange = async () => {
  if (document.startViewTransition) {
    await document.startViewTransition(router);
  } else {
    await router();
  }

  if (window.location.hash === '#/' || window.location.hash === '') {
      await updateSubscriptionButton('notificationButton', 'Aktifkan Notifikasi', 'Nonaktifkan Notifikasi');
  }
};

window.addEventListener('hashchange', handleRouteChange);
window.addEventListener('load', handleRouteChange);

document.addEventListener('DOMContentLoaded', async () => {
  // Inisialisasi Service Worker
  if (isServiceWorkerAvailable()) {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  } else {
    console.warn('Service Workers are not supported in this browser.');
  }

  // Inisialisasi IndexedDB database saat DOMContentLoaded
  await initializeDatabase(); // Panggil fungsi ini untuk memastikan database terbuka

  // Muat halaman awal
  await handleRouteChange();
});