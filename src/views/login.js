import axios from 'axios';
import { BASE_URL } from '../api.js';

const Login = () => {
    const loginContainer = document.createElement('div');
    loginContainer.classList.add('login-container');

    document.body.style.overflow = 'hidden';

    loginContainer.innerHTML = `
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

            .login-container {
                position: absolute;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: linear-gradient(135deg, #1E3A5F, #4682B4);
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 20px;
                box-sizing: border-box;
            }

            .login-box {
                background: rgba(255, 255, 255, 0.15);
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
                width: 100%;
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
                width: 100%;
                padding: 12px;
                font-size: 16px;
                border: 2px solid rgba(255, 255, 255, 0.5);
                border-radius: 5px;
                background: rgba(255, 255, 255, 0.2);
                color: white;
                outline: none;
                box-sizing: border-box;
            }

            .input-group input::placeholder {
                color: rgba(255, 255, 255, 0.7);
            }

            h2, p {
                color: white;
            }

            .login-btn {
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

            .login-btn:hover {
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
                .login-box {
                    padding: 20px;
                    max-width: 90%;
                }
                .input-group input {
                    font-size: 14px;
                }
                .login-btn {
                    font-size: 14px;
                }
            }
        </style>

        <div class="login-box">
            <h2>Login</h2>
            <form id="loginForm">
                <div class="input-group">
                    <input type="email" id="email" name="email" placeholder="Email" required />
                </div>

                <div class="input-group">
                    <input type="password" id="password" name="password" placeholder="Password" required />
                </div>

                <button type="submit" id="loginButton" class="login-btn">
                    Masuk
                </button>
                <div id="loadingIndicator" class="loading-spinner" style="display: none;"></div>
            </form>
            <p id="loginMessage"></p>
        </div>
    `;

    loginContainer.querySelector('#loginForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = loginContainer.querySelector('#email').value.trim();
        const password = loginContainer.querySelector('#password').value.trim();
        const loginMessage = loginContainer.querySelector('#loginMessage');
        const loginButton = loginContainer.querySelector('#loginButton');
        const loadingIndicator = loginContainer.querySelector('#loadingIndicator');

        loginButton.innerHTML = `Masuk... 🔄`;
        loginButton.disabled = true;
        loadingIndicator.style.display = 'block';

        try {
            const response = await axios.post(`${BASE_URL}/login`, { email, password });
            const token = response.data?.loginResult?.token;

            if (token) {
                localStorage.setItem('token', token);
                window.location.hash = '#/';
                window.location.reload();
            } else {
                throw new Error('Token tidak ditemukan dalam respons API.');
            }
        } catch (error) {
            loginMessage.innerText = '❌ Gagal login. Periksa email dan password.';
            loginMessage.style.color = 'red';
        }

        loginButton.innerHTML = `Masuk`;
        loginButton.disabled = false;
        loadingIndicator.style.display = 'none';
    });

    return loginContainer;
};

export default Login;