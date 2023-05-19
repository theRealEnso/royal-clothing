import {Routes, Route} from 'react-router-dom';
import Home from './routes/home/Home.jsx';
import Navigation from './components/navigation/Navigation.jsx';
import Shop from './routes/shop/Shop.jsx';
import Authentication from './routes/authentication/Authentication.jsx'
import Checkout from './routes/checkout/Checkout.jsx';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>

        {/* index or index={true} tells app that whenever route is matched to /, render the Home component */}
        <Route index={true} element={<Home />}></Route>
        <Route path='shop' element={<Shop />}></Route>
        <Route path='sign-in' element={<Authentication />}></Route>
        <Route path='checkout' element={<Checkout />}></Route>
      </Route>
      
    </Routes>
  );
}

export default App;
