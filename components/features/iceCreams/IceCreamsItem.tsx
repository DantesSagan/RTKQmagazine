/* eslint-disable @next/next/no-img-element */
import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  AlertProps,
  Box,
  Modal,
  Paper,
  Snackbar,
} from '@mui/material';
import React, { FC, forwardRef, useState } from 'react';
import { IBasket } from '../../models/IBasket';
import { ICream } from '../../models/ICreamIce';

interface IceCreamsItemProps {
  iceCreams: ICream;
  basket: IBasket;
  remove: (IceCreams: ICream) => void;
  update: (IceCreams: ICream) => void;
  updateBasket: (basket: IBasket) => void;
}

const SnackbarAlert = forwardRef<HTMLDivElement, AlertProps>(
  function SnackbarAlert(props, ref) {
    return <Alert elevation={6} ref={ref} {...props} />;
  }
);

export const IceCreamsItem: FC<IceCreamsItemProps> = ({
  iceCreams,
  basket,
  remove,
  update,
  updateBasket,
}) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [openTwo, setOpenTwo] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);


  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return reason;
    }
    setOpen(!open);
  };

  const handleCloseTwo = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return reason;
    }
    setOpenTwo(!openTwo);
  };

  const handleChange = (isExpanded: boolean, panel: string) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleRemove = (event: React.MouseEvent) => {
    // prevent bubbling всплытие
    // Предотвращение дальнейшую передачу текущего события
    event.stopPropagation();
    remove(iceCreams);
  };

  const handleUpdateName = (event: React.MouseEvent) => {
    // prevent bubbling всплытие
    // Предотвращение дальнейшую передачу текущего события
    event.stopPropagation();
    const name = prompt();
    update({ ...iceCreams, name });
  };

  const handleUpdateDescription = (event: React.MouseEvent) => {
    // prevent bubbling всплытие
    // Предотвращение дальнейшую передачу текущего события
    event.stopPropagation();
    const description = prompt();
    update({ ...iceCreams, description });
  };

  const handleOrderedCake = (event: React.MouseEvent) => {
    // prevent bubbling всплытие
    // Предотвращение дальнейшую передачу текущего события
    event.stopPropagation();
    const numOfIceCreams = iceCreams.numOfIceCreams - 1;

    const numOfOrdered = basket.numOfOrdered + 1;
    let price = iceCreams.price;
    const basketAllPrice = basket.basketAllPrice + price;

    if (iceCreams.numOfIceCreams <= 0) {
      setOpen(true);
      return 0;
    } else {
      setOpenTwo(true);
      updateBasket({ ...basket, numOfOrdered, basketAllPrice });
      update({ ...iceCreams, numOfIceCreams });
    }
  };

  const heights = [
    150, 30, 90, 110, 80, 95, 12, 200, 20, 30, 40, 50, 60, 70, 80, 90,
  ];

  return (
    // <div className='grid grid-cols-3 gap-2'>
    // <Paper key={iceCreams.id}>
    //   <Accordion
    //     sx={{ minHeight: heights }}
    //     expanded={expanded === `panel-${iceCreams.id}`}
    //     onChange={(_event, isExpanded) =>
    //       handleChange(isExpanded, `panel-${iceCreams.id}`)
    //     }
    //   >
    //     <AccordionSummary
    //       expandIcon={<ExpandMore />}
    //       id={`panel-${iceCreams.id}`}
    //       aria-controls={`panel-${iceCreams.id}`}
    //     >
    //       <div>
    //         <div
    //           className='font-bold text-3xl hover:bg-blue-500 rounded-lg p-4 hover:text-white cursor-pointer'
    //           onClick={handleUpdateName}
    //         >
    //           {iceCreams.id} - {iceCreams.name}
    //         </div>
    //         <div className='flex justify-center'>
    //           <img
    //             className='w-36 h-36 rounded-2xl object-cover border-2 border-black'
    //             alt={iceCreams.description}
    //             src={iceCreams.img}
    //           />
    //         </div>
    //       </div>
    //     </AccordionSummary>

    //     <AccordionDetails>
    //       <div className='p-4 rounded-lg mt-14 border-blue-400 border-2 rounded-xl'>
    //         <div
    //           className='text-2xl hover:bg-blue-500 rounded-lg p-4 hover:text-white cursor-pointer'
    //           onClick={handleUpdateDescription}
    //         >
    //           {iceCreams.description}
    //         </div>
    //         <div className='text-2xl hover:bg-blue-500 rounded-lg p-4 hover:text-white cursor-pointer'>
    //           Left IceCreams - {iceCreams.numOfIceCreams}
    //         </div>
    //         <div className='text-2xl font-bold hover:bg-blue-500 rounded-lg p-4 hover:text-white cursor-pointer'>
    //           Price - {iceCreams.price}
    //         </div>
    //         <button
    //           onClick={handleOrderedCake}
    //           className='p-4 bg-red-600 hover:bg-red-400 text-white rounded-lg hover:shadow-inner w-full'
    //         >
    //           Order
    //         </button>
    //         {/* <button
    //         onClick={handleRemove}
    //         className='p-4 bg-red-600 hover:bg-red-400 text-white rounded-lg hover:shadow-inner'
    //       >
    //         Delete
    //       </button> */}
    //       </div>
    //     </AccordionDetails>
    //     <Snackbar
    //       anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    //       open={open}
    //       autoHideDuration={6000}
    //       onClose={handleClose}
    //     >
    //       <SnackbarAlert onClose={handleClose} severity='warning'>
    //         Unfortunately you cant ordered this {iceCreams.name}!
    //       </SnackbarAlert>
    //     </Snackbar>
    //     <Snackbar
    //       anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    //       open={openTwo}
    //       autoHideDuration={6000}
    //       onClose={handleCloseTwo}
    //     >
    //       <SnackbarAlert onClose={handleCloseTwo} severity='success'>
    //         Ordered success! {iceCreams.name}!
    //       </SnackbarAlert>
    //     </Snackbar>
    //   </Accordion>
    // </Paper>
    <Paper
      key={iceCreams.id}
      className='text-center flex justify-center items-center'
    >
      {/* <Accordion
        expanded={expanded === `panel-${iceCreams.id}`}
        onChange={(_event, isExpanded) =>
          handleChange(isExpanded, `panel-${iceCreams.id}`)
        }
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          id={`panel-${iceCreams.id}`}
          aria-controls={`panel-${iceCreams.id}`}
        > */}{' '}
      <div
        className='cursor-pointer hover:bg-gray-200 rounded-lg flex justify-center items-center mb-6'
        onClick={handleOpenModal}
      >
        <div>
          <div
            className='font-bold text-3xl  rounded-lg p-4 hover:text-white cursor-pointer'
            // onClick={handleUpdateName}
          >
            {iceCreams.id} - {iceCreams.name}
          </div>
          <div className='flex justify-center items-center'>
            <img
              className='w-36 h-36 rounded-3xl object-cover border-2 border-black'
              alt={iceCreams.description}
              src={iceCreams.img}
            />
          </div>
        </div>
      </div>
      <Modal
        disableAutoFocus
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          sx={{ width: 600 }}
          className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'
        >
          <div className='bg-white p-4 rounded-lg mt-14 mb-6 border-blue-400 border-2 rounded-xl text-center grid grid-cols-1'>
            <div
              className='font-bold text-3xl rounded-lg p-4 hover:text-white cursor-pointer'
              // onClick={handleUpdateName}
            >
              {iceCreams.id} - {iceCreams.name}
            </div>
            <div className='flex justify-center items-center'>
              <img
                className='w-36 h-36 rounded-3xl object-cover border-2 border-black m-2 p-4'
                alt={iceCreams.description}
                src={iceCreams.img}
              />
            </div>
            <div
              className='text-2xl hover:bg-blue-500 rounded-lg p-4 hover:text-white cursor-pointer'
              onClick={handleUpdateDescription}
            >
              {iceCreams.description}
            </div>
            <div className='text-2xl hover:bg-blue-500 rounded-lg p-4 hover:text-white cursor-pointer'>
              Left iceCreams - {iceCreams.numOfIceCreams}
            </div>
            <div className='text-2xl font-bold hover:bg-blue-500 rounded-lg p-4 hover:text-white cursor-pointer'>
              Price - {iceCreams.price}
            </div>
            <button
              onClick={handleOrderedCake}
              className='p-4 m-2 bg-red-600 hover:bg-red-400 text-white rounded-lg hover:shadow-inner'
            >
              Order
            </button>
            {/* <button
              onClick={handleRemove}
              className='p-4 m-2 bg-red-600 hover:bg-red-400 text-white rounded-lg hover:shadow-inner'
            >
              Delete
            </button> */}
          </div>
        </Box>
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <SnackbarAlert
          onClose={handleClose}
          severity='warning'
          sx={{
            backgroundColor: 'white',
            border: '1px solid orange',
            borderRadius: '15px',
          }}
        >
          Unfortunately you cant ordered this {iceCreams.name}!
        </SnackbarAlert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openTwo}
        autoHideDuration={6000}
        onClose={handleCloseTwo}
      >
        <SnackbarAlert
          onClose={handleCloseTwo}
          severity='success'
          sx={{
            backgroundColor: 'white',
            border: '1px solid blue',
            borderRadius: '15px',
          }}
        >
          Ordered success - {iceCreams.name}!
        </SnackbarAlert>
      </Snackbar>
      {/* </Accordion> */}
    </Paper>
    // </div>
  );
};
