import {useContext} from 'react';
import {Outlet, Link} from 'react-router-dom';

import {UserContext} from '../../contexts/user.context.jsx';
import { CartContext } from '../../contexts/cart.context.jsx';
import { signOutAuthUser } from '../../utilities/firebase/firebase.utilities.jsx';
import './navigation-styles.scss';
import {ReactComponent as CrownLogo} from '../../assets/crown.svg'
import CartIcon from '../cart-icon/CartIcon.jsx';
import CartDropdown from '../cart-dropdown/CartDropdown.jsx';

const Navigation = () => {
    const {currentUser} = useContext(UserContext);
    // console.log(currentUser);

    const {isCartOpen} = useContext(CartContext);

    return (
        <>
             <div className='navigation-container'>
                <Link className='crown-logo-container' to='/'>
                    <CrownLogo />
                </Link>

                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>SHOP</Link>
                    {
                        currentUser ? <span className='nav-link' onClick={signOutAuthUser}>SIGN OUT</span> : <Link className='nav-link' to='/sign-in'>SIGN IN</Link>
                    }
                    <CartIcon></CartIcon>
                </div>

                {
                    isCartOpen && <CartDropdown></CartDropdown>
                    /* isCartOpen ? <CartDropdown></CartDropdown> : null */
                }
            </div>
            <Outlet></Outlet>
        </>

    );
};

export default Navigation