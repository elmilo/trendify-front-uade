import React from "react";
import clsx from "clsx";
import Layout from '../Layout/Layout.js';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import GraficoVentasCategoria from "./GraficoVentasCategoria";
import GraficoVentasProducto from "./GraficoVentasProducto";
import InfoProducto from "./InfoProducto";
import { getCategorias, getVentasPorDiaPorCategoria, getVentasPorDiaPorProducto, getProductosPorCategoria } from '../../Axios/Axios';
import auth from '../../ProtectedRoutes/auth';
import SeleccionFiltros from "./SeleccionFiltros.js";

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
    recargarProductos(value);
    recargarVentasPorCategoria();
  }

  const handleProductoChange = (nombre, codProducto) => {
    setFormInputChange('producto', nombre);
    setFormInputChange('codProducto', codProducto);
    recargarVentasPorProducto(codProducto);
  }

  //State Combo de Categorías
  const [isLoadingCategorias, setIsLoadingCategorias] = React.useState(false);
  const [categorias, setCategorias] = React.useState(null);

  //State Combo de Productos
  const [isLoadingProductos, setIsLoadingProductos] = React.useState(false);
  const [productos, setProductos] = React.useState(null);

  //State Ventas por Categoria
  const [isLoadingVentasPorCategoria, setIsLoadingVentasPorCategoria] = React.useState(false);
  const [ventasPorCategoria, setVentasPorCategoria] = React.useState(null);

  //State Ventas por Producto
  const [isLoadingVentasPorProducto, setIsLoadingVentasPorProducto] = React.useState(false);
  const [ventasPorProducto, setVentasPorProducto] = React.useState(null);
  const [infoProducto, setInfoProducto] = React.useState(null);

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

  const recargarProductos = (categoria, onSuccessCallback, onErrorCallback) => {

    setIsLoadingProductos(true);

    getProductosPorCategoria(categoria)
      .then((response) => {
        setProductos(response);
        setIsLoadingProductos(false);
        if (onSuccessCallback)
          onSuccessCallback();
      })
      .catch(error => {
        setIsLoadingProductos(false);
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

  const recargarVentasPorProducto = (codProducto, onSuccessCallback, onErrorCallback) => {

    setIsLoadingVentasPorProducto(true);

    getVentasPorDiaPorProducto(auth.getIdCliente(), codProducto)
      .then((response) => {
        setVentasPorProducto(response);
        setInfoProducto(response !== null && response?.length > 0 ? response[0]?.producto : null);
        setIsLoadingVentasPorProducto(false);
        if (onSuccessCallback)
          onSuccessCallback();
      })
      .catch(error => {
        setIsLoadingVentasPorProducto(false);
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
                handleCategoriaChange={handleCategoriaChange}
                productos={productos}
                isLoadingProductos={isLoadingProductos}
                handleProductoChange={handleProductoChange} />
            </Paper>
          </Grid>
          {(ventasPorProducto != null || isLoadingVentasPorProducto) &&
            <Grid item lg={8} md={8} sm={8}>
              <Paper className={fixedHeightPaper}>
                <GraficoVentasProducto
                  productoSeleccionado={filtros?.producto}
                  ventasPorProducto={ventasPorProducto}
                  isLoading={isLoadingVentasPorProducto} />
              </Paper>
            </Grid>
          }
          {(infoProducto != null || isLoadingVentasPorProducto) &&
            <Grid item lg={4} md={4} sm={8}>
              <Paper className={fixedHeightPaper}>
                <InfoProducto
                  infoProducto={infoProducto}
                  isLoading={isLoadingVentasPorProducto} />
              </Paper>
            </Grid>}

          {(ventasPorCategoria != null || isLoadingVentasPorCategoria) &&
            <Grid item lg={12} md={12} sm={8}>
              <Paper className={fixedHeightPaper}>
                <GraficoVentasCategoria
                  categoriaSeleccionada={filtros?.categoria}
                  ventasPorCategoria={ventasPorCategoria}
                  isLoading={isLoadingVentasPorCategoria} />
              </Paper>
            </Grid>
          }
        </Grid>
      </Layout>
    </div>
  );
}
