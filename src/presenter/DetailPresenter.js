// src > presenter > DetailPresenter.js
import { getStoryDetail } from '../api.js';
import StoryDatabase from '../data/database.js';

export default class DetailPresenter {
    constructor(view) {
        this.view = view;
        this.storyId = null;
        this.storyData = null;
        // this.init(); // Jangan panggil init di konstruktor jika ada operasi DOM yang butuh view terpasang
    }

    // Metode init yang akan dipanggil dari router setelah view di-append
    async initialize() { // Mengubah nama dari init menjadi initialize
        await this.loadStory();
        // Panggil binding event setelah story dimuat dan view sudah di-render
        // (Diasumsikan router sudah append view.render() ke DOM)
        this.view.bindBackButton(this.handleBack.bind(this));
        this.view.bindFavoriteButton(this.handleFavoriteToggle.bind(this));
        await this.updateFavoriteButtonStatus(); // Perbarui status tombol setelah story dimuat
    }

    async loadStory() {
        const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
        this.storyId = urlParams.get('id');

        if (!this.storyId) {
            this.view.showError();
            return;
        }

        try {
            this.storyData = await getStoryDetail(this.storyId);
            if (this.storyData) {
                this.view.showStory(this.storyData);
                // Status tombol favorit akan diperbarui di initialize() setelah ini
            } else {
                this.view.showError();
            }
        } catch (error) {
            console.error('Error fetching story detail:', error);
            this.view.showError();
        }
    }

    async updateFavoriteButtonStatus() {
        if (!this.storyId) return;
        try {
            const favoritedStory = await StoryDatabase.getStoryById(this.storyId);
            this.view.setFavoriteButtonStatus(!!favoritedStory);
        } catch (error) {
            console.error('Error checking favorite status:', error);
            this.view.setFavoriteButtonStatus(false);
        }
    }

    async handleFavoriteToggle() {
        if (!this.storyData) return;
        this.view.favoriteButton.disabled = true;

        try {
            const isFavorited = await StoryDatabase.getStoryById(this.storyData.id);

            if (isFavorited) {
                await StoryDatabase.deleteStory(this.storyData.id);
                this.view.showFavoriteMessage('Story berhasil dihapus dari favorit.');
            } else {
                await StoryDatabase.addStory(this.storyData);
                this.view.showFavoriteMessage('Story berhasil ditambahkan ke favorit.');
            }
            await this.updateFavoriteButtonStatus();
        } catch (error) {
            console.error('Error toggling favorite status:', error);
            this.view.showFavoriteErrorMessage('Gagal mengubah status favorit.');
        } finally {
            this.view.favoriteButton.disabled = false;
        }
    }

    handleBack() {
        window.history.back();
    }
}