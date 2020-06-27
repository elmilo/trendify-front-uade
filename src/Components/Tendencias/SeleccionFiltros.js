import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from "@material-ui/core/Grid";

export default function SeleccionFiltros(props) {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <FormControl
            fullWidth
            disabled={props.isLoadingCategorias}
            variant="outlined">
            <InputLabel id="categoria-ddl-lable">Categoría</InputLabel>
            <Select
              labelId="categoria-ddl-lable"
              id="categoria-ddl"
              value={props.filtros?.categoria?.toUpperCase() ?? ''}
              onChange={(e) => props.handleCategoriaChange(e.target?.value)}
              label="Categoría">

              {props.categorias?.sort().map((categoria, index) => (
                <MenuItem key={"ddl-categoria-" + index} value={categoria.toUpperCase()}>{categoria.toUpperCase()}</MenuItem>
              ))}

            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
        <FormControl
            fullWidth
            disabled={props.isLoadingProductos}
            variant="outlined">
            <InputLabel id="producto-ddl-lable">Producto</InputLabel>
            <Select
              labelId="producto-ddl-lable"
              id="producto-ddl"
              value={props.filtros?.producto ?? ''}
              onChange={(e) => props.handleProductoChange(e.target?.value)}
              label="Producto">

              {props.productos?.sort().map((producto, index) => (
                <MenuItem key={"ddl-producto-" + index} value={producto.nombre.toUpperCase() + '|' + producto.codigo}>{producto.nombre.toUpperCase()}</MenuItem>
              ))}

            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
        </Grid>
      </Grid>
    </div>
  );
}
