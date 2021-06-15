import { Container, ContainerTop, ContainerBottom, ContainerButtons, Button } from './style'
import { Title, P } from '../../components/Text/text'
import { useHistory } from 'react-router-dom';
import api from "../../services/api";

import { BookOutline, CardOutline } from 'react-ionicons'
import { useEffect } from 'react';

const Client = () => {

  const history = useHistory()

  const getTokenFromStorage = (): string =>
  localStorage.getItem("TOKEN") as string;

  async function verify() {
    await api
      .get("/customercommand", {
        headers: {
          authorization: getTokenFromStorage(),
        },
      })
      .then(response => {
        if(response.data.content.command.command_checkout !== null){
          localStorage.removeItem('TOKEN')
          history.push('/')
        }
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  useEffect(() => {
    verify()
  }, [])

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      backgroundColor: "#2C2C2C",
    }}>
      <Container>
        <ContainerTop></ContainerTop>
        <ContainerBottom>
          <Title color="#FC8533" fontSize="36px">Cardappio</Title>
          <P color="#AFAFAF" fontSize="16px" marginTop="12px">Como podemos te ajudar ?</P>
          <ContainerButtons style={{ marginTop: "64px" }}>
            <Button style={{ marginRight: "30px" }} onClick={() => history.push('/client/cardapio')}>
              <BookOutline color="white" width="34px" height="34px" />
              <P color="white">Confira o nosso Cardapio</P>
            </Button>
            <Button onClick={() => history.push('/client/comanda')}>
              <CardOutline color="white" width="34px" height="34px"/>
              <P color="white">Veja a sua Comanda</P>
            </Button>
          </ContainerButtons>
        </ContainerBottom>
      </Container>
    </div>
  )
}

export default Client