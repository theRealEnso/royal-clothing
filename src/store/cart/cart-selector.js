import {createSelector} from 'reselect';

const extractCartReducer = (state) => state.cart; //cartReducer

export const selectCartItems = createSelector([extractCartReducer], (cartSlice) => cartSlice.cartItems);

export const selectIsCartOpen = createSelector([extractCartReducer], (cartSlice) => cartSlice.isCartOpen);

export const selectCartCount = createSelector([selectCartItems], (cartItems) => cartItems.reduce((accumulator, cartItem) => accumulator + cartItem.quantity, 0));

export const selectCartTotal = createSelector([selectCartItems], (cartItems) => cartItems.reduce((accumulator, cartItem) => accumulator + (cartItem.quantity * cartItem.price), 0));

