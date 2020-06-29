import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Alert from '@material-ui/lab/Alert';
import LoadingData from '../Common/LoadingData';
import Typography from '@material-ui/core/Typography';

export default function GraficoVentasProducto(props) {

  var today = "2020/06/17";
  var ventas = null;
  var colors = ["#8884d8", "#82ca9d", "#ff0000", "#006699", "#cc0000"]

  if(props.ventasPorProducto != null && props.productoSeleccionado){

    ventas = [];
    props.ventasPorProducto.forEach((ventaPorProducto) => {
      var fecha = ventaPorProducto.fecha.split("-")[2] + '/' + ventaPorProducto.fecha.split("-")[1];
      if(!ventas.some(v => v.name === fecha)){

        if(fecha === "17/06"){
          ventas.push({ fecha: fecha, ventas: ventaPorProducto.cantidad, proyeccion: ventaPorProducto.cantidad });
        }else{
          ventas.push({ fecha: fecha, ventas: ventaPorProducto.cantidad });
        }
      }
    });

    var diasAnalisis = 10;
    var dateHoy = new Date(today);
    var dd = String(dateHoy.getDate()).padStart(2, '0');
    var mm = String(dateHoy.getMonth() + 1).padStart(2, '0');
    var fechaHoy = dd + '/' + mm;

    dateHoy = new Date(today);    
    dateHoy.setDate(dateHoy.getDate() - diasAnalisis);
    dd = String(dateHoy.getDate()).padStart(2, '0');
    mm = String(dateHoy.getMonth() + 1).padStart(2, '0');
    var fechaFin = dd + '/' + mm;

    const ventasFechaHoy = ventas.find(ventaPorFecha => ventaPorFecha.fecha === fechaHoy);
    const ventasFechaFin = ventas.find(ventaPorFecha => ventaPorFecha.fecha === fechaFin);

    var variacion = Math.round((ventasFechaHoy.ventas - ventasFechaFin.ventas) / diasAnalisis, 0);

    var diasProyeccion = 3;
    var cantProyeccion = ventasFechaHoy.ventas;
    for(var i = 1; i <= diasProyeccion; i++){

      dateHoy = new Date(today);
      dateHoy.setDate(dateHoy.getDate() + i);
      dd = String(dateHoy.getDate()).padStart(2, '0');
      mm = String(dateHoy.getMonth() + 1).padStart(2, '0');
      var fechaProy = dd + '/' + mm;

      cantProyeccion = cantProyeccion + variacion;

      ventas.push({fecha: fechaProy, proyeccion: cantProyeccion});
    }
  }

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>Ventas del producto '{props.productoSeleccionado}'</Typography>

      {props.isLoading && <LoadingData message="Obteniendo ventas..." />}
      {ventas !== null && ventas.length <= 0 && !props.isLoading && <Alert severity="info" style={{ height: '100%'}}>No se encontraron ventas para los filtros ingresados.</Alert>}
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

        <Line key={"grafico-productoSeleccionado"} type="monotone" dataKey="ventas" name={props.productoSeleccionado} stroke={colors[1]} activeDot={{ r: 8 }} />
        <Line key={"grafico-productoSeleccionado-proyeccion"} type="monotone" dataKey="proyeccion" name="Proyección" stroke={colors[2]} activeDot={{ r: 8 }} />
                
      </LineChart>
        </ResponsiveContainer>
      }
    </React.Fragment>
  );
}
