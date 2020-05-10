import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Layout from '../Layout/Layout.js'

const useStyles = makeStyles((theme) => ({

}));

export default function CargarVentas() {
  
  const classes = useStyles();

  return (
    <div>
      <Layout title="Cargar Ventas">
          Componente de cargar ventas
      </Layout>
    </div>
  );
}
