import React from "react";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import { Container } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import MessageModal from '../Common/MessageModal';
import LoadingData from '../Common/LoadingData';
import { createModificarUsuario } from '../../Axios/Axios';
import auth from "../../ProtectedRoutes/auth";

const ButtonContainer = styled(Container)({
  textAlign: 'center',
  marginTop: '20px',
  padding: 0
});

const GuardarButton = styled(Button)({
  'border-radius': '0.2rem !important',
  '& span': {
    padding: '5px !important',
    fontSize: '18px'
  }
});

export default function TabPerfil(props) {

  const [email, setEmail] = React.useState(null);
  const [telefono, setTelefono] = React.useState(null);
  const [isSaving, setIsSaving] = React.useState(false);
  const [validations, setValidations] = React.useState({
    emailIsValid: true,
    telIsValid: true
  });

  const [messageModal, setMessageModal] = React.useState({
    isOpen: false,
    severity: "success",
    title: "Actualización de Mis Datos Exitosa",
    message: "Los datos del usuario fueron actualizados correctamente"
  });

  const handleEmailChange = (value) => { 

    setValidations(prevState => ({
      ...prevState,
      emailIsValid: true
    }));

    setEmail(value);
  };

  const handleTelefonoChange = (value) => { 

    setValidations(prevState => ({
      ...prevState,
      telIsValid: true
    }));

    setTelefono(value);
  };

  const limpiarValidaciones = () => {
    setValidations({
      emailIsValid: true,
      telIsValid: true
    });
  }

  const handleGuardar = () => {

    var emailIsValid = true;
    var telIsValid = true;
    
    if(telefono === null || telefono === undefined){
      setTelefono(props.data.tel);
    }else{
      telIsValid = telefono !== "";
    }

    if(email === null || email === undefined){
      setEmail(props.data.email);
    }else{
      emailIsValid = email !== "";
    }
    
    //Si hay alguna propiedad invalida se actualiza el estado con la validación de cada propiedad
    if (!emailIsValid || !telIsValid) {

      setValidations(prevState => ({
        ...prevState,
        emailIsValid: emailIsValid,
        telIsValid: telIsValid
      }));

    } else {

      setIsSaving(true);

      var request = {
        ...props.data,
        idUsuario: auth.getIdUsuario(),
        tel: telefono ?? props.data.tel,
        email: email ?? props.data.email
      }

      createModificarUsuario(request)
        .then((response) => { onGuardarResponseOk(response); })
        .catch(error => { onGuardarResponseError(error) });
    }
  }

  const onGuardarResponseOk = (response) => {

    setMessageModal({
      isOpen: true,
      severity: "success", //success | error | warning | info
      title: "¡Actualización de Mis Datos exitosa!",
      message: "Los datos del usuario fueron actualizados correctamente."
    });

    props.recargarMisDatosEvent(() => {
      setIsSaving(false);
      limpiarValidaciones();
    }, () => {
      setIsSaving(false);
      limpiarValidaciones();
    });
  }

  const onGuardarResponseError = (error) => {
    setMessageModal({
      isOpen: true,
      severity: "error",
      title: 'Actualización de Mis Datos errónea',
      message: "Oops! Ocurrió un error al actualizar tus datos."
    });
  }

  const handleCerrarMessageModal = () => { setMessageModal({ isOpen: false }); }

  return (
    <div>

      {props.data != null && !props.isLoading &&

        <div>

          <Typography variant="h4" gutterBottom align="left" style={{ marginBottom: '20px' }}>
            Mis datos
        </Typography>

          <Grid container spacing={3}>
            <Grid item lg={8} xs={12}>
              <TextField
                id="nombre"
                label="Nombre"
                defaultValue={props.data.apellido + ', ' + props.data.nombre}
                InputProps={{ readOnly: true }}
                variant="outlined"
                fullWidth
                disabled />
            </Grid>
            <Grid item lg={4} xs={12}>
              <TextField
                id="rol"
                label="Rol"
                defaultValue={props.data.rol}
                InputProps={{ readOnly: true }}
                variant="outlined"
                fullWidth
                disabled />
            </Grid>
            <Grid item lg={12} xs={12}>
              <TextField
                id="comercio"
                label="Comercio"
                defaultValue={props.data?.cliente?.nombre ?? '-'}
                InputProps={{ readOnly: true }}
                variant="outlined"
                fullWidth
                disabled />
            </Grid>
            <Grid item lg={8} xs={12}>
              <TextField
                id="email"
                label="Email"
                defaultValue={props.data.email}
                variant="outlined"
                fullWidth
                onChange={(e) => handleEmailChange(e.target?.value)}
                error={!validations.emailIsValid}
                helperText={!validations.emailIsValid ? "El email es requerido" : ""}
              />
            </Grid>
            <Grid item lg={4} xs={12}>
              <TextField
                id="tel"
                label="Tel."
                defaultValue={props.data.tel}
                variant="outlined"
                fullWidth
                onChange={(e) => handleTelefonoChange(e.target?.value)}
                error={!validations.telIsValid}
                helperText={!validations.telIsValid ? "El teléfono es requerido" : ""}
              />
            </Grid>
          </Grid>

          <ButtonContainer maxWidth="lg">
            {!isSaving && <GuardarButton variant="contained" color="secondary" fullWidth onClick={handleGuardar}>Guardar</GuardarButton>}
            {isSaving && <GuardarButton variant="contained" color="secondary" fullWidth disabled> <CircularProgress size={18} color="secondary" style={{ marginRight: '10px' }} /> Guardando...</GuardarButton>}
          </ButtonContainer>

          <MessageModal
            messageModal={messageModal}
            handleCerrar={handleCerrarMessageModal}
          />

        </div>
      }

      {props.isLoading && <LoadingData message="Cargando tus datos..." message2="Aguarde por favor." />}

    </div>
  );
}
