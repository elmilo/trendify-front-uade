import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const ddlRolOptions = [
  { value: '2', text: 'Usuario' },
  { value: '1', text: 'Administrador' }
]

export default function ModalUsuario(props) {
  
  const classes = useStyles();

  return (

    <div>

      {props.isOpen &&

        <Dialog
          open={props.isOpen}
          onClose={props.handleCerrar}
          disableBackdropClick
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <MuiDialogTitle disableTypography id="alert-dialog-title">
            <Typography variant="h6">
              {props.modalABM === 'A' && <span>Alta de Usuario</span>}
              {props.modalABM === 'B' && <span>Baja de Usuario</span>}
              {props.modalABM === 'M' && <span>Edición de Usuario</span>}
            </Typography>
            <IconButton aria-label="close" className={classes.closeButton} onClick={props.handleCerrar}>
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <DialogContent dividers>
            <form className={classes.root} autoComplete="off">
              {(props.modalABM === 'A' || props.modalABM === 'M') &&
                <Grid container spacing={3}>
                  <Grid item xl={12} lg={12} md={12} xs={12}>
                    <TextField
                      id="nombreABMUsuario"
                      label="Nombre"
                      defaultValue={props.usuario?.nombre}
                      onChange={(e) => props.handleNombreChange(e.target?.value)}
                      variant="outlined"
                      fullWidth
                      required
                      error={!props.validations.nombreIsValid}
                      helperText={!props.validations.nombreIsValid ? "El nombre es requerido" : ""}
                    />
                  </Grid>
                  <Grid item xl={12} lg={12} md={12} xs={12}>
                    <TextField
                      id="apellidoABMUsuario"
                      label="Apellido"
                      defaultValue={props.usuario?.apellido}
                      onChange={(e) => props.handleApellidoChange(e.target?.value)}
                      variant="outlined"
                      fullWidth
                      required
                      error={!props.validations.apellidoIsValid}
                      helperText={!props.validations.apellidoIsValid ? "El apellido es requerido" : ""}
                    />
                  </Grid>
                  <Grid item xl={12} lg={12} md={12} xs={12}>
                    <FormControl 
                      variant="outlined" 
                      className={classes.formControl} 
                      fullWidth
                      error={!props.validations.id_RolIsValid}>
                      <InputLabel id="rol-ddl-lable">Rol</InputLabel>
                      <Select
                        labelId="rol-ddl-lable"
                        id="rol-ddl"
                        value={props.usuario?.id_rol ?? '2'}
                        onChange={(e) => props.handleRolChange(e.target?.value)}
                        label="Rol">

                        {ddlRolOptions.map((rol, index) => (
                          <MenuItem key={"ddl-rol-" + index} value={rol.value}>{rol.text}</MenuItem>
                        ))}

                      </Select>

                      {!props.validations.id_RolIsValid && <FormHelperText>Debe seleccionar un Rol para el usuario.</FormHelperText> }

                    </FormControl>
                  </Grid>
                  <Grid item xl={12} lg={12} md={12} xs={12}>
                    <TextField
                      id="emailABMUsuario"
                      label="Email"
                      defaultValue={props.usuario?.email}
                      onChange={(e) => props.handleEmailChange(e.target?.value)}
                      variant="outlined"
                      fullWidth
                      required
                      error={!props.validations.emailIsValid}
                      helperText={!props.validations.emailIsValid ? "El email es requerido" : ""}
                    />
                  </Grid>
                  <Grid item xl={12} lg={12} md={12} xs={12}>
                    <TextField
                      id="telABMUsuario"
                      label="Tel."
                      defaultValue={props.usuario?.tel}
                      onChange={(e) => props.handleTelefonoChange(e.target?.value)}
                      variant="outlined"
                      fullWidth
                      required
                      error={!props.validations.telIsValid}
                      helperText={!props.validations.telIsValid  ? "El teléfono es requerido" : ""}
                    />
                  </Grid>
                </Grid>
              }
              {props.modalABM === 'B' &&
                <p>¿Está seguro de que desea eliminar al usuario '{props.usuario?.apellido + ', ' + props.usuario?.nombre}'?</p>}
            </form>
          </DialogContent>
          <DialogActions>
            { props.modalABM !== 'B' && !props.isSaving && <Button variant="contained" color="primary" onClick={ props.handleGuardar }>Guardar</Button> }
            { props.modalABM !== 'B' && props.isSaving && <Button variant="contained" color="default" disabled> <CircularProgress size={18} color="secondary" style={{ marginRight: '10px' }}/>   Guardando...</Button> }
            { props.modalABM === 'B' && !props.isSaving && <Button variant="contained" color="default" onClick={ props.handleEliminar }>Eliminar</Button> }
            { props.modalABM === 'B' && props.isSaving && <Button variant="contained" color="default" disabled> <CircularProgress size={18} color="secondary" style={{ marginRight: '10px' }}/>   Eliminando...</Button> }
          </DialogActions>
        </Dialog>

      }

    </div>
  );
}