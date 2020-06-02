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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const ddlMedioNotificacionOptions = [
  { value: '1', text: 'Email' },
  { value: '2', text: 'SMS' }
]

const ddlCategoriaOptions = [
  { value: '', text: 'TODOS' },
  { value: '1', text: 'Lácteos' },
  { value: '2', text: 'Limpieza' },
  { value: '3', text: 'Golosinas' },
]

const ddlModificadorCriterioPersonalizadoOptions = [
  { value: '1', text: 'Mayor o igual' },
  { value: '2', text: 'Menor o igual' }
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
              {props.modalABM === 'A' && <span>Alta de Notificación</span>}
              {props.modalABM === 'B' && <span>Baja de Notificación</span>}
              {props.modalABM === 'M' && <span>Edición de Notificación</span>}
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
                      id="descripcionABMNotificacion"
                      label="Descripcion"
                      defaultValue={props.notificacion?.descripcion}
                      onChange={(e) => props.handleDescripcionChange(e.target?.value)}
                      variant="outlined"
                      fullWidth
                      required
                      error={!props.validations.descripcionIsValid}
                      helperText={!props.validations.descripcionIsValid ? "La descripción es requerida" : ""}
                    />
                  </Grid>
                  <Grid item xl={12} lg={12} md={12} xs={12}>
                    <FormControl 
                      variant="outlined" 
                      className={classes.formControl} 
                      fullWidth
                      error={!props.validations.id_CategoriaIsValid}>
                      <InputLabel id="categoria-ddl-lable">Categoría</InputLabel>
                      <Select
                        labelId="categoria-ddl-lable"
                        id="categoria-ddl"
                        value={props.notificacion?.id_categoria ?? ''}
                        onChange={(e) => props.handleCategoriaChange(e.target?.value)}
                        label="Categoría">

                        {ddlCategoriaOptions.map((categoria, index) => (
                          <MenuItem key={"ddl-categoria-" + index} value={categoria.value}>{categoria.text}</MenuItem>
                        ))}

                      </Select>

                      {!props.validations.id_CategoriaIsValid && <FormHelperText>Debe seleccionar una Categoría.</FormHelperText> }

                    </FormControl>
                  </Grid>
                <Grid item xl={12} lg={12} md={12} xs={12}>
                    <FormControl 
                      variant="outlined" 
                      className={classes.formControl} 
                      fullWidth
                      error={!props.validations.id_MedioNotificacionIsValid}>
                      <InputLabel id="medio-notificacion-ddl-lable">Medio de Notificación</InputLabel>
                      <Select
                        labelId="medio-notificacion-ddl-lable"
                        id="medio-notificacion-ddl"
                        value={props.notificacion?.id_medio_notificacion ?? ''}
                        onChange={(e) => props.handleMedioNotificacionChange(e.target?.value)}
                        label="Medio Notificación">

                        {ddlMedioNotificacionOptions.map((medioNotificacion, index) => (
                          <MenuItem key={"ddl-medio-notificacion-" + index} value={medioNotificacion.value}>{medioNotificacion.text}</MenuItem>
                        ))}

                      </Select>

                      {!props.validations.id_MedioNotificacionIsValid && <FormHelperText>Debe seleccionar un Medio de Notificación.</FormHelperText> }

                    </FormControl>
                  </Grid>

              <Grid item xl={12} lg={12} md={12} xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Criterios de notificación </FormLabel>
                  <RadioGroup aria-label="criterios-noti" name="criterios"
                    onChange={(e) => props.handleOpcionCriterioPersonalizado(e.target?.value)}

                  >
                    <FormControlLabel value="criterio01" control={<Radio />} label="Delta de 10% en los últimos 2 días, ventana de 15 días" />
                    <FormControlLabel value="criterio02" control={<Radio />} label="Delta de 15% en los últimos 4 días, ventana de 20 días" />
                    <FormControlLabel value="criterio03" control={<Radio />} label="Personalizada" />
                  </RadioGroup>
                </FormControl>
                <form className={classes.root} noValidate autoComplete="off">


                  <TextField
                    disabled={!props.validations.OpcionCriterioPersonalizado}
                    type="number"
                    defaultValue="2"
                    variant="outlined"
                    id="standard-basic"
                    label="Días de observación" />

                  <Select
                    labelId="modificador-criterio03-label"
                    id="modificador-criterio03"
                    disabled={!props.validations.OpcionCriterioPersonalizado}
                    value={props.notificacion?.modificador_criterio03 ?? ''}
                    onChange={(e) => props.handleCriterioNotificacionChange(e.target?.value)}
                    label="CriterioPersonalizado"
                    variant="outlined"
                    value="1"
                  >

                    {ddlModificadorCriterioPersonalizadoOptions.map((modificador, index) => (
                      <MenuItem key={"ddl-modificador-" + index} value={modificador.value}>{modificador.text}</MenuItem>
                    ))}

                  </Select>

                  <TextField
                    disabled={!props.validations.OpcionCriterioPersonalizado}
                    id="Cantidad-basic"
                    label="Cantidad de productos"
                    variant="outlined"
                    defaultValue="350"
                    type="number" />
                </form>
              </Grid>

                </Grid>
              }
              {props.modalABM === 'B' &&
                <p>¿Está seguro de que desea eliminar la configuración no notificaciones '{props.notificacion?.descripcion}'?</p>}
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


