// src > views > DetailView.js
import L from 'leaflet';

export default class DetailView {
    constructor() {
        this.backButton = null;
        this.imgElement = null;
        this.usernameElement = null;
        this.captionElement = null;
        this.mapElement = null;
        this.favoriteButton = null;
        this.favoriteMessageElement = null;
    }

    render() {
        const detailContainer = document.createElement('div');
        detailContainer.classList.add('detail-container');

        // Hapus atau kosongkan seluruh blok <style> di sini
        detailContainer.innerHTML = `
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
        this.favoriteButton = detailContainer.querySelector('#favoriteButton');
        this.favoriteMessageElement = detailContainer.querySelector('#favoriteMessage');

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
            .bindPopup(`<strong><span class="math-inline">\{story\.name\}</strong\><br\></span>{story.description}`)
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

    bindFavoriteButton(callback) {
        if (this.favoriteButton) {
            this.favoriteButton.addEventListener('click', callback);
        }
    }

    setFavoriteButtonStatus(isFavorited) {
        if (this.favoriteButton) {
            if (isFavorited) {
                this.favoriteButton.textContent = 'Hapus Favorit';
                this.favoriteButton.style.backgroundColor = '#FF6347';
            } else {
                this.favoriteButton.textContent = 'Favoritkan';
                this.favoriteButton.style.backgroundColor = '#FFD700';
            }
        }
    }

    showFavoriteMessage(message) {
        if (this.favoriteMessageElement) {
            this.favoriteMessageElement.textContent = message;
            this.favoriteMessageElement.classList.remove('error-message');
        }
    }

    showFavoriteErrorMessage(message) {
        if (this.favoriteMessageElement) {
            this.favoriteMessageElement.textContent = message;
            this.favoriteMessageElement.classList.add('error-message');
        }
    }
}