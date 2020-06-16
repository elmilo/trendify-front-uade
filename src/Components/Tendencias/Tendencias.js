import React from "react";
import clsx from "clsx";
import Layout from '../Layout/Layout.js';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import GraficoVentasCategoria from "./GraficoVentasCategoria";
import { getCategorias, getVentasPorDiaPorCategoria } from '../../Axios/Axios';
import auth from '../../ProtectedRoutes/auth';
import SeleccionFiltros from "./SeleccionFiltros.js";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 300
  }
}));

export default function Tendencias() {

  const classes = useStyles();

  const [filtros, setFiltros] = React.useState(null);

  const setFormInputChange = (prop, value) => {
    setFiltros(prevState => ({
      ...prevState,
      [prop]: value
    }));
  }

  const handleCategoriaChange = (value) => {
    setFormInputChange('categoria', value);
    recargarVentasPorCategoria();
  }

  const [isLoadingCategorias, setIsLoadingCategorias] = React.useState(false);
  const [categorias, setCategorias] = React.useState(null);

  //State Ventas por Categoria
  const [isLoadingVentasPorCategoria, setIsLoadingVentasPorCategoria] = React.useState(false);
  const [ventasPorCategoria, setVentasPorCategoria] = React.useState(null);

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

  const recargarVentasPorCategoria = (onSuccessCallback, onErrorCallback) => {

    setIsLoadingVentasPorCategoria(true);

    getVentasPorDiaPorCategoria(auth.getIdCliente())
      .then((response) => {
        setVentasPorCategoria(response);
        setIsLoadingVentasPorCategoria(false);
        if (onSuccessCallback)
          onSuccessCallback();
      })
      .catch(error => {
        setIsLoadingVentasPorCategoria(false);
        if (onErrorCallback)
          onErrorCallback();
      });
  }

  if (categorias === null && !isLoadingCategorias) {
    recargarCategorias();
  }

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div>
      <Layout title="Tendencias">
        <Grid container spacing={3}>
          <Grid item md={12} lg={12}>
            <Paper className={classes.paper}>
              <SeleccionFiltros 
                filtros={filtros} 
                categorias={categorias} 
                isLoadingCategorias={isLoadingCategorias}
                handleCategoriaChange={handleCategoriaChange} />
            </Paper>
          </Grid>
          <Grid item md={6} lg={6}>

            {(ventasPorCategoria != null || isLoadingVentasPorCategoria) &&
              <Paper className={fixedHeightPaper}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>Índice T1</Typography>
                
              </Paper>
            }

          </Grid>
          <Grid item md={6} lg={6}>

            {(ventasPorCategoria != null || isLoadingVentasPorCategoria) &&
              <Paper className={fixedHeightPaper}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>Variación ventas</Typography>
              </Paper>
            }

          </Grid>
          <Grid item md={12} lg={12}>

            {(ventasPorCategoria != null || isLoadingVentasPorCategoria) &&
              <Paper className={fixedHeightPaper}>
                <GraficoVentasCategoria categoriaSeleccionada={filtros?.categoria} ventasPorCategoria={ventasPorCategoria} isLoading={isLoadingVentasPorCategoria} />
              </Paper>
            }

          </Grid>
        </Grid>
      </Layout>
    </div>
  );
}
