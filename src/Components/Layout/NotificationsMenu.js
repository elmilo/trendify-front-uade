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
    const [isReadNotifications, setIsReadNotifications] = React.useState(false);

    const handleOpenMenu = (event) => {
        setIsReadNotifications(true);
        setAnchor(event.currentTarget);
    };

    const handleCloseMenu = () => setAnchor(null);

    return (
        <div>

            {props.notificaciones &&
                <div>
                    <IconButton color="inherit" onClick={handleOpenMenu} aria-controls="notifications-menu" aria-haspopup="true">
                        {!isReadNotifications && <Badge badgeContent={props.notificaciones.notificaciones.lenght} color="secondary"><NotificationsIcon /></Badge>}
                        {isReadNotifications && <NotificationsIcon />}
                    </IconButton>

                    <Menu id="notifications-menu"
                        anchorEl={anchor}
                        keepMounted
                        open={Boolean(anchor)}
                        onClose={handleCloseMenu}
                    >
                        {!props.isLoading && props.notificaciones.notificaciones.map((notificacion, index) =>
                            <MenuItem key={"userNotification" + index}>
                                <ListItemIcon>
                                    <NotificationImportantIcon fontSize="small" />
                                </ListItemIcon>
                                <Typography variant="inherit">{notificacion.mensaje}</Typography>
                            </MenuItem>
                        )}
                    </Menu>
                </div>
            }

            {!props.notificaciones && props.isLoading && <CircularProgress size={18} color="secondary" />}
        </div>
    );
}

export default NotificationsMenu;