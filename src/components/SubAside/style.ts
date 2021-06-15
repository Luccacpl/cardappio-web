import { Link } from 'react-router-dom';
import styled from 'styled-components'

import { colors } from '../../utils/colors'
import { dimensions } from '../../utils/dimensions'
import { fontsSizes } from '../../utils/fontSizes'

interface DivMenuContainerProps{
    height?: string
}

interface DivTitleProps{

}

interface TitleProps{
    marginLeft?: string
    paddingTop?: string
}

interface SubTitleProps{
    marginLeft?: string
    paddingTop?: string
    marginBottom?: string
}

interface SubMenuProps{

}

interface TitleSubMenuProps{
    marginLeft?: string
    paddingTop?: string
}

interface UlMenuProps{

}

interface LiMenuProps{

}

interface AddButtonProps{
    height?: string
    width?: string
    marginTop?: string
    color?: string
}

interface LinkProps{
    
}

const DivContainer = styled.div<DivMenuContainerProps>`
    height: ${props => props.height || dimensions.heightFullWindow};
    background-color: ${colors.lightBlack};
    width: 100%;
    min-width: 300px;
    @media print {
        display: none
    }
`

const DivTitle = styled.div<DivTitleProps>`
    height: 26%;
    width: ${dimensions.widthFull};
    background-color: ${colors.menuOrange};
    @media(min-width: 1440px) {
        height: 19.9%
    }
    @media print {
        display: none
    }
`

const Title = styled.h1<TitleProps>`
    font-size: ${fontsSizes.large24};
    font-weight: 500;
    color: ${colors.white};
    margin-left: ${props => props.marginLeft || dimensions.spacing40};
    padding-top: ${props => props.paddingTop || dimensions.spacing72};
    @media(min-width: 1280px) {
        font-size: ${fontsSizes.large28};
        padding-top: ${props => props.paddingTop || dimensions.spacing60};
    }
    @media(min-width: 1440px) {
        font-size: ${fontsSizes.large30};
        padding-top: ${props => props.paddingTop || dimensions.spacing60};
    }
    @media print {
        display: none
    }
`

const SubTitle = styled.p<SubTitleProps>`
    font-size: ${fontsSizes.small14};
    font-weight: light;
    color: ${colors.white};
    margin-left: ${props => props.marginLeft || dimensions.spacing40};
    margin-bottom: ${props => props.marginBottom || dimensions.spacing40};
    @media(min-width: 1280px) {
        font-size: ${fontsSizes.large18};
    }
    @media(min-width: 1440px) {
        font-size: ${fontsSizes.large20};
    }
    @media print {
        display: none
    }
`

const SubMenu = styled.div<SubMenuProps>`
    width: ${dimensions.widthFull};
    height: 76%;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        width: 0px;
    }
    @media(min-width: 1280px) {
        height: 80.7%
    }
    @media(min-width: 1440px) {
        height: 80.7%
    }
    @media print {
        display: none
    }

`

const TitleSubMenu = styled.h2<TitleSubMenuProps>`
    font-size: ${fontsSizes.large18};
    color: ${colors.white};
    font-weight: 500;
    margin-left: ${props => props.marginLeft || dimensions.spacing40};
    padding-top: ${props => props.paddingTop || dimensions.spacing64};
    @media(min-width: 1280px) {
        font-size: ${fontsSizes.large20};
    }
    @media(min-width: 1440px) {
        font-size: ${fontsSizes.large24};
    }
    @media print {
        display: none
    }
`

const UlMenu = styled.ul<UlMenuProps>`
    list-style: none;
    margin-top: ${dimensions.spacing24};
    @media(min-width: 1280px) {
        margin-top: ${dimensions.spacing32};
    }
    @media(min-width: 1440px) {
        margin-top: ${dimensions.spacing40};
    }
    @media print {
        display: none
    }
`

const LiMenu = styled.li<LiMenuProps>`
    font-size: ${fontsSizes.small14};
    color: ${colors.green};
    padding-left: ${dimensions.spacing40};
    margin-bottom: ${dimensions.spacing24};
    cursor: pointer;
    display: flex;
    @media(min-width: 1280px) {
        font-size: ${fontsSizes.large18};
    }
    @media(min-width: 1440px) {
        font-size: ${fontsSizes.large22};
    }
    @media print {
        display: none
    }
`

const AddButton = styled.button<AddButtonProps>`
    border: 0px;
    background-color: transparent;
    margin-left: ${dimensions.spacing40};
    margin-top: ${props => props.marginTop};
    color: ${props => props.color ||colors.green};
    font-size: ${fontsSizes.small14};
    cursor: pointer;
    outline: none;
    height: ${props => props.height};
    width: ${props => props.width};
    @media(min-width: 1280px) {
        font-size: ${fontsSizes.large18};
    }
    @media(min-width: 1440px) {
        font-size: ${fontsSizes.large22};
    }
    @media print {
        display: none
    }
`





export { DivContainer, DivTitle, Title, SubTitle, SubMenu, TitleSubMenu, UlMenu, LiMenu, AddButton }