import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Layout from '../Layout/Layout.js'

const useStyles = makeStyles((theme) => ({

}));

export default function Proveedores() {
  
  const classes = useStyles();

  return (
    <div>
      <Layout title="Proveedores">
          Componente de proveedores
      </Layout>
    </div>
  );
}
