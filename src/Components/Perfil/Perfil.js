import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Layout from '../Layout/Layout.js'

const useStyles = makeStyles((theme) => ({

}));

export default function Perfil() {
  
  const classes = useStyles();

  return (
    <div>
      <Layout title="Perfil">
          Componente de Perfil
      </Layout>
    </div>
  );
}
