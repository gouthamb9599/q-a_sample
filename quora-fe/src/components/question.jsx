import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FormControl from '@material-ui/core/FormControl';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Axios from 'axios';

import { MenuItem } from '@material-ui/core';
import swal from 'sweetalert';

export default function Question() {
    const [tagid, settagid] = React.useState(0);
    const [open, setOpen] = React.useState(true);
    const [Taglist, setTaglist] = React.useState([]);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    useEffect(() => {
        Axios.get(`http://localhost:5000/gettags`)
            .then(res => {
                console.log(res.data);
                setTaglist(res.data.data);
                console.log(Taglist);
            })
    }, [])
    const useStyles = makeStyles((theme) => ({
        button: {
            display: 'block',
            marginTop: theme.spacing(2),
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
    }));
    const classes = useStyles();
    const [opendrop, setOpendrop] = React.useState(false);
    const [Questionheading, setQuestionheading] = React.useState("");
    const [Questiondesc, setQuestiondesc] = React.useState("");

    const handleCloses = () => {
        setOpendrop(false);
    };

    const handleOpen = () => {
        setOpendrop(true);
    };
    const handleClose = () => {
        setOpen(false);
    }
    const handlesubmit = () => {

        const userData = JSON.parse(sessionStorage.getItem('userData'));
        console.log(userData.data.id);

        Axios.post(`http://localhost:5000/addquestion`, { questionheading: Questionheading, questiondesc: Questiondesc, tag: tagid, userid: userData.data.id })
            .then(res => {
                if (res.data.success === true) {
                    swal("your Question is posted ", "check your homepage for more questions", "success")
                }
            })
        setOpen(false);
    };
    const handleChangeid = (event) => {
        settagid(event.target.value);
    };
    const handleChangehead = (event) => {
        setQuestionheading(event.target.value)
    }
    const handleChangedesc = (event) => {
        setQuestiondesc(event.target.value)
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add Question</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add questions to get clarified by others
          </DialogContentText>

                    <textarea name="questionhead" cols="50" rows="2" onChange={handleChangehead} placeholder="Question Title"></textarea>
                    <textarea name="questiondesc" cols="50" rows="5" onChange={handleChangedesc} placeholder="Question Description"></textarea>
                    <Button className={classes.button} onClick={handleOpen}>
                        Select Domain
      </Button>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-controlled-open-select-label">Tag</InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={opendrop}
                            onClose={handleCloses}
                            onOpen={handleOpen}
                            value={tagid}
                            onChange={handleChangeid}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {Taglist.map((data) => (
                                <MenuItem value={data.id}>{data.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {/* <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label=""
                        type="email"
                        fullWidth
                    /> */}
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Close
          </Button>
                    <Button onClick={handlesubmit} color="primary" autoFocus>
                        Submit
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
