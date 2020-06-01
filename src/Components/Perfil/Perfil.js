import React from "react";
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import NotificationsIcon from '@material-ui/icons/Notifications';
import GroupIcon from '@material-ui/icons/Group';
import Layout from '../Layout/Layout.js'
import TabNotificaciones from "./TabNotificaciones.js";
import TabUsuarios from "./TabUsuarios.js";
import TabPerfil from "./TabPerfil.js";
import { getListadoUsuarios, getListadoNotificaciones, getUsuario } from '../../Axios/Axios';

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function tabProps(index) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabs-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  customTabs: {
    backgroundColor: '#2D2D37',
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabs-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default function Perfil() {

  const classes = useStyles();
  const [tabIndex, setTabIndex] = React.useState(0);
  const [isLoadingNotificaciones, setIsLoadingNotificaciones] = React.useState(false);
  const [isLoadingUsuarios, setIsLoadingUsuarios] = React.useState(false);
  const [isLoadingMisDatos, setIsLoadingMisDatos] = React.useState(false);
  const [notificaciones, setNotificaciones] = React.useState(null);
  const [usuarios, setUsuarios] = React.useState(null);
  const [misDatos, setMisDatos] = React.useState(null);

  const handleChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  const recargarListadoUsuarios = (onSuccessCallback, onErrorCallback) => {

    setIsLoadingUsuarios(true);

    getListadoUsuarios("111")
      .then((dResponse) => {
        setUsuarios(dResponse);
        setIsLoadingUsuarios(false);
        if (onSuccessCallback)
          onSuccessCallback();
      })
      .catch(error => {
        console.log('Response Listado usuario:');
        console.log(error);
        setIsLoadingUsuarios(false);
        if (onErrorCallback)
          onErrorCallback();
      });
  }

  const recargarListadoNotificaciones = (onSuccessCallback, onErrorCallback) => {

    setIsLoadingNotificaciones(true);

    getListadoNotificaciones("111")
      .then((response) => {
        setNotificaciones(response);
        setIsLoadingNotificaciones(false);
        if (onSuccessCallback)
          onSuccessCallback();
      })
      .catch(error => {
        console.log('Response Listado notificaciones:');
        console.log(error);
        setIsLoadingNotificaciones(false);
        if (onErrorCallback)
          onErrorCallback();
      });
  }

  const recargarMisDatos = (onSuccessCallback, onErrorCallback) => {

    setIsLoadingMisDatos(true);

    getUsuario("111")
      .then((response) => {
        setMisDatos(response);
        setIsLoadingMisDatos(false);
        if (onSuccessCallback)
          onSuccessCallback();
      })
      .catch(error => {
        console.log('Response Mis datos:');
        console.log(error);
        setIsLoadingMisDatos(false);
        if (onErrorCallback)
          onErrorCallback();
      });
  }

  if (usuarios === null && !isLoadingUsuarios) {
    recargarListadoUsuarios();
  }

  if (notificaciones === null && !isLoadingNotificaciones) {
    recargarListadoNotificaciones();
  }

  if (misDatos === null && !isLoadingMisDatos) {
    recargarMisDatos();
  }

  return (
    <div>
      <Layout title="Perfil">
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs
              value={tabIndex}
              onChange={handleChange}
              variant="fullWidth"
              className={classes.customTabs}
              centered>
              <Tab className={classes.customTab} icon={<NotificationsIcon />} aria-label="phone" {...tabProps(0)} />
              <Tab className={classes.customTab} icon={<GroupIcon />} aria-label="favorite" {...tabProps(1)} />
              <Tab className={classes.customTab} icon={<AccountBoxIcon />} aria-label="person" {...tabProps(2)} />
            </Tabs>
          </AppBar>
          <TabPanel value={tabIndex} index={0}>
            <TabNotificaciones data={notificaciones} isLoading={isLoadingNotificaciones} />
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            <TabUsuarios data={usuarios} isLoading={isLoadingUsuarios} recargarListadoUsuariosEvent={recargarListadoUsuarios} />
          </TabPanel>
          <TabPanel value={tabIndex} index={2}>
            <TabPerfil data={misDatos} isLoading={isLoadingMisDatos} recargarMisDatosEvent={recargarMisDatos} />
          </TabPanel>
        </div>
      </Layout>
    </div>
  );
}
