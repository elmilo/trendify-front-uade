import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chart from "./Chart";
import TopConsumos from "./TopConsumos";
import Layout from '../Layout/Layout.js';
import auth from '../../ProtectedRoutes/auth';
import { getTopConsumos } from '../../Axios/Axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  
  const classes = useStyles();

  const [isLoadingTopConsumos, setIsLoadingTopConsumos] = React.useState(false);
  const [topConsumos, setTopConsumos] = React.useState(null);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const recargarTopConsumos = (onSuccessCallback, onErrorCallback) => {

    setIsLoadingTopConsumos(true);

    var today = new Date();
      
    var day = String(today.getDate()).padStart(2, '0');
    var month = String(today.getMonth() + 1).padStart(2, '0');
    var year = today.getFullYear();

    getTopConsumos(auth.getIdCliente(), day, month, year)
      .then((dResponse) => {
        setTopConsumos(dResponse);
        setIsLoadingTopConsumos(false);
        if (onSuccessCallback)
          onSuccessCallback();
      })
      .catch(error => {
        console.log('Response Top Consumos:');
        console.log(error);
        setIsLoadingTopConsumos(false);
        if (onErrorCallback)
          onErrorCallback();
      });
  }

  if (topConsumos === null && !isLoadingTopConsumos) {
    recargarTopConsumos();
  }

  return (
    <div>
      <Layout title="Dashboard">
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={fixedHeightPaper}>
                <Chart />
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={classes.paper}>
                <TopConsumos topConsumos={topConsumos} />
              </Paper>
            </Grid>
          </Grid>
      </Layout>
    </div>
  );
}
