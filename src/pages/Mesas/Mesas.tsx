import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Aside from "../../components/Aside/Aside";
import SubAside from "../../components/SubAside/SubAside";
import Container from "../../components/Container/Container";
import { Grid } from "../../components/Grid/style";
import Button from "../../components/Button/Button";
import { Title } from "../../components/Text/text";
import Loader from "components/Loader";
import DeleteModal from "../../components/DeleteModal/index";
import Modal from "../../components/Modal/Modal";
import { Input } from "components/Input/Input";

import api from "../../services/api";

import { TableWithTabs, Body } from "./style";
import { TrashOutline, CreateOutline } from "react-ionicons";
// import { QRCode } from 'react-qrcode-logo';
import QRCode from "qrcode.react";

import { LiMenu } from "../../components/SubAside/style";

interface ITable {
  table_id: number;
  table_qrcode: string;
  table_number: number;
  restaurant_id: string;
}

interface IEditTable {
  table_id: number;
  table_number: number;
  isActive: boolean;
}

interface IDeleteTable {
  table_number: number;
  table_id: number;
  isActive: boolean;
}

interface ITableNumber {
  table_number: number
}

const Mesas = () => {
  const history = useHistory();

  const [showDeleteModal, setShowDeleteModal] = useState<IDeleteTable>({
    table_id: 0,
    table_number: 0,
    isActive: false,
  });
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState<IEditTable>({
    table_id: 0,
    table_number: 0,
    isActive: false,
  });

  const [mesas, setMesas] = useState<ITable[]>([]);
  const [filteredMesas, setFilteredMesas] = useState<ITable>();
  const [showLoader, setShowLoader] = useState(false);

  // const [showModalEdit, setShowModalEdit] = useState<IShowModal>({ id: 0, isActive: false, name: '' });

  const [table_number, setNumberMesa] = useState('');

  const getTokenFromStorage = (): string =>
    localStorage.getItem("TOKEN") as string;

  function GetTables() {
    setShowLoader(true);
    try {
      api
        .get("/table", {
          headers: {
            authorization: getTokenFromStorage(),
          },
        })
        .then((response) => {
          setMesas(response.data.content);
          setShowLoader(false);
        });
    } catch (error) {
      console.log("DEU RUIM IRMÃOZINHO");
    }
  }

  function GoToTable({ table_id }: ITable) {
    setShowLoader(true);
    try {
      api
        .get(`/table/${table_id}`, {
          headers: {
            authorization: getTokenFromStorage(),
          },
        })
        .then((response) => {
          setFilteredMesas(response.data.content);
          console.log("mesas filtradas: ", filteredMesas);
          setShowLoader(false);
        });
    } catch (error) {
      console.log("DEU: RUIM");
    }
  }

  async function handleDelete(id: number) {
    try {
      await api.delete("/table/" + id, {
        headers: {
          authorization: getTokenFromStorage(),
        },
      });
      GetTables();
      console.log(id);
    } catch (error) {
      return alert("ocorreu algum erro");
    }

    setShowDeleteModal({
      table_id: id,
      table_number: showDeleteModal.table_number,
      isActive: false,
    });
  }

  async function handleEditMesa(mesa: ITable) {
    try {
      await api.get("table/" + mesa.table_id, {
        headers: {
          authorization: getTokenFromStorage(),
        },
      });
    } catch (error) {
      return alert("ocorreu algum erro");
    }
    console.log(mesa.table_id);
    console.log(mesa.table_number);
    setNumberMesa(String(mesa.table_number));
    setShowModalEdit({ table_id: mesa.table_id, table_number: mesa.table_number, isActive: true });
  }

  function newTableButton() {
    setNumberMesa('');
    setShowModalCreate(true);
  }

  async function handleSubmit(event: React.ChangeEvent<HTMLInputElement>) {
    if (table_number === null) {
      return alert("Complete o campo corretamente!");
    } else {
      setNumberMesa('');
      try {
        await api.post(
          "table",
          { table_number },
          {
            headers: {
              authorization: getTokenFromStorage(),
            },
          }
        );

        GetTables()
        history.push("/mesas");

        setShowModalCreate(false);
      } catch (error) {
        return alert("Erro ao tentar cadastrar Mesa");
      }
    }
  }

  async function handleSubmitEditMesa(mesa: ITable, id: number, tableNumber: number) {
    if (table_number === null) {
      return alert("Complete o campo corretamente!");
    } else {
      try {
        console.log('id: ', id);
        await api.put(
          "table/" + id,
          { table_number },
          {
            headers: {
              authorization: getTokenFromStorage(),
            },
          }
        );

        GetTables()
        history.push("/mesas");

        setShowModalEdit({ table_id: mesa.table_id, isActive: false, table_number: mesa.table_number });
      } catch (error) {
        return alert("Erro ao tentar editar mesa");
      }
    }
  }

  useEffect(() => {
    GetTables();
  }, []);

  return (
    <Grid>
      <Aside />
      <SubAside
        title="Mesas"
        clicked={() => newTableButton()}
        addButtonText="+ Adicionar nova mesa"
      // items={mesas}
      >
        {mesas.map((mesa) => (
          <div key={mesa.table_id}>
            <LiMenu onClick={() => GoToTable(mesa)}>
              <TrashOutline
                color="white"
                width="3rem"
                height="1.5rem"
                onClick={() =>
                  setShowDeleteModal({
                    table_id: mesa.table_id,
                    table_number: mesa.table_number,
                    isActive: true,
                  })
                }
              />
              <CreateOutline
                color="white"
                width="3rem"
                height="1.5rem"
                onClick={() => handleEditMesa(mesa)}
              />
              Mesa {mesa.table_number}
            </LiMenu>

            {showModalEdit.isActive && (
              <Modal
                title={`Vamos editar a Mesa: ${showModalEdit.table_number}`}
                ButtonTitle="Alterar"
                text="Por favor, preencha o novo número da mesa."
                closeClicked={() => setShowModalEdit({
                  table_id: 0,
                  table_number: 0,
                  isActive: false,
                })}
              >
                <Input
                  width="55%"
                  type="number"
                  marginTop="20px"
                  placeholder="Digite o novo número da mesa"
                  value={table_number}
                  onChange={(event) => setNumberMesa(event.target.value)}
                />
                <Button
                  content="Alterar Mesa"
                  width="25%"
                  height="2.25rem"
                  marginTop="28px"
                  clicked={() => handleSubmitEditMesa(mesa, showModalEdit.table_id, showModalEdit.table_number)}
                />
              </Modal>
            )}

            {showDeleteModal.isActive && (
              <DeleteModal
                text={`Deseja excluir a Mesa: ${showDeleteModal.table_number}`}
                clicked={() => handleDelete(showDeleteModal.table_id)}
                closeClicked={() =>
                  setShowDeleteModal({
                    table_id: mesa.table_id,
                    table_number: mesa.table_number,
                    isActive: false,
                  })
                }
              />
            )}
          </div>
        ))}
      </SubAside>
      <Container
        display="flex"
        justifyContent="flex-end"
        padding="110px 6px 0px 55px"
        height="100vh"
      >
        <Body>
          <TableWithTabs>
            {filteredMesas === undefined ? (
              <Title color="#B2DA5A" marginBottom="64px">
                Clique na mesa para obter o QR Code!
              </Title>
            ) : (
              <>
                <Title color="#B2DA5A" marginBottom="64px">
                  Mesa: {filteredMesas.table_number}
                </Title>
                <QRCode
                  value={filteredMesas.table_qrcode}
                  size={250}
                  renderAs="svg"
                  includeMargin={true}
                />
                <Button content="Imprimir" marginTop="48px" width="20%" />

              </>
            )}
          </TableWithTabs>
        </Body>
      </Container>

      {showLoader && <Loader />}

      {showModalCreate && (
        <Modal
          title="Vamos adicionar uma nova mesa!"
          ButtonTitle="Adicionar"
          text="Por favor, preencha o campo abaixo, para prosseguirmos no processo de cadastro."
          closeClicked={() => setShowModalCreate(false)}
        >
          <Input
            width="55%"
            type="number"
            marginTop="20px"
            placeholder="Digite o nome da categoria"
            value={table_number}
            onChange={(event) => setNumberMesa(event.target.value)}
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

    </Grid>
  );
};

export default Mesas;
