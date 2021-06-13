import { useEffect, useState } from 'react';
import api from "../../services/api";

import Aside from '../../components/Aside/Aside'
import SubAside from '../../components/SubAside/SubAside'
import Container from '../../components/Container/Container'
import { Grid } from '../../components/Grid/style'
import CardsOrder from '../../components/CardsOrder/index'
import { TableWithTabs, Body, CardsContainer } from './style'

import FundoMenor from '../../Images/FundoMenor.png'

interface IOrder {
  item_command_id: number
  item_name: string
  item_desc: string
  item_command_status: number
  table_number: number
}

function Pedidos() {

  const [showLoader, setShowLoader] = useState(false)
  
  const [orders, setOrders] = useState<IOrder[]>([])
  


  const getTokenFromStorage = (): string =>
  localStorage.getItem("TOKEN") as string;


  async function getOrders() {
    setShowLoader(true);
    try {
      await api
        .get("/kitchenorder", {
          headers: {
            authorization: getTokenFromStorage(),
          },
        })
        .then((response) => {
          setOrders(response.data.content)
        });
    } catch (error) {
      return alert("ocorreu algum erro");
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
          console.log(response)
          getOrders()
        })
    }
    catch (error) {
      return alert(error.message)
    }
  }



  useEffect(() => {
    getOrders()
  }, [])

  return (
    <Grid>
      <Aside />
      <SubAside
        title="Gerenciamento de Pedidos"
      >

      </SubAside>
      <Container display="flex" justifyContent="flex-end" padding="110px 6px 0px 55px" height="100vh">
        <Body>
          <TableWithTabs>
            <CardsContainer>
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
                {orders.map(order => (
                  <CardsOrder
                    key={order.item_command_id}
                    name={order.item_name}
                    desc={order.item_desc}
                    src={FundoMenor}
                    TableNumber={order.table_number}
                    cancelClicked={() => updateItemStatus(order.item_command_id, 4)}
                    readyClicked={() => updateItemStatus(order.item_command_id, 3)}
                    preparationClicked={() => updateItemStatus(order.item_command_id, 2)}
                  />
                ))}
              </Container>
            </CardsContainer>
          </TableWithTabs>
        </Body>
      </Container>
    </Grid>
  );
}

export default Pedidos;

