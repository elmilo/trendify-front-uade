import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Layout from '../Layout/Layout.js'

const useStyles = makeStyles((theme) => ({

}));

export default function Tendencias() {
  
  const classes = useStyles();

  return (
    <div>
      <Layout title="Tendencias">
          Componente de tendencias
      </Layout>
    </div>
  );
}
