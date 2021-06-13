import styled from 'styled-components'
import { fontsSizes } from 'utils';

import { colors } from '../../utils/colors';

const DivInput = styled.div`
    width: 100%;
    height: 42px;
    background-color: ${colors.lightBlack};
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 0.5%;
`

const CustomInput = styled.input`
    width: 59%;
    height: 100%;
    border: 0px solid transparent;
    border-radius: 20px;
    outline: none;
    background-color: ${colors.lightBlack};
    color: rgba(255, 255, 255, 0.6);
    padding: 13px 20px;
    font-size: ${fontsSizes.small14};
    ::placeholder{
        color: rgba(255, 255, 255, 0.6); 
    }
`

const SearchDiv = styled.button`
    width: 34px;
    height: 34px;
    background-color: ${colors.menuOrange};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0px solid transparent;
    outline: none;
    cursor: pointer;
`

const AddButton = styled.button`
    width: 35%;
    height: 34px;
    margin-left: 1%;
    border-radius: 20px;
    border: 0px solid transparent;
    background-color: ${colors.menuOrange};
    color: white;
    font-weight: 500;
    font-size: ${fontsSizes.small14};
    cursor: pointer;
    outline: none;
`

export { DivInput, CustomInput, SearchDiv, AddButton };