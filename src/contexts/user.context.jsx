import {createContext, useState, useEffect} from 'react';
import { onAuthStateChangedListener, createUserDocumentOrSignInUserFromAuth} from '../utilities/firebase/firebase.utilities';

//actual value we are accessing. We instantiate UserContext object with currentUser and setCurrentUser setter function as null. First, we are building the base empty state. We know user data takes shape of an object, and empty state of object should be null because we want to null check whether or not we have an existing user object or no object. Empty /null objects are still truthy => there is no context when currentUser value is null
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};

    //when application initializes, UserProvider mounts. UserProvider then instantiates this first useEfect callback on mount, which then calls the onAuthStateChangedListener. When this mounts, it will check the authentication state automatically and any future runs of this callback will be tied directly to the actual authentication state changing
    useEffect(() => {
        //When onAuthStateChanged is executed, the callback function that runs is called with a user object as an input. This user that gets passed through is going to be either an authenticated user object or null
        const unsubscribe = onAuthStateChangedListener((user) => { 
            // console.log(user);
            if(user){
                createUserDocumentOrSignInUserFromAuth(user);
            }
            setCurrentUser(user);
        });

        return unsubscribe; //unsubscribes / removes the listener when the component unmounts
    }, []);
    // console.log(currentUser);
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>

// The useEffect hook is used with an empty dependency array [], which means the effect will run only once when the component mounts.

// Inside the useEffect hook, the onAuthStateChangedListener function is called, passing a callback function that will be executed whenever the authentication state changes (i.e., when a user logs in or out).

// The onAuthStateChangedListener is  a custom function that we defined. It wraps around Firebase's onAuthStateChanged function that sets up a listener to monitor changes in the user's authentication state.

// The provided callback function checks if a user is authenticated (if (user)) and then either creates a new user document in Firebase (if user does not exist in db yet) or signs in the existing user (if user already exists in db) using the createUserDocOrSignInUserFromAuth function.

// The setCurrentUser function is then called to update the currentUser state with the newly authenticated user or null if the user is not authenticated.

// Finally, the unsubscribe function is returned from the useEffect hook. This function is what allows the removal of the authentication state listener when the component unmounts.

// When the component is about to unmount (e.g., when the user navigates away from the page or the component is removed from the DOM), React will automatically call the returned unsubscribe function. This function is a cleanup function provided by the useEffect hook, and you can use it to perform cleanup tasks before the component is unmounted.

// In this specific case, the unsubscribe function likely does the job of removing the listener set up by onAuthStateChangedListener. Removing the listener ensures that there are no memory leaks or unnecessary updates happening in the background when the component is no longer in use. This helps with performance and memory management.
};

//wrap UserProvider function around app component. This gives the app and all of its children access to the user provider
//<UserProvider>
 //<app />
//</UserProvider>