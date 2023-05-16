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
            console.log(user);
            if(user){
                createUserDocumentOrSignInUserFromAuth(user);
            }

            setCurrentUser(user);
        });

        return unsubscribe; //unsubscribes the listener when the component unmounts
    }, []);
    // console.log(currentUser);
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};

//wrap UserProvider function around app component. This gives the app and all of its children access to the user provider
//<UserProvider>
 //<app />
//</UserProvider>