import {Routes, Route} from 'react-router-dom';
import CategoriesPreview from '../categories-preview/CategoriesPreview';
import Category from '../../components/category/Category';

import './shop-styles.scss';

const Shop = () => {

    return (
        <Routes>
            <Route index element={<CategoriesPreview></CategoriesPreview>}></Route>
            <Route path=':category' element={<Category></Category>}></Route>
        </Routes>
    )
};

export default Shop;
///////////////////////////////////////////////////////////////////////////////

// {/* <Fragment>
// {/* Object.keys returns array of titles as strings (['hats', 'sneakers', jackets', ...etc]), display titles as h2's. We loop through each title in the array and return a whole other fragment piece that contains an h2, and extract the products data array in order to show product cards for every single product */}
// {Object.keys(categoriesMap).map((title) => ( 
//     <Fragment key={title}>
//         <h2>{title}</h2>
//         {/* need to get array of actual products now => use [title] to get array of products to map through */}
//         <div className='products-container'>
//             {categoriesMap[title].map((product) => ( //mapping through products array
//                 <ProductCard key={product.id} product={product}></ProductCard>
//             ))}
//         </div>
//     </Fragment>
// ))}
// </Fragment> */}