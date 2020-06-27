import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Alert from '@material-ui/lab/Alert';
import LoadingData from '../Common/LoadingData';
import Typography from '@material-ui/core/Typography';

export default function GraficoVentasProducto(props) {

  var ventas = null;
  var colors = ["#8884d8", "#82ca9d", "#ff0000", "#006699", "#cc0000"]

  console.log(props.ventasPorProducto);

  if(props.ventasPorProducto != null && props.productoSeleccionado){

    ventas = [];
    props.ventasPorProducto.forEach((ventaPorProducto) => {
      var fecha = ventaPorProducto.fecha.split("-")[2] + '/' + ventaPorProducto.fecha.split("-")[1];
      if(!ventas.some(v => v.name === fecha)){
        ventas.push({ fecha: fecha, [props.productoSeleccionado]: ventaPorProducto.cantidad });
      }
    });
  }

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>Ventas del producto '{props.productoSeleccionado}'</Typography>

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
        <XAxis dataKey="fecha"/>
        <YAxis unit=" u."/>
        <Tooltip />
        <Legend />

        <Line key={"grafico-productoSeleccionado"} type="monotone" dataKey={props.productoSeleccionado} stroke={colors[1]} activeDot={{ r: 8 }} />
                
      </LineChart>
        </ResponsiveContainer>
      }
    </React.Fragment>
  );
}
