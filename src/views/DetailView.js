// src > views > DetailView.js
<<<<<<< HEAD
import L from 'leaflet'; // Pastikan Leaflet diimpor jika digunakan di sini
=======
import L from 'leaflet';
>>>>>>> b12315d9fb4f15c1881ebd7c0b045bf1e3007b18

export default class DetailView {
    constructor() {
        this.backButton = null;
        this.imgElement = null;
        this.usernameElement = null;
        this.captionElement = null;
        this.mapElement = null;
<<<<<<< HEAD
        this.favoriteButton = null; // Tambahkan referensi untuk tombol favorit
        this.favoriteMessageElement = null; // Tambahkan referensi untuk pesan favorit
=======
        this.favoriteButton = null;
        this.favoriteMessageElement = null;
>>>>>>> b12315d9fb4f15c1881ebd7c0b045bf1e3007b18
    }

    render() {
        const detailContainer = document.createElement('div');
        detailContainer.classList.add('detail-container');

<<<<<<< HEAD
        detailContainer.innerHTML = `
        <style>
            html, body {
                margin: 0;
                padding: 0;
                width: 100vw;
                height: 100vh;
                background: linear-gradient(135deg, #1E3A5F, #4682B4);
                color: white;
                overflow: hidden;
            }

            .detail-container {
                width: 100vw;
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 20px;
                box-sizing: border-box;
                overflow: auto;
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
                display: none;
            }

            .skip-to-content:focus {
                position: unset;
                display: inline-block;
            }

            /* Other Styles */
            .back-button {
                position: absolute;
                top: 15px;
                left: 15px;
                background: rgba(255, 255, 255, 0.3);
                border: none;
                color: white;
                font-size: 16px;
                padding: 10px 15px;
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
                transition: background 0.3s ease; /* Smooth transition for hover */
            }
            .back-button:hover {
                background: rgba(255, 255, 255, 0.5); /* Slightly lighter on hover */
            }

            .detail-box {
                background: rgba(255, 255, 255, 0.15);
                padding: 20px;
                border-radius: 10px;
                text-align: center;
                backdrop-filter: blur(10px);
                width: 90%;
                max-width: 900px;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 15px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.2); /* Add subtle shadow */
            }

            .content-container {
                display: flex;
                gap: 20px;
                width: 100%;
                max-width: 900px;
                align-items: center;
                justify-content: center;
            }

            .image-container, .map-container {
                width: 50%;
                height: 400px;
                background-color: #333; /* Dark background for consistency */
                border-radius: 10px;
                overflow: hidden; /* Ensure rounded corners for maps/images */
            }

            .story-img {
                width: 100%;
                height: 100%;
                border-radius: 10px;
                object-fit: contain;
                background-color: white;
            }

            #map {
                width: 100%;
                height: 100%;
                border-radius: 10px;
            }

            /* Favorite Button Styles */
            .favorite-button-container {
                display: flex;
                justify-content: center;
                width: 100%;
                margin-top: 10px;
            }
            .favorite-btn {
                background: #FFD700; /* Gold color for favorite */
                color: #333;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
                font-size: 16px;
                transition: background 0.3s ease;
                margin-top: 10px;
            }
            .favorite-btn:hover {
                background: #FFA500; /* Darker gold on hover */
            }
            .favorite-message {
                margin-top: 10px;
                font-size: 14px;
                color: #ADD8E6; /* Light blue for messages */
            }
            .error-message {
                color: #FF6347; /* Tomato color for errors */
            }


            @media (max-width: 768px) {
                .content-container {
                    flex-direction: column;
                }
                .image-container, .map-container {
                    width: 100%;
                    height: 300px;
                }
                .back-button {
                    position: static; /* Adjust positioning for smaller screens */
                    margin-bottom: 15px;
                    width: fit-content;
                }
                .detail-box {
                    padding: 15px;
                }
            }
            @media (max-width: 480px) {
                .detail-box {
                    padding: 10px;
                }
                .favorite-btn {
                    padding: 8px 15px;
                    font-size: 14px;
                }
            }
        </style>

        <!-- Skip to Content Link -->
=======
        // Hapus atau kosongkan seluruh blok <style> di sini
        detailContainer.innerHTML = `
>>>>>>> b12315d9fb4f15c1881ebd7c0b045bf1e3007b18
        <a href="#main-content" class="skip-to-content">Skip to main content</a>

        <button class="back-button" id="back-button">← Kembali</button>

        <div class="detail-box">
            <h2 class="title">Detail Story</h2>
            <p class="username" id="story-username">Loading...</p>
            <p class="caption" id="story-caption">Loading...</p>
            <div class="content-container" id="main-content" tabindex="-1">
                <div class="image-container">
                    <img class="story-img" src="" alt="Story Image" />
                </div>
                <div class="map-container">
                    <div id="map"></div>
                </div>
            </div>
            <div class="favorite-button-container">
                <button class="favorite-btn" id="favoriteButton">Favoritkan</button>
            </div>
            <p class="favorite-message" id="favoriteMessage"></p>
        </div>
        `;

        this.backButton = detailContainer.querySelector('#back-button');
        this.imgElement = detailContainer.querySelector('.story-img');
        this.usernameElement = detailContainer.querySelector('#story-username');
        this.captionElement = detailContainer.querySelector('#story-caption');
        this.mapElement = detailContainer.querySelector('#map');
<<<<<<< HEAD
        this.favoriteButton = detailContainer.querySelector('#favoriteButton'); // Dapatkan referensi tombol
        this.favoriteMessageElement = detailContainer.querySelector('#favoriteMessage'); // Dapatkan referensi elemen pesan
=======
        this.favoriteButton = detailContainer.querySelector('#favoriteButton');
        this.favoriteMessageElement = detailContainer.querySelector('#favoriteMessage');
>>>>>>> b12315d9fb4f15c1881ebd7c0b045bf1e3007b18

        return detailContainer;
    }

    showStory(story) {
        this.imgElement.src = story.photoUrl;
        this.imgElement.alt = story.description;
        this.usernameElement.innerText = `@${story.name}`;
        this.captionElement.innerText = story.caption || story.description;

        if (story.lat && story.lon) {
            this.setupMap(story);
        }
    }

    setupMap(story) {
        if (window.currentMap) {
            window.currentMap.remove();
        }

        window.currentMap = L.map(this.mapElement).setView([story.lat, story.lon], 12);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(window.currentMap);

        L.marker([story.lat, story.lon])
            .addTo(window.currentMap)
<<<<<<< HEAD
            .bindPopup(`<strong>${story.name}</strong><br>${story.description}`)
=======
            .bindPopup(`<strong><span class="math-inline">\{story\.name\}</strong\><br\></span>{story.description}`)
>>>>>>> b12315d9fb4f15c1881ebd7c0b045bf1e3007b18
            .openPopup();

        setTimeout(() => window.currentMap.invalidateSize(), 200);
    }

    showError() {
        this.usernameElement.innerText = 'Error loading story.';
        this.captionElement.innerText = 'Unable to load details.';
    }

    bindBackButton(callback) {
        this.backButton.addEventListener('click', callback);
    }

<<<<<<< HEAD
    // Metode baru untuk mengikat event tombol favorit
=======
>>>>>>> b12315d9fb4f15c1881ebd7c0b045bf1e3007b18
    bindFavoriteButton(callback) {
        if (this.favoriteButton) {
            this.favoriteButton.addEventListener('click', callback);
        }
    }

<<<<<<< HEAD
    // Metode untuk menampilkan status tombol favorit
=======
>>>>>>> b12315d9fb4f15c1881ebd7c0b045bf1e3007b18
    setFavoriteButtonStatus(isFavorited) {
        if (this.favoriteButton) {
            if (isFavorited) {
                this.favoriteButton.textContent = 'Hapus Favorit';
<<<<<<< HEAD
                this.favoriteButton.style.backgroundColor = '#FF6347'; // Contoh: warna merah/orange
            } else {
                this.favoriteButton.textContent = 'Favoritkan';
                this.favoriteButton.style.backgroundColor = '#FFD700'; // Contoh: warna gold
=======
                this.favoriteButton.style.backgroundColor = '#FF6347';
            } else {
                this.favoriteButton.textContent = 'Favoritkan';
                this.favoriteButton.style.backgroundColor = '#FFD700';
>>>>>>> b12315d9fb4f15c1881ebd7c0b045bf1e3007b18
            }
        }
    }

<<<<<<< HEAD
    // Metode untuk menampilkan pesan sukses
=======
>>>>>>> b12315d9fb4f15c1881ebd7c0b045bf1e3007b18
    showFavoriteMessage(message) {
        if (this.favoriteMessageElement) {
            this.favoriteMessageElement.textContent = message;
            this.favoriteMessageElement.classList.remove('error-message');
        }
    }

<<<<<<< HEAD
    // Metode untuk menampilkan pesan error
=======
>>>>>>> b12315d9fb4f15c1881ebd7c0b045bf1e3007b18
    showFavoriteErrorMessage(message) {
        if (this.favoriteMessageElement) {
            this.favoriteMessageElement.textContent = message;
            this.favoriteMessageElement.classList.add('error-message');
        }
    }
}