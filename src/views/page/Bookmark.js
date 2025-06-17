// src/views/page/Bookmark.js
import L from 'leaflet';

export default class BookmarkView {
    constructor() {
        this.storiesContainer = null;
        this.messageContainer = null;
    }

    render() {
        const bookmarkContainer = document.createElement('div');
        bookmarkContainer.classList.add('fade-in');
        bookmarkContainer.innerHTML = `
            <div class="bookmark-container">
                <div class="header-container">
                    <a href="#/" class="back-button logout-btn">← Kembali</a>
                    <h2>Cerita Favorit Anda</h2>
                    <div style="width: 120px;"></div>
                </div>
                <div id="bookmarkStories" class="stories-container">Loading favorit cerita...</div>
                <p id="bookmarkMessage" class="empty-message"></p>
            </div>
        `;

        this.storiesContainer = bookmarkContainer.querySelector('#bookmarkStories');
        this.messageContainer = bookmarkContainer.querySelector('#bookmarkMessage');

        return bookmarkContainer;
    }

    showStories(stories) {
        this.storiesContainer.innerHTML = '';
        if (stories.length === 0) {
            this.messageContainer.innerHTML = '<p class="empty-message">Anda belum memiliki cerita favorit.</p>';
            return;
        }

        stories.forEach(story => {
            const storyElement = document.createElement('div');
            storyElement.classList.add('story-item', 'fade-in');
            storyElement.dataset.storyId = story.id;

            const createdAt = new Date(story.createdAt).toLocaleDateString('id-ID');

            storyElement.innerHTML = `
                <img class="story-img" src="${story.photoUrl}" alt="${story.description}" />
                <h3 class="story-title">${story.name}</h3>
                <p class="story-desc">${story.description.substring(0, 50)}...</p>
                <p class="story-date">Created At: ${createdAt}</p>
                <a class="detail-link" href="#/detail?id=${story.id}">Lihat Detail</a>
                <button class="remove-bookmark-btn" data-id="${story.id}">Hapus</button>
            `; // <-- PASTIKAN SINTAKS TEMPLATE LITERAL INI BENAR
            this.storiesContainer.appendChild(storyElement);
        });
        this.messageContainer.innerHTML = '';
    }

    showError(message = 'Gagal memuat cerita favorit.') {
        this.storiesContainer.innerHTML = '';
        this.messageContainer.innerHTML = `<p class="error">${message}</p>`;
    }

    bindRemoveBookmark(callback) {
        this.storiesContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('remove-bookmark-btn')) {
                const storyId = event.target.dataset.id;
                if (storyId) {
                    callback(storyId);
                }
            }
        });
    }

    removeStoryElement(storyId) {
        const storyElement = this.storiesContainer.querySelector(`[data-story-id="${storyId}"]`);
        if (storyElement) {
            storyElement.remove();
        }
    }
}