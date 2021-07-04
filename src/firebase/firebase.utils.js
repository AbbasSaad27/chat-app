import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const app = {
    apiKey: "AIzaSyAC_mfgYDLtAR_zhrZYPjhIL5Puqz7Wtuc",
    authDomain: "chat-app-fe69c.firebaseapp.com",
    projectId: "chat-app-fe69c",
    storageBucket: "chat-app-fe69c.appspot.com",
    messagingSenderId: "22233064636",
    appId: "1:22233064636:web:1798f7636f735bb1e65cb9",
    measurementId: "G-N3JDJGP02N"
};

// initialize app
firebase.initializeApp(app);

// referencing these and exporting 
export const auth = firebase.auth()
export const firestore = firebase.firestore();


// auth provider
const googleProvider = new firebase.auth.GoogleAuthProvider()
googleProvider.setCustomParameters({
    'prompt': 'select_account'
})

const faceBookProvider = new firebase.auth.FacebookAuthProvider();


//current time 
const { serverTimestamp } = firebase.firestore.FieldValue;
let user;


//adding user to database
export const createProfileDocument = async(userAuth) => {
    if(!userAuth) return;

    user = userAuth;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const userSnap = await userRef.get();

    if(!userSnap.exists) {
        const {displayName, email, photoURL} = userAuth;
        userRef.set({
            displayName,
            email,
            photoURL,
            createdAt: serverTimestamp()
        })
    }
    return userRef;
}
export const createNewMessage = async(message) => {
    const messagasDbRef = firestore.collection('messages');

    messagasDbRef.add({
        uid: user.uid,
        text:message,
        photoURL: user.photoURL,
        createdAt: serverTimestamp()
    })
    return messagasDbRef;
}

//sign in methods
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
export const signInWithFaceBook = () => auth.signInWithRedirect(faceBookProvider);