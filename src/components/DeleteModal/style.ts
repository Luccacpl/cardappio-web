import styled, { keyframes } from 'styled-components';

import { colors } from '../../utils'

const translate = keyframes`
  from {
    right: -100%;
  }
  to {
    right: 0%;
  }
`;

const OverlayModal = styled.div`
  height: 100vh;
  width: 100%;
  top: 0;
  right: -100%;
  position: absolute;
  z-index: 9999;
  justify-content: flex-end;
  align-items: flex-end;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  animation-name: ${translate};
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  animation-direction: alternate;
`

const MiddleContainer = styled.div`
  width: 450px;
  height: 300px;
  background-color: ${colors.blackModal};
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`

const HeaderClose = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

const WarningDiv = styled.div`
    width: 100%;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const FooterDiv = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`



export { OverlayModal, MiddleContainer, HeaderClose, WarningDiv, FooterDiv } 
