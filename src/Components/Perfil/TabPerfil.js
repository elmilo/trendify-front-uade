import React from "react";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import { Container } from "@material-ui/core";

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

  const [isSaving, setIsSaving] = React.useState(false);

  return (
    <div>

      <Typography variant="h4" gutterBottom align="left" style={{ marginBottom: '20px' }}>
        Mis datos
      </Typography>

      <Grid container spacing={3}>
        <Grid item lg={8} xs={12}>
          <TextField id="nombre" label="Nombre" defaultValue={props.data.nombre} InputProps={{ readOnly: true }} variant="outlined" fullWidth disabled />
        </Grid>
        <Grid item lg={4} xs={12}>
          <TextField id="rol" label="Rol" defaultValue={props.data.rol} InputProps={{ readOnly: true }} variant="outlined" fullWidth disabled />
        </Grid>
        <Grid item lg={12} xs={12}>
          <TextField id="comercio" label="Comercio" defaultValue={props.data.comercio} InputProps={{ readOnly: true }} variant="outlined" fullWidth disabled />
        </Grid>
        <Grid item lg={8} xs={12}>
          <TextField id="email" label="Email" defaultValue={props.data.email} InputProps={{ readOnly: true }} variant="outlined" fullWidth />
        </Grid>
        <Grid item lg={4} xs={12}>
          <TextField id="tel" label="Tel." defaultValue={props.data.tel} InputProps={{ readOnly: true }} variant="outlined" fullWidth />
        </Grid>
      </Grid>

      <ButtonContainer maxWidth="lg">
        {!isSaving && <GuardarButton variant="contained" color="secondary" fullWidth>Guardar</GuardarButton>}
        {isSaving && <GuardarButton variant="contained" color="secondary" fullWidth disabled>Guardando...</GuardarButton>}
      </ButtonContainer>
    </div>
  );
}
