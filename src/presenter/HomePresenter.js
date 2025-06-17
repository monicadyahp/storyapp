// src > presenter > HomePresenter.js
import { getStories } from '../api.js';
import { updateSubscriptionButton, unsubscribePushNotification, subscribePushNotification, getPushSubscription } from '../utils/notificationHelper.js';

export default class HomePresenter {
    constructor(view) {
        this.view = view;
<<<<<<< HEAD
        // Jangan panggil init() di sini lagi
=======
>>>>>>> b12315d9fb4f15c1881ebd7c0b045bf1e3007b18
    }

    async init() { // Ini akan dipanggil dari router setelah view di-render
        this.view.bindLogout(this.handleLogout.bind(this));
        
        // Bind logika Skip to Content dan Header
        this.view.bindHeaderAndSkipContentLogic(
            () => { /* Do nothing on header click */ },
            () => { this.view.hideSkipToContent(); this.view.focusOnStories(); },
            (e) => { if (e.key === 'Enter') { this.view.hideSkipToContent(); this.view.focusOnStories(); } },
            (e) => { if (e.key === 'Tab') { this.view.showSkipToContent(); } },
            (e) => { 
                if (!this.view.skipToContent.contains(e.target) && !this.view.headerContainer.contains(e.target)) {
                    this.view.hideSkipToContent();
                }
            }
        );

        // Memastikan tombol notifikasi diinisialisasi setelah DOM yakin sudah ada
        await this.loadStories(); // Muat cerita dulu agar elemen stories ada

        setTimeout(async () => {
<<<<<<< HEAD
        await updateSubscriptionButton('notificationButton', 'Subscribe', 'Disubscribe');
        const notificationButton = this.view.notificationButton;
        if (notificationButton) {
            notificationButton.onclick = async () => {
                const isSubscribed = await getPushSubscription();
                if (isSubscribed) {
                    await unsubscribePushNotification();
                    notificationButton.textContent = 'Subscribe';
                    notificationButton.style.backgroundColor = '#FFC107'; // Restore original color
                } else {
                    await subscribePushNotification();
                    notificationButton.textContent = 'Disubscribe';
                    notificationButton.style.backgroundColor = '#E0A800'; // Darker color for active state
                }
            };
        } else {
            console.warn("Notification button element not found on init after timeout.");
        }
    }, 50);

=======
            await updateSubscriptionButton('notificationButton', 'Aktifkan Notifikasi', 'Nonaktifkan Notifikasi');
            const notificationButton = this.view.notificationButton;
            if (notificationButton) {
                notificationButton.onclick = async () => {
                    const isSubscribed = await getPushSubscription();
                    if (isSubscribed) {
                        await unsubscribePushNotification();
                    } else {
                        await subscribePushNotification();
                    }
                };
            } else {
                console.warn("Notification button element not found on init after timeout.");
            }
        }, 50);
>>>>>>> b12315d9fb4f15c1881ebd7c0b045bf1e3007b18
    }

    async loadStories() {
        try {
            const stories = await getStories();
            this.view.showStories(stories);
        } catch (error) {
            console.error('Error fetching stories:', error);
            this.view.showError('Gagal memuat story. Silakan coba lagi atau periksa koneksi internet Anda.');
        }
    }

    handleLogout() {
        localStorage.removeItem('token');
        unsubscribePushNotification();
        window.location.hash = '#/';
        window.location.reload();
    }
<<<<<<< HEAD
}

//muahahaha
//jelek
//cihuy
=======
}
>>>>>>> b12315d9fb4f15c1881ebd7c0b045bf1e3007b18
