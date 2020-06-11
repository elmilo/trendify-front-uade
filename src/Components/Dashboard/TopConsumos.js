import React from 'react';
import Linka from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Productos más vendidos</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Producto</TableCell>
            <TableCell align = 'center'>Cantidad</TableCell>
            <TableCell align = 'center'>Contra Sem. Anterior</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.topConsumos === null && <div>Cargando...</div>}
          {props.topConsumos !== null && props.topConsumos.consumos.map((consumo) => (
            <TableRow key={consumo.id}>
              <TableCell>{consumo.date}</TableCell>
              <TableCell>{consumo.name}</TableCell>
              <TableCell align = 'center'>{consumo.shipTo}</TableCell>
              <TableCell align = 'center'>{consumo.paymentMethod}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Linka color="primary" href="#">
          Mostrar más...
        </Linka>
      </div>
    </React.Fragment>
  );
}
