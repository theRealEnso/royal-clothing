import {Fragment} from 'react';
import {Outlet} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {useDispatch} from 'react-redux';
import { signOutStart } from '../../store/user/user-action';

import { selectIsCartOpen } from '../../store/cart/cart-selector';

import { selectCurrentUser } from '../../store/user/user-selector';

// import { signOutAuthUser } from '../../utilities/firebase/firebase.utilities.jsx';
import {NavigationContainer, CrownLogoContainer, NavLinksContainer, NavLinks} from './navigation-styles';
import {ReactComponent as CrownLogo} from '../../assets/crown.svg'
import CartIcon from '../cart-icon/CartIcon.jsx';
import CartDropdown from '../cart-dropdown/CartDropdown.jsx';

const Navigation = () => {
    // const {currentUser} = useContext(UserContext); no longer using context, migrate to redux
    const dispatch = useDispatch();

    const currentUser = useSelector(selectCurrentUser);

    const isCartOpen = useSelector(selectIsCartOpen);

    const logOutUser = () => dispatch(signOutStart());

    return (
        <Fragment>
            <NavigationContainer>
                <CrownLogoContainer to='/'>
                    <CrownLogo />
                </CrownLogoContainer>

                <NavLinksContainer>
                    <NavLinks to='/shop'>SHOP</NavLinks>
                    {
                        currentUser ? (<NavLinks as='span' onClick={logOutUser}>SIGN OUT</NavLinks>) : (<NavLinks to='/sign-in'>SIGN IN</NavLinks>)
                    }
                    <CartIcon></CartIcon>
                </NavLinksContainer>

                {
                    isCartOpen && <CartDropdown></CartDropdown>
                }
            </NavigationContainer>
            <Outlet></Outlet>

            {/* The Outlet component is used to render the child components. It can be used as a placeholder inside the parent component. Without the Outlet component, we would have to define child routes inside the parent component. Since we want to persist the navigation no matter where we are, we place the navigation as the top level component inside app.js, and then define sibling routes as children underneath the navigation component */}
        </Fragment>

    );
};

export default Navigation;