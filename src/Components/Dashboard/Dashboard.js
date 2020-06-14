import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import GraficoVentasPorCategoria from "./GraficoVentasPorCategoria";
import TopConsumos from "./TopConsumos";
import Layout from '../Layout/Layout.js';
import auth from '../../ProtectedRoutes/auth';
import { getTopConsumos, getVentasPorDiaPorCategoria } from '../../Axios/Axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    height: 350
  },
  fixedHeight: {
    height: 350
  },
}));

export default function Dashboard() {
  
  const classes = useStyles();

  //State Top Consumos
  const [isLoadingTopConsumos, setIsLoadingTopConsumos] = React.useState(false);
  const [topConsumos, setTopConsumos] = React.useState(null);
  
  //State Ventas por Categoria
  const [isLoadingVentasPorCategoria, setIsLoadingVentasPorCategoria] = React.useState(false);
  const [ventasPorCategoria, setVentasPorCategoria] = React.useState(null);

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const recargarTopConsumos = (onSuccessCallback, onErrorCallback) => {

    setIsLoadingTopConsumos(true);

    var today = new Date();
      
    var day = String(today.getDate()).padStart(2, '0');
    var month = String(today.getMonth() + 1).padStart(2, '0');
    var year = today.getFullYear();

    getTopConsumos(auth.getIdCliente(), '30'/*day*/, /*month*/ '05', year)
      .then((response) => {
        setTopConsumos(response);
        setIsLoadingTopConsumos(false);
        if (onSuccessCallback)
          onSuccessCallback();
      })
      .catch(error => {
        setIsLoadingTopConsumos(false);
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

  if (topConsumos === null && !isLoadingTopConsumos) {
    recargarTopConsumos();
  }

  if (ventasPorCategoria === null && !isLoadingVentasPorCategoria) {
    recargarVentasPorCategoria();
  }

  return (
    <div>
      <Layout title="Dashboard">
          <Grid container spacing={3}>
            <Grid item md={12} lg={12}>
              <Paper className={fixedHeightPaper}>
                <GraficoVentasPorCategoria ventasPorCategoria={ventasPorCategoria}/>
              </Paper>
            </Grid>
            <Grid item md={12} lg={12}>
              <Paper className={classes.paper}>
                <TopConsumos topConsumos={topConsumos} />
              </Paper>
            </Grid>
          </Grid>
      </Layout>
    </div>
  );
}
