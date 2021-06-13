import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

interface IFlex {
  justifyContent?: string;
  alignItems?: string
  height?: string
  margin?: string
  flexDirection?: string
  width?: string
}


interface FlexProps {
  justifyContent?: string
  alignItems?: string
  height?: string
  margin?: string
  flexDirection?: string
  flexDirectionMobile?: string
  flex?: string
  displayMobile?: string
  marginMobile?: string
  widthMobile?: string
  minWidth?: string
  width?: string
}


const Spinner = styled.div<IFlex>`
  display: flex;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  flex-direction: ${(props) => props.flexDirection};
  width: ${(props) => props.width};
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 2px solid #E67B31;
  border-right: 2px solid #E67B31;
  border-bottom: 2px solid #E67B31;
  border-left: 4px solid #552D11;
  background: transparent;
  width: 70px;
  height: 70px;
  border-radius: 50%;
`;

const Wrapper = styled.div<IFlex>`
  display: flex;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  height: ${(props) => props.height || "100vh"};
  margin: ${(props) => props.margin};
  flex-direction: ${(props) => props.flexDirection};
  width: ${(props) => props.width};
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  @media screen and (max-width: 768px) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

const Content = styled.div<IFlex>`
  display: flex;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  flex-direction: ${(props) => props.flexDirection};
  width: ${(props) => props.width};
  width: 100%;
  height: 100%;
  padding: 40px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 5px;
  @media screen and (max-width: 768px) {
    width: 100%;
    justify-content: center;
    align-items: center;
  }
`;

const FlexCol = styled.div<FlexProps>`
  flex: ${props => props.flex};
  display: flex;
  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems};
  height: ${props => props.height};
  margin: ${props => props.margin};
  flex-direction: ${props => props.flexDirection};
  width: ${props => props.width};
  @media screen and (max-width: 768px) {
    flex-direction: ${props => props.flexDirectionMobile || 'column'};
    margin: ${props => props.marginMobile};
    display: ${props => props.displayMobile};
    justify-content: space-between;
    width: ${props => props.widthMobile};
    min-width: ${props => props.minWidth};
    }
`

export { Spinner, Content, Wrapper, FlexCol };
