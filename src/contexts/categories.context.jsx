import {createContext, useState, useEffect} from 'react';

import { getCategoriesAndDocuments } from '../utilities/firebase/firebase.utilities.jsx';

// import SHOP_DATA from '../shop-data.js'; //removing this, no longer need to import data because we moved data to firestore

export const CategoriesContext = createContext({
    categoriesMap: {},
    setCategoriesMap: () => null,
});

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    const value = {categoriesMap, setCategoriesMap};

    //get data one time when app mounts
    //note: recall that getCategoriesAndDocuments is an async function that returns a promise. We cannot call async functions that already return a promise directly inside a useEffect. Instead, we must create a new async function and nest it inside new async function, and then call it afterwards
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            // console.log(categoryMap);
            setCategoriesMap(categoryMap);
        }
        
        getCategoriesMap();

    },[])

    //removing this useEffect block because we only needed to use this block once to add our product data to firestore
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA)
    // }, [])

    return (<CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>)
};