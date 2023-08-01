import {Fragment} from "react";

import {useSelector} from 'react-redux';
import { selectCategoriesMap } from "../../store/categories/category-selector";

import CategoryPreview from "../../components/category-preview/CategoryPreview";

const CategoriesPreview = () => {
    // const {categoriesMap} = useContext(CategoriesContext);
    const categoriesMap = useSelector(selectCategoriesMap);

    return (
        //map through array of titles, run callback on each title => For each title, extract array of product objects first, then return / render the category preview component passing in this product data as props so that the category preview component has access to the data
        <Fragment>
            {  
                Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title];
                    return <CategoryPreview key={title} title={title} products={products}></CategoryPreview>
                })
            }
        </Fragment>
    )
};

export default CategoriesPreview;
