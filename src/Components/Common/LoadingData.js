import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function LoadingData({ message }) {
  
  return (

    <div>
      <Container maxWidth="lg">
        <Typography variant="h6" gutterBottom style={{ marginBottom: '20px' }}>{message}</Typography>
        <CircularProgress size={64} color="secondary" />
      </Container>
    </div>
  );
}