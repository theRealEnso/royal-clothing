import { useNavigate } from 'react-router-dom';

import './directory-item-styles.scss';
const DirectoryItem = ({category}) => {
    const {imageUrl, title, route} = category;
    const navigate = useNavigate();
    const handleRouteNavigation = () => navigate(route);
    return (
        <div className='directory-item-container' onClick = {handleRouteNavigation}>
            <div className='background-image' style={{backgroundImage: `url(${imageUrl})`}}></div>
            <div className='text-container'>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </div>
        </div>
    );
};

export default DirectoryItem;