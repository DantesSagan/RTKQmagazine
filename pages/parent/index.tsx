import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  Typography,
  useTheme,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ChildModal from './children';

export default function IindexParent() {
  return (
    <div className='text-center'>
      Hello this is - IindexParent
      <div>
        <MyComponent />
      </div>
    </div>
  );
}

function MyComponent() {
  const [open, setOpen] = useState<boolean>(true);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const router = useRouter();

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <div className='p-2'>
      {/* <button className='p-2 bg-red-600 rounded-lg text-white' onClick={() => setOpen(!open)}>Open dialog</button> */}
      {/* <Dialog
        open={open}
        fullScreen={fullScreen}
        onClose={handleChange}
        aria-labelledby='dialog-title'
        aria-describedby='dialog-description'
      >
        <DialogTitle id='dialog-title'>Submit the test?</DialogTitle>
        <DialogContent>
          <DialogContentText id='dialog-description'>
            Are you sure you want to submit test? You will not be able to edit
            after submitting!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className='p-2 bg-red-600 rounded-lg text-white'
            autoFocus
            variant='contained'
            color='success'
            onClick={() => {
              setOpen(!open);
              router.push('/parent/children');
            }}
          >
            Open second
          </Button>
          <Button className='p-2 bg-red-600 rounded-lg text-white'
            variant='contained'
            color='error'
            onClick={() => setOpen(!open)}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog> */}
      <button className='p-2 mt-24 bg-green-600 rounded-lg text-white' onClick={handleOpen}>Open modal</button>
      {!open ? 'yes' : 'no'}
      <Modal
        open={!open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            width: 400,
            transform: 'translate(-50%, -50%)',
            border: '1px solid red',
            borderRadius: '15px',
            padding: '10px',
          }}
        >
          <h2 id='parent-modal-title'>Text in a modal</h2>
          <p id='parent-modal-description'>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
          <button className='p-2 bg-red-600 rounded-lg text-white' onClick={handleClose}>Close</button>
          <Typography variant='h1' component='div'>
            CHILD
          </Typography>
          <ChildModal />
        </Box>
      </Modal>
    </div>
  );
}
