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
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import { Container } from "@material-ui/core";

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

const ButtonContainer = styled(Container)({
  padding: '0 15px 15px 15px',
  textAlign: 'center'
});

const GuardarButton = styled(Button)({
  'border-radius': '0.2rem !important',
  '& span': {
    padding: '5px !important',
    fontSize: '18px'
  }
});

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
  const [isSaving, setIsSaving] = React.useState(false);

  const handleChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  var data = {
    rol: "Administrador",
    nombre: "Perez, Camilo",
    comercio: "Minimercado bla bla..",
    email: "perez.camilo@gmail.com",
    tel: "1567845678",
    usuarios: [{ 
      id: 1,
      nombre: 'Matías',
      apellido: 'Iglesias',
      email: 'matiiglesias@uade.edu.ar',
      tel: '1537808327',
      id_rol: 2,
      rol: 'Usuario'
    },
    { 
      id: 2,
      nombre: 'Emilio',
      apellido: 'Amarillo',
      email: 'eamarillo@uade.edu.ar',
      tel: '1549582634',
      id_rol: 1,
      rol: 'Administrador'
    },
    { 
      id: 3,
      nombre: 'Matías',
      apellido: 'Iglesias',
      email: 'matiiglesias@uade.edu.ar',
      tel: '1537808327',
      id_rol: 2,
      rol: 'Usuario'
    },
    { 
      id: 4,
      nombre: 'Emilio',
      apellido: 'Amarillo',
      email: 'eamarillo@uade.edu.ar',
      tel: '1549582634',
      id_rol: 1,
      rol: 'Administrador'
    },
    { 
      id: 5,
      nombre: 'Matías',
      apellido: 'Iglesias',
      email: 'matiiglesias@uade.edu.ar',
      tel: '1537808327',
      id_rol: 2,
      rol: 'Usuario'
    },
    { 
      id: 6,
      nombre: 'Emilio',
      apellido: 'Amarillo',
      email: 'eamarillo@uade.edu.ar',
      tel: '1549582634',
      id_rol: 1,
      rol: 'Administrador'
    },
    { 
      id: 7,
      nombre: 'Matías',
      apellido: 'Iglesias',
      email: 'matiiglesias@uade.edu.ar',
      tel: '1537808327',
      id_rol: 2,
      rol: 'Usuario'
    },
    { 
      id: 8,
      nombre: 'Emilio',
      apellido: 'Amarillo',
      email: 'eamarillo@uade.edu.ar',
      tel: '1549582634',
      id_rol: 1,
      rol: 'Administrador'
    },
    { 
      id: 9,
      nombre: 'Matías',
      apellido: 'Iglesias',
      email: 'matiiglesias@uade.edu.ar',
      tel: '1537808327',
      id_rol: 2,
      rol: 'Usuario'
    },
    { 
      id: 10,
      nombre: 'Emilio',
      apellido: 'Amarillo',
      email: 'eamarillo@uade.edu.ar',
      tel: '1549582634',
      id_rol: 1,
      rol: 'Administrador'
    },
    { 
      id: 11,
      nombre: 'Matías',
      apellido: 'Iglesias',
      email: 'matiiglesias@uade.edu.ar',
      tel: '1537808327',
      id_rol: 2,
      rol: 'Usuario'
    },
    { 
      id: 12,
      nombre: 'Emilio',
      apellido: 'Amarillo',
      email: 'eamarillo@uade.edu.ar',
      tel: '1549582634',
      id_rol: 1,
      rol: 'Administrador'
    }]
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
            <TabNotificaciones data={data} />
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            <TabUsuarios data={data} />
          </TabPanel>
          <TabPanel value={tabIndex} index={2}>
            <TabPerfil data={data} />
          </TabPanel>
          <ButtonContainer maxWidth="lg">
            {!isSaving && <GuardarButton variant="contained" color="secondary" fullWidth>Guardar</GuardarButton>}
            {isSaving && <GuardarButton variant="contained" color="secondary" fullWidth disabled>Guardando...</GuardarButton>}
          </ButtonContainer>
        </div>
      </Layout>
    </div>
  );
}
