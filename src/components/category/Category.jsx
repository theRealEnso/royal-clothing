import {useState, useEffect, Fragment} from 'react';
import {useParams} from 'react-router-dom';

import {useSelector} from 'react-redux';
import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/category-selector';

import ProductCard from '../ProductCard/ProductCard';
import Spinner from '../spinner/spinner';

import {Title, RoutedCategoryContainer} from './category-styles.jsx';

const Category = () => {
    const {category} = useParams(); // extract category variable we defined in nested routing structure inside shop component. This var ends up being product titles
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

