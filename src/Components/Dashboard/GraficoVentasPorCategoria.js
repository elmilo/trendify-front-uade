import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Alert from '@material-ui/lab/Alert';
import LoadingData from '../Common/LoadingData';
import Title from './Title';

export default function GraficoVentasCategoria(props) {

  var ventas = null;
  var categorias = [];
  var colors = ["#ff9933", "#993333", "#009933", "#006699", "#cc0000"]

  if(props.ventasPorCategoria != null){

    ventas = [];
    props.ventasPorCategoria.forEach((ventaPorCategoria) => {

      var fecha = ventaPorCategoria.fecha.split("-")[2];

      if(!ventas.some(v => v.name === fecha)){

        var model = { name: fecha };

        ventaPorCategoria.detalleCategoria.forEach((detalleCategoria) => {

          model[detalleCategoria.categoria] = detalleCategoria.cantidad;

          if (!categorias.includes(detalleCategoria.categoria)) {
            categorias.push(detalleCategoria.categoria);
          }
        });

        ventas.push(model);
      }
    });
  }

  return (
    <React.Fragment>
      <Title>Cantidad de ventas por categoría</Title>

      {ventas === null && <LoadingData message="Obteniendo ventas por categoría..." />}
      {ventas !== null && ventas.length <= 0 && <Alert severity="info">No se encontraron ventas.</Alert>}
      {ventas !== null && ventas.length > 0 &&
        <ResponsiveContainer>
          <BarChart
            width={500}
            height={300}
            data={ventas}
            margin={{
              top: 20, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" allowDataOverflow/>
            <YAxis/>
            <Tooltip />
            <Legend />

            {categorias.map((categoria, index) => (
              <Bar key={"grafico-categoria-" + index} dataKey={categoria} stackId="a" fill={colors[index]} />
            ))}

          </BarChart>
        </ResponsiveContainer>
      }
    </React.Fragment>
  );
}
