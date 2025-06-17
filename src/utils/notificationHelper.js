// src/utils/notificationHelper.js
import { BASE_URL } from '../api.js';

const VAPID_PUBLIC_KEY = 'BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk';

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function isNotificationAvailable() {
  return 'Notification' in window;
}

export function isServiceWorkerAvailable() {
  return 'serviceWorker' in navigator;
}

export function isPushManagerAvailable() {
  return 'PushManager' in window;
}

export async function requestNotificationPermission() {
  if (!isNotificationAvailable()) {
    console.error('Notification API unsupported.');
    return false;
  }

  const permission = await Notification.requestPermission();
  return permission === 'granted';
}

export async function getPushSubscription() {
  if (!isServiceWorkerAvailable() || !isPushManagerAvailable()) {
    return null;
  }
  const registration = await navigator.serviceWorker.ready;
  return await registration.pushManager.getSubscription();
}

export async function subscribePushNotification() {
  if (!isServiceWorkerAvailable() || !isPushManagerAvailable()) {
    console.error('Service Worker or Push API not supported.');
    return null;
  }

  const permissionGranted = await requestNotificationPermission();
  if (!permissionGranted) {
    console.warn('Notification permission denied.');
    alert('Izin notifikasi ditolak. Anda tidak akan menerima notifikasi.');
    return null;
  }

  const existingSubscription = await getPushSubscription();
  if (existingSubscription) {
    console.log('Already subscribed to push notifications.');
    alert('Anda sudah berlangganan notifikasi.'); // Hanya satu alert
    return existingSubscription;
  }

  let pushSubscription = null;
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscribeOptions = {
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
    };
    pushSubscription = await registration.pushManager.subscribe(subscribeOptions);
    console.log('Push Subscription:', pushSubscription);

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('User not authenticated. Cannot subscribe to push notifications.');
      alert('Anda harus login untuk berlangganan notifikasi.');
      await pushSubscription.unsubscribe();
      return null;
    }

    const { endpoint, keys } = pushSubscription.toJSON();
    const dataToSend = { endpoint, keys };

    const response = await fetch(`${BASE_URL}/notifications/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(dataToSend),
    });

    const data = await response.json();
    if (response.ok && !data.error) {
      console.log('Subscription saved to server:', data);
      alert('Berhasil berlangganan notifikasi!'); // Hanya satu alert
      return pushSubscription;
    } else {
      console.error('Failed to save subscription to server:', data.message);
      alert('Gagal berlangganan notifikasi. Silakan coba lagi.');
      await pushSubscription.unsubscribe();
      return null;
    }
  } catch (error) {
    console.error('Error subscribing to push notifications:', error);
    alert('Terjadi kesalahan saat berlangganan notifikasi. Pastikan browser Anda mendukung dan coba lagi.');
    if (pushSubscription) {
      await pushSubscription.unsubscribe();
    }
    return null;
  } finally {
      // updateSubscriptionButton akan dipanggil dari HomePresenter atau main.js setelah aksi subscribe/unsubscribe selesai
      // Tidak perlu di dalam finally block helper function ini lagi untuk menghindari race condition
  }
}

export async function unsubscribePushNotification() {
  if (!isServiceWorkerAvailable() || !isPushManagerAvailable()) {
    console.error('Service Worker or Push API not supported.');
    return;
  }

  const subscription = await getPushSubscription();
  if (!subscription) {
    console.log('Not subscribed to push notifications.');
    alert('Anda belum berlangganan notifikasi.');
    return;
  }

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('User not authenticated. Cannot unsubscribe from push notifications.');
      alert('Anda harus login untuk berhenti berlangganan notifikasi.');
      return;
    }

    // Panggil API DELETE terlebih dahulu
    const response = await fetch(`${BASE_URL}/notifications/subscribe`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ endpoint: subscription.endpoint }),
    });

    const data = await response.json();
    if (response.ok && !data.error) {
      // Jika server berhasil, baru coba unsubscribe dari browser
      const unsubscribed = await subscription.unsubscribe();
      if (unsubscribed) {
        console.log('Successfully unsubscribed from push notifications.');
        alert('Berhasil berhenti berlangganan notifikasi.'); // Hanya satu alert
      } else {
        // Ini adalah skenario "Gagal berhenti berlangganan di browser."
        // Jika browser gagal, kita asumsikan status di server sudah dihapus,
        // jadi kita biarkan status di browser tetap tidak berlangganan.
        console.error('Failed to unsubscribe from browser (might already be unsubscribed or invalid).');
        alert('Gagal berhenti berlangganan di browser. Mungkin sudah tidak terdaftar.');
      }
    } else {
      console.error('Failed to unsubscribe from server:', data.message);
      alert('Gagal berhenti berlangganan notifikasi di server. Silakan coba lagi.');
      // Jika server gagal, jangan coba unsubscribe dari browser lagi, karena server mungkin belum menghapusnya.
      // Biarkan subscription tetap aktif di browser.
    }
  } catch (error) {
    console.error('Error unsubscribing from push notifications:', error);
    alert('Terjadi kesalahan saat berhenti berlangganan notifikasi. Silakan coba lagi.');
  } finally {
      // updateSubscriptionButton akan dipanggil dari HomePresenter atau main.js setelah aksi subscribe/unsubscribe selesai
      // Tidak perlu di dalam finally block helper function ini lagi
  }
}

// Fungsi untuk memeriksa dan menampilkan tombol subscribe/unsubscribe
export async function updateSubscriptionButton(buttonId, subscribeText, unsubscribeText) {
  const button = document.getElementById(buttonId);
  if (!button) return;

  button.disabled = true; // Nonaktifkan tombol saat memperbarui status

  if (!isServiceWorkerAvailable() || !isPushManagerAvailable()) {
    button.style.display = 'none';
    button.disabled = false;
    return;
  }

  try {
    const isSubscribed = await getPushSubscription();
    if (isSubscribed) {
      button.textContent = unsubscribeText;
      // Gunakan callback arrow function untuk memastikan `this` context
      button.onclick = async () => {
        await unsubscribePushNotification();
        // Setelah aksi selesai, pastikan tombol diperbarui lagi
        await updateSubscriptionButton(buttonId, subscribeText, unsubscribeText);
      };
    } else {
      button.textContent = subscribeText;
      // Gunakan callback arrow function
      button.onclick = async () => {
        await subscribePushNotification();
        // Setelah aksi selesai, pastikan tombol diperbarui lagi
        await updateSubscriptionButton(buttonId, subscribeText, unsubscribeText);
      };
    }
    button.style.display = 'block';
  } catch (error) {
    console.error('Error updating subscription button state:', error);
    button.style.display = 'none';
  } finally {
    button.disabled = false; // Aktifkan kembali
  }
}