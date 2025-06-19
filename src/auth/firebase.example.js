/* eslint-disable */
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

// Este archivo es un ejemplo. Copialo como firebase.js y completá tus credenciales reales.

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();

export function crearUsuario(email, password){
    return(
        new Promise((res, rej) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                console.log("Credenciales", userCredential)
                const user = userCredential.user;
                console.log(user)
                res(user)
                // ...
            })
            .catch((error) => {
                console.log(error.code, error.message)
                const errorCode = error.code;
                const errorMessage = error.message;
                rej(error)
                // ..
            });
        })
    )
}

auth.useDeviceLanguage()
export function logearG(){
    signInWithPopup(auth, provider)
    .then((result) => {
        console.log("test", result)
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
    }).catch((error) => {
        console.log("test error", error )
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
}

export function loginEmailPass(email, password){
    return(
        new Promise((res, rej) => {
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                console.log("Credenciales", userCredential)
                const user = userCredential.user;
                console.log(user)
                res(user)
            })
            .catch((error) => {
                console.log(error.code, error.message)
                const errorCode = error.code;
                const errorMessage = error.message;
                rej(error)
            });
        })
    )
}