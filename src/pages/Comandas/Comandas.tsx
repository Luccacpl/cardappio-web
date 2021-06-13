import { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import Aside from '../../components/Aside/Aside'
import SubAside from '../../components/SubAside/SubAside'
import Container from '../../components/Container/Container'
import { Grid } from '../../components/Grid/style'
import { Title, P } from '../../components/Text/text'
import { Linha } from '../../components/Linha/style'
import CardsCommand from '../../components/CardsCommand/index'
import Loader from "components/Loader";
import DeleteModal from '../../components/DeleteModal/index'

import Button from '../../components/Button/Button'


import { TableWithTabs, Body, CardsContainer } from './style'

import api from "../../services/api";
import FundoMenor from '../../Images/FundoMenor.png'

import { LiMenu } from '../../components/SubAside/style'

import { ClipboardOutline } from 'react-ionicons'

interface IItem {
  item_id: number;
  item_name: string;
  item_desc: string;
  item_available: boolean;
  item_price: string;
}
interface IItemsCommand {
  item_command_id: number;
  item_command_qtd: number;
  item_id: number;
  item_time_confirmed: string;
  item_command_status: number;
  item: IItem
}

interface ICommands {
  command_id: number;
  command_checkin: string;
  command_checkout: string;
  command_total_price: string;
  total_Price_Confirmed: number;
  table_number: number;
  itemsCommand: IItemsCommand[];
}

interface IDeleteCategory {
  command_id: any
  isActive?: boolean
}


function Comandas() {

  const history = useHistory()

  const [showLoader, setShowLoader] = useState(false);
  const [commands, setCommands] = useState<ICommands[]>([])
  const [filteredCommands, setFilteredCommands] = useState<ICommands>()
  const [showCloseModal, setShowCloseModal] = useState<IDeleteCategory>({ command_id: 0,  isActive: false })

  const [itemStatus, setItemStatus] = useState(1)

  const getTokenFromStorage = (): string =>
    localStorage.getItem("TOKEN") as string;



  async function getCommands() {
    setShowLoader(true);
    try {
      await api
        .get("/admactivecommand", {
          headers: {
            authorization: getTokenFromStorage(),
          },
        })
        .then((response) => {
          setCommands(response.data.content)
          setShowLoader(false);
        });
    } catch (error) {
      return alert("ocorreu algum erro");
    }
  }

  async function goToCommand(command: ICommands) {
    try {
      const response = await api.get(`admactivecommand/${command.command_id}`, {
        headers: {
          authorization: getTokenFromStorage(),
        },
      });
      setFilteredCommands(response.data.content.command)
      console.log('filtered: ', filteredCommands)
      console.log('resposta: ', response)

      history.push('/comandas/' + command.command_id)

    } catch (error) {
      return alert(`ocorreu algum erro:  ${error.message}`);
    }
  }

  async function updateItemStatus(id: any, status: number) {
    try {
      await api
        .put(`/admupdateorder/${id}`, { status: status }, {
          headers: {
            authorization: getTokenFromStorage(),
          },
        })
        .then((response) => {
          setItemStatus(id)
          console.log(response)
        })
    }
    catch (error) {
      return alert(error.message)
    }
  }

  async function closeCommand(id: any) {
    await api.put(`/admclosecommand/${id}`, {}, {
      headers: {
        authorization: getTokenFromStorage(),
      }
    })
      .then((response) => {
        console.log(response)
        getCommands()
        
      })
      setShowCloseModal({ command_id: filteredCommands?.command_id,  isActive: false })
  }


  useEffect(() => {
    getCommands()
    console.log("comandas: ", commands)
  }, [])


  return (
    <Grid>
      <Aside />
      <SubAside
        title="Gerenciamento de Comandas"
      >
        {commands.map((command, i) => (
          <div key={command.command_id}>
            <LiMenu onClick={() => goToCommand(command)}>
              <ClipboardOutline
                color="#B2DA5A"
                width="3rem" height="1.5rem"
              />
              {`Comanda ${command.command_id}`}
            </LiMenu>
          </div>
        ))}
      </SubAside>
      <Container display="flex" justifyContent="flex-end" padding="110px 6px 0px 55px" height="100vh">
        <Body>
          <TableWithTabs>
            <CardsContainer>
              <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                height: "fit-content",
                padding: "5px",
              }}>
                <Title
                  color="#B2DA5A"
                  fontSizeResponsive="24px"
                  fontWeight="400"
                >
                  {`Deseja finalizar a comanda ${filteredCommands?.command_id} ?`}
                </Title>
                <Button
                  content="Fechar comanda"
                  width="20%"
                  height="40px"
                  heightResponsive="40px"
                  margin="0 0 0 24px"
                  // clicked={() => closeCommand(filteredCommands?.command_id)}
                  clicked={() => setShowCloseModal({ command_id: filteredCommands?.command_id,  isActive: true })}
                />
              </div>

              <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                height: "fit-content",
                padding: "5px",
                marginTop: "36px"
              }}>
                <P color="#B2DA5A" fontSizeResponsive="18px" fontWeight="bold">Total Confirmados: </P>
                <P
                  marginLeft="14px"
                  color="#B2DA5A"
                  fontSizeResponsive="18px"
                  fontWeight="bold"
                >
                  {filteredCommands?.total_Price_Confirmed === undefined ? "R$: 0,00" : filteredCommands?.total_Price_Confirmed?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </P>
              </div>


              <Linha />

              <Container
                display="flex"
                flexDirection="row"
                justifyContent="flex-start"
                margin="36px"
                backgroundColor="transparent"
                padding="0px"
                alignitems="center"
                gap="30px"
              >
                {filteredCommands === undefined
                  ?
                  null
                  :
                  filteredCommands.itemsCommand.map(itemcommand => (
                    <CardsCommand
                      key={itemcommand.item_command_id}
                      src={FundoMenor}
                      name={itemcommand.item.item_name}
                      price={itemcommand.item.item_price}
                      desc={itemcommand.item.item_desc}
                      cancelClicked={() => updateItemStatus(itemcommand.item_command_id, 4)}
                      readyClicked={() => updateItemStatus(itemcommand.item_command_id, 3)}
                      preparationClicked={() => updateItemStatus(itemcommand.item_command_id, 2)}
                      checkColor={itemcommand.item_command_status === 3 ? "black" : "white" }
                      preparationColor={itemcommand.item_command_status === 2 ? "black" : "white" }
                      closeColor={itemcommand.item_command_status === 4 ? "black" : "white" }
                    />
                  ))
                }

                {showCloseModal.isActive && (
                  <DeleteModal
                    text={`Deseja fechar a comanda ${showCloseModal.command_id}`}
                    clicked={() => closeCommand(filteredCommands?.command_id)}
                    closeClicked={() => setShowCloseModal({ command_id: showCloseModal.command_id, isActive: false })}
                    content={"Fechar"}
                  />
                )}

                {showLoader && <Loader />}

              </Container>
            </CardsContainer>
          </TableWithTabs>
        </Body>
      </Container>
    </Grid>
  );
}

export default Comandas;




