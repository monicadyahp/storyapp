// src > routes.js
import Landing from './views/landing.js';
import Login from './views/login.js';
import Register from './views/register.js';

// Impor semua kelas View secara eksplisit dengan nama kelasnya
import HomeView from './views/page/Home.js';    // <-- PASTIKAN NAMA INI SAMA DENGAN CLASS DI HOME.JS
import DetailView from './views/DetailView.js';
import BookmarkView from './views/page/Bookmark.js';
import AddView from './views/page/Add.js';      // Jika Add.js juga mengekspor kelas

// Impor semua kelas Presenter
import HomePresenter from './presenter/HomePresenter.js';
import DetailPresenter from './presenter/DetailPresenter.js';
import BookmarkPresenter from './presenter/BookmarkPresenter.js';
import AddPresenter from './presenter/AddPresenter.js';


const routes = {
    '': Landing,
    '#/': HomeView, // Sekarang ini adalah kelas HomeView
    '#/login': Login,
    '#/register': Register,
    '#/add': AddView, // Asumsi ini kelas AddView
    '#/detail': DetailView,
    '#/bookmark': BookmarkView
};

const router = async () => {
    try {
        const token = localStorage.getItem('token');
        const hash = location.hash.split('?')[0];
        const urlParams = new URLSearchParams(location.hash.split('?')[1]);
        const storyId = urlParams.get('id');

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
            document.getElementById('app').innerHTML = '<h1>Page Not Found - Route Component Not Found</h1>';
            return;
        }

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
            document.getElementById('app').innerHTML = '<h1>Page Not Found - Invalid Route Component Type</h1>';
            return;
        }

        if (!viewInstance) {
            document.getElementById('app').innerHTML = '<h1>Page Not Found - View Instance Empty</h1>';
            return;
        }

        const appContainer = document.getElementById('app');
        while (appContainer.firstChild) {
            appContainer.removeChild(appContainer.firstChild);
        }

        appContainer.appendChild(viewInstance); // Append HTMLElement ke DOM

        // Panggil inisialisasi presenter SETELAH elemen di-append
        if (presenterInstance && typeof presenterInstance.init === 'function') {
            await presenterInstance.init(); // Panggil init untuk Home, Bookmark, Add
        } else if (presenterInstance && typeof presenterInstance.initialize === 'function') {
             await presenterInstance.initialize(); // Untuk DetailPresenter
        }
        
    } catch (error) {
        console.error("Routing Error:", error);
        document.getElementById('app').innerHTML = `<h1>Error loading page: ${error.message || error}</h1>`;
    }
};

export { router };