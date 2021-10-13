/** Заготовка модали, для форм добавления и изменния данных */


import React from 'react'
import MaterialModal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';




function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    minWidth: 400,
    maxHeight: "100%",
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #b9b9b9',
    borderRadius: 8,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflowY: 'auto',
  },
  close_button: {
    zIndex: 999
  }
}));


export default function Modal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  return (
    <MaterialModal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={classes.paper}>
        <Grid
          container
          className={classes.root}
          direction="row"
          justifyContent="flex-end"
        >
          <IconButton className={classes.close_button} onClick={props.onClose} size='small'>
            <CloseIcon/>
          </IconButton>
        </Grid>
        {props.children}
      </div>
    </MaterialModal>
  )
}