import { useNavigate } from 'react-router-dom';

import {DirectoryItemContainer, BackgroundImage, TextContainer} from './directory-item-styles';
const DirectoryItem = ({category}) => {
    const {imageUrl, title, route} = category;
    const navigate = useNavigate();
    const handleRouteNavigation = () => navigate(route);
    return (
        <DirectoryItemContainer onClick = {handleRouteNavigation}>
            <BackgroundImage imageURL={imageUrl}></BackgroundImage>
            <TextContainer>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </TextContainer>
        </DirectoryItemContainer>
    );
};

export default DirectoryItem;