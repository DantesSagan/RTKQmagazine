/* eslint-disable @next/next/no-img-element */
import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import React, { FC, useState } from 'react';
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

export const CakesItem: FC<CakesItemProps> = ({
  cakes,
  basket,
  remove,
  update,
  updateBasket,
}) => {
  const [expanded, setExpanded] = useState<string | false>(false);

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

    updateBasket({ ...basket, numOfOrdered, basketAllPrice });
    update({ ...cakes, numOfCakes });
  };

  const heights = [
    150, 30, 90, 110, 80, 95, 12, 200, 20, 30, 40, 50, 60, 70, 80, 90,
  ];

  return (
    // <div className='grid grid-cols-3 gap-2'>
    <Accordion
      sx={{ minHeight: heights }}
      expanded={expanded === `panel-${cakes.id}`}
      onChange={(_event, isExpanded) =>
        handleChange(isExpanded, `panel-${cakes.id}`)
      }
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        id={`panel-${cakes.id}`}
        aria-controls={`panel-${cakes.id}`}
        className='flex column'
      >
        <div>
          <div
            className='font-bold text-3xl hover:bg-blue-500 rounded-lg p-4 hover:text-white cursor-pointer'
            onClick={handleUpdateName}
          >
            {cakes.id} - {cakes.name}
          </div>
          <div className='flex justify-center'>
            <img
              className='w-72 h-72 rounded-3xl object-cover border-2 border-black'
              alt={cakes.description}
              src={cakes.img}
            />
          </div>
        </div>
      </AccordionSummary>

      <AccordionDetails>
        <div className='p-4 rounded-lg mt-14 border-blue-400 border-2 rounded-xl'>
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
            className='p-4 bg-red-600 hover:bg-red-400 text-white rounded-lg hover:shadow-inner w-full'
          >
            Order
          </button>
          {/* <button
            onClick={handleRemove}
            className='p-4 bg-red-600 hover:bg-red-400 text-white rounded-lg hover:shadow-inner'
          >
            Delete
          </button> */}
        </div>
      </AccordionDetails>
    </Accordion>

    // </div>
  );
};
