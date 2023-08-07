import { CART_ACTION_TYPES } from "./cart-types";

const CART_ITEMS_INITIAL_STATE = {
    cartItems: [],
    isCartOpen: false
}

export const cartReducer = (state = CART_ITEMS_INITIAL_STATE, action = {}) => {
    const {type, payload} = action;

    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                cartItems: payload //cartItems: newCartItems
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload // isCartOpen: true/false
            }
        default:
            return state;
    };
};