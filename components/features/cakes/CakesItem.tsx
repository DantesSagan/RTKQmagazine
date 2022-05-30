/* eslint-disable @next/next/no-img-element */
import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  AlertProps,
  Paper,
  Snackbar,
  Box,
  Typography,
  Modal,
} from '@mui/material';
import React, { FC, forwardRef, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { IBasket } from '../../models/IBasket';
import { ICakes } from '../../models/ICakes';
import { orderedCake } from '../cake/cakeSlice';

interface CakesItemProps {
  cakes: ICakes;
  basket: IBasket;
  remove: (cakes: ICakes) => void;
  update: (cakes: ICakes) => void;
  updateBasket: (basket: IBasket) => void;
}

const SnackbarAlert = forwardRef<HTMLDivElement, AlertProps>(
  function SnackbarAlert(props, ref) {
    return <Alert elevation={6} ref={ref} {...props} />;
  }
);

export const CakesItem: FC<CakesItemProps> = ({
  cakes,
  basket,
  remove,
  update,
  updateBasket,
}) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [openTwo, setOpenTwo] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

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

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChange = (isExpanded: boolean, panel: string) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleRemove = (event: React.MouseEvent) => {
    // prevent bubbling всплытие
    // Предотвращение дальнейшую передачу текущего события
    event.stopPropagation();
    remove(cakes);
  };

  const handleUpdateName = (event: React.MouseEvent) => {
    // prevent bubbling всплытие
    // Предотвращение дальнейшую передачу текущего события
    event.stopPropagation();
    const name = prompt();
    update({ ...cakes, name });
  };

  const handleUpdateDescription = (event: React.MouseEvent) => {
    // prevent bubbling всплытие
    // Предотвращение дальнейшую передачу текущего события
    event.stopPropagation();
    const description = prompt();
    update({ ...cakes, description });
  };

  const handleOrderedCake = (event: React.MouseEvent) => {
    // prevent bubbling всплытие
    // Предотвращение дальнейшую передачу текущего события
    const numOfCakes = cakes.numOfCakes - 1;
    const numOfOrdered = basket.numOfOrdered + 1;
    let price = cakes.price;
    const basketAllPrice = basket.basketAllPrice + price;

    if (cakes.numOfCakes <= 0) {
      setOpen(true);
      return 0;
    } else {
      setOpenTwo(true);
      updateBasket({ ...basket, numOfOrdered, basketAllPrice });
      update({ ...cakes, numOfCakes });
    }
  };

  return (
    // <div className='grid grid-cols-3 gap-2'>
    <Paper
      key={cakes.id}
      className='text-center flex justify-center items-center'
    >
      {/* <Accordion
        expanded={expanded === `panel-${cakes.id}`}
        onChange={(_event, isExpanded) =>
          handleChange(isExpanded, `panel-${cakes.id}`)
        }
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          id={`panel-${cakes.id}`}
          aria-controls={`panel-${cakes.id}`}
        > */}{' '}
      <div
        className='cursor-pointer hover:bg-gray-200 rounded-lg flex justify-center items-center mb-6'
        onClick={handleOpenModal}
      >
        <div>
          <div
            className='font-bold text-3xl rounded-lg p-4 hover:text-white cursor-pointer'
            // onClick={handleUpdateName}
          >
            {cakes.id} - {cakes.name}
          </div>
          <div className='flex justify-center items-center'>
            <img
              className='w-36 h-36 rounded-3xl object-cover border-2 border-black'
              alt={cakes.description}
              src={cakes.img}
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
              {cakes.id} - {cakes.name}
            </div>
            <div className='flex justify-center items-center'>
              <img
                className='w-36 h-36 rounded-3xl object-cover border-2 border-black m-2 p-4'
                alt={cakes.description}
                src={cakes.img}
              />
            </div>
            <div
              className='text-2xl hover:bg-blue-500 rounded-lg p-4 hover:text-white cursor-pointer'
              onClick={handleUpdateDescription}
            >
              {cakes.description}
            </div>
            <div className='text-2xl hover:bg-blue-500 rounded-lg p-4 hover:text-white cursor-pointer'>
              Left cakes - {cakes.numOfCakes}
            </div>
            <div className='text-2xl font-bold hover:bg-blue-500 rounded-lg p-4 hover:text-white cursor-pointer'>
              Price - {cakes.price}
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
          Unfortunately you cant ordered this {cakes.name}!
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
          Ordered success - {cakes.name}!
        </SnackbarAlert>
      </Snackbar>
      {/* </Accordion> */}
    </Paper>

    // </div>
  );
};
