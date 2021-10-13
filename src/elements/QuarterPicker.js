import React, { useState } from 'react';
import { Grid, TextField, IconButton, InputAdornment, Button } from '@material-ui/core';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EventIcon from '@material-ui/icons/Event';
import "moment/locale/ru";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
      },
      minWidth: '310px',
      maxHeight: '100%',
    },
    text_field: {
      width: '100%'
    },
    dialog_root: {
        minWidth: '310px',
        maxHeight: '100%',
    },
    dialog_title: {
        background: '#3F51B5',
        color: '#FFF'
    },
    dialog_content: {
        background: '#FFF',
        color: '#3F51B5'
    },   
}));

const quarterList = [
    {id: 1, quarterName: '1 кв. Янв-Фев-Мар', start: '01-01', end: '03-31' },
    {id: 2, quarterName: '2 кв. Апр-Май-Июнь', start: '04-01', end: '06-30' },
    {id: 3, quarterName: '3 кв. Июль-Авг-Сен', start: '07-31', end: '09-30' },
    {id: 4, quarterName: '4 кв. Окт-Ноя-Дек', start: '10-01', end: '12-31' },
];


function QuarterPicker() {
    const classes = useStyles();

    const [openModal, setOpenModal] = useState(false);

    const date = new Date();
    const initYear = date.getFullYear();
    const [year, setYear] = useState(initYear);
    const [cloneYear, setCloneYear] = useState(initYear);

    const [reportPeriod, setReportPeriod] = useState(quarterList[0]);
    const [cloneReportPeriod, setCloneReportPeriod] = useState(reportPeriod);    

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const increment = () => {
        setCloneYear(cloneYear + 1);
    };

    const decrement = () => {
        setCloneYear(cloneYear - 1);
    };

    const handleSetReportPeriod = (period, year) => {
        setYear(year);
        setReportPeriod(period);
        setOpenModal(false);
    };

    return (
        <React.Fragment>
            <Dialog open={openModal} onClose={handleCloseModal}>
                <div className={classes.dialog_root}>
                    <DialogTitle className={classes.dialog_title}>
                        <Grid container direction="row" alignContent="center" alignItems="center" justifyContent="center">
                            <Grid item xs={2}>
                                <IconButton onClick={decrement}><ArrowBackIosIcon style={{ color: "#FFF" }} size="small"/></IconButton>
                            </Grid>
                            <Grid container item xs={8} justifyContent="center">{cloneYear}</Grid>
                            <Grid item xs={2}>
                                <IconButton onClick={increment}><ArrowForwardIosIcon style={{ color: "#FFF" }} color="action" size="small"/></IconButton>
                            </Grid>
                        </Grid>                        
                    </DialogTitle>
                    <DialogContent className={classes.dialog_content} dividers>
                        <Grid container direction="column" alignItems="center" spacing={1}>
                            {quarterList.map((item) => {
                                return (
                                    <Grid item xs={12} key={item.id}>
                                        <Button style={{ width: "200px" }} variant="outlined" onClick={() => setCloneReportPeriod(item)}>{item.quarterName}</Button>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </DialogContent>
                    <DialogActions className={classes.dialog_content}>
                        <Grid container direction="row">
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}>
                                <Button onClick={handleCloseModal}>Отмена</Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button onClick={() => handleSetReportPeriod(cloneReportPeriod, cloneYear)}>Принять</Button>
                            </Grid>
                        </Grid>
                    </DialogActions>
                </div>            
            </Dialog>

            <TextField
                variant="outlined"
                label="Отчетный период квартал"
                style={{ width: 280 }}
                size="small"
                onClick={handleOpenModal}
                value={`${reportPeriod.quarterName} ${year}`}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton>
                                <EventIcon color="action" size="small" />
                            </IconButton>              
                        </InputAdornment>
                    ),
                    readOnly: true,         
                }}
            />
      </React.Fragment>
    )
}

export default QuarterPicker;