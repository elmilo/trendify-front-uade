import React from "react";
import PropTypes from 'prop-types';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
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
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import ModalUsuario from "./Usuarios/ModalUsuario";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

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

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired
};

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
    id_RolIsValid: true,
  });

  const rowsPerPage = 5;
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.data.usuarios.length - page * rowsPerPage);
  var usuariosPaginado = props.data.usuarios.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleAlta = () => {
    setIsModalOpen(true);
    setModalABM('A');
    setUsuario({ id_Cliente: 1, id_rol: '2' });
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
      id_RolIsValid: true
    }));

    setUsuario(prevState => ({
      ...prevState,
      id_rol: value
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
      id_RolIsValid: true,
    });
  }

  const handleGuardar = () => {

    console.log(usuario);

    //Se validan todas las propiedades
    var nombreIsValid = usuario.nombre !== undefined && usuario.nombre !== null && usuario.nombre !== "";
    var apellidoIsValid = usuario.apellido !== undefined && usuario.apellido !== null && usuario.apellido !== "";
    var emailIsValid = usuario.email !== undefined && usuario.email !== null && usuario.email !== "";
    var telIsValid = usuario.tel !== undefined && usuario.tel !== null && usuario.tel !== "";
    var id_RolIsValid = usuario.id_rol !== undefined && usuario.id_rol !== null && usuario.id_rol !== "";

    //Si hay alguna propiedad invalida se actualiza el estado con la validación de cada propiedad
    if (!nombreIsValid || !apellidoIsValid || !emailIsValid || !telIsValid || !id_RolIsValid) {

      setValidations(prevState => ({
        ...prevState,
        nombreIsValid: nombreIsValid,
        apellidoIsValid: apellidoIsValid,
        emailIsValid: emailIsValid,
        telIsValid: telIsValid,
        id_RolIsValid: id_RolIsValid,
      }));

      //Si la validación es correcta (ó si es una Baja) se llama al método correspondiente de la API
    } else {

      console.log(usuario);

      setIsSaving(true);

      if (modalABM === 'A') {
        //Llamada a la API para dar de alta
      } else if (modalABM === 'M') {
        //Llamada a la API para dar de editar
      }

      setTimeout(() => {

        setIsSaving(false);

        //LLamada a la API para recargar el listado de usuarios

        limpiarValidaciones();
        cerrarFormulario();
      }, 2000);
    }
  }

  const handleEliminar = () => {

    console.log(usuario);

    setIsSaving(true);

    if (modalABM === 'B') {
      //Llamada a la API para dar de eliminar
    }

    setTimeout(() => {

      setIsSaving(false);

      //LLamada a la API para recargar el listado de usuarios

      limpiarValidaciones();
      cerrarFormulario();
    }, 2000);
  }

  const handleCerrar = () => {
    limpiarValidaciones();
    cerrarFormulario();
  };

  return (
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
                  <EditIcon onClick={() => handleEdicion(usuario)} variant="contained" style={{margin: '0 5px', cursor: 'pointer'}} />
                  <DeleteIcon onClick={() => handleBaja(usuario)} style={{margin: '0 5px', cursor: 'pointer'}} />
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
                ActionsComponent={TablePaginationActions}
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

    </div>
  );
}
