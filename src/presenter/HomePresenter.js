// src > presenter > HomePresenter.js
import { getStories } from '../api.js';
import { updateSubscriptionButton, unsubscribePushNotification, subscribePushNotification, getPushSubscription } from '../utils/notificationHelper.js';

export default class HomePresenter {
    constructor(view) {
        this.view = view;
        // Jangan panggil init() di sini lagi
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
}

//muahahaha