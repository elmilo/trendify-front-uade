import React from 'react';
import Alert from '@material-ui/lab/Alert';
import LoadingData from '../Common/LoadingData';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import CategoryIcon from '@material-ui/icons/Category';
import ClassIcon from '@material-ui/icons/Class';
import CodeIcon from '@material-ui/icons/Code';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Divider from '@material-ui/core/Divider';

export default function GraficoVentasProducto(props) {

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>Info del producto</Typography>

      {props.isLoading && <LoadingData message="Obteniendo info del producto..." />}
      {props.infoProducto === null && !props.isLoading && <Alert severity="info" style={{ height: '100%'}}>No se encontró información del producto seleccionado.</Alert>}
      {props.infoProducto !== null && !props.isLoading &&
        <div>
          <List>
          <ListItem style={{ padding: 0 }}>
              <ListItemAvatar>
                <Avatar>
                  <CategoryIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Categoría" secondary={props.infoProducto?.rubro ?? '-'} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem style={{ padding: 0 }}>
              <ListItemAvatar>
                <Avatar>
                  <ClassIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Marca" secondary={props.infoProducto?.marca?.toUpperCase() ?? '-'} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem style={{ padding: 0 }}>
              <ListItemAvatar>
                <Avatar>
                  <AssignmentIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Nombre" secondary={props.infoProducto?.nombre ?? '-'} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem style={{ padding: 0 }}>
              <ListItemAvatar>
                <Avatar>
                  <CodeIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Código" secondary={props.infoProducto?.codigo ?? '-'} />
            </ListItem>
          </List>
        </div>
      }
    </React.Fragment>
  );
}
