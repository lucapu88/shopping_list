import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA8TnpTl9FeXxNRsmG8VMUUZnmealhhtck",
    authDomain: "shopping-list-recipes-17d77.firebaseapp.com",
    projectId: "shopping-list-recipes-17d77",
    storageBucket: "shopping-list-recipes-17d77.firebasestorage.app",
    messagingSenderId: "371999513272",
    appId: "1:371999513272:web:187c3a91751bf107f6324d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export async function loginGoogle() {
    return signInWithPopup(auth, googleProvider);
}

export async function loginEmail(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

export async function registerEmail(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}

export async function logout() {
    return signOut(auth);
}

export async function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
}

export { onAuthStateChanged };