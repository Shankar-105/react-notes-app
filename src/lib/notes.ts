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
    orderBy
} from "firebase/firestore";
import { db } from "../firebase";

export interface Note {
    id?: string;
    title: string;
    content: string;
    color: string;
    userId: string;
    createdAt?: any;
    updatedAt?: any;
}

const NOTES_COLLECTION = "notes";

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
            where("userId", "==", userId),
            orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Note[];
    } catch (error) {
        console.error("Error getting notes: ", error);
        throw error;
    }
};

export const updateNote = async (noteId: string, updates: Partial<Note>) => {
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
