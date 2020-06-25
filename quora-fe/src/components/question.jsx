import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export default function Question() {
    const [open, setOpen] = React.useState(true);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const getTags = () => {

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

                    <textarea name="paragraph_text" cols="50" rows="2" placeholder="Question Title"></textarea>
                    <textarea name="paragraph_text" cols="50" rows="5" placeholder="Question Description"></textarea>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label=""
                        type="email"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Close
          </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Submit
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
