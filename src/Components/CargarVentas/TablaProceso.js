import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  tableContainer:{
    margin: '20px 0 0 0'
  },
  table: {
    minWidth: 700
  },
});

export default function TablaProceso(props) {

  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Cod. Barra</StyledTableCell>
            <StyledTableCell align="center">Fecha</StyledTableCell>
            <StyledTableCell>Mensaje</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.consumos.map((consumo) => (

            !consumo.success &&

            <StyledTableRow  key={consumo.codigo_barra + consumo.fecha}>
              <StyledTableCell component="th" scope="row" align="center">{consumo.codigo_barra}</StyledTableCell>
              <StyledTableCell align="center">{consumo.fecha}</StyledTableCell>
              <StyledTableCell>{consumo.message}</StyledTableCell>
            </StyledTableRow>

          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

