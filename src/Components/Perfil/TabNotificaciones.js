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
import MessageModal from '../Common/MessageModal';
import PaginationActions from '../Common/PaginationActions';

const ButtonNuevoContainer = styled(Container)({
  textAlign: 'right',
  padding: 0
});

const NuevoButton = styled(Button)({
  'border-radius': '0.2rem !important',
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

  const [notificacion, setNotificacion] = React.useState(null);
  const [validations, setValidations] = React.useState({
      descripcionIsValid: true,
      id_CategoriaIsValid: true,
      id_MedioNotificacionIsValid: true
  });
  const [messageModal, setMessageModal] = React.useState({
    isOpen: false,
    severity: "success", //success | error | warning | info
      title: "¡Alta de usuario exitosa!",
      message: "El usuario fue dado de alta correctamente."
  });

  const rowsPerPage = 5;
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.data.notificaciones.length - page * rowsPerPage);
  var notificacionesPaginado = props.data.notificaciones.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleAlta = () => {
    setIsModalOpen(true);
    setModalABM('A');
    setNotificacion({ id_Usuario: 1 });
  };

  const handleEdicion = (notificacion) => {
    setIsModalOpen(true);
    setModalABM('M');
    setNotificacion(notificacion);
  };

  const handleBaja = (notificacion) => {
    setIsModalOpen(true);
    setModalABM('B');
    setNotificacion(notificacion);
  };

  const handleMedioNotificacionChange = (value) => {

    setValidations(prevState => ({
      ...prevState,
      id_MedioNotifiacionIsValid: true
    }));

    setNotificacion(prevState => ({
      ...prevState,
      id_medio_notificacion: value
    }));
  };

  const handleCategoriaChange = (value) => {

    setValidations(prevState => ({
      ...prevState,
      id_CategoriaIsValid: true
    }));

    setNotificacion(prevState => ({
      ...prevState,
      id_categoria: value
    }));
  };

  const handleDescripcionChange = (value) => {

    setValidations(prevState => ({
      ...prevState,
      descripcionIsValid: true
    }));

    setNotificacion(prevState => ({
      ...prevState,
      descripcion: value
    }));
  }

  const cerrarFormulario = () => {
    setNotificacion(null);
    setIsModalOpen(false);
    setModalABM('A');
  }

  const limpiarValidaciones = () => {
    setValidations({
      descripcionIsValid: true,
      id_CategoriaIsValid: true,
      id_MedioNotificacionIsValid: true
    });
  }

  const handleGuardar = () => {

    console.log(notificacion);

    //Se validan todas las propiedades
    var descripcionIsValid = notificacion.descripcion !== undefined && notificacion.descripcion !== null && notificacion.descripcion !== "";
    var id_CategoriaIsValid = notificacion.id_categoria !== undefined && notificacion.id_categoria !== null && notificacion.id_categoria !== "";
    var id_MedioNotificacionIsValid = notificacion.id_medio_notificacion !== undefined && notificacion.id_medio_notificacion !== null && notificacion.id_medio_notificacion !== "";

    //Si hay alguna propiedad invalida se actualiza el estado con la validación de cada propiedad
    if (!descripcionIsValid || !id_CategoriaIsValid || !id_MedioNotificacionIsValid) {

      setValidations(prevState => ({
        ...prevState,
        descripcionIsValid: descripcionIsValid,
        id_CategoriaIsValid: id_CategoriaIsValid,
        id_MedioNotificacionIsValid: id_MedioNotificacionIsValid,
      }));

    } else {

      console.log(notificacion);

      setIsSaving(true);

      if (modalABM === 'A') {
        //Llamada a la API para dar de alta
        console.log('Request ALTA Notificacion:');
      } else if (modalABM === 'M') {
        //Llamada a la API para dar de editar
        console.log('Request EDICION Notificacion:');
      }

      console.log(notificacion);

      setTimeout(() => {

        setIsSaving(false);

        setMessageModal({
          isOpen: true,
          severity: "success", //success | error | warning | info
          title: modalABM === 'A' ? "¡Alta de notificacion exitosa!" : "¡Edición de usuario exitosa!",
          message: modalABM === 'A' ? "La configuración  de notificaciones fue dada de alta correctamente." : "La configuración de notificaciones fue actualizada correctamente."
        });

        console.log('Response ALTA/EDICION Notificacion:');
        console.log(notificacion);

        //LLamada a la API para recargar el listado de usuarios

        limpiarValidaciones();
        cerrarFormulario();
      }, 2000);
    }
  }

  const handleEliminar = () => {

    console.log('Request BAJA Notificacion:');
    console.log(notificacion);

    setIsSaving(true);

    //Llamada a la API para dar de eliminar

    setTimeout(() => {

      setIsSaving(false);

      setMessageModal({
        isOpen: true,
        severity: "success", //success | error | warning | info
        title: "¡Baja de notificación exitosa!",
        message: "La configuración de notificaciones fue eliminada correctamente."
      });

      console.log('Response BAJA Usuario:');
      console.log(notificacion);

      //LLamada a la API para recargar el listado de usuarios

      limpiarValidaciones();
      cerrarFormulario();
    }, 2000);
  }

  const handleCerrar = () => {
    limpiarValidaciones();
    cerrarFormulario();
  };

  const handleCerrarMessageModal = () => {
    setMessageModal({
      isOpen: false,
      severity: "success", //success | error | warning | info
      title: "¡Alta de usuario exitosa!",
      message: "El usuario fue dado de alta correctamente."
    });
  }

  return (
    <div>

      <Typography variant="h4" gutterBottom align="left" style={{ marginBottom: '20px' }}>
      Adm. de Notificaciones
      </Typography>

      <ButtonNuevoContainer maxWidth="lg">
        <NuevoButton variant="contained" color="primary" onClick={handleAlta}>Nuevo</NuevoButton>
      </ButtonNuevoContainer>

      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Descripción</StyledTableCell>
              <StyledTableCell>Categoría</StyledTableCell>
              <StyledTableCell>M. Notificación</StyledTableCell>
              <StyledTableCell>P. Notificación</StyledTableCell>
              <StyledTableCell align="center">Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notificacionesPaginado.map((notificacion) => (
              <StyledTableRow key={notificacion.id}>
              <StyledTableCell>{notificacion.descripcion ? notificacion.descripcion : '-'}</StyledTableCell>
                <StyledTableCell>{notificacion.categoria ? notificacion.categoria : '-'}</StyledTableCell>
                <StyledTableCell>{notificacion.medio_notifiacion ? notificacion.medio_notifiacion : '-'}</StyledTableCell>
                <StyledTableCell>{notificacion.parametro_notifiacion ? notificacion.parametro_notifiacion : '-'}</StyledTableCell>
                <StyledTableCell align="center">
                  <EditIcon onClick={() => handleEdicion(notificacion)} variant="contained" style={{ margin: '0 5px', cursor: 'pointer' }} />
                  <DeleteIcon onClick={() => handleBaja(notificacion)} style={{ margin: '0 5px', cursor: 'pointer' }} />
                </StyledTableCell>
              </StyledTableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={5} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={5}
                count={props.data.notificaciones.length}
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

      <ModalNotificacion
        isOpen={isModalOpen}
        modalABM={modalABM}
        isSaving={isSaving}
        notificacion={notificacion}
        validations={validations}
        handleGuardar={handleGuardar}
        handleEliminar={handleEliminar}
        handleCerrar={handleCerrar}
        handleCategoriaChange={handleCategoriaChange}
        handleMedioNotificacionChange={handleMedioNotificacionChange}
        handleDescripcionChange={handleDescripcionChange}
      />

      <MessageModal
        messageModal={messageModal}
        handleCerrar={handleCerrarMessageModal}
      />

    </div>
  );
}
