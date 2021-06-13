import styled from 'styled-components';

import { colors } from '../../utils/colors'

interface IDivTitle{
    width?: string
    height?: string
    margin?: string
}

const Circle = styled.div`
    width: 60px;
    height: 60px;
    background-color: ${colors.lightBlack};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 0 0 0;
`

const DivTitle = styled.div<IDivTitle>`
    width: ${props => props.width || "80%"};
    height: ${props => props.height};
    margin: ${props => props.margin || '0px'};
    padding-top: 30px;
`

const LogoDiv = styled.div`
    width: 122px;
    height: 108px;
    border-radius: 0px 0px 10px 10px;
    background-color: ${colors.lightBlack};
    display: flex;
    justify-content: center;
    align-items: center;
`

const DivD = styled.div`
    margin: 0px;
    display: flex;
    justify-content: flex-end;
`

const DivE = styled.div`
    width: 70%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`

export { Circle, DivTitle, LogoDiv, DivD, DivE };