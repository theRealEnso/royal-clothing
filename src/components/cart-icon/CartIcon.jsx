import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';

import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import { setIsCartOpen } from '../../store/cart/cart-actions';
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart-selector';


import './cart-icon.styles.scss';


const CartIcon = () => {
    const dispatch = useDispatch();

    const cartCount = useSelector(selectCartCount);
    const isCartOpen = useSelector(selectIsCartOpen);
    const toggleCart = () => dispatch(setIsCartOpen(!isCartOpen));

    // useEffect block is to close the cart dropdown when user clicks anywhere outside of the cart dropdown and outside of the cart icon
    useEffect(() => {
        const closeCartDropdown = (event) => {
            // console.log(event);
            if(event.target.className !== 'item-count'  && event.target.className !== 'cart-icon-container'  && event.target.className !== 'cart-items' && event.target.nodeName !== 'svg' && event.target.nodeName !== 'path' && event.target.nodeName !== 'BUTTON') {

                dispatch(setIsCartOpen(false));
            };
        };

        const dropDownEventListener = document.body.addEventListener('click', closeCartDropdown); // add event listener when component mounts
        return dropDownEventListener; // remove event listener when component unmounts

    }, [dispatch]);

    return (
        <div className='cart-icon-container' onClick={toggleCart}>
            <ShoppingIcon className='shopping-icon'></ShoppingIcon>
            <span className='item-count'>{cartCount}</span>
        </div>
    );
};

export default CartIcon;