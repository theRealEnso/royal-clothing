// import {ReactComponent as ShoppingIconSVG} from '../../assets/shopping-bag.svg';

// import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import { setIsCartOpen } from '../../store/cart/cart-actions';
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart-selector';


import {ShoppingIcon, CartIconContainer, ItemCount} from './cart-icon.styles';


const CartIcon = () => {
    const dispatch = useDispatch();

    const cartCount = useSelector(selectCartCount);
    const isCartOpen = useSelector(selectIsCartOpen);
    const toggleCart = () => dispatch(setIsCartOpen(!isCartOpen));

    // useEffect block is to close the cart dropdown when user clicks anywhere outside of the cart dropdown and outside of the cart icon
    // useEffect(() => {
    //     const closeCartDropdown = (event) => {
    //         console.log(event);
    //         if(event.target.localName !== "div" && event.target.nodeName !== "svg" && event.target.nodeType !== 1) {

    //             dispatch(setIsCartOpen(false));
    //         };
    //     };

    //     const dropDownEventListener = document.body.addEventListener('click', closeCartDropdown); // add event listener when component mounts
    //     return dropDownEventListener; // remove event listener when component unmounts

    // }, [dispatch]);

    return (
        <CartIconContainer>
            <ShoppingIcon onClick={toggleCart}></ShoppingIcon>
            <ItemCount onClick={toggleCart}>{cartCount}</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;