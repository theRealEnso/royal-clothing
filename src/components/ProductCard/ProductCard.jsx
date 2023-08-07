import {useDispatch, useSelector} from 'react-redux';

import { selectCartItems } from '../../store/cart/cart-selector';
import { addItemToCart, setIsCartOpen} from '../../store/cart/cart-actions';

import './product-card.styles.scss';
import Button from '../button/Button';

const ProductCard = ({product}) => {
    const {name, imageUrl, price} = product;

    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const addProductToCart = () => {
        dispatch(addItemToCart(cartItems, product));
        dispatch(setIsCartOpen(true));
    };

    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`}></img>

            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>$ {price}</span>
            </div>
            <Button buttonType='inverted' onClick={addProductToCart}>Add to Cart</Button>
        </div>
    );
};

export default ProductCard;