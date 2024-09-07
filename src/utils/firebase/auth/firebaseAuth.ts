import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    User, 
    updateProfile
} from "firebase/auth";
import { 
    doc, 
    getDoc, 
    getFirestore, 
    setDoc 
} from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { app } from '../firebaseConfig';

const auth = getAuth(app);
export const db = getFirestore(app);


export const customOnAuthStateChange = (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
};

export const CreateNewAdminUser = async (email: string, password: string) => {
    if (!email || !password) return null;

    try {
      
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error: unknown) {
     
        if (error instanceof FirebaseError) {
            if (error.code === "auth/email-already-in-use") {
                
                try {
                    const userCredential = await signInWithEmailAndPassword(auth, email, password);
                    return userCredential.user;
                } catch (signInError: unknown) {
                    if (signInError instanceof FirebaseError) {
                        console.error("Error signing in with existing email and password:", signInError);

                        if (signInError.message === "Firebase: Error (auth/invalid-credential).") {
                            return "Incorrect Password"
                        } 
                        return signInError.message; 
                    } else {
                        console.error("Unknown error during sign-in:", signInError);
                        
                        return "Unknown error during sign-in";
                    }
                }
            } else {
             
                console.error("Error creating user:", error.message);

                if (error.message === "Firebase: Error (auth/network-request-failed).") {
                    return "Network too bad, try again"
                }
                return error.message;
            }
        }
        return "An unknown error occurred";
    }
};


export const createAdminUserDocumentFromAuth = async (
    userAuth: User, 
    additionalInformation: Record<string, unknown> = {}
) => {
    try {
        const userDocRef = doc(db, "admins", userAuth.uid);
        const userSnapshot = await getDoc(userDocRef);

        if (!userSnapshot.exists()) {
            const {  email } = userAuth;
            const createdAt = new Date();

            const generateDisplayName = () => {
                const userEmail = email;

                const getNameFromEmail = userEmail?.slice(0, 5).toLowerCase();
                const randomNum = Math.floor(100 + Math.random() * 900);

                const newDisplayName = `${getNameFromEmail}${randomNum}`;

                return newDisplayName;
            };

            const newDisplayName = generateDisplayName()

            await updateProfile(userAuth, {displayName : newDisplayName})

            await setDoc(userDocRef, {
                displayName: newDisplayName,
                email,
                createdAt,
                ...additionalInformation,
            });

            console.log("User document created successfully");
        }

        return userDocRef;
    } catch (error) {
        console.error("Error creating the user", (error as Error).message);
        throw error;
    }
};
