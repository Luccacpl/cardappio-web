import { useState, useEffect } from 'react'
import api from "../../services/api";
import { P } from 'components/Text/text'
import Cards from '../../components/Cards/Cards'
import MenuMobile from '../../components/MenuMobile/index'

import { Container, CategoryContainer, ItemContainer } from './style'

import { useHistory } from 'react-router-dom';

import Loader from "components/Loader";

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

  const [showLoader, setShowLoader] = useState(false)

  const [categories, setCategories] = useState<ICategory[]>([])

  async function getCategory() {
    setShowLoader(true);
    await api
      .get("/customercardappio", {
        headers: {
          authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN0YXVyYW50X2lkIjo0LCJjb21tYW5kX2lkIjo1LCJpYXQiOjE2MjMxMDk4ODEsImV4cCI6MTYyNTcwMTg4MX0.H-U_Xe-Uh5-zYItzWbIbBCOdO_MTMX961D6s0hwhQj8",
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


  async function addItem(id: any) {
    setShowLoader(true);
    await api
      .put(`/customercommand/${id}`, {}, {
        headers: {
          authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN0YXVyYW50X2lkIjo0LCJjb21tYW5kX2lkIjo1LCJpYXQiOjE2MjMxMDk4ODEsImV4cCI6MTYyNTcwMTg4MX0.H-U_Xe-Uh5-zYItzWbIbBCOdO_MTMX961D6s0hwhQj8",
        },
      })
      .then(response => {
        setShowLoader(false);
        console.log(response)
      })
      .catch(error => {
        setShowLoader(false);
        console.log(error.message)
      })
  }

  useEffect(() => {
    getCategory()
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
                    price={item.price}
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

      </Container>
    </div>
  )
}

export default ClientCardapio