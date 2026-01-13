import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Config ID for the single document we will use
const CONFIG_DOC_ID = 'general';

export const getSiteConfig = async () => {
    try {
        const docRef = doc(db, "settings", CONFIG_DOC_ID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { success: true, data: docSnap.data() };
        } else {
            return { success: false, error: "No config found" };
        }
    } catch (error) {
        console.error("Error getting config: ", error);
        return { success: false, error };
    }
};

export const saveSiteConfig = async (data: any) => {
    try {
        const docRef = doc(db, "settings", CONFIG_DOC_ID);
        await setDoc(docRef, data, { merge: true });
        return { success: true };
    } catch (error) {
        console.error("Error saving config: ", error);
        return { success: false, error };
    }
};
