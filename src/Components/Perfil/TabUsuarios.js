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
import ModalUsuario from "./Usuarios/ModalUsuario";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MessageModal from '../Common/MessageModal';
import { createNuevoUsuario, createModificarUsuario, getListadoUsuarios } from '../../Axios/Axios';
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

export default function TabUsuarios(props) {

  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalABM, setModalABM] = React.useState('');
  const [isSaving, setIsSaving] = React.useState(false);
  const [usuario, setUsuario] = React.useState(null);
  const [validations, setValidations] = React.useState({
    nombreIsValid: true,
    apellidoIsValid: true,
    emailIsValid: true,
    telIsValid: true,
    rolIsValid: true,
  });
  const [messageModal, setMessageModal] = React.useState({
    isOpen: false,
    severity: "success", //success | error | warning | info
    title: "¡Alta de usuario exitosa!",
    message: "El usuario fue dado de alta correctamente."
  });

  const rowsPerPage = 5;
  const emptyRows = props.data?.usuarios != null ? rowsPerPage - Math.min(rowsPerPage, props.data.usuarios.length - page * rowsPerPage) : rowsPerPage;
  var usuariosPaginado = props.data?.usuarios?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleAlta = () => {
    setIsModalOpen(true);
    setModalABM('A');
    setUsuario({ idCliente: '111', rol: 'Usuario' });
  };

  const handleEdicion = (usuario) => {
    setIsModalOpen(true);
    setModalABM('M');
    setUsuario(usuario);
  };

  const handleBaja = (usuario) => {
    setIsModalOpen(true);
    setModalABM('B');
    setUsuario(usuario);
  };

  const handleRolChange = (value) => {

    setValidations(prevState => ({
      ...prevState,
      rolIsValid: true
    }));

    setUsuario(prevState => ({
      ...prevState,
      rol: value
    }));
  };

  const handleNombreChange = (value) => {

    setValidations(prevState => ({
      ...prevState,
      nombreIsValid: true
    }));

    setUsuario(prevState => ({
      ...prevState,
      nombre: value
    }));
  }

  const handleApellidoChange = (value) => {

    setValidations(prevState => ({
      ...prevState,
      apellidoIsValid: true
    }));

    setUsuario(prevState => ({
      ...prevState,
      apellido: value
    }));
  }

  const handleEmailChange = (value) => {

    setValidations(prevState => ({
      ...prevState,
      emailIsValid: true
    }));

    setUsuario(prevState => ({
      ...prevState,
      email: value
    }));
  }

  const handleTelefonoChange = (value) => {

    setValidations(prevState => ({
      ...prevState,
      telIsValid: true
    }));

    setUsuario(prevState => ({
      ...prevState,
      tel: value
    }));
  }

  const cerrarFormulario = () => {
    setUsuario(null);
    setIsModalOpen(false);
    setModalABM('A');
  }

  const limpiarValidaciones = () => {
    setValidations({
      nombreIsValid: true,
      apellidoIsValid: true,
      emailIsValid: true,
      telIsValid: true,
      rolIsValid: true,
    });
  }

  const handleGuardar = () => {

    //Se validan todas las propiedades
    var nombreIsValid = usuario.nombre !== undefined && usuario.nombre !== null && usuario.nombre !== "";
    var apellidoIsValid = usuario.apellido !== undefined && usuario.apellido !== null && usuario.apellido !== "";
    var emailIsValid = usuario.email !== undefined && usuario.email !== null && usuario.email !== "";
    var telIsValid = usuario.tel !== undefined && usuario.tel !== null && usuario.tel !== "";
    var rolIsValid = usuario.rol !== undefined && usuario.rol !== null && usuario.rol !== "";

    //Si hay alguna propiedad invalida se actualiza el estado con la validación de cada propiedad
    if (!nombreIsValid || !apellidoIsValid || !emailIsValid || !telIsValid || !rolIsValid) {

      setValidations(prevState => ({
        ...prevState,
        nombreIsValid: nombreIsValid,
        apellidoIsValid: apellidoIsValid,
        emailIsValid: emailIsValid,
        telIsValid: telIsValid,
        rolIsValid: rolIsValid,
      }));

      //Si la validación es correcta (ó si es una Baja) se llama al método correspondiente de la API
    } else {

      setIsSaving(true);

      console.log('Request ' + (modalABM === 'A' ? + 'ALTA' : 'EDICIÓN') + ' Usuario:');
      console.log(usuario);

      if (modalABM === 'A') {

        createNuevoUsuario(usuario)
          .then((response) => { onGuardarResponseOk(response) })
          .catch(error => { onGuardarResponseError(error) });

      } else if (modalABM === 'M') {

        createModificarUsuario({ ...usuario, idUsuario: usuario.id })
          .then((response) => { onGuardarResponseOk(response); })
          .catch(error => { onGuardarResponseError(error) });
      }
    }
  }

  const onGuardarResponseOk = (response) => {

    console.log('Response ' + (modalABM === 'A' ? + 'ALTA' : 'EDICIÓN') + ' Usuario:');
    console.log(response);

    setMessageModal({
      isOpen: true,
      severity: "success",
      title: '¡' + (modalABM === 'A' ? + 'Alta' : 'Edición') + ' de usuario exitosa!',
      message: modalABM === 'A' ? "El usuario fue dado de alta correctamente." : "El usuario fue actualizado correctamente."
    });

    props.recargarListadoUsuariosEvent(() => {
      setIsSaving(false);
      limpiarValidaciones();
      cerrarFormulario();
    });
  }

  const onGuardarResponseError = (error) => {

    console.log('Response ' + (modalABM === 'A' ? + 'ALTA' : 'EDICIÓN') + ' Usuario:');
    console.log(error);

    setMessageModal({
      isOpen: true,
      severity: "error",
      title: (modalABM === 'A' ? + 'Alta' : 'Edición') + " de usuario errónea :(",
      message: "Oops! Ocurrió un error al " + (modalABM === 'A' ? + 'dar de alta' : 'editar') + " el usuario."
    });
  }

  const handleEliminar = () => {

    console.log('Request BAJA Usuario:');
    console.log(usuario);

    setIsSaving(true);

    //Llamada a la API para dar de eliminar

    setTimeout(() => {

      setIsSaving(false);

      setMessageModal({
        isOpen: true,
        severity: "success",
        title: "¡Baja de usuario exitosa!",
        message: "El usuario fue eliminado correctamente."
      });

      console.log('Response BAJA Usuario:');
      console.log(usuario);

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
    setMessageModal({ isOpen: false });
  }

  return (
    <div>

      { props.data?.usuarios != null &&

        <div>
          <Typography variant="h4" gutterBottom align="left" style={{ marginBottom: '20px' }}>
            Adm. de Usuarios
      </Typography>

          <ButtonNuevoContainer maxWidth="lg">
            <NuevoButton variant="contained" color="primary" onClick={handleAlta}>Nuevo</NuevoButton>
          </ButtonNuevoContainer>

          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Nombre</StyledTableCell>
                  <StyledTableCell align="center">Rol</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell align="center">Tel.</StyledTableCell>
                  <StyledTableCell align="center">Acciones</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usuariosPaginado.map((usuario) => (
                  <StyledTableRow key={usuario.id}>
                    <StyledTableCell>{usuario.apellido && usuario.nombre ? usuario.apellido + ', ' + usuario.nombre : '-'}</StyledTableCell>
                    <StyledTableCell align="center">{usuario.rol ? usuario.rol : '-'}</StyledTableCell>
                    <StyledTableCell>{usuario.email ? usuario.email : '-'}</StyledTableCell>
                    <StyledTableCell align="center">{usuario.tel ? usuario.tel : '-'}</StyledTableCell>
                    <StyledTableCell align="center">
                      <EditIcon onClick={() => handleEdicion(usuario)} variant="contained" style={{ margin: '0 5px', cursor: 'pointer' }} />
                      <DeleteIcon onClick={() => handleBaja(usuario)} style={{ margin: '0 5px', cursor: 'pointer' }} />
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
                    count={props.data.usuarios.length}
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

          <ModalUsuario
            isOpen={isModalOpen}
            modalABM={modalABM}
            isSaving={isSaving}
            usuario={usuario}
            validations={validations}
            handleGuardar={handleGuardar}
            handleEliminar={handleEliminar}
            handleCerrar={handleCerrar}
            handleNombreChange={handleNombreChange}
            handleApellidoChange={handleApellidoChange}
            handleEmailChange={handleEmailChange}
            handleTelefonoChange={handleTelefonoChange}
            handleRolChange={handleRolChange}
          />

          <MessageModal
            messageModal={messageModal}
            handleCerrar={handleCerrarMessageModal}
          />

        </div>

      }

    </div>
  );
}
