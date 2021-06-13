import styled from "styled-components";


const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 860px;
    max-width: 500px;
    border: 1px solid #202020;
    border-radius: 10px;
    margin: auto;
    background-color: #141414;
    overflow: auto;
    @media screen and (max-width: 550px) {
      box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.25);
      border-radius: 0px;
      height: 100%;
      margin-top: 0px;
  }
`

const CategoryContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 20px;
    margin-top: 20px;
`

const ItemContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow: auto;
`



export { Container, CategoryContainer, ItemContainer }



