/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  AccessibleForwardOutlined,
  ExpandMore,
  Pending,
} from '@mui/icons-material';
import {
  AccordionDetails,
  AccordionSummary,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { Accordion } from '@mui/material';
import { Box } from '@mui/system';
import { Masonry } from '@mui/lab';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useStore } from 'react-redux';
// import { useDispatch, useSelector, useStore } from 'react-redux';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  fetchBasket,
  orderedBasket,
  orderedBasketOrder,
} from '../basket/basketSlice';

import { fetchCakes, orderedCake, restockedCake } from '../cake/cakeSlice';

// interface ChildrenWrapper {
//   children: JSX.Element | JSX.Element[];
// }
interface ISomeComponentWithGenericsProps<T> {
  value: T;
  expanded: false;
}

function CakeView<T>(props: ISomeComponentWithGenericsProps<T>) {
  const [value, setValue] = useState(0);

  const dispatch = useAppDispatch();

  const cakes = useAppSelector((state) => state.cake);
  const initNumOfCakes = useAppSelector((state) =>
    state.cake.cakes.map((cakeMap) => cakeMap.numOfCakes)
  );
  // const baskets = useAppSelector((state) => state.basket);

  // const cakesStates = useAppSelector((state) => state.cake.cakes);

  // const numOfCakes = useAppSelector((state) =>
  //   state.cake.cakes.map((cakeMap) => cakeMap.numOfCakes)
  // );

  // const idCakes = useAppSelector((state) =>
  //   state.cake.cakes.map((cakeMap) => cakeMap.id)
  // );

  // const idCheckCakes = useAppSelector((state) =>
  //   state.cake.cakes.map((cakeMap) => cakeMap.idCheck)
  // );

  // const initPriceCakes = useAppSelector((state) =>
  //   state.cake.cakes.map((cakeMap) => cakeMap.price)
  // );

  // const priceOfCakes = useAppSelector((state) =>
  //   state.cake.cakes.map((cakeMap) => cakeMap.price)
  // );

  // console.log(numOfCakes, numOfOrdered);
  let initFirstNum = initNumOfCakes;

  const [expanded, setExpanded] = useState<string | false>(props.expanded);

  const handleChange = (isExpanded: boolean, panel: string) => {
    setExpanded(isExpanded ? panel : false);
  };

  const heights = [
    150, 30, 90, 110, 80, 95, 12, 200, 20, 30, 40, 50, 60, 70, 80, 90,
  ];

  const Busket = useAppSelector((state) =>
    state.cake.cakes.map((cakeMap) => {
      return (
        <div key={cakeMap.id} className='p-4 rounded-lg mt-14 '>
          <Typography variant='h4' component='div' className='font-bold'>
            {cakeMap.name}
          </Typography>
          <Accordion
            sx={{ minHeight: heights }}
            expanded={expanded === `panel-${cakeMap.id}`}
            onChange={(_event, isExpanded) =>
              handleChange(isExpanded, `panel-${cakeMap.id}`)
            }
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              id={`panel-${cakeMap.id}`}
              aria-controls={`panel-${cakeMap.id}`}
              className='flex column'
            >
              <div className='flex justify-center'>
                <img
                  className='w-72 h-72 rounded-3xl object-cover border-2 border-black'
                  alt={cakeMap.description}
                  src={cakeMap.img}
                />
              </div>
            </AccordionSummary>

            <AccordionDetails>
              <section>
                <div className='text-1xl'>Price - {cakeMap.price}</div>
                <div className='text-1xl'>Flavour - {cakeMap.flavour}</div>
                <div className='text-1xl'>Color - {cakeMap.color}</div>
                <div className='text-1xl'>
                  Description - {cakeMap.description}
                  <div className='text-xl'>Cakes - {cakeMap.numOfCakes}</div>
                </div>
              </section>
              {/* <h2 className='text-2xl'>Custom restock</h2>
              <input
                className='text-black rounded-lg border-2 border-purple-600 p-2 focus:ring-yellow-600 focus:ring-4 mt-4 mb-4'
                value={value}
                type='number'
                onChange={(e) => setValue(parseInt(e.target.value))}
              />
              <br />
              <button
                onClick={() => {
                  dispatch(restockedCake(value));
                }}
                className='ml-1 p-4 bg-red-600 rounded-lg border-2 border-black hover:bg-red-500'
              >
                Restock cakes
              </button> */}
              {/* <h2 className='text-2xl'>Default restock</h2> */}{' '}
              <button
                onClick={() => {
                  console.log(cakeMap.id);
                  dispatch(orderedCake(cakeMap.id));

                  if (cakeMap.numOfCakes <= 0) {
                    dispatch(orderedBasket(0));
                    dispatch(orderedBasketOrder(0));
                  } else {
                    dispatch(orderedBasket(cakeMap.price));
                    dispatch(orderedBasketOrder(1));
                  }
                }}
                className='p-2 m-2 bg-white rounded-lg border-2 border-black hover:bg-gray-300 shadow-lg w-full'
              >
                Order
              </button>
              <button
                onClick={() => {
                  dispatch(restockedCake(cakeMap.numOfCakes));
                }}
                className='text-white p-2 m-2 bg-red-600 rounded-lg border-2 border-black hover:bg-red-500 w-full'
              >
                Default cakes
              </button>
            </AccordionDetails>
          </Accordion>
        </div>
      );
    })
  );

  useEffect(() => {
    dispatch(fetchCakes());
    dispatch(fetchBasket());
  }, []);
  // const urlEnv = process.env.VITE_URL_DEV;
  // console.log(urlEnv);
  // console.log(initNumOfCakes)
  // const [basket, setBasket] = useState<number>(0);

  // const store = useStore();
  // store.subscribe(() =>
  //   console.log('update', store.getState().cake.numOfCakes)
  // );
  // console.log(store);

  // const changeOrdered = useCallback(() => {
  //   dispatch({ type: 'cake/orderedCake' });
  // }, []);

  // const cakeDisplay = cakesStates.map((item) => {
  //   return (

  //   );
  // });

  return (
    <section className=' rounded-lg p-4'>
      {cakes.loading && (
        <div className='text-3xl font-bold p-4'>
          <Pending
            className=' animate-spin transition duration-300'
            sx={{ height: '100px', width: '100px' }}
          />
          Loading...
        </div>
      )}
      {cakes.error && (
        <div className='font-bold text-3xl bg-red-600 p-4 rounded-lg m-4'>
          Error 404
        </div>
      )}
      {!cakes.loading && (
        <Stack alignItems='center'>
          <Box sx={{ width: 600 }}>
            <Masonry columns={1} spacing={2}>
              <Paper
                sx={
                  {
                    // display: 'flex',
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    // height,
                    // border: '1px solid red',
                  }
                }
              >
                {Busket}
              </Paper>
            </Masonry>
          </Box>
        </Stack>
      )}
    </section>
  );
}
export default memo(CakeView) as typeof CakeView;
