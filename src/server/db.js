import { openDB } from 'idb';

export const dbPromise = openDB('PhotoDB', 2, {
    upgrade(db) {
        if (!db.objectStoreNames.contains('photos')) {
            db.createObjectStore('photos', { keyPath: 'id' });
        }
    }
});