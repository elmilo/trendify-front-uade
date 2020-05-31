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
import dataGetMisDatosResponse from "../../Assets/dataGetMisDatosResponse";
import dataListadoUsuariosResponse from "../../Assets/dataListadoUsuariosResponse";
import dataListadoNotifiacionesResponse from "../../Assets/dataListadoNotificacionesResponse";

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

  const handleChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

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
            <TabNotificaciones data={dataListadoNotifiacionesResponse} />
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            <TabUsuarios data={dataListadoUsuariosResponse} />
          </TabPanel>
          <TabPanel value={tabIndex} index={2}>
            <TabPerfil misDatos={dataGetMisDatosResponse} />
          </TabPanel>
        </div>
      </Layout>
    </div>
  );
}
