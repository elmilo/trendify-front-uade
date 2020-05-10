import React from 'react';
//import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoutes/ProtectedRoute';
import Dashboard from './Components/Dashboard/Dashboard.js';
import CargarVentas from './Components/CargarVentas/CargarVentas.js';
import Proveedores from './Components/Proveedores/Proveedores.js';
import Tendencias from './Components/Tendencias/Tendencias.js';
import Perfil from './Components/Perfil/Perfil.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          {/* <Route exact path="/auth/login" component={Login} /> */}
          <ProtectedRoute exact path="/cargarVentas" component={CargarVentas} />
          <ProtectedRoute exact path="/proveedores" component={Proveedores} />
          <ProtectedRoute exact path="/tendencias" component={Tendencias} />
          <ProtectedRoute exact path="/perfil" component={Perfil} />
          <Route path="*" component={() => "404 not Found"} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
