import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Alert from '@material-ui/lab/Alert';
import LoadingData from '../Common/LoadingData';
import Title from './Title';

const useStyles = makeStyles((theme) => ({
  table: {
    overflowX: "auto"
  }
}));

export default function Orders(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Productos más vendidos</Title>
      {props.topConsumos === null && <LoadingData message="Obteniendo productos..." />}
      {props.topConsumos !== null && props.topConsumos.consumos.length <= 0 && <Alert severity="info">No se encontraron productos.</Alert> }
      {props.topConsumos !== null && props.topConsumos.consumos.length > 0 &&
        <div class={classes.table}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Producto</TableCell>
                <TableCell align='center'>Cantidad</TableCell>
                <TableCell align='center'>Contra Sem. Anterior</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {props.topConsumos.consumos.length > 0 && props.topConsumos.consumos.map((consumo) => (
                <TableRow key={consumo.id}>
                  <TableCell>{consumo.nombre}</TableCell>
                  <TableCell align='center'>{consumo.cantidad}</TableCell>
                  <TableCell align='center'>{consumo.cantidadSemAnt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      }
    </React.Fragment>
  );
}
