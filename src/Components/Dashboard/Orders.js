import React from 'react';
import Linka from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod) {
  return { id, date, name, shipTo, paymentMethod };
}

const rows = [
  createData(0, '16 Mar, 2020', 'Leche La Serenísima 1 lt Doy', '850', '+'),
  createData(1, '16 Mar, 2020', 'Mayonesa Hellmans Clasica pouch 237 gr.', '641', '-'),
  createData(2, '16 Mar, 2020', 'Jabón líquido Skip 3 lt', '532', '='),
  createData(3, '16 Mar, 2020', 'Lavandina Ayudín Máxima pureza botella 1 lt', '325', '+'),
  createData(4, '15 Mar, 2020', 'Patitas de pollo Granja del Sol por 400 gr', '105', '+'),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Producto más vendidos en tu zona</Title>
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
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align = 'center'>{row.shipTo}</TableCell>
              <TableCell align = 'center'>{row.paymentMethod}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Linka color="primary" href="#" onClick={preventDefault}>
          Mostrar más...
        </Linka>
      </div>
    </React.Fragment>
  );
}
