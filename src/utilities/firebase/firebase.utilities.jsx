import {initializeApp } from 'firebase/app'; // function to create app instance based off of object config

import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth'; //functions for signing in

import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'; // functions for adding users to db => doc gets document instance, getDoc function only gets data inside a document instance. Likewise, setDoc function only sets the data inside a document.

// Your web app's Firebase configuration, copied over from firebase
const firebaseConfig = {
    apiKey: "AIzaSyDwGK08v_TnaaF7ozNKZEpYbu86QVj04Xg",
    authDomain: "royal-clothing-db-f48d3.firebaseapp.com",
    projectId: "royal-clothing-db-f48d3",
    storageBucket: "royal-clothing-db-f48d3.appspot.com",
    messagingSenderId: "667471433927",
    appId: "1:667471433927:web:d1099827e5de3b87162ee2"
};
  
  // Initialize Firebase
initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider(); // GoogleAuthProvider is a class. Can be used to create multiple instances of providers
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

//signing in with google providers
export const auth = getAuth(); // singleton. Keeps track of authentication state of entire app

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

// this is an async function will add new user to DB if user does not exists, otherwise will return user data of existing user. Function accepts user data from the user response object when signing in with google popup
export const createUserDocumentOrSignInUserFromAuth = async (userAuth, additionalInformation = {}) => { // userAuth is placeholder. Will be passing in user data from response object when signing in with google popup i.e. response.user. additionalInformation placeholder object will handle responses where displayName comes back as null and we set the displayName on the actual form
    if(!userAuth) return;
    
    //doc function takes 3 arguments (firestore database instance, name of collection (will set collection with name if it does not exist), and a unique ID)
    const userDocRef = doc(db, 'users', userAuth.uid); //use the unique ID of the user response object (response.user.uid) to create a document reference of this user. This document reference will have shape of an object
    console.log(userDocRef);

    const userSnapShot = await getDoc(userDocRef);
    console.log(userSnapShot);
    console.log(userSnapShot.exists()); //returns boolean, nested under prototype

    //If user data does not exist yet, then use setDoc function to set the user data inside the document instance, and then place document of user data inside the database. Otherwise, document already exists and simply return to me that user document
    if(!userSnapShot.exists()){
        const {displayName, email} = userAuth; // destructure displayName and email directly from response.user object
        const dateCreated = new Date();
        try {
            await setDoc(userDocRef, { //setDoc takes 2 arguments: document reference and object to set the document with
                displayName,
                email,
                dateCreated,
                ...additionalInformation
            });
        } catch (error) {
            console.log(`error with creating new user: ${error}`)
        };
    } else {
        return userDocRef;
    };
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutAuthUser = async () => {
    return await signOut(auth);
};

export const onAuthStateChangedListener = (callback) => {
    return onAuthStateChanged(auth, callback) 
};

// What is a callback? A callback is just a block of code that performs some desired function
// Here, we are defining onAuthStateChangedListener, which is really just a wrapper function that wraps onAuthStateChanged and executes this firebase method.
// OnAuthStateChangedListener will execute some sort of callback function that receives a user object. Based on this user object, perform some operation. Since we are actually returning the onAuthStateChanged function, onAuthStateChanged will then receive these same set of instructions to be executed.
// onAuthStateChanged firebase method needs two things to work-- the auth instance (getAuth()) and some sort of callback function or set of instructions to run when the auth instance changes. Will automatically monitor changes to auth instance. This is a higher order function-- it gets passed in auth i.e. getAuth() as an argument
// Since onAuthStateChanged is an open listener, it will automatically listen for anytime the state of the auth singleton changes (i.e. user signs in or out) and run the callback function
// Specific instructions for the callback function is defined in the user context

//Observer pattern => this is just some kind of asynchronous stream of events
// { next: (nextVal) => {// do something with nextVal}, error: (error) => {// do something with error}, complete: () => {// do something when complete} }
// in other words, if we get some event, then we fire next. Once stream of events is done, we fire complete.

/**
 * onAuthStateChanged creates a listener for us behind the scenes
 * {
 * next: callback,
 * error: errorCallback,
 * complete: completedCallback
 * }
 */