import {Routes, Route} from 'react-router-dom';
import {useEffect} from 'react';

import {useDispatch} from 'react-redux';

// import { createUserDocumentOrSignInUserFromAuth, onAuthStateChangedListener, getCurrentUser } from './utilities/firebase/firebase.utilities.jsx';
// import { setCurrentUser } from './store/user/user-action.js';

import { checkUserSession } from './store/user/user-action';

import Home from './routes/home/Home';
import Navigation from './components/navigation/Navigation';
import Shop from './routes/shop/Shop';
import Authentication from './routes/authentication/Authentication'
import Checkout from './routes/checkout/Checkout';
import ConfirmationPage from './routes/confirmation/confirmation-page';

// want to check if there is an active user session when App component mounts
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
    
    // getCurrentUser().then((user) => console.log(user));
  }, [dispatch]);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChangedListener((user) => {
  //     if(user){
  //       createUserDocumentOrSignInUserFromAuth(user);
  //     }

  //     // leave dispatch outside of the if block, otherwise user won't be able to sign out. Dispatch currentUser of null when signing out would fail the conditional truthy check
  //     dispatch(setCurrentUser(user)); 

  //       // dispatch({
  //       //   type: USER_ACTION_TYPES.SET_CURRENT_USER,
  //       //   payload: user
  //       // })
  //   });

  //   return unsubscribe;
  // }, []);


  return (
    <Routes>
      <Route path='/' element={<Navigation />}>

        {/* index or index={true} tells app that whenever the route is matched to / and nothing else after, then render the Home component */}
        <Route index={true} element={<Home />}></Route>

        <Route path='shop/*' element={<Shop />}></Route>
        <Route path='sign-in' element={<Authentication />}></Route>
        <Route path='checkout' element={<Checkout />}></Route>
        <Route path='confirmation' element={<ConfirmationPage />}></Route>
      </Route>
      
    </Routes>
  );
};

export default App;
