// src > routes.js
<<<<<<< HEAD
import Landing from './views/landing.js';
import Login from './views/login.js';
import Register from './views/register.js';

// Impor semua kelas View secara eksplisit dengan nama kelasnya
import HomeView from './views/page/Home.js';    // <-- PASTIKAN NAMA INI SAMA DENGAN CLASS DI HOME.JS
import DetailView from './views/DetailView.js';
import BookmarkView from './views/page/Bookmark.js';
import AddView from './views/page/Add.js';      // Jika Add.js juga mengekspor kelas

// Impor semua kelas Presenter
=======
import Landing from './views/landing.js';   // Fungsi
import Login from './views/login.js';       // Fungsi
import Register from './views/register.js'; // Fungsi

// Impor SEMUA KELAS View dengan nama yang jelas dan jalur yang benar
import HomeView from './views/HomeView.js';    // Path yang sudah diperbaiki
import DetailView from './views/DetailView.js'; // Path yang sudah benar
import BookmarkView from './views/page/Bookmark.js'; // Path yang sudah benar
import AddView from './views/page/Add.js';      // Path yang sudah benar, asumsikan ini kelas

// Impor SEMUA KELAS Presenter
>>>>>>> b12315d9fb4f15c1881ebd7c0b045bf1e3007b18
import HomePresenter from './presenter/HomePresenter.js';
import DetailPresenter from './presenter/DetailPresenter.js';
import BookmarkPresenter from './presenter/BookmarkPresenter.js';
import AddPresenter from './presenter/AddPresenter.js';


<<<<<<< HEAD
const routes = {
    '': Landing,
    '#/': HomeView, // Sekarang ini adalah kelas HomeView
    '#/login': Login,
    '#/register': Register,
    '#/add': AddView, // Asumsi ini kelas AddView
    '#/detail': DetailView,
    '#/bookmark': BookmarkView
=======
// routes object sekarang memetakan hash ke KELAS View atau FUNGSI View
const routes = {
    '': Landing, // Fungsi
    '#/': HomeView, // Kelas
    '#/login': Login, // Fungsi
    '#/register': Register, // Fungsi
    '#/add': AddView, // Kelas
    '#/detail': DetailView, // Kelas
    '#/bookmark': BookmarkView // Kelas
>>>>>>> b12315d9fb4f15c1881ebd7c0b045bf1e3007b18
};

const router = async () => {
    try {
        const token = localStorage.getItem('token');
        const hash = location.hash.split('?')[0];
        const urlParams = new URLSearchParams(location.hash.split('?')[1]);
        const storyId = urlParams.get('id');

<<<<<<< HEAD
        let CurrentViewClassOrFunction;
        let viewInstance;
        let presenterInstance = null;

        if (token) {
            if (hash === '' || hash === '#/') {
                CurrentViewClassOrFunction = HomeView;
            } else if (hash.startsWith('#/detail')) {
                if (storyId) {
                    CurrentViewClassOrFunction = DetailView;
                } else {
                    CurrentViewClassOrFunction = HomeView;
                }
            } else if (hash === '#/bookmark') {
                CurrentViewClassOrFunction = BookmarkView;
            } else if (hash === '#/add') {
                CurrentViewClassOrFunction = AddView;
            }
            else {
                CurrentViewClassOrFunction = routes[hash];
                if (!CurrentViewClassOrFunction) {
                    CurrentViewClassOrFunction = HomeView;
                }
            }
        } else {
            CurrentViewClassOrFunction = routes[hash];
            if (!CurrentViewClassOrFunction) {
                CurrentViewClassOrFunction = Landing;
            }
        }

        if (!CurrentViewClassOrFunction) {
=======
        let CurrentViewComponent; // Bisa kelas View atau fungsi View
        let viewInstance; // Instance dari View (HTMLElement yang sudah dirender)
        let presenterInstance = null; // Instance dari Presenter

        // Menentukan CurrentViewComponent berdasarkan hash dan login status
        if (token) {
            // Pengguna sudah login
            if (hash === '' || hash === '#/') {
                CurrentViewComponent = HomeView;
            } else if (hash.startsWith('#/detail')) {
                if (storyId) {
                    CurrentViewComponent = DetailView;
                } else {
                    CurrentViewComponent = HomeView; // Fallback jika tidak ada storyId
                }
            } else if (hash === '#/bookmark') {
                CurrentViewComponent = BookmarkView;
            } else if (hash === '#/add') {
                CurrentViewComponent = AddView;
            }
            else {
                // Untuk rute lain yang terdaftar di `routes` object
                CurrentViewComponent = routes[hash];
                if (!CurrentViewComponent) { // Jika rute tidak ditemukan setelah login
                    CurrentViewComponent = HomeView; // Default ke Home jika rute tidak dikenal
                }
            }
        } else {
            // Pengguna belum login
            CurrentViewComponent = routes[hash];
            if (!CurrentViewComponent) { // Jika rute tidak ditemukan saat belum login
                CurrentViewComponent = Landing; // Default ke Landing
            }
        }

        if (!CurrentViewComponent) {
>>>>>>> b12315d9fb4f15c1881ebd7c0b045bf1e3007b18
            document.getElementById('app').innerHTML = '<h1>Page Not Found - Route Component Not Found</h1>';
            return;
        }

<<<<<<< HEAD
        // Instansiasi View dan Presenter
        if (typeof CurrentViewClassOrFunction === 'function' && CurrentViewClassOrFunction.prototype && CurrentViewClassOrFunction.prototype.render) {
            // Ini adalah KELAS View (HomeView, DetailView, BookmarkView, AddView)
            viewInstance = new CurrentViewClassOrFunction();

            if (CurrentViewClassOrFunction === HomeView) {
                presenterInstance = new HomePresenter(viewInstance);
            } else if (CurrentViewClassOrFunction === DetailView) {
                presenterInstance = new DetailPresenter(viewInstance);
            } else if (CurrentViewClassOrFunction === BookmarkView) {
                presenterInstance = new BookmarkPresenter(viewInstance);
            } else if (CurrentViewClassOrFunction === AddView) {
                presenterInstance = new AddPresenter(viewInstance);
            }
            
            viewInstance = viewInstance.render(); // Render HTMLElement dari instance View
        } else if (typeof CurrentViewClassOrFunction === 'function') {
            // Ini adalah FUNGSI View (Landing, Login, Register)
            viewInstance = CurrentViewClassOrFunction(); // Panggil fungsi untuk mendapatkan HTMLElement
            presenterInstance = null;
        } else {
=======
        // --- Instansiasi View dan Presenter berdasarkan tipe CurrentViewComponent ---
        if (typeof CurrentViewComponent === 'function' && CurrentViewComponent.prototype && typeof CurrentViewComponent.prototype.render === 'function') {
            // Ini adalah KELAS View (punya metode render())
            viewInstance = new CurrentViewComponent();

            // Tentukan Presenter yang sesuai
            if (CurrentViewComponent === HomeView) {
                presenterInstance = new HomePresenter(viewInstance);
            } else if (CurrentViewComponent === DetailView) {
                presenterInstance = new DetailPresenter(viewInstance);
            } else if (CurrentViewComponent === BookmarkView) {
                presenterInstance = new BookmarkPresenter(viewInstance);
            } else if (CurrentViewComponent === AddView) {
                presenterInstance = new AddPresenter(viewInstance);
            }
            
            // Render HTMLElement dari instance View
            const renderedElement = viewInstance.render();
            viewInstance = renderedElement; // Update viewInstance menjadi HTMLElement
        } else if (typeof CurrentViewComponent === 'function') {
            // Ini adalah FUNGSI View (Landing, Login, Register)
            viewInstance = CurrentViewComponent(); // Panggil fungsi untuk mendapatkan HTMLElement
            presenterInstance = null; // Fungsi View ini tidak punya Presenter terpisah
        } else {
            // Kasus tidak terduga, misal CurrentViewComponent adalah undefined atau objek lain
>>>>>>> b12315d9fb4f15c1881ebd7c0b045bf1e3007b18
            document.getElementById('app').innerHTML = '<h1>Page Not Found - Invalid Route Component Type</h1>';
            return;
        }

        if (!viewInstance) {
            document.getElementById('app').innerHTML = '<h1>Page Not Found - View Instance Empty</h1>';
            return;
        }

        const appContainer = document.getElementById('app');
<<<<<<< HEAD
=======
        // Kosongkan container sebelum append
>>>>>>> b12315d9fb4f15c1881ebd7c0b045bf1e3007b18
        while (appContainer.firstChild) {
            appContainer.removeChild(appContainer.firstChild);
        }

        appContainer.appendChild(viewInstance); // Append HTMLElement ke DOM

        // Panggil inisialisasi presenter SETELAH elemen di-append
        if (presenterInstance && typeof presenterInstance.init === 'function') {
<<<<<<< HEAD
            await presenterInstance.init(); // Panggil init untuk Home, Bookmark, Add
        } else if (presenterInstance && typeof presenterInstance.initialize === 'function') {
             await presenterInstance.initialize(); // Untuk DetailPresenter
=======
            await presenterInstance.init(); // Panggil init
        } else if (presenterInstance && typeof presenterInstance.initialize === 'function') {
             await presenterInstance.initialize(); // Untuk DetailPresenter
        } else if (presenterInstance) {
            // Jika presenter ada tapi tidak punya init/initialize async
            console.warn('Presenter instance found but no explicit async init/initialize method to call after view append.');
>>>>>>> b12315d9fb4f15c1881ebd7c0b045bf1e3007b18
        }
        
    } catch (error) {
        console.error("Routing Error:", error);
        document.getElementById('app').innerHTML = `<h1>Error loading page: ${error.message || error}</h1>`;
    }
};

export { router };