import React from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Container } from "@material-ui/core";
import { styled } from '@material-ui/core/styles';
import ModalNotificacion from "./Notificaciones/ModalNotificacion";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';
import MessageModal from '../Common/MessageModal';
import PaginationActions from '../Common/PaginationActions';
import LoadingData from '../Common/LoadingData';
import Alert from '@material-ui/lab/Alert';
import { getCategorias, createNotificacion, modificarNotificacion, eliminarNotificacion, enviarNotificacion, procesarNotificaciones } from '../../Axios/Axios';
import auth from '../../ProtectedRoutes/auth';

const ButtonsContainer = styled(Container)({
  textAlign: 'right',
  padding: 0  
});

const NuevoButton = styled(Button)({
  'border-radius': '0.2rem !important',
   margin: '0 5px'
});

const ProcesarButton = styled(Button)({
  'border-radius': '0.2rem !important',
   margin: '0 5px'
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  tableContainer: {
    margin: '20px 0 0 0'
  },
  table: {
    minWidth: 700
  },
});

export default function TabNotificaciones(props) {

  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalABM, setModalABM] = React.useState('');
  const [isSaving, setIsSaving] = React.useState(false);
  const [isLoadingCategorias, setIsLoadingCategorias] = React.useState(false);
  const [categorias, setCategorias] = React.useState(null);

  const [notificacion, setNotificacion] = React.useState(null);
  const [validations, setValidations] = React.useState({
    descripcionIsValid: true,
    categoriaIsValid: true,
    medioNotificacionIsValid: true,
    deltaIsValid: true,
    ultimosDiasIsValid: true,
    ventanaIsValid: true
  });
  const [messageModal, setMessageModal] = React.useState({
    isOpen: false,
    severity: "success", //success | error | warning | info
    title: " de usuario exitosa!",
    message: "El usuario fue dado de alta correctamente."
  });

  const rowsPerPage = 5;
  const emptyRows = props.data != null ? rowsPerPage - Math.min(rowsPerPage, props.data.length - page * rowsPerPage) : rowsPerPage;
  var notificacionesPaginado = props.data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const recargarCategorias = (onSuccessCallback, onErrorCallback) => {

    setIsLoadingCategorias(true);

    getCategorias()
      .then((response) => {
        setCategorias(response);
        setIsLoadingCategorias(false);
        if (onSuccessCallback)
          onSuccessCallback();
      })
      .catch(error => {
        setIsLoadingCategorias(false);
        if (onErrorCallback)
          onErrorCallback();
      });
  }

  if (categorias === null && !isLoadingCategorias) {
    recargarCategorias();
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleABM = (method, notificacion) => {
    setIsModalOpen(true);
    setModalABM(method);
    setNotificacion(notificacion);
  };

  const handleAlta = () => {
    handleABM('A', {
      idUsuario: auth.getIdUsuario(),
      criterioNotificacion: 'criterio01',
      delta: 10,
      ultimosDias: 2,
      ventana: 15
    });
  }

  const handleEdicion = (notificacion) => {
    handleABM('M', notificacion);

    setValidations(prevState => ({
      ...prevState,
      esCriterioPersonalizado: notificacion.id_criterioNotificacion === 'criterio03'
    }));

    if (notificacion.delta === 10 && notificacion.ultimosDias === 2 && notificacion.ventana === 15) {

      setValidations(prevState => ({
        ...prevState,
        esCriterioPersonalizado: false
      }));

      setNotificacion(prevState => ({
        ...prevState,
        criterioNotificacion: 'criterio01'
      }));

    } else if (notificacion.delta === 15 && notificacion.ultimosDias === 4 && notificacion.ventana === 20) {
      
      setValidations(prevState => ({
        ...prevState,
        esCriterioPersonalizado: false
      }));

      setNotificacion(prevState => ({
        ...prevState,
        criterioNotificacion: 'criterio02'
      }));

    } else {
      
      setValidations(prevState => ({
        ...prevState,
        esCriterioPersonalizado: true
      }));

      setNotificacion(prevState => ({
        ...prevState,
        criterioNotificacion: 'criterio03'
      }));
    }
  }

  const handleBaja = (notificacion) => { handleABM('B', notificacion); }

  const setFormInputChange = (prop, value, isValidProp) => {

    if (isValidProp) {
      setValidations(prevState => ({
        ...prevState,
        [isValidProp]: true
      }));
    }

    setNotificacion(prevState => ({
      ...prevState,
      [prop]: value
    }));
  }

  const handleMedioNotificacionChange = (value) => { setFormInputChange('medio', value, 'medioNotificacionIsValid'); }

  const handleCategoriaChange = (value) => { setFormInputChange('categoria', value, 'categoriaIsValid'); }

  const handleCriterioNotificacionChange = (value) => {

    setFormInputChange('criterioNotificacion', value);

    if (value === 'criterio01') {
      setNotificacion(prevState => ({
        ...prevState,
        delta: 10,
        ultimosDias: 2,
        ventana: 15,
      }));
    } else if (value === 'criterio02') {
      setNotificacion(prevState => ({
        ...prevState,
        delta: 15,
        ultimosDias: 4,
        ventana: 20,
      }));
    } else {
      setNotificacion(prevState => ({
        ...prevState,
        delta: null,
        ultimosDias: null,
        ventana: null,
      }));
    }
  }

  const handleDelta = (value) => { setFormInputChange('delta', value, 'deltaIsValid'); }

  const handleUltimosDias = (value) => { setFormInputChange('ultimosDias', value, 'ultimosDiasIsValid'); }

  const handleVentana = (value) => { setFormInputChange('ventana', value, 'ventanaIsValid'); }

  const handleDescripcionChange = (value) => { setFormInputChange('descripcion', value, 'descripcionIsValid'); }

  const cerrarFormulario = () => {
    setNotificacion(null);
    setIsModalOpen(false);
  }

  const limpiarValidaciones = () => {
    setValidations({
      descripcionIsValid: true,
      categoriaIsValid: true,
      medioNotificacionIsValid: true,
      deltaIsValid: true,
      ultimosDiasIsValid: true,
      ventanaIsValid: true
    });
  }

  const onGuardarResponseOk = (response) => {
    setMessageModal({
      isOpen: true,
      severity: "success", //success | error | warning | info
      title: modalABM === 'A' ? "¡Alta de notificacion exitosa!" : "¡Edición de notificacion exitosa!",
      message: modalABM === 'A' ? "La configuración  de notificaciones fue dada de alta correctamente." : "La configuración de notificaciones fue actualizada correctamente."
    });

    props.recargarListadoNotificacionesEvent(() => {
      setIsSaving(false);
      limpiarValidaciones();
      cerrarFormulario();
    });
  }

  const onGuardarResponseError = (error) => {
    setMessageModal({
      isOpen: true,
      severity: "error",
      title: (modalABM === 'A' ? 'Alta' : 'Edición') + " de notificación errónea :(",
      message: "Oops! Ocurrió un error al " + (modalABM === 'A' ? 'dar de alta' : 'editar') + " la configuración de notificaciones."
    });
  }

  const onEliminarResponseOk = (response) => {
    setMessageModal({
      isOpen: true,
      severity: "success", //success | error | warning | info
      title: "¡Baja de notificación exitosa!",
      message: "La configuración de notificaciones fue eliminada correctamente."
    });

    props.recargarListadoNotificacionesEvent(() => {
      setIsSaving(false);
      cerrarFormulario();
    });
  }

  const onEliminarResponseError = (error) => {
    setMessageModal({
      isOpen: true,
      severity: "error",
      title: "Baja de notificación errónea",
      message: "Oops! Ocurrió un error al eliminar la configuración de notificaciones."
    });
  }

  const onEnviarResponseOk = (response) => {
    setMessageModal({
      isOpen: true,
      severity: "success", //success | error | warning | info
      title: "¡Envío de prueba de notificación exitosa!",
      message: "El envío se realizó correctamente. Verifique que haya recibido el SMS o Email correspondiente."
    });
  }

  const onEnviarResponseError = (error) => {
    setMessageModal({
      isOpen: true,
      severity: "error",
      title: "Envío de prueba de notificación errónea",
      message: "Oops! Ocurrió un error al realizar el envío de la notificación."
    });
  }

  const onProcesarResponseOk = (response) => {
    setMessageModal({
      isOpen: true,
      severity: "success", //success | error | warning | info
      title: "¡Proceso de envío de notificaciones exitoso!",
      message: "El envío de notificaciones se realizó correctamente."
    });
  }

  const onProcesarResponseError = (error) => {
    setMessageModal({
      isOpen: true,
      severity: "error",
      title: "Proceso de envío de notificaciones erróneo",
      message: "Oops! Ocurrió un error al procesar el envío de notificaciones."
    });
  }

  const handleGuardar = () => {

    //Se validan todas las propiedades
    var descripcionIsValid = notificacion.descripcion !== undefined && notificacion.descripcion !== null && notificacion.descripcion !== "";
    var categoriaIsValid = notificacion.categoria !== undefined && notificacion.categoria !== null && notificacion.categoria !== "";
    var medioNotificacionIsValid = notificacion.medio !== undefined && notificacion.medio !== null && notificacion.medio !== "";

    //Si hay alguna propiedad invalida se actualiza el estado con la validación de cada propiedad
    if (!descripcionIsValid || !categoriaIsValid || !medioNotificacionIsValid) {

      setValidations(prevState => ({
        ...prevState,
        descripcionIsValid: descripcionIsValid,
        categoriaIsValid: categoriaIsValid,
        medioNotificacionIsValid: medioNotificacionIsValid,
        deltaIsValid: true,
        ultimosDiasIsValid: true,
        ventanaIsValid: true
      }));

    } else {

      setIsSaving(true);

      if (modalABM === 'A') {

        createNotificacion(notificacion)
          .then((response) => { onGuardarResponseOk(response) })
          .catch(error => { onGuardarResponseError(error) });

      } else if (modalABM === 'M') {

        notificacion.idUsuario = auth.getIdUsuario();
        notificacion.idNotificacion = notificacion.id;

        modificarNotificacion(notificacion)
          .then((response) => { onGuardarResponseOk(response) })
          .catch(error => { onGuardarResponseError(error) });

      }
    }
  }

  const handleEliminar = () => {

    setIsSaving(true);

    eliminarNotificacion(notificacion.id)
      .then((response) => { onEliminarResponseOk(response) })
      .catch(error => { onEliminarResponseError(error) });
  }

  const handleEnviar = (notificacion) => {
    
      setMessageModal({
        isOpen: true,
        isLoading: true,
        title: "¡Enviando prueba de notificación!",
        message: "Por favor, aguarde mientras se realiza el envío..."
      });

      enviarNotificacion({ idUsuario: auth.getIdUsuario(), idNotificacion: notificacion.id })
        .then((response) => { onEnviarResponseOk(response) })
        .catch(error => { onEnviarResponseError(error) });
  }

  const handleProcesar = () => {
    
    setMessageModal({
      isOpen: true,
      isLoading: true,
      title: "¡Procesando envío de notificaciones!",
      message: "Esta acción puede demorar unos minutos, por favor aguarde mientras se realiza el envío..."
    });

    procesarNotificaciones(auth.getIdUsuario())
      .then((response) => { onProcesarResponseOk(response) })
      .catch(error => { onProcesarResponseError(error) });
}

  const handleCerrar = () => {
    limpiarValidaciones();
    cerrarFormulario();
  };

  const handleCerrarMessageModal = () => { setMessageModal({ isOpen: false }); }

  return (
    <div>

      {!props.isLoading &&

        <div>

          <Typography variant="h4" gutterBottom align="left" style={{ marginBottom: '20px' }}>
            Configurar mis notificaciones
        </Typography>

          <ButtonsContainer>
            <ProcesarButton variant="contained" color="secondary" onClick={handleProcesar}>Procesar</ProcesarButton>
            <NuevoButton variant="contained" color="primary" onClick={handleAlta}>Nuevo</NuevoButton>
          </ButtonsContainer>

          {props.data != null &&

            <TableContainer component={Paper} className={classes.tableContainer}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Descripción</StyledTableCell>
                    <StyledTableCell>Categoría</StyledTableCell>
                    <StyledTableCell align="center">Medio</StyledTableCell>
                    <StyledTableCell align="center">Variación (%)</StyledTableCell>
                    <StyledTableCell align="center">Últimos (días)</StyledTableCell>
                    <StyledTableCell align="center">Ventana Obs. (días)</StyledTableCell>
                    <StyledTableCell align="center">Acciones</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {notificacionesPaginado.map((notificacion) => (
                    <StyledTableRow key={notificacion.id}>
                      <StyledTableCell>{notificacion.descripcion ? notificacion.descripcion : '-'}</StyledTableCell>
                      <StyledTableCell>{notificacion.categoria ? notificacion.categoria : '-'}</StyledTableCell>
                      <StyledTableCell align="center">{notificacion.medio ? notificacion.medio : '-'}</StyledTableCell>
                      <StyledTableCell align="center">{notificacion.delta ? notificacion.delta + '%' : '-'}</StyledTableCell>
                      <StyledTableCell align="center">{notificacion.ultimosDias ? notificacion.ultimosDias : '-'}</StyledTableCell>
                      <StyledTableCell align="center">{notificacion.ventana ? notificacion.ventana : '-'}</StyledTableCell>
                      <StyledTableCell align="center">
                        <SendIcon onClick={() => handleEnviar(notificacion)} variant="contained" style={{ margin: '0 5px', cursor: 'pointer' }} />
                        <EditIcon onClick={() => handleEdicion(notificacion)} variant="contained" style={{ margin: '0 5px', cursor: 'pointer' }} />
                        <DeleteIcon onClick={() => handleBaja(notificacion)} style={{ margin: '0 5px', cursor: 'pointer' }} />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}

                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={7} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      colSpan={7}
                      count={props.data.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: { 'aria-label': 'Filas por página' },
                        native: true,
                      }}
                      onChangePage={handleChangePage}
                      rowsPerPageOptions={[rowsPerPage]}
                      ActionsComponent={PaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          }

          {props.data == null && <Alert severity="info" style={{ margin: "20px 0" }}>No se encontraron configuraciones de notificación.</Alert>}

          <ModalNotificacion
            isOpen={isModalOpen}
            modalABM={modalABM}
            isSaving={isSaving}
            notificacion={notificacion}
            categorias={categorias}
            validations={validations}
            handleGuardar={handleGuardar}
            handleEliminar={handleEliminar}
            handleCerrar={handleCerrar}
            handleCategoriaChange={handleCategoriaChange}
            handleMedioNotificacionChange={handleMedioNotificacionChange}
            handleCriterioNotificacionChange={handleCriterioNotificacionChange}
            handleDescripcionChange={handleDescripcionChange}
            handleDelta={handleDelta}
            handleUltimosDias={handleUltimosDias}
            handleVentana={handleVentana}
          />

          <MessageModal
            messageModal={messageModal}
            handleCerrar={handleCerrarMessageModal}
          />

        </div>
      }

      {props.isLoading && <LoadingData message="Cargando configuraciones de notificación..." message2="Aguarde por favor." />}

    </div>
  );
}
