import {initializeApp } from 'firebase/app'; // function to create app instance based off of object config

import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth'; //functions for signing in

import {getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs} from 'firebase/firestore'; // functions for adding users to db => doc gets document instance, getDoc function only gets data inside a document instance. Likewise, setDoc function only sets the data inside a document.

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
    
    const userCollectionRef = collection(db, 'users'); //use collection method to create a reference to a users collection. Need to pass in firestore instance (const db = getFireStore())

    const userDocRef = doc(userCollectionRef, userAuth.uid); //create user document reference inside of users collection => use doc method, pass in the users collection as 1st argument and use the unique ID of the user response object as 2nd argument (response.user.uid) to create a document reference of this user. This document reference will have shape of an object. Name of the document will be the response.user.uid

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


//async function that is very similar to createUserDocumentOrSignInUserFromAuth. We are only using this function ONCE to add all of our product data to firestore inside the product / category context.
export const addCollectionAndDocuments = async (collectionKey, productObjectsToAdd) => { // collectionKey and objectsToAdd are arguments/placeholder values. We will be passing in string 'categories' as the collection key when we use this in our context, and we will be passing in the entire shop data array of product objects from the shop-data.js file into the objectsToAdd

    const collectionRef = collection(db, collectionKey); // use firestore's collection method to create a reference to a collection. Need to pass in db aka getFirestore() method, and a collection key.
    
    const batch = writeBatch(db); // make a batch. This calls writeBatch, which returns a batch, and we need to pass it the database that we need to write the batch on

    // for each of our SHOP_DATA product objects inside shop-data.js file, create a document reference / instances inside of our collection, and set the name of the document to the title of the product, and lowercase it.
    productObjectsToAdd.forEach((productObject) => {
        const productDocumentRef = doc(collectionRef, productObject.title.toLowerCase()); // create document instances inside our (in this case) categories collection and set the name of each document to the product title lowercased
        batch.set(productDocumentRef, productObject) // set the data inside each document instance with the product object data
    });

    await batch.commit();
    console.log(`done!`);
}
// this is how the addCollectionAndDocuments function will be used in the context file:
// useEffect(() => {
//     addCollectionAndDocuments('categories', SHOP_DATA)
// }, [])

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories'); // get reference to categories collection inside firestore db
    const q = query(collectionRef); //query method on collectionRef creates a query that retrieves all of the documents inside the categories collection (i.e. hats/jackets/sneakers/mens/womens)

    try {
        const querySnapshot = await getDocs(q); // The getDocs method from the firestore is used to asynchronously retrieve the documents matching the query, which is stored in the querySnapshot constant.

        console.log(querySnapshot); // prints a giant object
        console.log(querySnapshot.docs); //.docs nested one layer deeper contains an array of our 5 product document instances for each product category
        const categoryMap = querySnapshot.docs.reduce((accumulator, docSnapshot) => {
            //docSnapshot aka nextValue represents a a single product document in the querySnapshhot.docs array
            console.log(docSnapshot);
            console.log(docSnapshot.data()); // returns object with key-value pairs-- 1st pair has key of title and a string value of the product category name. The second pair has key of items  and its value is an array of individual products
            const {title, items} = docSnapshot.data();
            accumulator[title.toLowerCase()] = items;
            return accumulator;
        }, {});
    
        return categoryMap;
        
    } catch (error) {
        console.log(error);
    }
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

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

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

////////////////       OLD CODE     /////////////////////////

// this is an async function will add new user to DB if user does not exists, otherwise will return user data of existing user. Function accepts user data from the user response object when signing in with google popup
// export const createUserDocumentOrSignInUserFromAuth = async (userAuth, additionalInformation = {}) => { // userAuth is placeholder. Will be passing in user data from response object when signing in with google popup i.e. response.user. additionalInformation placeholder object will handle responses where displayName comes back as null and we set the displayName on the actual form
//     if(!userAuth) return;
    
//     //doc function takes 3 arguments (firestore database instance, name of collection (will set collection with name if it does not exist), and a unique ID)
//     const userDocRef = doc(db, 'users', userAuth.uid); //use the unique ID of the user response object (response.user.uid) to create a document reference of this user. This document reference will have shape of an object. Name of collection inside firestore will be users, and name of the document will be the response.user.uid
//     console.log(userDocRef);

//     const userSnapShot = await getDoc(userDocRef);
//     console.log(userSnapShot);
//     console.log(userSnapShot.exists()); //returns boolean, nested under prototype

//     //If user data does not exist yet, then use setDoc function to set the user data inside the document instance, and then place document of user data inside the database. Otherwise, document already exists and simply return to me that user document
//     if(!userSnapShot.exists()){
//         const {displayName, email} = userAuth; // destructure displayName and email directly from response.user object
//         const dateCreated = new Date();
//         try {
//             await setDoc(userDocRef, { //setDoc takes 2 arguments: document reference and object to set the document with
//                 displayName,
//                 email,
//                 dateCreated,
//                 ...additionalInformation
//             });
//         } catch (error) {
//             console.log(`error with creating new user: ${error}`)
//         };
//     } else {
//         return userDocRef;
//     };
// };