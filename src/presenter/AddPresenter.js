// src/presenter/AddPresenter.js
import axios from 'axios';
import { BASE_URL } from '../api.js'; // <-- PERBAIKI PATH INI DARI '../../api.js' MENJADI '../api.js'

export default class AddModel {
    constructor() {
        this.token = localStorage.getItem('token');
    }

    async submitStory(description, photo, lat, lon) {
        try {
            const formData = new FormData();
            formData.append('description', description);
            formData.append('photo', photo);
            if (lat && lon) {
                formData.append('lat', lat);
                formData.append('lon', lon);
            }

            const response = await axios.post(`${BASE_URL}/stories`, formData, {
                headers: { 'Authorization': `Bearer ${this.token}` }
            });
            return response.data;
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            throw new Error('Failed to submit story');
        }
    }

    getCurrentLocation() {
        return new Promise((resolve, reject) => {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => resolve(position.coords),
                    (error) => reject(error)
                );
            } else {
                reject(new Error('Geolocation not supported'));
            }
        });
    }
}