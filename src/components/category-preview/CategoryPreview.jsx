import {CategoryPreviewContainer, ProductsTitle, ProductsPreview, ViewMore, ViewMoreLink} from './category-preview.styles';
import ProductCard from '../ProductCard/ProductCard';

const CategoryPreview = ({title, products}) => {
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