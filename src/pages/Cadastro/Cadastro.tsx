import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import { Title, SubTitle, P } from 'components/Text/text';
import { colors } from '../../utils/colors';
import { fontsSizes } from '../../utils/fontSizes';
import { Body, ContainerLeft, ContainerRight, Linha } from '../Login/styles';
import { dimensions } from 'utils';
import { ChangeEventHandler } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import Button from '../../components/Button/Button';
import { Input } from 'components/Input/Input';
import Loader from "components/Loader";


function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Cadastro() {

  const history = useHistory();

  const [showLoader, setShowLoader] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [dtNasc, setDtNasc] = useState('');
  const [nameRestaurant, setNameRestaurant] = useState('');

  const [alert, SetAlert] = useState(false);
  const [alertError, SetAlertError] = useState(false);

  const isUserAuthenticated = () =>
    localStorage.getItem('TOKEN') === null && history.push('/')

  async function handleSubmit(event: ChangeEventHandler<HTMLInputElement>) {

    if (
      name === '' ||
      email === '' ||
      pass === '' ||
      dtNasc === '' ||
      nameRestaurant === ''
    ) {
      return SetAlertError(true)
    }
    else {
      const data = {
        "name": name,
        "email": email,
        "pass": pass,
        "dt_nasc": dtNasc,
      }

      const dataRestaurant = {
        "name": nameRestaurant,
        "logo": ""
      }

      try {
         await api
          .post('register', data)
          setShowLoader(true);

        const token = await Promise.resolve(
          await api
            .post('login', { email, pass })
        )

        console.log(token.data.authorization)

        localStorage.setItem('TOKEN', token.data.authorization)

        localStorage.setItem('EMAIL', email)

        isUserAuthenticated()

        await Promise.resolve(
          api.post('restaurant', dataRestaurant, {
            headers: {
              'authorization': token.data.authorization
            }
          })
        )

        SetAlert(true);

        console.log(dataRestaurant)

        setTimeout(() => history.push('/cardapio'), 1000);
        setShowLoader(false)
      }
      catch (error) {
        return SetAlertError(true)
      }
    }
  }


  return (
    <Body>
      <ContainerLeft overflow="scroll">
        <Title
          fontFamily="Quicksand"
          color={colors.menuOrange}
          fontSize={fontsSizes.large30}
          marginTop={dimensions.spacing56}
        >
          Cardappio
                </Title>
        <SubTitle
          color={colors.green}
          fontSize={fontsSizes.large18}
          fontWeight="400"
        >
          Faça seu cadastro
                </SubTitle>
        <P
          color={colors.white}
          fontSize={fontsSizes.small14}
          marginTop={dimensions.spacing16}
        >
          Complete os campos abaixo para realizar o cadastro!
                </P>
        <Input
          placeholder="Digite seu nome"
          marginTop="36px"
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <Input
          placeholder="Digite seu email"
          marginTop="36px"
          type="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <Input
          placeholder="Digite sua senha"
          marginTop="36px"
          type="password"
          value={pass} onChange={event => setPass(event.target.value)}
        />
        <Input
          placeholder="Data de nascimento"
          marginTop="36px"
          type="date"
          value={dtNasc}
          onChange={event => setDtNasc(event.target.value)}
        />
        <Input
          placeholder="Nome do restaurante"
          marginTop="36px"
          type="text"
          value={nameRestaurant}
          onChange={event => setNameRestaurant(event.target.value)}
        />

        <Button
          content="Cadastrar"
          width="100%"
          marginTop="36px"
          clicked={handleSubmit}
        />

        <Linha></Linha>

        <P
          color={colors.white}
          marginTop="32px"
          textAlign="center"
        >
          Ja possui uma conta?
                </P>
        <Link style={{ textDecoration: "none" }} to="/adm">
          <P
            color={colors.menuOrange}
            fontSize={fontsSizes.small14}
            fontWeight="500"
            marginTop="1.425rem"
            textAlign="center"
          >
            Entre agora mesmo!
                    </P>
        </Link>

      </ContainerLeft>
      <ContainerRight></ContainerRight>
      {alertError === true &&
        <Snackbar open={alertError} autoHideDuration={4000} onClose={() => SetAlertError(false)}>
          <Alert onClose={() => SetAlertError(false)} severity="error">
            Complete os campos corretamente!
                     </Alert>
        </Snackbar>
      }
      {alert === true &&
        <Snackbar open={alert} autoHideDuration={4000} onClose={() => SetAlert(false)}>
          <Alert onClose={() => SetAlert(false)} severity="success">
            Cadastro realizado com sucesso!
                     </Alert>
        </Snackbar>
      }
      {showLoader && <Loader />}
    </Body>
  );
}

export default Cadastro;