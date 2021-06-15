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
    @media print {
        display: none
    }
`

const DivTitle = styled.div<IDivTitle>`
    width: ${props => props.width || "80%"};
    height: ${props => props.height};
    margin: ${props => props.margin || '0px'};
    padding-top: 30px;
    @media print {
        display: none
    }
`

const LogoDiv = styled.div`
    width: 122px;
    height: 108px;
    border-radius: 0px 0px 10px 10px;
    background-color: ${colors.lightBlack};
    display: flex;
    justify-content: center;
    align-items: center;
    @media print {
        display: none
    }
`

const DivD = styled.div`
    width: 45%;
    margin: 0px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    @media print {
        display: none
    }

`

const DivE = styled.div`
    width: 55%;
    display: flex;
    justify-content: flex-start;
    @media print {
        display: none
    }
`

export { Circle, DivTitle, LogoDiv, DivD, DivE };