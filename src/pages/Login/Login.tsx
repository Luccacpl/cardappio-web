import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import api from '../../services/api';

import { colors } from '../../utils/colors';
import { fontsSizes } from '../../utils/fontSizes';
import { Title, SubTitle, P } from 'components/Text/text';
import { Body, ContainerLeft, ContainerRight, BtnDiv, Linha } from './styles';
import { dimensions } from 'utils';
import { Input } from 'components/Input/Input';
import Button from 'components/Button/Button';
import { Link } from 'react-router-dom';

import Loader from 'components/Loader'


function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [showLoader, setShowLoader] = useState(false)
  const history = useHistory()


  const pipe = (...fns: Function[]) => (params: unknown) =>
    fns.reduce((fn, pipeF) => pipeF(fn), params)

  const validateFields = () =>
    email !== '' && pass !== ''

  const showError = () =>
    alert('complete os campos corretamente')

  const authLoginService = async () =>
    await api.post('login', { email, pass })

  const storeUserToken = ({ data }: { data: any }) =>
    localStorage.setItem('TOKEN', data.authorization)

  const storeUserInfo = () =>
    localStorage.setItem('EMAIL', email)

  const redirectUserToDashboard = () =>
    history.push('/cardapio')

  const handlerErrorApi = () =>
    alert('Houve um erro na API')

  const submitLogin = () =>
    validateFields() ?
      authLoginService()
        .then(
          pipe(
            storeUserToken,
            storeUserInfo,
            redirectUserToDashboard,
          )
        )
        .catch(handlerErrorApi)
      : showError()

  return (
    <Body>
      <ContainerLeft>
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
          Seja Bem-vindo!
                </SubTitle>
        <P
          color={colors.white}
          fontSize={fontsSizes.small14}
          marginTop={dimensions.spacing16}
        >
          Por favor faça o seu login para ter acesso!
                </P>
        <Input
          placeholder="Digite seu email"
          marginTop="36px"
          marginTopResponsive="64px"
          type="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <Input
          placeholder="Digite a sua senha"
          marginTop="12px"
          marginTopResponsive="24px"
          type="password"
          value={pass}
          onChange={event => setPass(event.target.value)}
        />
        <BtnDiv>
          <Button
            content="Entrar"
            width="50%"
            marginTop="1rem"
            clicked={submitLogin}
          />
          <Link style={{ textDecoration: "none" }} to="/">
            <P
              color={colors.menuOrange}
              fontSize={fontsSizes.small12}
              fontSizeResponsive={fontsSizes.medium16}
              fontWeight="500"
              marginTop="1.425rem"
            >
              Esqueceu a senha?
                    </P>
          </Link>
        </BtnDiv>
        <Linha></Linha>
        <P
          color={colors.white}
          marginTop="32px"
          textAlign="center"
        >
          Ainda não tem a sua conta?
                </P>
        <Link style={{ textDecoration: "none" }} to="/cadastro">
          <P
            color={colors.menuOrange}
            fontSize={fontsSizes.small14}
            fontWeight="500"
            marginTop="1.425rem"
            textAlign="center"
          >
            Crie agora mesmo!
                    </P>
        </Link>
      </ContainerLeft>
      <ContainerRight></ContainerRight>
    </Body>
  );
}

export default Login;