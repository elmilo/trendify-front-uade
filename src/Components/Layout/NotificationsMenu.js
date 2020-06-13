import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from "@material-ui/core/IconButton";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import CircularProgress from '@material-ui/core/CircularProgress';

const NotificationsMenu = (props) => {

    const [anchor, setAnchor] = React.useState(null);

    const handleOpenMenu = (event) => {
        setAnchor(event.currentTarget);
    };

    const handleCloseMenu = () => setAnchor(null);

    var cantNotificacionesNoLeidas = props.notificaciones?.notificaciones?.filter(not => !not.leido)?.length ?? 0;

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
                    onClose={handleCloseMenu}>

                    {!props.isLoading && props.notificaciones && props.notificaciones.notificaciones.map((notificacion, index) =>
                        <MenuItem key={"userNotification" + index}>
                            <ListItemIcon>
                                <NotificationImportantIcon fontSize="small" />
                            </ListItemIcon>
                            {notificacion.leido && <Typography variant="inherit">{notificacion.mensaje}</Typography>}
                            {!notificacion.leido && <Typography variant="inherit"><b>{notificacion.mensaje}</b></Typography>}
                        </MenuItem>
                    )}

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