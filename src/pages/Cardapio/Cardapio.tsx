import { FormEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import api from "../../services/api";

import Aside from "../../components/Aside/Aside";
import SubAside from "../../components/SubAside/SubAside";
import Cards from "../../components/Cards/Cards";
import Container from "../../components/Container/Container";
import { Grid } from "../../components/Grid/style";
import Modal from "../../components/Modal/Modal";
import Header from "../../components/Header/Header";
import Food from "../../public/icons/fast-food-outline.svg";
import Button from "../../components/Button/Button";
import DeleteModal from '../../components/DeleteModal/index'

import { ChangeEventHandler } from "react";
import { Input } from "components/Input/Input";
import { DragFileArea } from "./style";
import { Add } from "react-ionicons";
import Dropzone from "react-dropzone";
import Loader from "components/Loader";

import { LiMenu } from "../../components/SubAside/style";
import { TrashOutline, CreateOutline } from "react-ionicons";
import Select from 'react-select'

interface ICategory {
  name: string;
  id: number;
  items: IItem[];
}

interface IDeleteCategory {
  id: number
  isActive?: boolean
  name: string
}

interface IItem {
  isActive?: boolean;
  name: string;
  id: number;
  desc: string;
  imageurl: string;
  category_id: string;
  available: string;
  price: number;
}

interface IShowModal {
  isActive: boolean;
  id: number;
  name: string;
}

interface IRestaurant {
  restaurant_id: number
  restaurant_name: string,
  restaurant_logo: string
}

function Cardapio() {

  function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      width: "55%",
      height: "60px",
      fontColor: "white",
      fontSize: "16px",
      // match with the menu
      borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      // Overwrittes the different states of border
      // borderColor: state.isFocused ? "yellow" : "green",
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        // Overwrittes the different states of border
        borderColor: state.isFocused ? null : null
      }
    }),
    menu: (base: any) => ({
      ...base,
      // override border radius to match the box
      borderRadius: 0,
      // kill the gap
      marginTop: 0,
      width: "55%",
      fontSize: "16px"
    }),
    menuList: (base: any) => ({
      ...base,
      // kill the white space on first and last option
      padding: 0,
      fontSize: "16px"

    })
  };


  const history = useHistory()

  const [alertErrorValidation, SetAlertErrorValidation] = useState(false);
  const [alertError, setAlertError] = useState(false)
  const [alertSuccess, setAlertSuccess] = useState(false)

  const [showDeleteModal, setShowDeleteModal] = useState<IDeleteCategory>({ id: 0, name: '', isActive: false })
  const [showLoader, setShowLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState<IShowModal>({ id: 0, isActive: false, name: '' });
  const [showModalEditItem, setShowModalEditItem] = useState<IItem>({
    id: 0,
    isActive: false,
    name: '',
    desc: '',
    imageurl: '',
    available: '',
    category_id: '',
    price: 0
  });

  const [name, setName] = useState("");

  const [nameItem, setNameItem] = useState("");
  const [description, setDescription] = useState("");
  const [priceItem, setPrice] = useState("");
  const [available, setAvailable] = useState(true)
  const [categoryOptions, setCategoryOptions] = useState<any>([])
  const [categoryOptionsId, setCategoryOptionsId] = useState<any>('')

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [items, setItems] = useState<IItem[]>([]);
  const [selectedFile, setSelectedFile] = useState<any>([]);

  const [refresh, setRefresh] = useState(0);

  const [step, setStep] = useState(0);

  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState<IItem[]>([]);

  const [resposta, setResposta] = useState(0)

  const [filteredCategory, setFilteredCategory] = useState<ICategory>()

  const [restaurant, setRestaurant] = useState<IRestaurant>()

  var nomeCategoria = window.localStorage.getItem('CATEGORYNAME')


  const onSearch = (e: string) => {
    const searchText = e.toLowerCase();
    const newSearch = items.filter(({ name, desc }) =>
      name?.toLowerCase().includes(searchText) ||
      desc?.toLowerCase().includes(searchText)
    );

    var teste = categories.filter(({ items }) => items.filter(({ name, desc }) =>
      name?.toLowerCase().includes('Gabi')
      // desc?.toLowerCase().includes(searchText)
    ))

    const filtro = categories.map(category => (category.items.filter(item => item.name.toLowerCase().includes('gabi'))))

    console.log("filtro: ", filtro)

    setFilteredItems(newSearch);
    console.log(filteredItems)
    setSearch(e);
    console.log("Itens filtrados: ", filteredItems)
  };

  const listItems = search === ""
    ? categories
    : filteredItems;

  const isUserAuthenticated = () =>
    localStorage.getItem("TOKEN") === null && history.push("/");

  const getTokenFromStorage = (): string =>
    localStorage.getItem("TOKEN") as string;

  async function handleDelete(id: number) {
    try {
      await api.delete("/item/" + id, {
        headers: {
          authorization: getTokenFromStorage(),
        },
      });
      GetCategory()
      setRefresh((chave) => chave + 1);
      window.location.reload()
      console.log(id);
    } catch (error) {
      return alert("ocorreu algum erro");
    }

    setShowDeleteModal({ id: id, name: showDeleteModal.name, isActive: false })
  }

  async function handleSubmit(event: ChangeEventHandler<HTMLInputElement>) {
    if (name === "") {
      SetAlertErrorValidation(true)
    } else {
      setName('')
      try {
        await api.post(
          "category",
          { name },
          {
            headers: {
              authorization: getTokenFromStorage(),
            },
          },

        );

        history.push("/cardapio");

        setRefresh((chave) => chave + 1);

        setShowModal(false);
      } catch (error) {
        setAlertError(true)
      }
    }
  }

  function validate() {
    if (nameItem === '' || description === '' || priceItem === '') {
      SetAlertErrorValidation(true)
    } else {
      setStep(step + 1)
    }
  }


  async function handleSubmitItem(event: FormEvent) {
    event.preventDefault()
    const url = 'item'

    // alert('entrou aqui')

    var data = new FormData()
    data.append('name', nameItem)
    data.append('desc', description)
    data.append('available', String(available))
    data.append('category', categoryOptionsId.value)
    data.append('imageurl', selectedFile)
    data.append('price', priceItem)

    console.log("data", data)

    setShowLoader(true)

    // const result = await api.post(url, data)

    // alert(result)
    // console.log("result: ", result)

    await api.post(url, data)
      .then(response => {
        closeModal()
        setShowLoader(false)
        console.log(response.data)       
        // history.push("/cardapio");
        // setRefresh((chave) => chave + 1);
        setAlertSuccess(true)
        GetCategory()
      })
      .catch(error => {
        closeModal()
        setShowLoader(false)
        setAlertError(true)
        console.log(error.message)
      })
  }


  async function goToCategory(category: ICategory) {
    try {
      const response = await api.get(`category/${category.id}`, {
        headers: {
          authorization: getTokenFromStorage(),
        },
      });

      setResposta(resposta + 1)
      setFilteredCategory(response.data)
      console.log('filtered: ', filteredCategory)
      console.log('resposta: ', response)
      localStorage.setItem('CATEGORYID', response.data.id)
      localStorage.setItem('CATEGORYNAME', response.data.name)

      history.push('/cardapio/' + category.id)

    } catch (error) {
      setAlertError(true)
      alert('Ocorreu algum erro. Tente novamente!')
    }
  }

  function handleSelectedFiles(files: any) {
    const file = files[0];

    if (file.size > 10174706) {
      alert('Erro, a imagem não pode ser maior que 10MB!')
    } else {
      setSelectedFile(file)
    }
  }

  async function handleDeleteCategory(id: number) {
    try {
      await api.delete("category/" + id, {
        headers: {
          authorization: getTokenFromStorage(),
        },
      });
      setRefresh((chave) => chave + 1);
      console.log(id);
    } catch (error) {
      setAlertError(true)
      alert('Ocorreu algum erro. Tente novamente!')
    }
    setShowDeleteModal({ id: id, name: '', isActive: false });
  }

  async function handleEditCategory(category: ICategory) {
    try {
      await api.get("category/" + category.id, {
        headers: {
          authorization: getTokenFromStorage(),
        },
      });
    } catch (error) {
      setAlertError(true)
      alert('Ocorreu algum erro. Tente novamente!')
    }
    console.log(category.id);
    console.log(category.name);
    setName(category.name);
    setShowModalEdit({ id: category.id, isActive: true, name: category.name });
  }

  async function handleEditItem(item: IItem) {
    try {
      await api.get("item/" + item.id, {
        headers: {
          authorization: getTokenFromStorage(),
        },
      });
    } catch (error) {
      setAlertError(true)
      alert('Ocorreu algum erro. Tente novamente!')
    }
    setNameItem(item.name)
    setDescription(item.desc)
    setPrice(String(item.price))
    setCategoryOptionsId(item.category_id)
    setShowModalEditItem({
      id: item.id,
      isActive: true,
      name: item.name,
      desc: item.desc,
      imageurl: item.imageurl,
      available: item.available,
      category_id: item.category_id,
      price: item.price
    });
  }

  async function handleSubmitEditItem(
    item: IItem,
    id: number,
    name: string,
    desc: string,
    available: string,
    price: number,
    piroca: string,
  ) {
    const body = {
      name: nameItem,
      desc: description,
      available,
      price: priceItem,
      piroca: String(item.category_id)
    }

    if (name === '' ||
      desc === ''
    ) {
      SetAlertErrorValidation(true)
    } else {
      try {
        console.log('categoria 1 ', item.category_id)
        console.log("categoria", piroca)
        console.log("corpo: ", body)
        console.log("item id: ", id)
        await api.put(
          'item/' + id,
          body,
          {
            headers: {
              authorization: getTokenFromStorage(),
            },
          }
        );
        GetCategory()
        history.push('/cardapio')
        setRefresh((chave) => chave + 1);
        setShowModalEditItem({
          isActive: false,
          name: item.name,
          id: item.id,
          desc: item.desc,
          imageurl: item.imageurl,
          category_id: item.category_id,
          available: item.available,
          price: item.price
        })
        window.location.reload()
      } catch (error) {
        setAlertError(true)
        alert('Ocorreu algum erro. Tente novamente!')
      }
    }
  }

  async function handleSubmitEdit(category: ICategory, id: number, name: string) {
    if (name === "") {
      SetAlertErrorValidation(true)
    } else {
        console.log('id: ', id);
        await api.put("category/" + id, { name },
          {
            headers: {
              authorization: getTokenFromStorage(),
            },
          }
        )
        .then(response => {
          console.log("resposta: ", response)
          GetCategory()
          history.push("/cardapio");
          setRefresh((chave) => chave + 1);
          setShowModalEdit({ id: category.id, isActive: false, name: category.name });
        })
        .catch(error => {
          alert(error.message)
          setAlertError(true)
          alert('Ocorreu algum erro. Tente novamente!')
        })
    }
  }

  function newCategoryButton() {
    setName('');
    setShowModal(true)
  }

  function closeModal() {
    setShowModalCreate(false);
    setStep(0);
    setDescription("");
    setNameItem("");
    setPrice("");
    setSelectedFile([]);
  }

  function GetCategory() {
    setShowLoader(true);
    try {
      api
        .get<ICategory[]>("/category", {
          headers: {
            authorization: getTokenFromStorage(),
          },
        })
        .then((response) => {
          const categoryData = response.data.map(({ id, name }) => ({
            label: name,
            value: id,
          }))
          setCategoryOptions(categoryData)
          console.log("opções: ", categoryOptions)
          setShowLoader(false);
          setCategories(response.data);
          console.log(response.data);
        });
    } catch (error) {
      setAlertError(true)
      alert('Ocorreu algum erro. Tente novamente!')
    }
  }

  function openCreateItemModal() {
    setNameItem('')
    setDescription('')
    setPrice('')
    setCategoryOptionsId('')

    setShowModalCreate(true)
  }

  async function getRestaurant() {
    setShowLoader(true)
    await api
      .get('/restaurant', {
        headers: {
          authorization: getTokenFromStorage(),
        },
      })
      .then(response => {
        setRestaurant(response.data.content)
        console.log(response.data.content)
        setShowLoader(false)
      })
      .catch(error => {
        setAlertError(true)
        console.log(error.message)
        setShowLoader(false)
      })
  }


  useEffect(() => {
    isUserAuthenticated();
  }, []);

  useEffect(() => {
    GetCategory();
    getRestaurant()
    setName("");
  }, [refresh]);




  return (
    <Grid>
      <Aside />
      <SubAside
        title="Categorias"
        clicked={() => newCategoryButton()}
        addButtonText="+ Adicionar nova categoria"
        items={categories}
      >
        {categories.map(category => (
          <div key={category.id}>
            <LiMenu onClick={() => goToCategory(category)}>
              <TrashOutline
                color="white"
                width="3rem"
                height="1.5rem"
                onClick={() => setShowDeleteModal({ id: category.id, name: category.name, isActive: true })}
              />
              <CreateOutline
                color="white"
                width="3rem"
                height="1.5rem"
                onClick={() => handleEditCategory(category)}
              />
              {category.name}
            </LiMenu>

            {showDeleteModal.isActive && (
              <DeleteModal
                text={`Deseja excluir a categoria ${showDeleteModal.name}`}
                clicked={() => handleDeleteCategory(showDeleteModal.id)}
                closeClicked={() => setShowDeleteModal({ id: category.id, name: category.name, isActive: false })}
              />
            )}

            {showModalEdit.isActive && (
              <Modal
                title={`Vamos editar a Categoria ${showModalEdit.name}`}
                ButtonTitle="Adicionar"
                text="Por favor, preencha os campos abaixo, para prosseguirmos no processo de cadastro."
                change={(event) => setName(event.target.value)}
                closeClicked={() => setShowModalEdit({ id: category.id, isActive: false, name: category.name })}
              >
                <Input
                  width="55%"
                  marginTop="20px"
                  placeholder="Digite o nome da categoria"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                <Button
                  content="Editar Categoria"
                  width="25%"
                  height="2.25rem"
                  marginTop="28px"
                  clicked={() => handleSubmitEdit(category, showModalEdit.id, name)}
                />
              </Modal>
            )}
          </div>
        ))}
      </SubAside>
      <Container height="100%" padding="0px 0px 0px 0px" flexDirection="column" overflow="auto">
        <Header
          title="Todos os seus pratos"
          subtitle={nomeCategoria === null ? "Categoria: Geral" : `Categoria: ` + nomeCategoria}
          addButton="Adicionar novo prato"
          src={Food}
          restaurantName={restaurant?.restaurant_name}
          placeholder="Digite o nome de um item"
          clickedAdd={() => openCreateItemModal()}
          onChange={(e) => {
            onSearch(e.target.value);
          }}
        />
        <Container display="inline-flex" justifyContent="flex-start" >
          {filteredCategory === undefined
            ?
            categories.map((category) => (
              category.items.map((item) => (
                <>
                  <Cards
                    name={item.name}
                    desc={item.desc}
                    price={Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(item.price)}
                    src={item.imageurl}
                    TrashClicked={() => setShowDeleteModal({ id: item.id, name: item.name, isActive: true })}
                    EditClicked={() => handleEditItem(item)}
                    key={item.id}
                  />

                  {showDeleteModal.isActive && (
                    <DeleteModal
                      text={`Deseja excluir o item ${showDeleteModal.name}`}
                      clicked={() => handleDelete(showDeleteModal.id)}
                      closeClicked={() => setShowDeleteModal({ id: item.id, name: item.name, isActive: false })}
                    />
                  )}

                  {showModalEditItem.isActive && (
                    <Modal
                      title={`Vamos Editar o item ${showModalEditItem.name}!`}
                      ButtonTitle="Editar"
                      text={
                        step === 0
                          ? "Por favor, preencha os campos abaixo, para prosseguirmos no processo de edição."
                          : "Adicione uma foto para o item"
                      }
                      change={(event) => setName(event.target.value)}
                      closeClicked={() => setShowModalEditItem({
                        isActive: false,
                        name: item.name,
                        id: item.id,
                        desc: item.desc,
                        imageurl: item.imageurl,
                        category_id: item.category_id,
                        available: item.available,
                        price: item.price
                      })}
                    >
                      {step === 0 && (
                        <>
                          <Input
                            width="55%"
                            marginTop="20px"
                            placeholder="Digite o nome do item"
                            value={nameItem}
                            onChange={(event) => setNameItem(event.target.value)}
                          />
                          <Input
                            width="55%"
                            marginTop="20px"
                            placeholder="Digite sobre o item"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                          />
                          <Input
                            width="55%"
                            placeholder="Digite o preço do item"
                            value={priceItem}
                            onChange={(event) => setPrice(event.target.value)}
                            margin="20px 0 20px 0"
                          />
                          <Button
                            content="Editar"
                            width="25%"
                            height="2.25rem"
                            marginTop="28px"
                            isNotForm
                            clicked={() => handleSubmitEditItem(
                              item,
                              showModalEditItem.id,
                              showModalEditItem.name,
                              showModalEditItem.desc,
                              showModalEditItem.available,
                              showModalEditItem.price,
                              showModalEditItem.category_id
                            )}
                          />
                        </>
                      )}
                    </Modal>
                  )}
                </>
              ))
            ))
            :
            filteredCategory?.items.map((item) => (
              <>
                <Cards
                  name={item.name}
                  desc={item.desc}
                  price={Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(item.price)}
                  src={item.imageurl}
                  EditClicked={() => handleEditItem(item)}
                  TrashClicked={() => setShowDeleteModal({ id: item.id, name: item.name, isActive: true })}
                  key={item.id}
                />

                {showDeleteModal.isActive && (
                  <DeleteModal
                    text={`Deseja excluir o item ${showDeleteModal.name}`}
                    clicked={() => handleDelete(showDeleteModal.id)}
                    closeClicked={() => setShowDeleteModal({ id: item.id, name: item.name, isActive: false })}
                  />
                )}

                {showModalEditItem.isActive && (
                  <Modal
                    title={`Vamos Editar o item ${showModalEditItem.name}!`}
                    ButtonTitle="Editar"
                    text={
                      step === 0
                        ? "Por favor, preencha os campos abaixo, para prosseguirmos no processo de edição."
                        : "Adicione uma foto para o item"
                    }
                    change={(event) => setName(event.target.value)}
                    closeClicked={() => setShowModalEditItem({
                      isActive: false,
                      name: item.name,
                      id: item.id,
                      desc: item.desc,
                      imageurl: item.imageurl,
                      category_id: item.category_id,
                      available: item.available,
                      price: item.price
                    })}
                  >
                    {step === 0 && (
                      <>
                        <Input
                          width="55%"
                          marginTop="20px"
                          placeholder="Digite o nome do item"
                          value={nameItem}
                          onChange={(event) => setNameItem(event.target.value)}
                        />
                        <Input
                          width="55%"
                          marginTop="20px"
                          placeholder="Digite sobre o item"
                          value={description}
                          onChange={(event) => setDescription(event.target.value)}
                        />
                        <Input
                          width="55%"
                          placeholder="Digite o preço do item"
                          value={priceItem}
                          onChange={(event) => setPrice(event.target.value)}
                          margin="20px 0 20px 0"
                        />
                        <Button
                          content="Editar"
                          width="25%"
                          height="2.25rem"
                          marginTop="28px"
                          isNotForm
                          clicked={() => handleSubmitEditItem(
                            item,
                            showModalEditItem.id,
                            showModalEditItem.name,
                            showModalEditItem.desc,
                            showModalEditItem.available,
                            showModalEditItem.price,
                            showModalEditItem.category_id
                          )}
                        />
                      </>
                    )}
                  </Modal>
                )}


              </>
            ))
          }
        </Container>
      </Container>
      {showModal && (
        <Modal
          title="Vamos adicionar uma nova categoria!"
          ButtonTitle="Adicionar"
          text="Por favor, preencha os campos abaixo, para prosseguirmos no processo de cadastro."
          change={(event) => setName(event.target.value)}
          closeClicked={() => setShowModal(false)}
        >
          <Input
            width="55%"
            marginTop="20px"
            placeholder="Digite o nome da categoria"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <Button
            content="Adicionar Categoria"
            width="25%"
            height="2.25rem"
            marginTop="28px"
            clicked={handleSubmit}
          />
        </Modal>
      )}

      {showLoader && <Loader />}

      {showModalCreate && (
        <Modal
          title="Vamos adicionar um novo item!"
          ButtonTitle="Adicionar"
          text={
            step === 0
              ? "Por favor, preencha os campos abaixo, para prosseguirmos no processo de cadastro."
              : "Adicione uma foto para o item"
          }
          change={(event) => setName(event.target.value)}
          closeClicked={closeModal}
        >
          <form onSubmit={handleSubmitItem}>
            {step === 0 && (
              <>
                <Input
                  width="55%"
                  marginTop="20px"
                  placeholder="Digite o nome do item"
                  value={nameItem}
                  onChange={(event) => setNameItem(event.target.value)}
                />
                <Input
                  width="55%"
                  marginTop="20px"
                  placeholder="Digite sobre o item"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
                <Input
                  width="55%"
                  placeholder="Digite o preço do item"
                  value={priceItem}
                  onChange={(event) => setPrice(event.target.value)}
                  margin="20px 0 20px 0"
                />
                <Select
                  onChange={(option: { label: string; value: number }) =>
                    setCategoryOptionsId({
                      label: option.label,
                      value: option.value,
                    })
                  }
                  value={categoryOptionsId}
                  placeholder="Selecione uma categoria"
                  noOptionsMessage={() => 'Nenhuma categoria encontrado'}
                  options={categoryOptions}
                  styles={customStyles}
                  style={{ color: "white", fontSize: "24px" }}
                />
                <Button
                  content="Avançar"
                  width="25%"
                  height="2.25rem"
                  marginTop="28px"
                  isNotForm
                  clicked={() => validate()}
                />
              </>
            )}
            {step === 1 && (
              <>
                <Dropzone onDrop={handleSelectedFiles} accept={"image/*"}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <DragFileArea
                        margin="24px 0 0 0"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Add color="#7A7A7A" width="36px" height="36px" />
                        <input {...getInputProps()} />
                      </DragFileArea>
                    </div>
                  )}
                </Dropzone>

                <Button
                  content="Adicionar Item"
                  width="25%"
                  height="2.25rem"
                  marginTop="28px"
                />
              </>
            )}
          </form>
        </Modal>
      )}

      {alertErrorValidation === true &&
        <Snackbar open={alertErrorValidation} autoHideDuration={4000} onClose={() => SetAlertErrorValidation(false)}>
          <Alert onClose={() => SetAlertErrorValidation(false)} severity="error">
            Complete os campos corretamente!
          </Alert>
        </Snackbar>
      }

      {alertError === true &&
        <Snackbar open={alertError} autoHideDuration={4000} onClose={() => setAlertError(false)}>
          <Alert onClose={() => setAlertError(false)} severity="error">
            Ocorreu algum erro. Tente novamente!
          </Alert>
        </Snackbar>
      }

    {alertSuccess === true &&
        <Snackbar open={alertSuccess} autoHideDuration={4000} onClose={() => setAlertSuccess(false)}>
          <Alert onClose={() => setAlertSuccess(false)} severity="success">
            Cadastro completado!
          </Alert>
        </Snackbar>
      }

    </Grid>
  );
}

export default Cardapio;



