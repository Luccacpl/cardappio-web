import React from 'react'

import { Div } from './style'

interface IContainer {
    children?: React.ReactNode
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

function Container(props: IContainer) {
    return(
        <Div 
            display={props.display}
            flexDirection={props.flexDirection}
            height={props.height}
            margin={props.margin}
            width={props.width}
            backgroundColor={props.backgroundColor}
            padding={props.padding}
            overflow={props.overflow}
            justifyContent={props.justifyContent}
            gap={props.gap}
            gapResponsive={props.gapResponsive}
            gapMoreResponsive={props.gapMoreResponsive}
            gapMinResponsive={props.gapMinResponsive}
            alignitems={props.alignitems}
            flexWrap={props.flexWrap}
            marginLeft={props.marginLeft}
        >
            {props.children}
        </Div>
    );
}

export default Container;