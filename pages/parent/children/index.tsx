import { Box, Modal } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export default function ChildModal() {
  const [open, setOpen] = useState<boolean>(true);

  const router = useRouter();

  const handleOpen = () => {
    setOpen(!open);
    // router.push('', '/parent/children');
    let stateObj = { foo: 'bar' };
    const title = 'page 2';
    const url = '/parent/children';
    history.replaceState(stateObj, title, url);
  };
  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <div className='text-center'>
      <button
        className='p-2 bg-green-600 rounded-lg text-white'
        onClick={handleOpen}
      >
        Open child
      </button>
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
          <p id='parent-modal-description'>Hello this is - IindexChild</p>
          <button
            className='p-2 bg-red-600 rounded-lg text-white'
            onClick={handleClose}
          >
            Close child
          </button>
        </Box>
      </Modal>
    </div>
  );
}
