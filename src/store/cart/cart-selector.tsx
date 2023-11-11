import {createSelector} from 'reselect';
import { CartItem} from './cart-types';

const extractCartReducer = (state) => state.cart; //cartReducer

export const selectCartItems = createSelector([extractCartReducer], (cartSlice) => cartSlice.cartItems); // state.cart.cartItems i.e. result of selectCartItems is cartItems pulled from the cart reducer in redux store

export const selectIsCartOpen = createSelector([extractCartReducer], (cartSlice) => cartSlice.isCartOpen); // state.cart.isCartOpen i.e. result of selectIsCartOpen is isCartOpen pulled from the cart reducer in redux store

export const selectCartCount = createSelector([selectCartItems], (cartItems) => cartItems.reduce((accumulator: number, cartItem: CartItem) => accumulator + cartItem.quantity, 0));

export const selectCartTotal = createSelector([selectCartItems], (cartItems) => cartItems.reduce((accumulator: number, cartItem: CartItem) => accumulator + (cartItem.quantity * cartItem.price), 0));

