import styled, { keyframes } from 'styled-components';

import { colors, dimensions, fontsSizes } from '../../utils'

interface TitleComponentProps {
  fontSize?: string;
  color?: string;
  fontWeight?: string;
  textAlign?: string;
  lineHeight?: string;
}


interface PProps {
  float?: string
  lineHeight?: string
  fontSize?: string
  color?: string
  fontWeight?: string
  textTransform?: string
  backgroundColor?: string
  textAlign?: string
  padding?: string
  strongColor?: string
}

interface AsideBackButtonProps {
  marginTop?: string
}


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
  animation-name: ${translate};
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  animation-direction: alternate;
`

const RightContainer = styled.div`
  width: 70%;
  height: 100vh;
  background-color: ${colors.blackModal};
  padding: ${dimensions.spacing40};
  padding-left: 123px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const CloseButton = styled.button`
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 50%;
  background-color: ${colors.menuOrange};
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 30%;
  transform: translate( -50%, -50%);
  cursor: pointer;
  outline: none;
  transition: all 0.2s;
  &:hover {
        /* transform: translate(-50%, -60%); */
        width: 46px;
        height: 46px;
        box-shadow: 0 5px 5px  rgba(0, 0, 0, .5);
        transition: all 0.4s;
    }
  `


export { OverlayModal, RightContainer, CloseButton } 
