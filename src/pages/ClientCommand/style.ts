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

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
  margin-top: 68px;
`

const CommandContainer = styled.div`
  width: 100%;
  height: 400px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding-top: 8px;
  padding-bottom: 8px;
  margin-top: 8px;
  border-bottom: 2px solid #202020;
`

const ItemContainer = styled.div`
  width: 100%;
  height: 30px;
  background-color: #202020;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 18px;
`

const NameContainer = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
`

const PriceContainer = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const StatusContainer = styled.div`
  width: 35%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const ButtonContainer = styled.div`
  width: 5%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 36px;
`

const Button = styled.div`
  width: 250px;
  height: 45px;
  background-color: #FC8533;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`

const Footer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 46px;
  padding-left: 20px;
  margin-bottom: 24px;
  `

const CircleButton = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #B2DA5A;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 40px;
`

export { 
  Container, 
  TitleContainer, 
  CommandContainer, 
  ItemContainer, 
  NameContainer, 
  PriceContainer, 
  StatusContainer, 
  ButtonContainer, 
  ButtonWrapper, 
  Button,
  Footer,
  CircleButton 
}