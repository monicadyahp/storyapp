// src/data/database.js
import { openDB } from 'idb';

const DATABASE_NAME = 'story-app-db'; // Nama database Anda
const DATABASE_VERSION = 1; // Versi database
const OBJECT_STORE_NAME = 'favorite-stories'; // Nama object store untuk menyimpan cerita favorit

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    // Ini akan berjalan saat database dibuat atau versi di-upgrade
    // Membuat object store baru jika belum ada
    if (!database.objectStoreNames.contains(OBJECT_STORE_NAME)) { // Tambahkan pengecekan
      database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
    }
  },
});

const StoryDatabase = {
  async addStory(story) {
    // Membuka koneksi database
    const db = await dbPromise;
    // Memulai transaksi 'readwrite' (untuk menulis data)
    const tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
    // Mendapatkan object store
    const store = tx.objectStore(OBJECT_STORE_NAME);
    try {
      await store.add(story); // Menggunakan add
      console.log('Story added to IndexedDB:', story.id); // Log sukses
      return tx.done;
    } catch (e) {
      console.error('Failed to add story to IndexedDB:', story.id, e);
      throw e; // Lemparkan error agar ditangkap di presenter
    }
  },

  async getStoryById(id) {
    const db = await dbPromise;
    const tx = db.transaction(OBJECT_STORE_NAME, 'readonly');
    const store = tx.objectStore(OBJECT_STORE_NAME);
    return store.get(id);
  },

  async getAllStories() {
    const db = await dbPromise;
    const tx = db.transaction(OBJECT_STORE_NAME, 'readonly');
    const store = tx.objectStore(OBJECT_STORE_NAME);
    return store.getAll();
  },

  async deleteStory(id) {
    const db = await dbPromise;
    const tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
    const store = tx.objectStore(OBJECT_STORE_NAME);
    try {
      await store.delete(id);
      console.log('Story deleted from IndexedDB:', id); // Log sukses
      return tx.done;
    } catch (e) {
      console.error('Failed to delete story from IndexedDB:', id, e);
      throw e; // Lemparkan error
    }
  },
};

export default StoryDatabase;

// Tambahkan ini untuk debugging:
// Panggil fungsi ini di suatu tempat (misal, main.js) untuk memastikan database terbuka
export async function initializeDatabase() {
  try {
    await dbPromise;
    console.log('IndexedDB database initialized successfully.');
  } catch (error) {
    console.error('Failed to initialize IndexedDB database:', error);
  }
}