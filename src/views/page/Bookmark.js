// src/views/page/Bookmark.js
<<<<<<< HEAD
import L from 'leaflet'; // Import Leaflet jika Anda berencana menampilkan peta di halaman bookmark
=======
import L from 'leaflet';
>>>>>>> b12315d9fb4f15c1881ebd7c0b045bf1e3007b18

export default class BookmarkView {
    constructor() {
        this.storiesContainer = null;
<<<<<<< HEAD
        this.messageContainer = null; // Untuk pesan "Tidak ada cerita favorit"
=======
        this.messageContainer = null;
>>>>>>> b12315d9fb4f15c1881ebd7c0b045bf1e3007b18
    }

    render() {
        const bookmarkContainer = document.createElement('div');
<<<<<<< HEAD
        bookmarkContainer.classList.add('fade-in'); // Untuk transisi halus
        bookmarkContainer.innerHTML = `
            <style>
                html, body, #app {
                    margin: 0;
                    padding: 0;
                    width: 100vw;
                    height: 100vh;
                    overflow: hidden;
                    background: #1E3A5F;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: 'Arial', sans-serif;
                    color: white;
                    box-sizing: border-box;
                    flex-direction: column;
                    overflow-x: hidden;
                    justify-content: flex-start;
                    overflow-y: auto;
                }
                .bookmark-container {
                    width: 95%;
                    max-width: 1400px;
                    padding: 10px;
                    text-align: center;
                    position: relative;
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                    height: auto;
                }
                .header-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    max-width: 1400px;
                    padding: 10px;
                    cursor: pointer;
                }
                h2 {
                    color: white;
                    text-align: center;
                    flex-grow: 1;
                    margin: 0;
                    font-size: 32px;
                    font-weight: bold;
                }
                .stories-container {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 10px;
                    width: 100%;
                    padding-bottom: 20px;
                    overflow: visible;
                }
                .story-item {
                    flex: 1 1 calc(20% - 10px);
                    max-width: calc(20% - 10px);
                    background: rgba(255, 255, 255, 0.2);
                    backdrop-filter: blur(10px);
                    padding: 15px;
                    border-radius: 10px;
                    text-align: center;
                    transition: transform 0.3s;
                }
                .story-item:hover {
                    transform: translateY(-5px);
                }
                .story-date {
                    color: white;
                    font-size: 14px;
                    margin-top: 5px;
                }
                .story-img {
                    width: 100%;
                    height: 150px;
                    object-fit: cover;
                    border-radius: 5px;
                }
                .detail-link {
                    display: inline-block;
                    margin-top: 10px;
                    padding: 8px 12px;
                    border: 2px solid deepskyblue;
                    background-color: transparent;
                    color: deepskyblue;
                    text-decoration: none;
                    border-radius: 5px;
                    font-size: 1em;
                    transition: 0.3s;
                }
                .detail-link:hover {
                    background-color: deepskyblue;
                    color: white;
                }
                .remove-bookmark-btn { /* Gaya baru untuk tombol hapus */
                    background: #FF6347; /* Tomato color */
                    color: white;
                    padding: 8px 12px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: bold;
                    margin-top: 5px;
                    transition: background 0.3s ease;
                }
                .remove-bookmark-btn:hover {
                    background: #E5533D; /* Darker tomato on hover */
                }
                .empty-message {
                    text-align: center;
                    font-size: 20px;
                    color: #ccc;
                    margin-top: 50px;
                }
                /* Media Queries */
                @media (max-width: 1024px) {
                    .story-item {
                        flex: 1 1 calc(33.33% - 10px);
                        max-width: calc(33.33% - 10px);
                    }
                }
                @media (max-width: 768px) {
                    .story-item {
                        flex: 1 1 calc(50% - 10px);
                        max-width: calc(50% - 10px);
                    }
                }
                @media (max-width: 480px) {
                    .story-item {
                        flex: 1 1 100%;
                        max-width: 100%;
                    }
                    .header-container {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 10px;
                    }
                    .header-container h2 {
                        text-align: left;
                        width: 100%;
                    }
                }
            </style>

            <div class="bookmark-container">
                <div class="header-container">
                    <a href="#/" class="back-button logout-btn">← Kembali</a> <h2>Cerita Favorit Anda</h2>
                    <div style="width: 120px;"></div> </div>
=======
        bookmarkContainer.classList.add('fade-in');
        bookmarkContainer.innerHTML = `
            <div class="bookmark-container">
                <div class="header-container">
                    <a href="#/" class="back-button logout-btn">← Kembali</a>
                    <h2>Cerita Favorit Anda</h2>
                    <div style="width: 120px;"></div>
                </div>
>>>>>>> b12315d9fb4f15c1881ebd7c0b045bf1e3007b18
                <div id="bookmarkStories" class="stories-container">Loading favorit cerita...</div>
                <p id="bookmarkMessage" class="empty-message"></p>
            </div>
        `;

        this.storiesContainer = bookmarkContainer.querySelector('#bookmarkStories');
        this.messageContainer = bookmarkContainer.querySelector('#bookmarkMessage');
<<<<<<< HEAD
        // Optional: Anda bisa juga bind tombol kembali jika ingin custom logic
        // this.backButton = bookmarkContainer.querySelector('.back-button');
=======
>>>>>>> b12315d9fb4f15c1881ebd7c0b045bf1e3007b18

        return bookmarkContainer;
    }

    showStories(stories) {
        this.storiesContainer.innerHTML = '';
        if (stories.length === 0) {
<<<<<<< HEAD
            this.messageContainer.innerHTML = '<p>Anda belum memiliki cerita favorit.</p>';
=======
            this.messageContainer.innerHTML = '<p class="empty-message">Anda belum memiliki cerita favorit.</p>';
>>>>>>> b12315d9fb4f15c1881ebd7c0b045bf1e3007b18
            return;
        }

        stories.forEach(story => {
            const storyElement = document.createElement('div');
            storyElement.classList.add('story-item', 'fade-in');
<<<<<<< HEAD
            storyElement.dataset.storyId = story.id; // Penting untuk menghapus nanti
=======
            storyElement.dataset.storyId = story.id;
>>>>>>> b12315d9fb4f15c1881ebd7c0b045bf1e3007b18

            const createdAt = new Date(story.createdAt).toLocaleDateString('id-ID');

            storyElement.innerHTML = `
                <img class="story-img" src="${story.photoUrl}" alt="${story.description}" />
                <h3 class="story-title">${story.name}</h3>
                <p class="story-desc">${story.description.substring(0, 50)}...</p>
                <p class="story-date">Created At: ${createdAt}</p>
                <a class="detail-link" href="#/detail?id=${story.id}">Lihat Detail</a>
                <button class="remove-bookmark-btn" data-id="${story.id}">Hapus</button>
<<<<<<< HEAD
            `;
            this.storiesContainer.appendChild(storyElement);
        });
        this.messageContainer.innerHTML = ''; // Sembunyikan pesan jika ada cerita
=======
            `; // <-- PASTIKAN SINTAKS TEMPLATE LITERAL INI BENAR
            this.storiesContainer.appendChild(storyElement);
        });
        this.messageContainer.innerHTML = '';
>>>>>>> b12315d9fb4f15c1881ebd7c0b045bf1e3007b18
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