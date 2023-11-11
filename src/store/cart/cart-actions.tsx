import { createAction, withMatcher, Action, ActionWithPayload } from "../../utilities/reducer-utilities";
import { CART_ACTION_TYPES, CartItem} from "./cart-types";
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

export type SetCartItemsArray = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;
export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItemsArray => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems));
export const setIsCartOpen = withMatcher((boolean: boolean): SetIsCartOpen => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean));

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return setCartItems(newCartItems);
    // return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems: CartItem[], productToRemove: CartItem) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    return setCartItems(newCartItems);
    // return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const deleteItemFromCart = (cartItems: CartItem[], productToDelete: CartItem) => {
    const newCartItems = deleteCartItem(cartItems, productToDelete);
    return setCartItems(newCartItems);
    // return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const emptyCartItems = (cartItems: CartItem[])=> {
    const emptyCart: CartItem[] = [];
    return setCartItems(emptyCart);
    // return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, emptyCart);
};

