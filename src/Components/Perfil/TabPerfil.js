import React from "react";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

export default function TabPerfil(props) {
  
  return (
    <div>

      <Typography variant="h4" gutterBottom align="left" style={{ marginBottom: '20px' }}>
        Mis datos
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item lg={8} xs={12}>
          <TextField id="nombre" label="Nombre" defaultValue={props.data.nombre} InputProps={{ readOnly: true }} variant="outlined" fullWidth disabled/>
        </Grid>
        <Grid item lg={4} xs={12}>
          <TextField id="rol" label="Rol" defaultValue={props.data.rol} InputProps={{ readOnly: true }} variant="outlined" fullWidth disabled/>  
        </Grid>
        <Grid item lg={12} xs={12}>
          <TextField id="comercio" label="Comercio" defaultValue={props.data.comercio} InputProps={{ readOnly: true }} variant="outlined" fullWidth disabled/>
        </Grid>
        <Grid item lg={8} xs={12}>
          <TextField id="email" label="Email" defaultValue={props.data.email} InputProps={{ readOnly: true }} variant="outlined" fullWidth/>
        </Grid>
        <Grid item lg={4} xs={12}>
          <TextField id="tel" label="Tel." defaultValue={props.data.tel} InputProps={{ readOnly: true }} variant="outlined" fullWidth/>
        </Grid>
      </Grid>
    </div>
  );
}
