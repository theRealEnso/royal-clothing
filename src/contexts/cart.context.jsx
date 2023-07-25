import {createContext, useState, useEffect} from 'react';

const addCartItem = (cartItems, productToAdd ) => {
    const itemExistsInCart = cartItems.find(cartItem => cartItem.id === productToAdd.id); //find method iterates through array until it finds a truthy value, then returns that value

    if(itemExistsInCart){
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem);
    }

    return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, productToRemove) => {
    const itemExistsInCart = cartItems.find(cartItem => cartItem.id === productToRemove.id);

    if(itemExistsInCart.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
    }

    return cartItems.map(cartItem => cartItem.id === productToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem);
};

const deleteCartItem = (cartItems, productToDelete) => {
    const itemExistsInCart = cartItems.find(cartItem => cartItem.id === productToDelete.id);

    if(itemExistsInCart){
        return cartItems.filter(cartItem => cartItem.id !== productToDelete.id);
    }
}

export const CartContext = createContext({
    cartItems: [],
    setCartItems: () => {},
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    deleteItemFromCart: () => {},
    cartCount: 0,
    setCartCount: () => {},
    isCartOpen: false,
    setIsCartOpen: () => {},
    total: 0,
    setTotal: () => {}
});

export const CartProvider = ({children}) => {
    const [cartCount, setCartCount] = useState(0);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    };

    const deleteItemFromCart = (productToDelete) => {
        setCartItems(deleteCartItem(cartItems, productToDelete));
    }

    useEffect(() => {
        const newCartCount = cartItems.reduce((accumulator, cartItem) => accumulator + cartItem.quantity, 0); //accumulator starts at 0 => 0 + nextValue (cartItem)'s quantity. Will traverse through each cart item in the cartItems array and total the quantity of each cart item. Useffect will trigger this function everytime state of cartItems array changes

        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newTotal = cartItems.reduce((accumulator, cartItem) => accumulator + (cartItem.quantity * cartItem.price), 0);

        setTotal(newTotal);
    }, [cartItems]);

    const value = {cartCount, setCartCount, isCartOpen, setIsCartOpen, cartItems, setCartItems, addItemToCart, removeItemFromCart, deleteItemFromCart, total};
    
    return (<CartContext.Provider value={value}>{children}</CartContext.Provider>)
};
