import styled from 'styled-components'

import { colors } from '../../utils/colors'
import { dimensions } from '../../utils/dimensions'
import { fontsSizes } from '../../utils/fontSizes'

interface IInput {
    backgroundColor?: string
    width?: string
    height?: string
    fontWeight?: string
    fontSize?: string
    marginLeft?: string
    marginTop?: string
    margin?: string
    display?: string
    marginTopResponsive?: string
    heightResponsive?: string
    fontSizeResponsive?: string
}

const Input = styled.input<IInput>`
    background-color: ${props => props.backgroundColor || colors.fundoInput};
    outline: none;
    border: 0.1px solid transparent;
    min-width: 200px;
    border-radius: 5px;
    width: ${props => props.width || '100%'};
    height: ${props => props.height || '45px'};
    font-family: Roboto;
    font-style: normal;
    font-weight: ${props => props.fontWeight || '400'};
    font-size: ${props => props.fontSize || fontsSizes.small14};
    color: rgba(255, 255, 255, 0.7);
    padding: 15px;
    display: ${props => props.display || "flex"};
    margin-left: ${props => props.marginLeft};
    margin-top: ${props => props.marginTop};
    margin: ${props => props.margin};
    transition: all 0.3s;
    &:focus {
        border: 0.1px solid transparent;
        transition: all 0.3s;
    }
    ::placeholder{
        color: rgba(255, 255, 255, 0.6);
    }
    @media screen and (min-width: 1281px){
        margin-top: ${props => props.marginTopResponsive};
        height: ${props => props.heightResponsive || '60px'};
        font-size: ${props => props.fontSizeResponsive || fontsSizes.large18};
    }
`



export { Input }