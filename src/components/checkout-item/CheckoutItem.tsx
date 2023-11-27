import {FC} from 'react';
import { CartItem as TypedCartItem } from '../../store/cart/cart-types';
import {useDispatch, useSelector} from 'react-redux';

import {addItemToCart, removeItemFromCart, deleteItemFromCart} from '../../store/cart/cart-actions';
import { selectCartItems } from '../../store/cart/cart-selector';

import {RemoveIcon, CheckoutCardContainer, CheckoutImageContainer, CheckoutItemName, CheckoutItemQuantity, LeftArrow, RightArrow, Value, Price, ItemTotal} from './checkout-item.styles';

// import DeleteIcon from '@mui/icons-material/Delete';

type CartItemProps = {
    cartItem: TypedCartItem;
}


const CheckoutItem: FC<CartItemProps> = ({cartItem}) => {
    const {name, price, imageUrl, quantity} = cartItem;
    
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const addOneToCart = () => dispatch(addItemToCart(cartItems, cartItem));
    const removeOneFromCart = () => dispatch(removeItemFromCart(cartItems, cartItem));
    const deleteFromCart = () => dispatch(deleteItemFromCart(cartItems, cartItem));

    return (
        <CheckoutCardContainer>
            <CheckoutImageContainer>
                <img src={imageUrl} alt={`${name}`}></img>
            </CheckoutImageContainer>

            <CheckoutItemName>{name}</CheckoutItemName>

            <CheckoutItemQuantity>
                <LeftArrow onClick={removeOneFromCart}>
                    &#10094;
                </LeftArrow>

                <Value>{quantity}</Value>

                <RightArrow onClick={addOneToCart}>
                    &#10095;
                </RightArrow>
            </CheckoutItemQuantity>

            <Price>$ {price}</Price>

            <ItemTotal>$ {quantity * price}</ItemTotal>

            <RemoveIcon onClick={deleteFromCart}></RemoveIcon>

        </CheckoutCardContainer>
    );
};

export default CheckoutItem;