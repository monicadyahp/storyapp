<<<<<<< HEAD
import axios from 'axios';
import L from 'leaflet';
import { BASE_URL } from '../../api.js';

const Add = () => {
    const addContainer = document.createElement('div');
    addContainer.classList.add('add-container');

    addContainer.innerHTML = `
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

const mapContainer = addContainer.querySelector('#map');
const loadingText = addContainer.querySelector('#loadingText');
const previewImage = addContainer.querySelector('#previewImage');
const cameraPreview = addContainer.querySelector('#cameraPreview');
const addStoryMessage = addContainer.querySelector('#addStoryMessage');
const latitudeInput = addContainer.querySelector('#latitude');
const longitudeInput = addContainer.querySelector('#longitude');
const backButton = addContainer.querySelector('#backButton');
const addStoryButton = addContainer.querySelector('#addStoryButton');
const form = addContainer.querySelector('#addStoryForm');
const captureButton = addContainer.querySelector('#capturePhoto');
const fileInput = addContainer.querySelector('#photo');
    
    let map, marker, stream;

    // Initialize the map and allow clicking to add or move marker
    const initializeMap = (latitude = -6.200000, longitude = 106.816666) => {
        setTimeout(() => {
            if (mapContainer && mapContainer.offsetWidth > 0 && mapContainer.offsetHeight > 0) {
                map = L.map(mapContainer).setView([latitude, longitude], 10);
    
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap contributors'
                }).addTo(map);
    
                map.on('click', onMapClick); // Make sure to bind the map click event correctly
    
                map.invalidateSize();
=======
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
>>>>>>> b12315d9fb4f15c1881ebd7c0b045bf1e3007b18
            } else {
                console.error("Map container has no size or is not loaded yet.");
            }
        }, 200);
<<<<<<< HEAD
    };

    const onMapClick = (event) => {
        if (event.latlng) {
            const latitude = event.latlng.lat;
            const longitude = event.latlng.lng;
    
            if (!marker) {
                marker = L.marker([latitude, longitude]).addTo(map);
            } else {
                marker.setLatLng([latitude, longitude]);
            }
    
            setLatitude(latitude);
            setLongitude(longitude);
        } else {
            console.error("Event does not have latlng properties");
        }
    };
    

    const updateMap = (latitude, longitude) => {
        if (map && marker) {
            map.setView([latitude, longitude], 15);
            marker.setLatLng([latitude, longitude]);
        }
    };

    const setLatitude = (latitude) => {
        latitudeInput.value = latitude;
    };
    
    const setLongitude = (longitude) => {
        longitudeInput.value = longitude;
    };    

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImage.src = e.target.result;
                previewImage.style.display = 'block';
                cameraPreview.style.display = 'none';
                captureButton.style.display = 'none'; // Hide the capture button after file is selected
            };
            reader.readAsDataURL(file);
            disableCamera();
            hideCaptureButton();
        }
    };

    const openCamera = async () => {
        previewImage.style.display = 'none'; // Hide the image preview
        cameraPreview.style.display = 'block'; // Show the camera preview
    
        captureButton.style.display = 'inline-block'; // Show the capture button
    
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    
        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
            cameraPreview.srcObject = stream;
            cameraPreview.play();
        } catch (error) {
            console.error("Error accessing camera:", error);
            alert("Gagal membuka kamera.");
        }
    };

    const capturePhoto = () => {
        const video = cameraPreview;
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
            const file = new File([blob], "captured_image.jpg", { type: "image/jpeg" });
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            fileInput.files = dataTransfer.files;

            previewImage.src = URL.createObjectURL(file); // Set the preview image
            previewImage.style.display = 'block'; // Make sure it's visible
            cameraPreview.style.display = 'none'; // Hide the camera preview
            captureButton.style.display = 'none'; // Hide the capture button

            disableCamera(); // Stop the camera after taking the photo
        }, "image/jpeg");
    };

    const disableCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            stream = null;
        }
    };

    const hideCaptureButton = () => {
        captureButton.style.display = 'none';
    };

    const showLoading = () => {
        loadingText.style.display = 'inline';
    };

    const hideLoading = () => {
        loadingText.style.display = 'none';
    };

    const showError = (message) => {
        addStoryMessage.innerText = message;
    };

    const showSuccess = (message) => {
        addStoryMessage.innerText = message;
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            stream = null;
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
    
        const description = addContainer.querySelector('#description').value;
        const photo = addContainer.querySelector('#photo').files[0];
        const lat = latitudeInput.value;
        const lon = longitudeInput.value;
        const token = localStorage.getItem('token');
    
        if (!description || !photo) {
            showError('Deskripsi dan foto harus diisi!');
            return;
        }
    
        try {
            showLoading();
            const formData = new FormData();
            formData.append('description', description);
            formData.append('photo', photo);
    
            if (lat && lon) {
                formData.append('lat', lat);
                formData.append('lon', lon);
            }
    
            const response = await axios.post(`${BASE_URL}/stories`, formData, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
    
            hideLoading();
            showSuccess(response.data.message);
            window.location.hash = '#/';
        } catch (error) {
            hideLoading();
            
            // Log the error response to understand the issue
            console.error('Error:', error.response ? error.response.data : error.message);
            
            showError('Gagal menambahkan story.');
        }
    };
    
    

    const bindEvents = () => {
        addStoryButton.addEventListener('click', onSubmit);
        backButton.addEventListener('click', () => {
            stopCamera(); // Stop the camera when navigating away
            window.history.back();
        });
        fileInput.addEventListener('change', handleFileChange);
        addContainer.querySelector('#openCamera').addEventListener('click', openCamera);
        captureButton.addEventListener('click', capturePhoto);
        addContainer.querySelector('#locateMe').addEventListener('click', () => {
            showLoading();
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const { latitude, longitude } = position.coords;
                    updateMap(latitude, longitude);
                    setLatitude(latitude);
                    setLongitude(longitude);
                    hideLoading();
                }, (error) => {
                    alert('Gagal mendapatkan lokasi: ' + error.message);
                    hideLoading();
                });
            } else {
                alert('Geolocation tidak didukung di browser ini.');
                hideLoading();
            }
        });
        addContainer.querySelector('#map').addEventListener('click', (event) => onMapClick(event));

        // Stop camera when the page is closed
        window.addEventListener('beforeunload', stopCamera);
    };

    bindEvents();
    initializeMap();

    return addContainer;
};

export default Add;
=======
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
>>>>>>> b12315d9fb4f15c1881ebd7c0b045bf1e3007b18
