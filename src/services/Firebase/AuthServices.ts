import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "@react-native-firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "@react-native-firebase/firestore";
import { setLogin } from "../../store/reducers/authSlice";
import { showToast } from "../../utils/helper";

export const logUser = async (email: string, password: string, dispatch: any, setIsLoading: any) => {
    try {
        setIsLoading(true);
        const auth = getAuth();
        const store = getFirestore();
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const userDocRef = doc(store, "users", userCredential.user.uid);
        const documentSnapshot = await getDoc(userDocRef);

        if (documentSnapshot.exists) {
            const dataToSave = documentSnapshot.data();
            dispatch(setLogin(dataToSave));
        }
    } catch (error: any) {
        switch (error.code) {
            case "auth/invalid-credential":
                showToast("error", "Invalid credential");
                break;
            default:
                showToast("error", "An error occurred. Please try again.");
        }
    } finally {
        setIsLoading(false);
    }
};

export const registerUser = async (name: string, email: string, password: string, dispatch: any, setIsLoading: any) => {
    try {
        setIsLoading(true);
        const auth = getAuth();
        const store = getFirestore();
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userDocRef = doc(store, "users", userCredential.user.uid);
        await setDoc(userDocRef, {
            name: name,
            email: email,
            uid: userCredential.user.uid,
        });

        const dataToSave = {
            name: name,
            email: email,
            uid: userCredential.user.uid,
        };
        dispatch(setLogin(dataToSave));
    } catch (error: any) {
        switch (error.code) {
            case 'auth/email-already-in-use':
                showToast('error', 'The email address is already in use');
                break;
            case 'auth/weak-password':
                showToast('error', 'The password is too weak.');
                break;
            default:
                showToast('error', 'An error occurred. Please try again.');
        }
    } finally {
        setIsLoading(false);
    }
};