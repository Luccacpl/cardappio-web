import styled from 'styled-components'

interface GridProps {
    grid?: string
    gridGap?: string
    rowGap?: string
    marginTop?: string
    marginBottom?: string
    backgroundColor?: string
    justifyContent?: string
    gridColumns?: string
    gridRows?: string
    border?: string
}

const Grid = styled.div<GridProps>`
    display: grid;
    grid: ${props => props.grid || 'auto/ 0.5fr 1.5fr 4fr'};
    grid-gap: ${props => props.gridGap};
    margin-bottom: ${props => props.marginBottom};
    margin-top: ${props => props.marginTop};
    background-color: ${props => props.backgroundColor};
    justify-content: ${props => props.justifyContent};
    grid-template-columns: ${props => props.gridColumns};
    grid-template-rows: ${props => props.gridRows};
    border: ${props => props.border};
    height: 100vh;
    overflow: hidden;
    `

export { Grid }