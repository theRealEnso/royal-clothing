import { Link } from 'react-router-dom';

import './category-preview.styles.scss';
import ProductCard from '../ProductCard/ProductCard';

const CategoryPreview = ({title, products}) => {
    return (
        <div className='category-preview-container'>
            <h2>
                <Link className='products-title' to={title}>{title.toUpperCase()}</Link>
            </h2>

            <div className='products-preview'>
                {
                    products.filter((_, index) => index < 4)
                    .map((product) => <ProductCard key={product.id} product={product}></ProductCard>)
                }
            </div>
            
            <span className='view-more'>
                {/* shop/{title} */}
                <Link to={title} className='link'>View More {title.charAt(0).toUpperCase() + title.slice(1)}</Link>
            </span>
        </div>
    );
};

export default CategoryPreview;