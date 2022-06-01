import { Box, Modal } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { MenuContext } from '../../components/context/Menu';
import { MessangerItemBox } from '../../components/features/messanger/MessangerItemBox';
import { UsersItemBox } from '../../components/features/messanger/UsersItemBox';

const MessangerIndex = () => {
  const [menu, setMenu] = useState<boolean>(true);
  // const router = useRouter();
  // const handleMenuDialog = (event: { preventDefault: () => void }) => {
  //   event.preventDefault();
  //   setMenu(!menu);
  //   let stateObj = { id: 1 };
  //   const title = 'ToDoList';
  //   const url = `/messenger/${1}`;
  //   history.pushState(stateObj, title, url);
  // };

  // const handleClose = () => {
  //   setMenu(!menu);
  //   router.push('/');
  // };
  return (
    <div className='grid grid-cols-2'>
      <MenuContext.Provider value={{ menu, setMenu }}>
        <UsersItemBox />
        {menu ? (
          <div>Select dialog</div>
        ) : (
          // <Modal
          //   open={!menu}
          //   onClose={handleClose}
          //   aria-labelledby='parent-modal-title'
          //   aria-describedby='parent-modal-description'
          // >
          //   <Box
          //     sx={{
          //       position: 'absolute',
          //       top: '50%',
          //       left: '50%',
          //       width: 800,
          //       transform: 'translate(-50%, -50%)',
          //       border: '1px solid red',
          //       borderRadius: '15px',
          //       padding: '10px',
          //     }}
          //   >
          //     <div className='bg-red-300'>
          <MessangerItemBox />
          //     </div>
          //     <button
          //       className='p-2 bg-red-600 rounded-lg text-white'
          //       onClick={handleClose}
          //     >
          //       Close
          //     </button>
          //   </Box>
          // </Modal>
        )}
      </MenuContext.Provider>
    </div>
  );
};

export default MessangerIndex;
