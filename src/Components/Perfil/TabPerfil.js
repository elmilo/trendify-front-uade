import React from "react";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import { Container } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import MessageModal from '../Common/MessageModal';

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

  const [misDatos, setMisDatos] = React.useState(props.misDatos);
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

    setMisDatos(prevState => ({
      ...prevState,
      email: value
    }));
  }

  const handleTelefonoChange = (value) => {

    setValidations(prevState => ({
      ...prevState,
      telIsValid: true
    }));

    setMisDatos(prevState => ({
      ...prevState,
      tel: value
    }));
  }

  const limpiarValidaciones = () => {
    setValidations({
      emailIsValid: true,
      telIsValid: true
    });
  }

  const handleGuardar = () => {

    //Se validan todas las propiedades
    var emailIsValid = misDatos.email !== undefined && misDatos.email !== null && misDatos.email !== "";
    var telIsValid = misDatos.tel !== undefined && misDatos.tel !== null && misDatos.tel !== "";

    //Si hay alguna propiedad invalida se actualiza el estado con la validación de cada propiedad
    if (!emailIsValid || !telIsValid) {

      setValidations(prevState => ({
        ...prevState,
        emailIsValid: emailIsValid,
        telIsValid: telIsValid
      }));

      //Si la validación es correcta (ó si es una Baja) se llama al método correspondiente de la API
    } else {

      setIsSaving(true);

      console.log('Request GUARDAR MIS DATOS:');
      console.log(misDatos);

      //Llamada a la API para dar guardar 'Mis Datos'

      setTimeout(() => {

        console.log('Response GUARDAR MIS DATOS:');
        console.log(misDatos);
        
        setMessageModal({
          isOpen: true,
          severity: "success", //success | error | warning | info
          title: "Actualización de Mis Datos Exitosa",
          message: "Los datos del usuario fueron actualizados correctamente"
        });

        setIsSaving(false);

        //LLamada a la API para recargar el listado de usuarios

        limpiarValidaciones();
      }, 2000);
    }
  }

  const handleCerrarMessageModal = () => {
    setMessageModal({
      isOpen: false,
      severity: "success", //success | error | warning | info
      title: "Actualización de Mis Datos Exitosa",
      message: "Los datos del usuario fueron actualizados correctamente"
    });
  }

  return (
    <div>

      <Typography variant="h4" gutterBottom align="left" style={{ marginBottom: '20px' }}>
        Mis datos
      </Typography>

      <Grid container spacing={3}>
        <Grid item lg={8} xs={12}>
          <TextField
            id="nombre"
            label="Nombre"
            defaultValue={misDatos.nombre}
            InputProps={{ readOnly: true }}
            variant="outlined"
            fullWidth
            disabled />
        </Grid>
        <Grid item lg={4} xs={12}>
          <TextField
            id="rol"
            label="Rol"
            defaultValue={misDatos.rol}
            InputProps={{ readOnly: true }}
            variant="outlined"
            fullWidth
            disabled />
        </Grid>
        <Grid item lg={12} xs={12}>
          <TextField
            id="comercio"
            label="Comercio"
            defaultValue={misDatos.comercio}
            InputProps={{ readOnly: true }}
            variant="outlined"
            fullWidth
            disabled />
        </Grid>
        <Grid item lg={8} xs={12}>
          <TextField
            id="email"
            label="Email"
            defaultValue={misDatos.email}
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
            defaultValue={misDatos.tel}
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
        {isSaving && <GuardarButton variant="contained" color="secondary" fullWidth disabled> <CircularProgress size={18} color="secondary" style={{ marginRight: '10px' }}/> Guardando...</GuardarButton>}
      </ButtonContainer>

      <MessageModal
        messageModal={messageModal}
        handleCerrar={handleCerrarMessageModal}
      />
    </div>
  );
}
