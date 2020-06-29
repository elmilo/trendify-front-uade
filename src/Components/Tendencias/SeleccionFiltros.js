import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from "@material-ui/core/Grid";
import Alert from '@material-ui/lab/Alert';
import { Typography } from '@material-ui/core';

export default function SeleccionFiltros(props) {

  var categoriaSeleccionada = props.filtros?.categoria?.toUpperCase() ?? null;
  var productoSeleccionado = null;
  
  if(props.filtros?.producto && props.filtros?.codProducto){
    productoSeleccionado = props.filtros?.producto + '|' + props.filtros?.codProducto;
  }
  
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={2} lg={2}>
          <Typography variant="h6" style={{marginTop: 10}}>Filtros</Typography>
        </Grid>
        <Grid item xs={12} md={5} lg={5}>
          <FormControl
            fullWidth
            disabled={props.isLoadingCategorias}
            variant="outlined">
            <InputLabel id="categoria-ddl-lable">{props.isLoadingCategorias ? "Cargando Categorías..." : "Categoría"}</InputLabel>
            <Select
              labelId="categoria-ddl-lable"
              id="categoria-ddl"
              value={categoriaSeleccionada}
              onChange={(e) => props.handleCategoriaChange(e.target?.value)}
              label="Categoría">

              {props.categorias?.sort().map((categoria, index) => (
                <MenuItem key={"ddl-categoria-" + index} value={categoria.toUpperCase()}>{categoria.toUpperCase()}</MenuItem>
              ))}

            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={5} lg={5}>
        <FormControl
            fullWidth
            disabled={categoriaSeleccionada === null || props.isLoadingProductos}
            variant="outlined">
            <InputLabel id="producto-ddl-lable">
              {!props.isLoadingCategorias && props.isLoadingProductos ? "Cargando Productos..." : "Producto"}
            </InputLabel>
            <Select
              labelId="producto-ddl-lable"
              id="producto-ddl"
              value={productoSeleccionado}
              onChange={(e) => props.handleProductoChange(e.target?.value.split('|')[0], e.target?.value.split('|')[1])}
              label="Producto">

              {props.productos?.sort().map((producto, index) => (
                <MenuItem key={"ddl-producto-" + index} value={producto.nombre.toUpperCase() + '|' + producto.codigo}>{producto.nombre.toUpperCase()}</MenuItem>
              ))}

            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}
