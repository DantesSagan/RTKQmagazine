/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { ExpandMore, Pending } from '@mui/icons-material';
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
import { useEffect, useState } from 'react';
// import { useStore } from 'react-redux';
// import { useDispatch, useSelector, useStore } from 'react-redux';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  fetchBasket,
  orderedBasket,
  orderedBasketOrder,
} from '../basket/basketSlice';

import {
  fetchIceCream,
  orderedIceCream,
  restockedIceCream,
} from '../icecream/iceCreamSlice';

// interface ChildrenWrapper {
//   children: JSX.Element | JSX.Element[];
// }
interface ISomeComponentWithGenericsProps<T> {
  value: T;
  expanded: false;
}

export default function IceCreamView<T>(
  props: ISomeComponentWithGenericsProps<T>
) {
  // const [value, setValue] = useState(0);

  const dispatch = useAppDispatch();

  const baskets = useAppSelector((state) => state.basket);
  const iceCreams = useAppSelector((state) => state.iceCream);

  const iceCreamsStates = useAppSelector((state) => state.iceCream.iceCream);

  const initNumOficeCreams = useAppSelector((state) =>
    state.iceCream.iceCream.map((iceCreamMap) => iceCreamMap.numOfIceCream)
  );

  const numOficeCreams = useAppSelector((state) =>
    state.iceCream.iceCream.map((iceCreamMap) => iceCreamMap.numOfIceCream)
  );

  // const idiceCreams = useAppSelector((state) =>
  //   state.iceCream.iceCream.map((iceCreamMap) => iceCreamMap.id)
  // );

  // const idCheckiceCreams = useAppSelector((state) =>
  //   state.iceCream.iceCream.map((iceCreamMap) => iceCreamMap.idCheck)
  // );

  // const initPriceiceCreams = useAppSelector((state) =>
  //   state.iceCream.iceCream.map((iceCreamMap) => iceCreamMap.price)
  // );

  // const priceOficeCreams = useAppSelector((state) =>
  //   state.iceCream.iceCream.map((iceCreamMap) => iceCreamMap.price)
  // );

  // console.log(numOficeCreams, numOfOrdered);
  let initFirstNum = initNumOficeCreams;

  const [expanded, setExpanded] = useState<string | false>(props.expanded);

  const handleChange = (isExpanded: boolean, panel: string) => {
    setExpanded(isExpanded ? panel : false);
  };

  const heights = [
    150, 30, 90, 110, 80, 95, 12, 200, 20, 30, 40, 50, 60, 70, 80, 90,
  ];

  const Busket = useAppSelector((state) =>
    state.iceCream.iceCream.map((iceCreamMap) => {
      return (
        <div key={iceCreamMap.id} className='p-4 rounded-lg mt-14 '>
          <Typography variant='h4' component='div' className='font-bold'>
            {iceCreamMap.name}
          </Typography>
          <Accordion
            sx={{ minHeight: heights }}
            expanded={expanded === `panel-${iceCreamMap.id}`}
            onChange={(_event, isExpanded) =>
              handleChange(isExpanded, `panel-${iceCreamMap.id}`)
            }
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              id={`panel-${iceCreamMap.id}`}
              aria-controls={`panel-${iceCreamMap.id}`}
              className='flex column'
            >
              <div className='flex justify-center'>
                <img
                  className='w-72 h-72 rounded-3xl object-cover border-2 border-black'
                  alt={iceCreamMap.description}
                  src={iceCreamMap.img}
                />
              </div>{' '}
            </AccordionSummary>

            <AccordionDetails>
              <section>
                <div className='text-1xl'>Price - {iceCreamMap.price}</div>
                <div className='text-1xl'>Flavour - {iceCreamMap.flavour}</div>
                <div className='text-1xl'>Color - {iceCreamMap.color}</div>
                <div className='text-1xl'>
                  Description - {iceCreamMap.description}
                  <div className='text-xl'>
                    iceCreams - {iceCreamMap.numOfIceCream}
                  </div>
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
                  dispatch(restockediceCream(value));
                }}
                className='ml-1 p-4 bg-red-600 rounded-lg border-2 border-black hover:bg-red-500'
              >
                Restock iceCreams
              </button> */}
              {/* <h2 className='text-2xl'>Default restock</h2> */}{' '}
              <button
                onClick={() => {
                  console.log(iceCreamMap.id);
                  dispatch(orderedIceCream(iceCreamMap.id));

                  if (iceCreamMap.numOfIceCream <= 0) {
                    dispatch(orderedBasket(0));
                    dispatch(orderedBasketOrder(0));
                  } else {
                    dispatch(orderedBasket(iceCreamMap.price));
                    dispatch(orderedBasketOrder(1));
                  }
                }}
                className='p-2 m-2 bg-white rounded-lg border-2 border-black hover:bg-gray-300 shadow-lg w-full'
              >
                Order
              </button>
              <button
                onClick={() => {
                  const firstNum = Number(initFirstNum);
                  const secondNum = Number(numOficeCreams);
                  console.log(secondNum);
                  if (firstNum > secondNum) {
                    let diff = firstNum - secondNum;
                    dispatch(restockedIceCream(diff));
                  }
                }}
                className='text-white p-2 m-2 bg-red-600 rounded-lg border-2 border-black hover:bg-red-500 w-full'
              >
                Default iceCreams
              </button>
            </AccordionDetails>
          </Accordion>
        </div>
      );
    })
  );

  useEffect(() => {
    dispatch(fetchIceCream());
    dispatch(fetchBasket());
  }, []);

  // console.log(initNumOficeCreams)
  // const [basket, setBasket] = useState<number>(0);

  // const store = useStore();
  // store.subscribe(() =>
  //   console.log('update', store.getState().iceCream.numOfIceCreams)
  // );
  // console.log(store);

  // const changeOrdered = useCallback(() => {
  //   dispatch({ type: 'iceCream/orderediceCream' });
  // }, []);

  // const iceCreamDisplay = iceCreamsStates.map((item) => {
  //   return (

  //   );
  // });

  return (
    <section className=' rounded-lg p-4'>
      {iceCreams.loading && (
        <div className='text-3xl font-bold p-4'>
          <Pending
            className='animate-spin transition duration-300'
            sx={{ height: '100px', width: '100px' }}
          />{' '}
          Loading...
        </div>
      )}
      {iceCreams.error && (
        <div className='font-bold text-3xl bg-red-600 p-4 rounded-lg m-4'>
          Error 404
        </div>
      )}
      {!iceCreams.loading && (
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
