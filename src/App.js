import {Routes, Route} from 'react-router-dom';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import { createUserDocumentOrSignInUserFromAuth, onAuthStateChangedListener } from './utilities/firebase/firebase.utilities.jsx';
import { setCurrentUser } from './store/user/user-action.js';

import Home from './routes/home/Home.jsx';
import Navigation from './components/navigation/Navigation.jsx';
import Shop from './routes/shop/Shop.jsx';
import Authentication from './routes/authentication/Authentication.jsx'
import Checkout from './routes/checkout/Checkout.jsx';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if(user){
        createUserDocumentOrSignInUserFromAuth(user);
      }

      // leave dispatch outside of the if block, otherwise user won't be able to sign out. Dispatch currentUser of null when signing out would fail the conditional truthy check
      dispatch(setCurrentUser(user)); 

        // dispatch({
        //   type: USER_ACTION_TYPES.SET_CURRENT_USER,
        //   payload: user
        // })
    })

    return unsubscribe;
  }, [dispatch])

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>

        {/* index or index={true} tells app that whenever the route is matched to / and nothing else after, then render the Home component */}
        <Route index={true} element={<Home />}></Route>

        <Route path='shop/*' element={<Shop />}></Route>
        <Route path='sign-in' element={<Authentication />}></Route>
        <Route path='checkout' element={<Checkout />}></Route>
      </Route>
      
    </Routes>
  );
}

export default App;
