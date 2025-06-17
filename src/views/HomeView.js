<<<<<<< HEAD
// src > views > HomeView.js
export default class HomeView {
=======
// src > views > page > Home.js
// Hapus import HomePresenter dan HomeView dari sini. Ini adalah VIEW.
// import HomePresenter from '../../presenter/HomePresenter'; // Hapus
// import HomeView from '../HomeView'; // Hapus

export default class HomeView { // <-- UBAH default export menjadi kelas HomeView
>>>>>>> b12315d9fb4f15c1881ebd7c0b045bf1e3007b18
    constructor() {
        this.storiesContainer = null;
        this.logoutButton = null;
        this.skipToContent = null;
        this.headerContainer = null;
<<<<<<< HEAD
        this.notificationButton = null; // Tambahkan referensi untuk tombol notifikasi
=======
        this.notificationButton = null;
>>>>>>> b12315d9fb4f15c1881ebd7c0b045bf1e3007b18
    }

    render() {
        const homeContainer = document.createElement('div');
        homeContainer.classList.add('fade-in');
        
        homeContainer.innerHTML = `
        <style>
            html, body {
                margin: 0;
                padding: 0;
                width: 100vw;
                height: 100vh;
                background: #1E3A5F;
                font-family: 'Arial', sans-serif;
                color: white;
                box-sizing: border-box;
                overflow: hidden;
            }

            #app {
                width: 100vw;
                height: 100vh;
                overflow-y: auto;
                overflow-x: hidden;
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .home-container {
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

            /* Skip to Content Link */
            .skip-to-content {
                position: absolute;
                top: 10px;
                left: 10px;
                padding: 10px;
                background-color: rgba(255, 255, 255, 0.6);
                color: #1E3A5F;
                font-weight: bold;
                border-radius: 5px;
                text-decoration: none;
                z-index: 1000;
                height: 1px;
                width: 1px;
                overflow: hidden;
                clip: rect(1px, 1px, 1px, 1px); /* Initially hidden */
            }

            .skip-to-content:focus {
                position: unset;
                height: auto;
                width: auto;
                display: inline-block;
                clip: unset;
                outline: none;
                box-shadow: 0 0 5px 2px rgba(255, 255, 255, 0.8);
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

            .logout-btn {
                background: red;
                color: white;
                padding: 8px 12px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
                margin-left: 10px;
            }

            .add-story-btn {
                background: #007bff;
                color: white;
                padding: 8px 12px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
                margin-right: 10px;
                text-decoration: none;
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
            }
            .header-buttons {
                display: flex;
                gap: 10px;
                align-items: center;
            }

            .notification-btn {
                background: #FFC107; /* Warna kuning untuk notifikasi */
                color: #333;
                padding: 8px 12px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
                transition: 0.3s;
                margin-right: 10px; /* Jaga jarak dengan tombol lain */
<<<<<<< HEAD
                display: none; /* Sembunyikan secara default, akan diatur oleh JS */
=======
>>>>>>> b12315d9fb4f15c1881ebd7c0b045bf1e3007b18
            }

            .notification-btn:hover {
                background: #E0A800;
                color: white;
            }

            /* Dalam <style> tag di HomeView.js atau di styles.css */
                .empty-message {
                    text-align: center;
                    font-size: 20px;
                    color: #ccc;
                    margin-top: 50px;
                    width: 100%; /* Pastikan ini bisa di tengah */
            }

                        .header-buttons {
                display: flex;
                gap: 10px;
                align-items: center;
            }

            .notification-btn {
                background: #FFC107; /* Warna kuning untuk notifikasi */
                color: #333;
                padding: 8px 12px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
                transition: 0.3s;
                margin-right: 10px;
                /* display: none; */ /* Hapus ini, biarkan visible agar JS bisa akses */
            }

            .notification-btn:hover {
                background: #E0A800;
                color: white;
            }
            .empty-message { /* Pastikan ini ada di style Anda atau di styles.css */
                text-align: center;
                font-size: 20px;
                color: #ccc;
                margin-top: 50px;
                width: 100%;
            }
        </style>

        <a href="#stories" class="skip-to-content" id="skipToContent">Skip to main content</a>

        <div class="home-container">
            <div class="header-container" id="header">
                <button id="logout" class="logout-btn">Logout</button>
                <h2>Daftar Story</h2>
                <div class="header-buttons">
                    <button id="notificationButton" class="notification-btn">Aktifkan Notifikasi</button>
                    <a href="#/bookmark" class="add-story-btn" style="background: #28a745;">Lihat Favorit</a>
                    <a href="#/add" class="add-story-btn">Tambah Story</a>
                </div>
            </div>
            <div id="stories" class="stories-container" tabindex="-1">Loading...</div>
        </div>
        `;

        this.storiesContainer = homeContainer.querySelector('#stories');
        this.logoutButton = homeContainer.querySelector('#logout');
        this.skipToContent = homeContainer.querySelector('#skipToContent');
        this.headerContainer = homeContainer.querySelector('#header');
<<<<<<< HEAD
        this.notificationButton = homeContainer.querySelector('#notificationButton'); // Bind tombol notifikasi
=======
        this.notificationButton = homeContainer.querySelector('#notificationButton');

        // PENTING: Event listeners ini HARUS DI BIND DI PRESENTER, bukan di View
        // Karena presenter yang punya callback
        // homeContainer.querySelector('h2').addEventListener('click', ...); // Hapus ini
        // homeContainer.addEventListener('keydown', ...); // Hapus ini
        // this.skipToContent.addEventListener('click', ...); // Hapus ini
        // this.skipToContent.addEventListener('keydown', ...); // Hapus ini
>>>>>>> b12315d9fb4f15c1881ebd7c0b045bf1e3007b18

        return homeContainer;
    }

    showStories(stories) {
<<<<<<< HEAD
        this.storiesContainer.innerHTML = ''; // Kosongkan dulu "Loading..."

        if (!stories || stories.length === 0) { // Cek jika stories null/undefined atau kosong
            this.storiesContainer.innerHTML = '<p class="empty-message">Tidak ada cerita tersedia.</p>'; // Tambahkan class untuk styling
=======
        this.storiesContainer.innerHTML = '';

        if (!stories || stories.length === 0) {
            this.storiesContainer.innerHTML = '<p class="empty-message">Tidak ada cerita tersedia.</p>';
>>>>>>> b12315d9fb4f15c1881ebd7c0b045bf1e3007b18
            return;
        }

        stories.slice(0, 10).forEach(story => {
            const storyElement = document.createElement('div');
            storyElement.classList.add('story-item', 'fade-in');

            const createdAt = new Date(story.createdAt).toLocaleDateString('id-ID');

            storyElement.innerHTML = `
                <img class="story-img" src="${story.photoUrl}" alt="${story.description}" />
                <h3 class="story-title">${story.name}</h3>
                <p class="story-desc">${story.description.substring(0, 50)}...</p>
                <p class="story-date">Created At: ${createdAt}</p>
                <a class="detail-link" href="#/detail?id=${story.id}">Lihat Detail</a>
            `;
            this.storiesContainer.appendChild(storyElement);
        });
    }
<<<<<<< HEAD
    showError() {
        this.storiesContainer.innerHTML = `<p class="error">Gagal memuat story.</p>`;
    }

    // bindLogout dipindahkan ke sini, di luar bindHeader
=======

    showError(message) { // Tambah parameter message
        this.storiesContainer.innerHTML = `<p class="error">${message}</p>`;
    }

>>>>>>> b12315d9fb4f15c1881ebd7c0b045bf1e3007b18
    bindLogout(callback) {
        this.logoutButton.addEventListener('click', callback);
    }

<<<<<<< HEAD
    // Add method to focus on stories container
=======
>>>>>>> b12315d9fb4f15c1881ebd7c0b045bf1e3007b18
    focusOnStories() {
        this.storiesContainer.focus();
    }

<<<<<<< HEAD
    // Show skip to content link only when tab is pressed
    showSkipToContent() {
        this.skipToContent.style.display = 'inline-block'; // Show the button when tab is pressed
        this.skipToContent.focus(); // Set focus to the skip to content link
    }

    // Hide skip to content when clicked or enter is pressed
=======
    showSkipToContent() {
        this.skipToContent.style.display = 'inline-block';
        this.skipToContent.focus();
    }

>>>>>>> b12315d9fb4f15c1881ebd7c0b045bf1e3007b18
    hideSkipToContent() {
        this.skipToContent.style.display = 'none';
    }

<<<<<<< HEAD
    // Add event listener to handle focus and tab press
    bindHeader() {
        this.headerContainer.addEventListener('click', () => {
            // Do nothing when the header is clicked
        });

        this.skipToContent.addEventListener('click', () => {
            this.hideSkipToContent(); // Hide skip to content when clicked
        });

        this.skipToContent.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.hideSkipToContent(); // Hide skip to content when Enter is pressed
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                this.showSkipToContent(); // Show the skip to content when Tab is pressed
            }
        });

        // Hide skip to content if focus leaves the page
        document.addEventListener('click', (e) => {
            if (!this.skipToContent.contains(e.target) && !this.headerContainer.contains(e.target)) {
                this.hideSkipToContent();
            }
        });
    }

    // bindNotificationButton dipindahkan ke sini, di luar bindHeader
=======
    // Metode ini HARUS di `HomePresenter` dan dipanggil olehnya
    bindHeaderAndSkipContentLogic(headerCallback, skipClickCallback, skipKeydownCallback, docKeydownCallback, docClickCallback) {
        this.headerContainer.addEventListener('click', headerCallback);
        this.skipToContent.addEventListener('click', skipClickCallback);
        this.skipToContent.addEventListener('keydown', skipKeydownCallback);
        document.addEventListener('keydown', docKeydownCallback);
        document.addEventListener('click', docClickCallback);
    }
    
>>>>>>> b12315d9fb4f15c1881ebd7c0b045bf1e3007b18
    bindNotificationButton(callback) {
        if (this.notificationButton) {
            this.notificationButton.addEventListener('click', callback);
        }
    }
}