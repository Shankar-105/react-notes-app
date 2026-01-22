import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    sendPasswordResetEmail,
    updateEmail,
    User
} from "firebase/auth";
import { auth } from "../firebase";

export const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
};

export const updateUserEmail = (user: User, newEmail: string) => {
    return updateEmail(user, newEmail);
};

export const signOut = () => {
    return firebaseSignOut(auth);
};

export const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
};

export const subscribeToAuthChanges = (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
};
