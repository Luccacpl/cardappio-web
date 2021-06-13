import styled from 'styled-components';

import { colors } from '../../utils/colors'
import { fontsSizes } from '../../utils/fontSizes'

interface IP {
    fontSize?: string
    color?: string
    fontWeight?: string
    marginTop?: string
    marginLeft?: string
    textAlign?: string
    fontSizeResponsive?: string
    marginLeftResponsive?: string
}

interface ITitle {
    fontSize?: string
    color?: string
    fontWeight?: string
    marginTop?: string
    marginLeft?: string
    fontFamily?: string
    fontSizeResponsive?: string
    marginLeftResponsive?: string
    marginBottom?: string
}

const P = styled.p<IP>`
    font-size: ${props => props.fontSize || fontsSizes.small14};
    color: ${props => props.color || colors.textBlack};
    font-weight: ${props => props.fontWeight || '400'};
    margin-top: ${props => props.marginTop};
    margin-left: ${props => props.marginLeft};
    text-align: ${props => props.textAlign};
    @media screen and (min-width: 1281px){
        font-size: ${props => props.fontSizeResponsive || fontsSizes.large18};
        margin-left: ${props => props.marginLeftResponsive};
    }
`

const Title = styled.h1<ITitle>`
    font-family: ${props => props.fontFamily};
    font-size: ${props => props.fontSize || fontsSizes.large24};
    color: ${props => props.color || colors.textBlack};
    font-weight: ${props => props.fontWeight || '500'};
    margin-top: ${props => props.marginTop};
    margin-left: ${props => props.marginLeft};
    margin-bottom: ${props => props.marginBottom};
    @media screen and (min-width: 1481px){
        font-size: ${props => props.fontSizeResponsive || fontsSizes.large40};
        margin-left: ${props => props.marginLeftResponsive};
    }
`

const SubTitle = styled.h1<ITitle>`
    font-size: ${props => props.fontSize || fontsSizes.large20};
    color: ${props => props.color || colors.textBlack};
    font-weight: ${props => props.fontWeight || '500'};
    margin-top: ${props => props.marginTop};
    margin-left: ${props => props.marginLeft};
    @media screen and (min-width: 1481px){
        font-size: ${props => props.fontSizeResponsive || fontsSizes.large24};
        margin-left: ${props => props.marginLeftResponsive};
    }
`

export { P, Title, SubTitle }