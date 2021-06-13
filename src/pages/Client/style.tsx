import styled from "styled-components";
import FundoMenor from '../../Images/FundoMenor.png';


const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    max-width: 500px;
    border: 1px solid #202020;
    border-radius: 10px;
    margin: auto;
    max-height: 800px;
    padding-top: 40px;
    @media screen and (max-width: 500px) {
      box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
      height: 100%;
      max-height: 860px;
      margin-top: 0px;
  }
`

const ContainerTop = styled.div`
  width: 100%;
  height: 50%;
  background-color: #2C2C2C;
  background-image: url(${FundoMenor});
`

const ContainerBottom = styled.div`
  width: 100%;
  height: 50%;
  background-color: #141414;
  display: flex;
  flex-direction: column;
  padding: 40px;
  border-radius: 30px 30px 0 0
`

const ContainerButtons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const Button = styled.div`
  width: 160px;
  min-width: 125px;
  height: 162px;
  background-color: #FC8533;
  border-radius: 5px;
  padding: 56px 18px;
`

export { Container, ContainerTop, ContainerBottom, ContainerButtons, Button }



