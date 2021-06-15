import styled from 'styled-components';

import { colors, dimensions, fontsSizes } from '../../utils'

interface DivProps {
    display?: string
    flexDirection?: string
    height?: string
    margin?: string
    width?: string
    backgroundColor?: string
    padding?: string
    overflow?: string
    justifyContent?: string
    gap?: string
    gapMinResponsive?: string
    gapResponsive?: string
    gapMoreResponsive?: string
    alignitems?: string
    flexWrap?: string
    marginLeft?: string
}

const Div = styled.div<DivProps>`
    overflow: hidden;
    width: ${props => props.width || "100%"};
    height: ${props => props.height};
    background-color: ${props => props.backgroundColor || colors.black};
    display: ${props => props.display};
    flex-direction: ${props => props.flexDirection};
    flex-wrap: wrap;
    justify-content: ${props => props.justifyContent || "space-evenly"};
    margin-top: ${props => props.margin};
    gap: ${props => props.gap || "30px"};
    padding: ${props => props.padding || '64px'};
    overflow: ${props => props.overflow || 'hidden'};
    
    align-items: ${props => props.alignitems};
    flex-wrap: ${props => props.flexWrap};
    margin-left: ${props => props.marginLeft};

    @media screen and (max-width: 1332px) {
        gap: ${props => props.gapResponsive || "20px"};
    }
    @media print {
        width: 100vw;
    }
`

export { Div }