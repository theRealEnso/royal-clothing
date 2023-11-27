import {FC} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import { addItemToCart, removeItemFromCart, deleteItemFromCart } from '../../store/cart/cart-actions';
import { selectCartItems } from '../../store/cart/cart-selector';

import {CheckBoxIcon, AddIcon, DeleteIcon, CartItemContainer, ItemDetails, Name, QuantityPrice, IconContainer} from './cart-item.styles';
// import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
// import AddBoxIcon from '@mui/icons-material/AddBox';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { CartItem as TypedCartItem } from '../../store/cart/cart-types';

type CartItemProps = {
    cartItem: TypedCartItem
}


const CartItem: FC<CartItemProps> = ({cartItem}) => {
    const {name, quantity, price, imageUrl} = cartItem;

    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();

    const addProductToCart = () => dispatch(addItemToCart(cartItems, cartItem));
    const removeProductFromCart = () => dispatch(removeItemFromCart(cartItems, cartItem));
    const deleteProductFromCart = () => dispatch(deleteItemFromCart(cartItems, cartItem));

    return (
        <CartItemContainer>
            <img src={imageUrl} alt={`${name}`}></img>

            <ItemDetails>
                <Name>{name}</Name>
                <QuantityPrice>{quantity} x ${price}</QuantityPrice>

                <IconContainer>
                    <CheckBoxIcon onClick={removeProductFromCart}></CheckBoxIcon>
                    <AddIcon onClick={addProductToCart}></AddIcon>
                    <DeleteIcon onClick={deleteProductFromCart}></DeleteIcon>
                </IconContainer>
                
            </ItemDetails>

        </CartItemContainer>
    );
};

export default CartItem;