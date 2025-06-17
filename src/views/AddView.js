import L from 'leaflet';

export default class AddView {
    constructor() {
        this.addContainer = document.createElement('div');
        this.addContainer.classList.add('add-container');

        this.addContainer.innerHTML = `
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

    .add-container {
        width: 100%;
        max-width: 2000px;
        padding: 2px 10px;
        margin: 2px auto;
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        border-radius: 10px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .header-container {
        display: flex;
        justify-content: flex-start; /* Align items to the left */
        width: 100%;
        align-items: center; /* Vertically center the title */
        margin-bottom: 20px;
    }

    .header-container h2 {
        flex: 1;
        text-align: center; /* Center the title */
        font-size: 24px;
        font-weight: bold;
        margin: 0;
    }

    .back-button {
        padding: 10px;
        background: white;
        color: #1E3A5F;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
        margin-right: 10px; /* Add space between button and title */
    }

    .back-button:hover {
        background: #4682B4;
        color: white;
    }

    .back-button, .submit-btn {
        padding: 10px;
        background: white;
        color: #1E3A5F;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
    }

    .submit-btn:hover {
        background: #4682B4;
        color: white;
    }

    .form-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: left;
    }

    .input-group {
        width: 100%;
        margin-top: 20px;
        display: flex;
        flex-direction: column;
    }

    .input-group label {
        font-weight: bold;
        margin-bottom: 5px;
    }

    .input-group input {
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        border: none;
        margin-bottom: 10px;
    }

    .input-file-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 20px;
    }

    .input-file-container button {
        font-size: 14px;
        padding: 10px;
        background: white;
        color: #1E3A5F;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
    }

    .input-file-container button:hover {
        background: #4682B4;
        color: white;
    }

    .preview-container {
        width: 100%;
        max-width: 300px;
        height: 200px;
        background: #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 15px;
        border-radius: 8px;
        overflow: hidden;
    }

    #cameraPreview, #previewImage {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: none;
    }

    .map-container {
        width: 100%;
        height: 300px;
        margin-top: 20px;
        border-radius: 10px;
        overflow: hidden;
        display: flex;
        justify-content: center;
    }

    .button-container {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-top: 20px;
        width: 100%;
    }

    .submit-btn {
        padding: 10px 20px;
        background: white;
        color: #1E3A5F;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
        width: 100%;
    }

    .submit-btn:hover {
        background: #4682B4;
        color: white;
    }

    @media (max-width: 768px) {
        .add-container {
            padding: 15px;
        }

        .input-group input,
        .submit-btn {
            width: 100%;
        }

        .map-container {
            height: 250px;
        }
    }

    </style>

    <div class="add-container">
        <div class="header-container">
            <button class="back-button" id="backButton">← Kembali</button>
            <h2 class="header">Tambah Story</h2>
        </div>

        <!-- Form -->
        <div class="form-container">
            <div class="input-group">
                <label for="description">Deskripsi Story</label>
                <input type="text" id="description" name="description" placeholder="Deskripsi Story" required />
            </div>

            <!-- Location Button -->
            <div class="button-container">
                <button id="locateMe" type="button" class="submit-btn">📍 Gunakan Lokasi Saya</button>
                <span id="loadingText">Mengambil lokasi...</span>
            </div>

            <!-- Photo Input and Camera Button -->
            <div class="input-file-container">
                <input type="file" id="photo" name="photo" accept="image/*" required />
                <button type="button" id="openCamera" class="submit-btn">📷 Gunakan Kamera</button>
            </div>

            <!-- Preview Image/Camera -->
            <div id="previewContainer" class="preview-container">
                <video id="cameraPreview"></video>
                <img id="previewImage" />
                <button type="button" id="capturePhoto" class="submit-btn">📸 Ambil Foto</button>
            </div>

            <!-- Map Section -->
            <div id="map-container" class="map-container">
                <div id="map" class="small-map"></div>
            </div>

            <input type="hidden" id="latitude" name="latitude" />
            <input type="hidden" id="longitude" name="longitude" />

            <!-- Submit Button -->
            <div class="button-container">
                <button id="addStoryButton" class="submit-btn">Tambah Story</button>
            </div>

            <p id="addStoryMessage"></p>
        </div>
    </div>
`;

        // Bind elements
        this.mapContainer = this.addContainer.querySelector('#map');
        this.loadingText = this.addContainer.querySelector('#loadingText');
        this.previewImage = this.addContainer.querySelector('#previewImage');
        this.cameraPreview = this.addContainer.querySelector('#cameraPreview');
        this.addStoryMessage = this.addContainer.querySelector('#addStoryMessage');
        this.latitudeInput = this.addContainer.querySelector('#latitude');
        this.longitudeInput = this.addContainer.querySelector('#longitude');
        this.backButton = this.addContainer.querySelector('#backButton');
        this.addStoryButton = this.addContainer.querySelector('#addStoryButton');
        this.form = this.addContainer.querySelector('#addStoryForm');
        this.captureButton = this.addContainer.querySelector('#capturePhoto');
        this.fileInput = this.addContainer.querySelector('#photo');

        this.map = null;
        this.marker = null;
        this.stream = null;
    }

    getContainer() {
        return this.addContainer;
    }

    // Add getters for input values
    getDescription() {
        return this.addContainer.querySelector('#description').value;
    }

    getPhoto() {
        return this.addContainer.querySelector('#photo').files[0];
    }

    getLatitude() {
        return this.latitudeInput.value;
    }

    getLongitude() {
        return this.longitudeInput.value;
    }

    // Setters for latitude and longitude
    setLatitude(latitude) {
        this.latitudeInput.value = latitude;
    }

    setLongitude(longitude) {
        this.longitudeInput.value = longitude;
    }

    // Map handling
    initializeMap(latitude = -6.200000, longitude = 106.816666) {
        setTimeout(() => {
            if (this.mapContainer && this.mapContainer.offsetWidth > 0 && this.mapContainer.offsetHeight > 0) {
                this.map = L.map(this.mapContainer).setView([latitude, longitude], 10);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap contributors'
                }).addTo(this.map);
                this.map.on('click', (event) => this.onMapClick(event));
                this.map.invalidateSize();
            } else {
                console.error("Map container has no size or is not loaded yet.");
            }
        }, 200);
    }

    onMapClick(event) {
        const latitude = event.latlng.lat;
        const longitude = event.latlng.lng;

        if (!this.marker) {
            this.marker = L.marker([latitude, longitude]).addTo(this.map);
        } else {
            this.marker.setLatLng([latitude, longitude]);
        }

        this.setLatitude(latitude);
        this.setLongitude(longitude);
    }

    updateMap(latitude, longitude) {
        if (this.map && this.marker) {
            this.map.setView([latitude, longitude], 15);
            this.marker.setLatLng([latitude, longitude]);
        }
    }

    // Utility functions
    showLoading() {
        this.loadingText.style.display = 'inline';
    }

    hideLoading() {
        this.loadingText.style.display = 'none';
    }

    showError(message) {
        this.addStoryMessage.innerText = message;
    }

    showSuccess(message) {
        this.addStoryMessage.innerText = message;
    }
}