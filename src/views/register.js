import axios from 'axios';
import { BASE_URL } from '../api.js';

const Register = () => {
    const registerContainer = document.createElement('div');
    registerContainer.classList.add('register-container');

    document.body.style.overflow = 'hidden';

    registerContainer.innerHTML = `
        <style>
            html, body, #app {
                margin: 0;
                padding: 0;
                width: 100vw;
                height: 100vh;
                background: linear-gradient(135deg, #1E3A5F, #4682B4);
                display: flex;
                justify-content: center;
                align-items: center;
                box-sizing: border-box;
            }

            .register-container {
                position: absolute;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: linear-gradient(135deg, #1E3A5F, #4682B4);
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 10px;
                box-sizing: border-box;
            }

            .register-box {
                background: rgba(255, 255, 255, 0.15);
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
                width: 90%;
                max-width: 400px;
                text-align: center;
                backdrop-filter: blur(10px);
            }

            .input-group {
                position: relative;
                width: 100%;
                margin-bottom: 15px;
            }

            .input-group input {
                width: calc(100% - 20px);
                padding: 10px;
                font-size: 16px;
                border: 2px solid rgba(255, 255, 255, 0.5);
                border-radius: 5px;
                background: rgba(255, 255, 255, 0.2);
                color: white;
                outline: none;
            }

            .input-group input::placeholder {
                color: rgba(255, 255, 255, 0.7);
            }

            h2, p {
                color: white;
            }

            .register-btn {
                display: inline-block;
                width: 100%;
                padding: 12px;
                font-size: 1em;
                color: white;
                border: 2px solid white;
                border-radius: 5px;
                text-decoration: none;
                transition: 0.3s;
                cursor: pointer;
                background: transparent;
            }

            .register-btn:hover {
                background-color: white;
                color: #4682B4;
            }

            .loading-spinner {
                width: 30px;
                height: 30px;
                border: 4px solid rgba(255, 255, 255, 0.2);
                border-top: 4px solid white;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 10px auto;
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            @media (max-width: 480px) {
                .register-box {
                    padding: 15px;
                    width: 100%;
                }

                .input-group input {
                    font-size: 14px;
                    padding: 8px;
                }

                .register-btn {
                    padding: 10px;
                    font-size: 14px;
                }
            }
        </style>

        <div class="register-box">
            <h2>Register</h2>
            <form id="registerForm">
                <div class="input-group">
                    <i class="fas fa-user"></i>
                    <input type="text" id="name" name="name" placeholder="Nama" required />
                </div>

                <div class="input-group">
                    <i class="fas fa-envelope"></i>
                    <input type="email" id="email" name="email" placeholder="Email" required />
                </div>

                <div class="input-group">
                    <i class="fas fa-lock"></i>
                    <input type="password" id="password" name="password" placeholder="Password" required />
                </div>

                <button type="submit" id="registerButton" class="register-btn">
                    Daftar
                </button>
                <div id="loadingIndicator" class="loading-spinner" style="display: none;"></div>
            </form>
            <p id="registerMessage"></p>
        </div>
    `;

    registerContainer.querySelector('#registerForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = registerContainer.querySelector('#name').value.trim();
        const email = registerContainer.querySelector('#email').value.trim();
        const password = registerContainer.querySelector('#password').value.trim();
        const registerMessage = registerContainer.querySelector('#registerMessage');
        const registerButton = registerContainer.querySelector('#registerButton');
        const loadingIndicator = registerContainer.querySelector('#loadingIndicator');

        if (password.length < 8) {
            registerMessage.innerText = "⚠️ Password minimal 8 karakter!";
            registerMessage.style.color = 'yellow';
            return;
        }

        registerButton.innerHTML = `Mendaftar... 🔄`;
        registerButton.disabled = true;
        loadingIndicator.style.display = 'block';

        try {
            const response = await axios.post(`${BASE_URL}/register`, { name, email, password });

            registerMessage.innerText = "✅ Pendaftaran berhasil! Silakan login.";
            registerMessage.style.color = 'lightgreen';
        } catch (error) {
            registerMessage.innerText = '❌ Gagal mendaftar. Coba gunakan email lain.';
            registerMessage.style.color = 'red';
        }

        registerButton.innerHTML = `Daftar`;
        registerButton.disabled = false;
        loadingIndicator.style.display = 'none';
    });

    return registerContainer;
};

export default Register;