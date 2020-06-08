import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import auth from '../../ProtectedRoutes/auth';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import { makeStyles } from '@material-ui/core/styles';
import { Link, withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    Link: {
      textDecoration: 'none',
      color: 'rgba(0, 0, 0, 0.87)'
    },
  }));

const ProfileMenu = (props) => {

    const classes = useStyles();

    const [anchor, setAnchor] = React.useState(null);
    const [usuario, setUsuario] = React.useState(null);

    const handleOpenMenu = (event) => {
        setUsuario(auth.getNombreCompleto());
        setAnchor(event.currentTarget);
    };

    const handleLogOut = () => auth.signOut(() => props.history.push('/auth/login'));

    const handleCloseMenu = () => setAnchor(null);

    return (
        <div>
            <IconButton color="inherit" onClick={handleOpenMenu} aria-controls="simple-menu" aria-haspopup="true">
                <AccountCircleIcon />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchor}
                keepMounted
                open={Boolean(anchor)}
                onClose={handleCloseMenu}
            >
                <MenuItem>
                    <Typography variant="h6" gutterBottom align="left" style={{ margin: '10px' }}>{usuario}</Typography>
                </MenuItem>
                <MenuItem>
                    <Link to="/perfil" className={classes.Link}>
                        <ListItemIcon>
                            <PersonIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="inherit">Mi perfil</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleLogOut}>
                    <ListItemIcon>
                        <ExitToAppIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">Desconectarse</Typography>
                </MenuItem>
            </Menu>
        </div>);
}

export default withRouter(ProfileMenu);