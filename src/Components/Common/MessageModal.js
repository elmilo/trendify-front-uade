import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

export default function ModalUsuario({ messageModal, handleCerrar }) {
  
  const classes = useStyles();

  return (

    <div>

      {messageModal.isOpen &&

        <Dialog
          open={messageModal.isOpen}
          onClose={handleCerrar}
          disableBackdropClick
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <MuiDialogTitle disableTypography id="alert-dialog-title">
            <Typography variant="h6">
              <span>{messageModal.title}</span>
            </Typography>
            <IconButton aria-label="close" className={classes.closeButton} onClick={handleCerrar}>
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <DialogContent dividers>
            <Alert severity={messageModal.severity}>{messageModal.message}</Alert>
          </DialogContent>
        </Dialog>
      }

    </div>
  );
}