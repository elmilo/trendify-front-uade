import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Alert from '@material-ui/lab/Alert';
import LoadingData from '../Common/LoadingData';
import Typography from '@material-ui/core/Typography';

export default function GraficoVentasCategoria(props) {

  var ventas = null;
  var colors = ["#8884d8", "#82ca9d", "#ff0000", "#006699", "#cc0000"]

  if(props.ventasPorCategoria != null && props.categoriaSeleccionada){

    ventas = [];
    props.ventasPorCategoria.forEach((ventaPorCategoria) => {

      var fecha = ventaPorCategoria.fecha.split("-")[2] + '/' + ventaPorCategoria.fecha.split("-")[1];

      if(!ventas.some(v => v.name === fecha)){

        var model = { fecha: fecha };

        ventaPorCategoria.detalleCategoria.forEach((detalleCategoria) => {
          if(props.categoriaSeleccionada === detalleCategoria.categoria){
            model[detalleCategoria.categoria] = detalleCategoria.cantidad;
          }
        });

        ventas.push(model);
      }
    });
  }

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>Ventas de la categoría '{props.categoriaSeleccionada}'</Typography>

      {props.isLoading && <LoadingData message="Obteniendo ventas..." />}
      {ventas !== null && ventas.length <= 0 && !props.isLoading && <Alert severity="info">No se encontraron ventas para los filtros ingresados.</Alert>}
      {ventas !== null && ventas.length > 0 && !props.isLoading &&
        <ResponsiveContainer>
        <LineChart
        width={500}
        height={300}
        data={ventas}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="fecha" />
        <YAxis unit=" u." />
        <Tooltip />
        <Legend />

        <Line key={"grafico-categoriaSeleccionada"} type="monotone" dataKey={props.categoriaSeleccionada} stroke={colors[0]} activeDot={{ r: 8 }} />
                
      </LineChart>
        </ResponsiveContainer>
      }
    </React.Fragment>
  );
}
