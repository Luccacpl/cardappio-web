import styled from 'styled-components'
import { fontsSizes } from '../../utils'
import {colors} from '../../utils/colors'

interface CustomButtonProps {
    margin?: string
    height?: string
    width?: string
    color?: string
    fontWeight?: string
    fontSize?: string
    backgroundColor?: string
    padding?: string
    marginTop?: string
    widthResponsive?: string
    fontSizeResponsive?: string
    heightResponsive?: string
    BgColor?: string
}

const CustomButton = styled.button<CustomButtonProps>`
    margin: ${props => props.margin};
    margin-top: ${props => props.marginTop};
    width: ${props => props.width};
    height: ${(props) => props.height || '1.875rem'};
    min-height: 2rem;
    padding: ${props => props.padding || "0 20px"};
    background-color: ${props => props.BgColor || colors.menuOrange};
    color: ${props => props.color || colors.white};
    border: 1px solid transparent;
    border-radius: 30px;
    outline: none;
    font-weight: ${props => props.fontWeight || '400'};
    font-size: ${props => props.fontSize || fontsSizes.small14};
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 5px  rgba(0, 0, 0, .5);
        transition: all 0.2s;
    }
    @media screen and (min-width: 1281px) {
        width: ${props => props.widthResponsive};
        font-size: ${props => props.fontSizeResponsive || fontsSizes.large18};
        height: ${(props) => props.heightResponsive || '2.5rem'};
    }
    @media print {
        display: none
    }
`

export default CustomButton