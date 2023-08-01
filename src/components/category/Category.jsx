import {useState, useEffect, Fragment} from 'react';
import {useParams} from 'react-router-dom';

import {useSelector} from 'react-redux';
import { selectCategoriesMap } from '../../store/categories/category-selector';

import ProductCard from '../ProductCard/ProductCard';

import './category-styles.scss';

const Category = () => {
    const {category} = useParams();
    // const {categoriesMap} = useContext(CategoriesContext);
    const categoriesMap = useSelector(selectCategoriesMap);

    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap])

    return (
        <Fragment>
            <h1 className='title'>{category}</h1>
            <div className='routed-category-container'>
                {
                    products && products.map((product) => <ProductCard key={product.id} product={product}></ProductCard>)
                }
            </div>
        </Fragment>


    );
};

export default Category;

