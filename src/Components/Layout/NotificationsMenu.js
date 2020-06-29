import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from "@material-ui/core/IconButton";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { setNotificacionUsuarioLeida } from '../../Axios/Axios';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import Divider from '@material-ui/core/Divider';

const NotificationsMenu = (props) => {

    const [anchor, setAnchor] = React.useState(null);

    const handleOpenMenu = (event) => {
        setAnchor(event.currentTarget);
    };

    const handleCloseMenu = () => { 
        setAnchor(null);
        if (props.notificaciones && props.notificaciones.length > 0) {

            props.notificaciones.forEach(notificacion => {
                if (!notificacion.leido) {
                    notificacion.leido = true;
                    setNotificacionUsuarioLeida(notificacion.id);
                }
            });
        }
    };

    var cantNotificacionesNoLeidas = props.notificaciones?.filter(not => !not.leido)?.length ?? 0;

    return (
        <div>
            <div>
                <IconButton color="inherit" onClick={handleOpenMenu} aria-controls="notifications-menu" aria-haspopup="true">
                    <Badge badgeContent={cantNotificacionesNoLeidas}
                            invisible={cantNotificacionesNoLeidas <= 0} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>

                <Menu id="notifications-menu"
                    anchorEl={anchor}
                    keepMounted
                    open={Boolean(anchor)}
                    onClose={handleCloseMenu}
                    style={{maxHeight: 500, overflow: 'auto'}}>

                    {!props.isLoading && props.notificaciones.length > 0 && props.notificaciones.map((notificacion, index) =>
                        <div>
                            <ListItem key={"userNotification" + index} button style={{maxWidth: 400}}>
                                    <ListItemIcon>
                                        {!notificacion.leido &&<NotificationsActiveIcon fontSize="small" />}
                                        {notificacion.leido &&<NotificationsNoneIcon fontSize="small" />}
                                    </ListItemIcon>
                                <ListItemText primary={notificacion.mensaje} dense={!notificacion.leido}/>
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </div>
                    )}

                    {!props.isLoading && props.notificaciones.length === 0 &&
                        <MenuItem key={"noUserNotification"}>
                            No hay notificaciones.
                        </MenuItem>
                    }

                    {props.isLoading &&
                        <MenuItem>
                            <Typography variant="inherit"><CircularProgress size={18} color="secondary" />  Actualizando notificaciones...</Typography>
                        </MenuItem>
                    }
                </Menu>
            </div>
        </div>
    );
}

export default NotificationsMenu;