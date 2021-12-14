import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: '999',
    color: '#fff',
  },
}));

export default function SiteBackdrop(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(props.open_state);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress />
      </Backdrop>
    </div>
  );
}