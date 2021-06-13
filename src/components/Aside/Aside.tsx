import { Link, useHistory } from 'react-router-dom';
import { colors } from '../../utils';
import { useLocation } from 'react-router-dom'
import { ArrowBackOutline } from 'react-ionicons'


import {
  Aside,
  AsideTitle,
  AsideUl,
  AsideLi,
  AsideLiText,
  AsideBackButton
} from './style'


interface InewAside {

}


const NewAside = (props: InewAside) => {

  const history = useHistory()
  const location = useLocation();
  const actualRoute = location.pathname;

  const mainRoute = `${actualRoute}`;

  function Logout() {
    localStorage.removeItem('TOKEN')
    localStorage.removeItem('EMAIL')
    localStorage.removeItem('CATEGORYID')

    history.push('/')
  }

  return (
    <Aside>
      <AsideTitle>Cardappio</AsideTitle>
      <div style={{
        height: "calc(100% - 81px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}>
        <AsideUl>
          {/* <Link to="/inicio" style={{ color: 'inherit', textDecoration: 'inherit' }} >
            <AsideLi
              backgroundColor={mainRoute === '/inicio' ? colors.lightBlack : colors.black}
            >
              <AsideLiText
                color={mainRoute === '/inicio' ? colors.green : colors.green}
                fontWeight={mainRoute === '/inicio' ? 'bold' : '400'}
              >
                Inicio
                        </AsideLiText>
            </AsideLi>
          </Link> */}
          <Link to="/cardapio" style={{ color: 'inherit', textDecoration: 'inherit' }}>
            <AsideLi
              backgroundColor={mainRoute === '/cardapio' ? colors.lightBlack : colors.black}
            >
              <AsideLiText
                color={mainRoute === '/cardapio' ? colors.green : colors.green}
                fontWeight={mainRoute === '/cardapio' ? 'bold' : '400'}
              >
                Cardápio
                        </AsideLiText>
            </AsideLi>
          </Link>
          <Link to="/comandas" style={{ color: 'inherit', textDecoration: 'inherit' }}>
            <AsideLi
              backgroundColor={mainRoute === '/comandas' ? colors.lightBlack : colors.black}
            >
              <AsideLiText
                color={mainRoute === '/comandas' ? colors.green : colors.green}
                fontWeight={mainRoute === '/comandas' ? 'bold' : '400'}
              >
                Comandas
                        </AsideLiText>
            </AsideLi>
          </Link>
          <Link to="/mesas" style={{ color: 'inherit', textDecoration: 'inherit' }}>
            <AsideLi
              backgroundColor={mainRoute === '/mesas' ? colors.lightBlack : colors.black}
            >
              <AsideLiText
                color={mainRoute === '/mesas' ? colors.green : colors.green}
                fontWeight={mainRoute === '/mesas' ? 'bold' : '400'}
              >
                Mesas
                        </AsideLiText>
            </AsideLi>
          </Link>
          {/* <Link to="/usuarios" style={{ color: 'inherit', textDecoration: 'inherit' }}>
            <AsideLi
              backgroundColor={mainRoute === '/usuarios' ? colors.lightBlack : colors.black}
            >
              <AsideLiText
                color={mainRoute === '/usuarios' ? colors.green : colors.green}
                fontWeight={mainRoute === '/usuarios' ? 'bold' : '400'}
              >
                Usuarios
                        </AsideLiText>
            </AsideLi>
          </Link> */}
          <Link to="/pedidos" style={{ color: 'inherit', textDecoration: 'inherit' }}>
            <AsideLi
              backgroundColor={mainRoute === '/pedidos' ? colors.lightBlack : colors.black}
            >
              <AsideLiText
                color={mainRoute === '/pedidos' ? colors.green : colors.green}
                fontWeight={mainRoute === '/pedidos' ? 'bold' : '400'}
              >
                Pedidos
                        </AsideLiText>
            </AsideLi>
          </Link>
        </AsideUl>
        <Link to="/" onClick={() => Logout()}>
          <AsideBackButton >
            <ArrowBackOutline 
              width="1.5rem" 
              height="1.5rem" 
              style={{ margin: "auto" }}
            />
          </AsideBackButton>
        </Link>
      </div>
    </Aside>
  );
}

export default NewAside;