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
    backgroundColor: theme.palette.common.black,
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
    margin: '20px 0'
  },
  table: {
    minWidth: 700
  },
});

export default function CargarVentas(props) {

  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Archivo</StyledTableCell>
            <StyledTableCell align="right">Tamaño (bytes)</StyledTableCell>
            <StyledTableCell align="right">Registros</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.files.map((file) => (
            <StyledTableRow  key={file.path}>
              <StyledTableCell component="th" scope="row">
                {file.path}
              </StyledTableCell>
              <StyledTableCell align="right">{file.size}</StyledTableCell>
              <StyledTableCell align="right">{8}</StyledTableCell>
            </StyledTableRow >
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

