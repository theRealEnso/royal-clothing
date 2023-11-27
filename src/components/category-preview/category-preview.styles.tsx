import styled from 'styled-components';

import {Link} from 'react-router-dom';

const hoverColor = 'rgb(35,245,241)';

export const CategoryPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`

export const ProductsTitle = styled(Link)`
  font-size: 28px;
  margin-bottom: 25px;
  cursor: pointer;
  &:hover {
    color: ${hoverColor};
  }
`

export const ProductsPreview = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
`

export const ViewMore = styled.span`
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
  font-size: 20px;
  &:hover {
    color: ${hoverColor};
  }
`

export const ViewMoreLink = styled(Link)`
  &:hover {
    color: ${hoverColor};
  }
`

// $hoverColor: rgb(35,245,241);

// .category-preview-container {
//     display: flex;
//     flex-direction: column;
//     margin-bottom: 30px;
  
//     .products-title {
//       font-size: 28px;
//       margin-bottom: 25px;
//       cursor: pointer;
//       &:hover {
//         color: $hoverColor;
//       }
//     }
  
//     .products-preview {
//       display: grid;
//       grid-template-columns: repeat(4, 1fr);
//       column-gap: 20px;
//     }

//     .view-more {
//       margin-top: 30px;
//       display: flex;
//       justify-content: flex-end;
//       font-size: 20px;
//       &:hover {
//         color: $hoverColor;
//       }

//       .link {
//         &:hover {
//           color: $hoverColor;
//         }
//       }
//     }
//   }
  