import styled from 'styled-components'

import { colors } from '../../utils/colors'
import { dimensions } from '../../utils/dimensions'
import { fontsSizes } from '../../utils/fontSizes'


interface AsideProps {
    height?: string
}

interface AsideTitleProps {
    fontSize?: string
    fontWeight?: string
}

interface AsideUlProps {

}

interface AsideLiProps {
    backgroundColor?: string
    $selected?: boolean;
}

interface AsideLiTextProps {
    fontSize?: string
    fontWeight?: string
}

interface AsideBackButtonProps {
    marginTop?: string
}

const Aside = styled.aside<AsideProps>`
    width: 100%;
    height: ${props => props.height || dimensions.heightFullWindow};
    background-color: ${colors.black};
    min-width: 125px;
    text-align: center;
    grid-column-start: 1;
    @media print {
        display: none;
    }
`

const AsideTitle = styled.h1<AsideTitleProps>`
    font-size: ${props => props.fontSize || fontsSizes.large20};
    font-family: Quicksand;
    color: ${colors.menuOrange};
    font-weight: ${props => props.fontWeight || 'Bold'};
    padding-top: 32px;
    @media(min-width: 1280px) {
        font-size: ${props => props.fontSize || fontsSizes.large22}
    }
    @media(min-width: 1440px) {
        font-size: ${props => props.fontSize || fontsSizes.large26}
    }
`

const AsideUl = styled.ul<AsideUlProps>`
    margin-top: 130px;
`

const AsideLi = styled.li<AsideLiProps>`
    width: 100%;
    height: 35px;
    cursor: pointer;
    background-color: ${props => props.backgroundColor || colors.lightGrey};
    display: flex;
    align-items: center;
    @media(min-width: 1280px) and (max-width: 1440px) {
        height: 40px;
    }
    @media(min-width: 1441px) {
        height: 45px;
    }
    `

const AsideLiText = styled.p<AsideLiTextProps>`
    font-size: ${props => props.fontSize || fontsSizes.small14};
    color: ${props => props.color || colors.menuOrange};
    font-weight: ${props => props.fontWeight || '400'};
    margin-left: ${dimensions.spacing28};
    @media(min-width: 1280px) {
        font-size: ${props => props.fontSize || fontsSizes.large18};
    }
    @media(min-width: 1440px) {
        font-size: ${props => props.fontSize || fontsSizes.large22};
    }
`

const AsideBackButton = styled.button<AsideBackButtonProps>`
    width: 35px;
    height: 35px;
    background-color: ${colors.green};
    border-radius: 5px;
    cursor: pointer;
    border: 0px;
    outline: none;
    color: black;
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
    }
`

export { Aside, AsideTitle, AsideUl, AsideLi, AsideBackButton, AsideLiText }