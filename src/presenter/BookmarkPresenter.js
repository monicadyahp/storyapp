// src/presenter/BookmarkPresenter.js
import StoryDatabase from '../data/database.js'; // Import database Anda

export default class BookmarkPresenter {
    constructor(view) {
        this.view = view;
        this.init();
    }

    async init() {
        await this.loadFavoriteStories();
        this.view.bindRemoveBookmark(this.handleRemoveBookmark.bind(this)); // Bind tombol hapus
    }

    async loadFavoriteStories() {
        try {
            const favoriteStories = await StoryDatabase.getAllStories();
            this.view.showStories(favoriteStories); // Tampilkan cerita favorit
        } catch (error) {
            console.error('Error loading favorite stories:', error);
            this.view.showError('Gagal memuat cerita favorit dari penyimpanan lokal.');
        }
    }

    async handleRemoveBookmark(storyId) {
        try {
            await StoryDatabase.deleteStory(storyId);
            this.view.removeStoryElement(storyId); // Hapus elemen dari DOM
            alert('Cerita berhasil dihapus dari favorit.');
            // Opsional: Cek jika tidak ada cerita lagi, tampilkan pesan kosong
            const remainingStories = await StoryDatabase.getAllStories();
            if (remainingStories.length === 0) {
                this.view.showStories([]); // Tampilkan pesan kosong jika semua dihapus
            }
        } catch (error) {
            console.error('Error removing story from bookmark:', error);
            alert('Gagal menghapus cerita dari favorit.');
        }
    }
}