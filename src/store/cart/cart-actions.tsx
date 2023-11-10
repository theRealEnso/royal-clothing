import { createAction, withMatcher } from "../../utilities/reducer-utilities";
import { CART_ACTION_TYPES, CartItem } from "./cart-types";
import { CategoryItem } from "../categories/category-types";

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
    const itemExistsInCart = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    if(itemExistsInCart){
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem);
    };

    return [...cartItems, {...productToAdd, quantity: 1}];
};

const removeCartItem = (cartItems: CartItem[], productToRemove: CartItem): CartItem[] => {
    const itemExistsInCart = cartItems.find((cartItem) => cartItem.id === productToRemove.id);

    if(itemExistsInCart && itemExistsInCart.quantity === 1){
        return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
    }

    return cartItems.map((cartItem) => cartItem.id === productToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem)
};

const deleteCartItem = (cartItems: CartItem[], productToDelete: CartItem): CartItem[] => {
    return cartItems.filter((cartItem) => cartItem.id !== productToDelete.id);
};

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const deleteItemFromCart = (cartItems, productToDelete) => {
    const newCartItems = deleteCartItem(cartItems, productToDelete);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const emptyCartItems = (cartItems) => {
    const emptyCart = [];
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, emptyCart);
};


export const setIsCartOpen = (boolean) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);