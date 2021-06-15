import { useState, useEffect } from 'react'
import api from "../../services/api";
import { P } from 'components/Text/text'
import Cards from '../../components/Cards/Cards'
import MenuMobile from '../../components/MenuMobile/index'

import { Container, CategoryContainer, ItemContainer } from './style'

import { useHistory } from 'react-router-dom';

import Loader from "components/Loader";

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';


interface IItems {
  id: number,
  name: string,
  desc: string,
  imageurl: string,
  available: boolean,
  price: string
}

interface ICategory {
  id: number,
  name: string,
  items: IItems[]
}

const ClientCardapio = () => {

  const history = useHistory()

  const getTokenFromStorage = (): string =>
    localStorage.getItem("TOKEN") as string;

  const [showLoader, setShowLoader] = useState(false)

  const [categories, setCategories] = useState<ICategory[]>([])

  const [alert, SetAlert] = useState(false);
  const [alertError, SetAlertError] = useState(false);

  function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


  async function getCategory() {
    setShowLoader(true);
    await api
      .get("/customercardappio", {
        headers: {
          authorization: getTokenFromStorage(),
        },
      })
      .then(response => {
        setShowLoader(false);
        setCategories(response.data.content);
        console.log("categorias: ", categories)
        console.log(response.data.content);
      })
      .catch(error => {
        setShowLoader(false);
        console.log(error.message)
      })
  }

  async function verify() {
    await api
      .get("/customercommand", {
        headers: {
          authorization: getTokenFromStorage(),
        },
      })
      .then(response => {
        if (response.data.content.command.command_checkout !== null) {
          localStorage.removeItem('TOKEN')
          history.push('/')
        }
      })
      .catch(error => {
        console.log(error.message)
      })
  }


  async function addItem(id: any) {
    setShowLoader(true);
    await api
      .put(`/customercommand/${id}`, {}, {
        headers: {
          authorization: getTokenFromStorage(),
        },
      })
      .then(response => {
        setShowLoader(false);
        SetAlert(true)
        console.log(response)
      })
      .catch(error => {
        setShowLoader(false);
        SetAlertError(true)
        console.log(error.message)
      })
  }

  useEffect(() => {
    getCategory()
    verify()
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
        {categories.map(category => (
          <CategoryContainer key={category.id}>
            <P color="#B2DA5A" fontSize="18px">{category.name}</P>
            <ItemContainer>
              {category.items.map(item => (
                <div
                  style={{
                    marginTop: "12px",
                    marginLeft: "12px"
                  }}
                  key={item.id}
                >
                  <Cards
                    name={item.name}
                    desc={item.desc}
                    price={Number(item.price).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                    src={item.imageurl}
                    bgColor="#202020"
                    AddClicked={() => addItem(item.id)}
                    isCustomer
                  />
                </div>
              ))}
            </ItemContainer>
          </CategoryContainer>
        ))}

        {showLoader && <Loader />}

        {alertError === true &&
          <Snackbar open={alertError} autoHideDuration={4000} onClose={() => SetAlertError(false)}>
            <Alert onClose={() => SetAlertError(false)} severity="error">
              Não conseguimos adicionar o Item.
            </Alert>
          </Snackbar>
        }

        {alert === true &&
          <Snackbar open={alert} autoHideDuration={4000} onClose={() => SetAlert(false)}>
            <Alert onClose={() => SetAlert(false)} severity="success">
              Item adicionado com sucesso!
            </Alert>
          </Snackbar>
        }

      </Container>
    </div>
  )
}

export default ClientCardapio