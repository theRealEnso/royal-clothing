import {createContext, useState} from 'react';

export const CartContext = createContext({
    products: [],
    cartCount: 0,
    setCartCount: () => {},
    isCartOpen: false,
    setIsCartOpen: () => {},
});

export const CartProvider = ({children}) => {
    const [cartCount, setCartCount] = useState(0);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const value = {cartCount, setCartCount, isCartOpen, setIsCartOpen}
    return (<CartContext.Provider value={value}>{children}</CartContext.Provider>)
};