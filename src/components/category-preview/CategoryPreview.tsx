import {FC} from 'react';
import {CategoryItem } from '../../store/categories/category-types';

import {CategoryPreviewContainer, ProductsTitle, ProductsPreview, ViewMore, ViewMoreLink} from './category-preview.styles';
import ProductCard from '../ProductCard/ProductCard';

type CategoryProps = {
    title: string;
    products: CategoryItem[]; //an array of product objects associated with each title
}

const CategoryPreview: FC<CategoryProps> = ({title, products}) => {
    return (
        <CategoryPreviewContainer>
            <h2>
                <ProductsTitle to={title}>{title.toUpperCase()}</ProductsTitle>
            </h2>

            <ProductsPreview>
                {
                    products.filter((_, index) => index < 4)
                    .map((product) => <ProductCard key={product.id} product={product}></ProductCard>)
                }
            </ProductsPreview>
            
            <ViewMore>
                {/* shop/{title} */}
                <ViewMoreLink to={title}>View More {title.charAt(0).toUpperCase() + title.slice(1)}</ViewMoreLink>
            </ViewMore>
        </CategoryPreviewContainer>
    );
};

export default CategoryPreview;