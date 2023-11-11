import {AnyAction} from 'redux';
import { CartItem } from "./cart-types";
import {setCartItems, setIsCartOpen, resetCart} from '../cart/cart-actions';


export type CartItemsState = {
    readonly cartItems: CartItem[],
    readonly isCartOpen: boolean
};

export const CART_ITEMS_INITIAL_STATE: CartItemsState = {
    cartItems: [],
    isCartOpen: false
};

export const cartReducer = (state = CART_ITEMS_INITIAL_STATE, action: AnyAction): CartItemsState => {

    if(setIsCartOpen.match(action)) {
        return {
            ...state,
            isCartOpen: action.payload
        };
    };

    if(setCartItems.match(action)){
        return {
            ...state,
            cartItems: action.payload
        };
    };

    if(resetCart.match(action)){
        return {
            ...state,
            cartItems: action.payload
        }
    }

    return state;
};

// old reducer before typescript
// export const cartReducer = (state = CART_ITEMS_INITIAL_STATE, action = {}) => {
//     const {type, payload} = action;

//     switch(type){
//         case CART_ACTION_TYPES.SET_CART_ITEMS:
//             return {
//                 ...state,
//                 cartItems: payload //cartItems: newCartItems
//             }
//         case CART_ACTION_TYPES.SET_IS_CART_OPEN:
//             return {
//                 ...state,
//                 isCartOpen: payload // isCartOpen: true/false
//             }
//         default:
//             return state;
//     };
// };