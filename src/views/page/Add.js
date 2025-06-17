// src > views > page > Add.js
import L from 'leaflet'; // Pastikan L diimpor

export default class AddView { // Ubah ini menjadi kelas
    constructor() {
        this.addContainer = document.createElement('div');
        this.addContainer.classList.add('add-container');

        // Hapus atau kosongkan seluruh blok <style> di sini
        this.addContainer.innerHTML = `
        <div class="add-container">
            <div class="header-container">
                <button class="back-button" id="backButton">← Kembali</button>
                <h2 class="header">Tambah Story</h2>
            </div>

            <div class="form-container">
                <div class="input-group">
                    <label for="description">Deskripsi Story</label>
                    <input type="text" id="description" name="description" placeholder="Deskripsi Story" required />
                </div>

                <div class="button-container">
                    <button id="locateMe" type="button" class="submit-btn">📍 Gunakan Lokasi Saya</button>
                    <span id="loadingText">Mengambil lokasi...</span>
                </div>

                <div class="input-file-container">
                    <input type="file" id="photo" name="photo" accept="image/*" required />
                    <button type="button" id="openCamera" class="submit-btn">📷 Gunakan Kamera</button>
                </div>

                <div id="previewContainer" class="preview-container">
                    <video id="cameraPreview"></video>
                    <img id="previewImage" />
                    <button type="button" id="capturePhoto" class="submit-btn">📸 Ambil Foto</button>
                </div>

                <div id="map-container" class="map-container">
                    <div id="map" class="small-map"></div>
                </div>

                <input type="hidden" id="latitude" name="latitude" />
                <input type="hidden" id="longitude" name="longitude" />

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

    getDescription() { return this.addContainer.querySelector('#description').value; }
    getPhoto() { return this.addContainer.querySelector('#photo').files[0]; }
    getLatitude() { return this.latitudeInput.value; }
    getLongitude() { return this.longitudeInput.value; }

    setLatitude(latitude) { this.latitudeInput.value = latitude; }
    setLongitude(longitude) { this.longitudeInput.value = longitude; }

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
        if (event.latlng) {
            const latitude = event.latlng.lat;
            const longitude = event.latlng.lng;

            if (!this.marker) {
                this.marker = L.marker([latitude, longitude]).addTo(this.map);
            } else {
                this.marker.setLatLng([latitude, longitude]);
            }
            this.setLatitude(latitude);
            this.setLongitude(longitude);
        } else {
            console.error("Event does not have latlng properties");
        }
    }

    updateMap(latitude, longitude) {
        if (this.map && this.marker) {
            this.map.setView([latitude, longitude], 15);
            this.marker.setLatLng([latitude, longitude]);
        }
    }

    showLoading() { this.loadingText.style.display = 'inline'; }
    hideLoading() { this.loadingText.style.display = 'none'; }
    showError(message) { this.addStoryMessage.innerText = message; }
    showSuccess(message) { this.addStoryMessage.innerText = message; }

    // Camera functions (should be bound in presenter)
    openCamera(callback) { this.addContainer.querySelector('#openCamera').addEventListener('click', callback); }
    capturePhoto(callback) { this.captureButton.addEventListener('click', callback); }
    handleFileInput(callback) { this.fileInput.addEventListener('change', callback); }
    bindLocateMe(callback) { this.addContainer.querySelector('#locateMe').addEventListener('click', callback); }
    bindAddStoryButton(callback) { this.addStoryButton.addEventListener('click', callback); }
    bindBackButton(callback) { this.backButton.addEventListener('click', callback); }

    setCameraPreview(stream) {
        this.previewImage.style.display = 'none';
        this.cameraPreview.style.display = 'block';
        this.captureButton.style.display = 'inline-block';
        this.cameraPreview.srcObject = stream;
        this.cameraPreview.play();
    }

    setPreviewImage(url) {
        this.previewImage.src = url;
        this.previewImage.style.display = 'block';
        this.cameraPreview.style.display = 'none';
        this.captureButton.style.display = 'none';
    }

    hideCameraPreview() {
        this.cameraPreview.style.display = 'none';
        this.captureButton.style.display = 'none';
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
    }
}