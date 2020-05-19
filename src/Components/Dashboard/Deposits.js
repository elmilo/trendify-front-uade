import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Cantidades vendidas (última carga)</Title>
      <Typography component="p" variant="h4">
        1.235 (u)
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        el 15 Mayo, 2020
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Ver detalle
        </Link>
      </div>
    </React.Fragment>
  );
}
