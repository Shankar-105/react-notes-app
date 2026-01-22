import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    updateDoc,
    deleteDoc,
    doc,
    serverTimestamp,
    orderBy,
    onSnapshot,
    Unsubscribe
} from "firebase/firestore";
import { db } from "../firebase";

export interface FirestoreNote {
    id?: string;
    title: string;
    content: string;
    color: string;
    userId: string;
    createdAt?: any;
    updatedAt?: any;
}

const NOTES_COLLECTION = "notes";

export const subscribeToNotes = (userId: string, onUpdate: (notes: FirestoreNote[]) => void): Unsubscribe => {
    const q = query(
        collection(db, NOTES_COLLECTION),
        where("userId", "==", userId)
    );

    return onSnapshot(q, (querySnapshot) => {
        const notes = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as FirestoreNote[];
        onUpdate(notes);
    }, (error) => {
        console.error("Error subscribing to notes: ", error);
    });
};

export const addNote = async (userId: string, title: string, content: string, color: string) => {
    try {
        const docRef = await addDoc(collection(db, NOTES_COLLECTION), {
            userId,
            title,
            content,
            color,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        return docRef.id;
    } catch (error) {
        console.error("Error adding note: ", error);
        throw error;
    }
};

export const getNotes = async (userId: string) => {
    try {
        const q = query(
            collection(db, NOTES_COLLECTION),
            where("userId", "==", userId)
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as FirestoreNote[];
    } catch (error) {
        console.error("Error getting notes: ", error);
        throw error;
    }
};

export const updateNote = async (noteId: string, updates: Partial<FirestoreNote>) => {
    try {
        const noteRef = doc(db, NOTES_COLLECTION, noteId);
        await updateDoc(noteRef, {
            ...updates,
            updatedAt: serverTimestamp(),
        });
    } catch (error) {
        console.error("Error updating note: ", error);
        throw error;
    }
};

export const deleteNote = async (noteId: string) => {
    try {
        await deleteDoc(doc(db, NOTES_COLLECTION, noteId));
    } catch (error) {
        console.error("Error deleting note: ", error);
        throw error;
    }
};
