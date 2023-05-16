import './cart-dropdown.styles.scss';
import Button from '../button/Button';

const CartDropdown = () => {
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                <Button>Go to Checkout</Button>
            </div>
            
        </div>
    );
};

export default CartDropdown;