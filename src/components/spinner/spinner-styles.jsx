import styled from 'styled-components';

export const SpinnerOverlay = styled.div`
  height: 60vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SpinnerContainer = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid rgba(195, 195, 195, 0.6);
  border-radius: 50%;
  border-top-color: #636767;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;

// .spinner-overlay {
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     flex-direction: column;
//     background-color: rgba(0, 0, 0, 0.5);
//     z-index: 9999;

//     .loading {
//         margin-bottom: 20px;
//     }

//     .spinner-container {
//         display: inline-block;
//         width: 50px;
//         height: 50px;
//         border: 3px solid rgba(195, 195, 195, 0.6);
//         border-radius: 50%;
//         border-top-color: #636767;
//         animation: spin 1s ease-in-out infinite;
//         -webkit-animation: spin 1s ease-in-out infinite;
//         @keyframes spin {
//           to {
//             -webkit-transform: rotate(360deg);
//           }
//         }
//         @-webkit-keyframes spin {
//           to {
//             -webkit-transform: rotate(360deg);
//           }
//         }
//     }
    
// }



