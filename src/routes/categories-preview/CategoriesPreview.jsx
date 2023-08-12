import {Fragment} from "react";

import {useSelector} from 'react-redux';
import { selectCategoriesMap, selectCategoriesIsLoading } from "../../store/categories/category-selector";

import CategoryPreview from "../../components/category-preview/CategoryPreview";
import Spinner from '../../components/spinner/spinner';

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading)

    return (
        //map through array of titles, run callback on each title => For each title, extract array of product objects first, then return / render the category preview component passing in this product data as props so that the category preview component has access to the data
        <Fragment>
            {  
                isLoading ? <Spinner></Spinner> : (Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title];
                    return <CategoryPreview key={title} title={title} products={products}></CategoryPreview>
                }))
            }
        </Fragment>
    );
};

export default CategoriesPreview;
