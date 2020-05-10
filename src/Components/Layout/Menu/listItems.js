import React from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuListItem from "./MenuListItem";

import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PublishIcon from '@material-ui/icons/Publish';
import WhatshotIcon from '@material-ui/icons/Whatshot';

export const mainListItems = (
  <div>
    <MenuListItem text="Dashboard" to="/" icon={<DashboardIcon />} />
    <MenuListItem text="Cargar ventas" to="/cargarVentas" icon={<PublishIcon />} />
    <MenuListItem text="Proveedores" to="/proveedores" icon={<PeopleIcon />} />
    <MenuListItem text="Tendencias" to="/tendencias" icon={<WhatshotIcon />} />
    <MenuListItem text="Perfil" to="/perfil" icon={<PersonIcon />} />
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Favoritos</ListSubheader>
    <MenuListItem text="Lácteos YTD" to="/" icon={<AssignmentIcon />} />
    <MenuListItem text="Lácteos" to="/" icon={<AssignmentIcon />} />
    <MenuListItem text="Bebidas" to="/" icon={<AssignmentIcon />} />
  </div>
);
