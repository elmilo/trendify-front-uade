import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { MuiThemeProvider } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import auth from '../../ProtectedRoutes/auth'

import { mainListItems, secondaryListItems } from "./Menu/listItems";
import logo_dark from "../../Assets/Images/trendify_dark.svg";
import trendifyTheme from './trendifyTheme.js';
import Copyright from './Copyright.js';
import ProfileMenu from './ProfileMenu.js';
import NotificationsMenu from "./NotificationsMenu";
import { getTopNotificacionesUsuario } from '../../Axios/Axios';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "background-color": "rgba(226, 227, 228, 0.4)",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    "background-color": "rgb(45, 45, 55)",
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    "background-color": "rgb(226, 227, 228)",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    "background-color": "rgb(226, 227, 228)",
  },
  drawerPaperClose: {
    overflowX: "hidden",
    "background-color": "rgb(226, 227, 228)",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const Layout = ({ children, title }) => {

  const classes = useStyles();

  const [open, setOpen] = React.useState(true);
  const [notificacionesUsuario, setNotificacionesUsuario] = React.useState(null);
  const [isLoadingNotificacionesUsuario, setIsLoadingNotificacionesUsuario] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getTopNotificaciones = (onSuccessCallback, onErrorCallback) => {

    setIsLoadingNotificacionesUsuario(true);

    getTopNotificacionesUsuario(auth.getIdUsuario())
      .then((response) => {
        setNotificacionesUsuario(response);
        setIsLoadingNotificacionesUsuario(false);
        if (onSuccessCallback)
          onSuccessCallback();
      })
      .catch(error => {
        setIsLoadingNotificacionesUsuario(false);
        if (onErrorCallback)
          onErrorCallback();
      });
  }

  if (notificacionesUsuario === null && !isLoadingNotificacionesUsuario) {
    getTopNotificaciones();
  }

  return (
    <MuiThemeProvider theme={trendifyTheme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              {title}
            </Typography>

            <NotificationsMenu notificaciones={notificacionesUsuario} isLoading={isLoadingNotificacionesUsuario}/>
            <ProfileMenu />

          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <img src={logo_dark} className="appLogoDark" alt="logo" width="150" />
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
          <List>{secondaryListItems}</List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            {children}
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
      </div>
    </MuiThemeProvider>
  );
}

export default Layout;
