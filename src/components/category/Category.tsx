import {useState, useEffect, Fragment} from 'react';
import {useParams} from 'react-router-dom';

import {useSelector} from 'react-redux';
import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/category-selector';

import ProductCard from '../ProductCard/ProductCard';
import Spinner from '../spinner/spinner';

import {Title, RoutedCategoryContainer} from './category-styles';

type CategoryRouteParams = {
    category: string;
}

const Category = () => {
    // extract category variable we defined in nested routing structure inside shop component. This var ends up being product titles, which is definitely of a string data type.
    //before, category could have been either a string or undefined. Define a type and set category to be of string data type. useParams can accept a variety of values, we we are casting the CategoryRouteParams type to this, which tells useParams to define category as a string
    const {category} = useParams<keyof CategoryRouteParams>() as CategoryRouteParams; 
    // const {categoriesMap} = useContext(CategoriesContext);
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);

    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap])

    return (
        <Fragment>
            <Title>{category}</Title>
            <RoutedCategoryContainer>

                {
                    isLoading ? <Spinner></Spinner> : products && products.map((product) => <ProductCard key={product.id} product={product}></ProductCard>)
                }

            </RoutedCategoryContainer>
        </Fragment>
    );
};

export default Category;

