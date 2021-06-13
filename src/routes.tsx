import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import Inicio from './pages/Inicio/Inicio';
import Cardapio from './pages/Cardapio/Cardapio';
import Comandas from './pages/Comandas/Comandas';
// import Usuarios from './pages/Usuarios/Usuarios';
import Pedidos from './pages/Pedidos/Pedidos';
import Mesas from './pages/Mesas/Mesas';
import Client from './pages/Client/Client';
import ClientCardapio from './pages/ClientCardapio/ClientCardapio'
import ClientCommand from './pages/ClientCommand/ClientCommand'
import QrScan from './pages/QrScan/QrScan'

function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/"  exact component={Login}/>
                <Route path="/cadastro" component={Cadastro}/>
                <Route path="/inicio" component={Inicio}/>
                <Route path="/cardapio" component={Cardapio}/>
                {/* <Route path="/cardapio/:id" component={Cardapio}/>  */}
                <Route path="/comandas" component={Comandas}/>
                <Route path="/mesas" component={Mesas}/>
                {/* <Route path="/usuarios" component={Usuarios}/> */}
                <Route path="/pedidos" component={Pedidos}/>
                <Route path="/client" exact component={Client} />
                <Route path="/client/cardapio" component={ClientCardapio} />
                <Route path="/client/comanda" component={ClientCommand} />
                <Route path="/qrscan" component={QrScan} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;