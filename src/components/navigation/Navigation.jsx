import {Outlet, Link} from 'react-router-dom';
import {useContext} from 'react';
import {useSelector} from 'react-redux';

import { selectCurrentUser } from '../../store/user/user-selector.js';

import { CartContext } from '../../contexts/cart.context.jsx';
import { signOutAuthUser } from '../../utilities/firebase/firebase.utilities.jsx';
import './navigation-styles.scss';
import {ReactComponent as CrownLogo} from '../../assets/crown.svg'
import CartIcon from '../cart-icon/CartIcon.jsx';
import CartDropdown from '../cart-dropdown/CartDropdown.jsx';

const Navigation = () => {
    // const {currentUser} = useContext(UserContext); no longer using context, migrate to redux

    const currentUser = useSelector(selectCurrentUser);

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
                        currentUser ? (<span className='nav-link' onClick={signOutAuthUser}>SIGN OUT</span>) : (<Link className='nav-link' to='/sign-in'>SIGN IN</Link>)
                    }
                    <CartIcon></CartIcon>
                </div>

                {
                    isCartOpen && <CartDropdown></CartDropdown>
                    /* isCartOpen ? <CartDropdown></CartDropdown> : null */
                }
            </div>
            <Outlet></Outlet>

            {/* The Outlet component is used to render the child components. It can be used as a placeholder inside the parent component. Without the Outlet component, we would have to define child routes inside the parent component. Since we want to persist the navigation no matter where we are, we place the navigation as the top level component inside app.js, and then define sibling routes as children underneath the navigation component */}
        </>

    );
};

export default Navigation