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

export default function TopConsumos(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Title>Productos más vendidos</Title>
      {props.topConsumos === null && <LoadingData message="Obteniendo productos..." />}
      {props.topConsumos !== null && props.topConsumos.consumos.length <= 0 && <Alert severity="info">No se encontraron productos.</Alert> }
      {props.topConsumos !== null && props.topConsumos.consumos.length > 0 &&
        <div className={classes.table}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Producto</TableCell>
                <TableCell align='center'>Cantidad</TableCell>
                <TableCell align='center'>Sem. Anterior</TableCell>
                <TableCell align='center'>Diferencia</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {props.topConsumos.consumos.length > 0 && props.topConsumos.consumos.map((consumo, index) => (
                <TableRow key={"consumo-" + index}>
                  <TableCell>{consumo.nombre}</TableCell>
                  <TableCell align='center'>{consumo.cantidad}</TableCell>
                  <TableCell align='center'>{consumo.cantidadSemAnt}</TableCell>
                  <TableCell align='center' style={{color: consumo.cantidad - consumo.cantidadSemAnt > 0 ? "green" 
                                                         : consumo.cantidad - consumo.cantidadSemAnt < 0 ? "red" 
                                                         : "black"}}>
                  {consumo.cantidad - consumo.cantidadSemAnt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      }
    </React.Fragment>
  );
}
