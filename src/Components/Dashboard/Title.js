import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

//Temas: https://stackoverflow.com/questions/49535551/change-secondary-and-primary-colors-in-material-ui


export default function Title(props) {
  return (
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        {props.children}
      </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};
