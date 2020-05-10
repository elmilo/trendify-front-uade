import React from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuListItem from "./MenuListItem";

import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PublishIcon from '@material-ui/icons/Publish';
import WhatshotIcon from '@material-ui/icons/Whatshot';

import trendifyTheme from '../trendifyTheme.js';

export const mainListItems = (
  <div>
    <MenuListItem text="Dashboard" to="/" icon={<DashboardIcon style={{ color: trendifyTheme.palette.primary.dark }} />} />
    <MenuListItem text="Cargar ventas" to="/cargarVentas" icon={<PublishIcon color="primary" />} />
    <MenuListItem text="Proveedores" to="/proveedores" icon={<PeopleIcon color="primary"/>} />
    <MenuListItem text="Tendencias" to="/tendencias" icon={<WhatshotIcon color="error"/>} />
    <MenuListItem text="Perfil" to="/perfil" icon={<PersonIcon style={{ color: trendifyTheme.palette.primary.dark }} />} />
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Favoritos</ListSubheader>
    <MenuListItem text="Lácteos YTD" to="/" icon={<AssignmentIcon style={{ color: trendifyTheme.palette.primary.dark }}/>} />
    <MenuListItem text="Lácteos" to="/" icon={<AssignmentIcon style={{ color: trendifyTheme.palette.primary.dark }}/>} />
    <MenuListItem text="Bebidas" to="/" icon={<AssignmentIcon style={{ color: trendifyTheme.palette.primary.dark }} />} />
  </div>
);
