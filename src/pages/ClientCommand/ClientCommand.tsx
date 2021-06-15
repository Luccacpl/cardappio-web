import { useState } from 'react';
import {
  Container,
  TitleContainer,
  CommandContainer,
  ItemContainer,
  NameContainer,
  PriceContainer,
  StatusContainer,
  ButtonContainer,
  Button,
  ButtonWrapper,
  Footer,
  CircleButton
} from './style'
import { useHistory } from 'react-router-dom';
import { P } from 'components/Text/text'
import MenuMobile from '../../components/MenuMobile/index'
import { TrashOutline, AddOutline } from 'react-ionicons'
import Loader from "components/Loader";

import api from "../../services/api";
import { useEffect } from 'react';


interface IItem {
  item_id: number,
  item_name: string,
  item_desc: string,
  item_available: boolean,
  item_price: string
}

interface IItemsCommand {
  item_command_id: number,
  item_command_qtd: number,
  item_id: number,
  item_command_status: number,
  item: IItem
}

interface ICommand {
  command_id: number,
  command_total_price: string,
  table_number: number,
  itemsCommand: IItemsCommand[]
}


interface IComanda {
  price_finalizados: number
}


const ClientCommand = () => {

  const history = useHistory()

  const getTokenFromStorage = (): string =>
  localStorage.getItem("TOKEN") as string;

  const [showLoader, setShowLoader] = useState(false)
  const [Command, setCommand] = useState<ICommand>()
  const [teste, setTeste] = useState<IComanda>()


  async function getCommand() {
    setShowLoader(true);
    await api
      .get("/customercommand", {
        headers: {
          authorization: getTokenFromStorage(),
        },
      })
      .then(response => {
        if(response.data.content.command.command_checkout === null){
          localStorage.removeItem('TOKEN')
          history.push('/')
        }
        setShowLoader(false);
        setCommand(response.data.content.command);
        setTeste(response.data.content)
        console.log("Teste: ", teste)
        console.log("comandas: ", Command)
        console.log(response.data.content.command);
        console.log(response.data.content)
      })
      .catch(error => {
        setShowLoader(false);
        console.log(error.message)
      })
  }

  async function deleteItem(id: any) {
    setShowLoader(true)
    await api
      .delete(`/customercommand/${id}`, {
        headers: {
          authorization: getTokenFromStorage(),
        },
      })
      .then(response => {
        setShowLoader(false)
        console.log(response)
        getCommand()
      })
      .catch(error => {
        setShowLoader(false)
        console.log(error.message)
      })
  }

  async function confirmItems() {
    setShowLoader(true)
    await api
      .put('/customerconfirmcommand', {}, {
        headers: {
          authorization: getTokenFromStorage(),
        },
      })
      .then(response => {
        setShowLoader(false)
        console.log(response)
        getCommand()
      })
      .catch(error => {
        setShowLoader(false)
        console.log(error.message)
      })
  }

  async function closeCommand() {
    setShowLoader(true)
    await api
      .post('/customercheckoutcommand', {}, {
        headers: {
          authorization: getTokenFromStorage(),
        },
      })
      .then(response => {
        setShowLoader(false)
        console.log(response)
        getCommand()
      })
      .catch(error => {
        setShowLoader(false)
        console.log(error.message)
      })
  }

  useEffect(() => {
    getCommand()
  }, [])

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      padding: "0px",
      margin: "0px",
      backgroundColor: "#2C2C2C"
    }}>
      <Container>
        <MenuMobile clicked={() => history.push('/client')} />
        <TitleContainer>
          <P
            color="#B2DA5A"
            fontSize="18px"
          >
            Itens
          </P>
        </TitleContainer>
        <CommandContainer>

          {Command?.itemsCommand?.map(item => (
            <ItemContainer key={item.item_command_id}>
              <NameContainer>
                <P color="#FFFFFF" fontSize="16px">{item.item.item_name}</P>
              </NameContainer>
              <PriceContainer>
                <P color="#A0C353" fontSize="14px"> R$ {item.item.item_price} </P>
              </PriceContainer>
              <StatusContainer>
                <P color="#FC8533" fontSize="14px">
                  {item.item_command_status === 0 
                    ? 
                    "Adicionado" 
                    : 
                    item.item_command_status === 1
                      ?
                      "Confirmado"
                      :
                      item.item_command_status === 2
                      ?
                      "Em Preparo"
                      :
                      item.item_command_status === 3
                      ?
                      "Finalizado"
                      :
                      "Cancelado"
                  }
                </P>
              </StatusContainer>
              <ButtonContainer onClick={() => deleteItem(item.item_command_id)}>
                <TrashOutline
                  color="white"
                />
              </ButtonContainer>
            </ItemContainer>
          ))}


        </CommandContainer>

        <ButtonWrapper>
          <Button onClick={() => confirmItems()}>
            <P color="white" fontSize="16px">Mandar Preparar</P>
          </Button>
        </ButtonWrapper>

        <TitleContainer>
          <P color="#FC8533" fontSize="24px"> Total: </P>
          <P color="#A0C353" fontSize="24px" marginLeft="24px">R$ {teste?.price_finalizados}</P>
        </TitleContainer>

        <Footer>
          <Button onClick={() => closeCommand()}>
            <P color="white" fontSize="16px">Fechar Comanda</P>
          </Button>
          <CircleButton onClick={() => history.push('/client/cardapio')}>
            <AddOutline
              color="white"
              style={{
                width: "40px",
                height: "40px"
              }}
            />
          </CircleButton>
        </Footer>

        {showLoader && <Loader/>}
      </Container>
    </div>
  )
}

export default ClientCommand