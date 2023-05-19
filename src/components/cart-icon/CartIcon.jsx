import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import {useContext, useEffect} from 'react';
import './cart-icon.styles.scss';

import { CartContext } from '../../contexts/cart.context';

const CartIcon = () => {
    const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext);

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    // useEffect block is to close the cart dropdown when user clicks anywhere outside of the cart dropdown and outside of the cart icon
    useEffect(() => {
        const closeCartDropdown = (event) => {
            console.log(event);
            if(event.target.className !== 'item-count'  && event.target.className !== 'cart-icon-container'  && event.target.className !== 'cart-items' && event.target.nodeName !== 'svg' && event.target.nodeName !== 'path'){
                setIsCartOpen(false);
            };
        };

        document.body.addEventListener('click', closeCartDropdown); // add event listener when component mounts
        return () => document.body.removeEventListener('click', closeCartDropdown); // remove event listener when component unmounts

    }, [setIsCartOpen]);

    return (
        <div className='cart-icon-container' onClick={toggleCart}>
            <ShoppingIcon className='shopping-icon'></ShoppingIcon>
            <span className='item-count'>{cartCount}</span>
        </div>
    );
};

export default CartIcon;