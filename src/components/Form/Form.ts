import styled from 'styled-components';

interface IForm{
    width?: string
    height?: string
    display?: string
}

const Form = styled.form<IForm>`
    width: ${props => props.width || '100%'};
    height: ${props => props.height || '100%'};
    border: 1px solid black;
    display: ${props => props.display};
`

export { Form };