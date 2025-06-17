const Landing = () => {
    const landingContainer = document.createElement('div');
    landingContainer.classList.add('landing-container');

    landingContainer.innerHTML = `
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

            .landing-container {
                position: absolute;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 10px;
                box-sizing: border-box;
            }

            .landing-box {
                background: rgba(255, 255, 255, 0.15);
                padding: 20px;
                border-radius: 12px;
                box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
                width: 90%;
                max-width: 400px;
                text-align: center;
                backdrop-filter: blur(10px);
            }

            h2 {
                color: white;
                margin-bottom: 15px;
                font-size: 1.5rem;
            }

            .button-container {
                display: flex;
                flex-direction: column;
                gap: 10px;
                width: 100%;
                margin-top: 15px;
            }

            .button-container a {
                display: block;
                width: 100%;
                padding: 12px;
                font-size: 1rem;
                color: white;
                border: 2px solid white;
                border-radius: 8px;
                text-decoration: none;
                text-align: center;
                transition: 0.3s;
                background: transparent;
            }

            .button-container a:hover {
                background-color: white;
                color: #4682B4;
            }

            .stories-container {
                margin-top: 15px;
                color: white;
                font-size: 1rem;
            }

            @media (min-width: 480px) {
                .button-container {
                    flex-direction: row;
                    justify-content: center;
                }
                .button-container a {
                    width: 45%;
                }
            }
        </style>

        <div class="landing-box">
            <h2>Selamat Datang</h2>
            <div class="button-container">
                <a href="#/login" class="login-btn">Login</a>
                <a href="#/register" class="register-btn">Daftar Akun</a>
            </div>
            <div id="stories" class="stories-container">Silakan login untuk melihat cerita.</div>
        </div>
    `;

    return landingContainer;
};

export default Landing;
