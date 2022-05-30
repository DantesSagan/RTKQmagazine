import { ExpandMore, Pending } from '@mui/icons-material';
import { Masonry } from '@mui/lab';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Paper,
  Stack,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ICakes } from '../../models/ICakes';
import { IBasket } from '../../models/IBasket';
import {
  useCreateCakesMutation,
  useDeleteCakesMutation,
  useFetchAllCakesQuery,
  useUpdateCakesMutation,
} from '../../app/store/base/apiMagazineService';
import { CakesItem } from './CakesItem';
import {
  useDeleteBasketMutation,
  useUpdateBasketMutation,
  useFetchAllBasketQuery,
} from '../../app/store/basket/BasketApi';

export const CakesContainer = () => {
  const [limit, setLimit] = useState(10);
  const {
    data: cakes,
    error,
    isLoading,
  } = useFetchAllCakesQuery(limit, {
    //   How frequently to automatically re-fetch data (in milliseconds). Defaults to 0 (off).
    // pollingInterval: 1000,
  });

  const [updateCakes, {}] = useUpdateCakesMutation();
  const [deleteCakes, {}] = useDeleteCakesMutation();
  const [createCakes, {}] = useCreateCakesMutation();

  const {
    data: basket,
    error: errorBasket,
    isLoading: isLoadingBasket,
  } = useFetchAllBasketQuery(1);
  const [updateBasket, {}] = useUpdateBasketMutation();
  const [deleteBasket, {}] = useDeleteBasketMutation();

  const handleUpdateBasket = (basket: IBasket) => {
    updateBasket(basket);
  };
  const [expanded, setExpanded] = useState<string | false>(false);

  const [name, setName] = useState<string>(null);
  const [price, setPrice] = useState<number>(null);
  const [description, setDescription] = useState<string>(null);
  const [flavour, setFlavour] = useState<string>(null);
  const [color, setColor] = useState<string>(null);
  const [numOfCakes, setNumOfCakes] = useState<number>(null);
  const [img, setImg] = useState<string>(null);

  const handleCreate = async () => {
    // const name = prompt();

    await createCakes({
      name,
      price,
      description,
      flavour,
      color,
      numOfCakes,
      img,
    } as ICakes);
  };
  const handleUpdate = (cakes: ICakes) => {
    updateCakes(cakes);
  };
  const handleRemove = (cakes: ICakes) => {
    deleteCakes(cakes);
  };
  const handleChange = (isExpanded: boolean, panel: string) => {
    setExpanded(isExpanded ? panel : false);
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLimit(5);
  //   }, 2000);
  // }, []);
  return (
    <div>
      {isLoading ? (
        <div className='text-3xl font-bold p-4'>
          <Pending
            className=' animate-spin transition duration-300'
            sx={{ height: '100px', width: '100px' }}
          />
          Loading...
        </div>
      ) : error ? (
        <div className='font-bold text-3xl bg-red-600 p-4 rounded-lg m-4'>
          Error 404
        </div>
      ) : cakes ? (
        <Stack alignItems='center'>
          <div className='w-fit'>
            {/* <div className='grid grid-cols-2 grid-flow-row '>
              <Accordion
                expanded={expanded === `panel-${1}`}
                onChange={(_event, isExpanded) =>
                  handleChange(isExpanded, `panel-${1}`)
                }
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  id={`panel-${1}`}
                  aria-controls={`panel-${1}`}
                  className='flex column'
                >
                  <h2 className='text-2xl text-center font-bold'>
                    Create Cake
                  </h2>
                </AccordionSummary>

                <AccordionDetails>
                  <div className='p-2 rounded-lg border-blue-400 border-2 rounded-xl'>
                    <div className='grid grid-cols-1 grid-rows-2'>
                      <button
                        onClick={handleCreate}
                        className='p-2 bg-red-600 hover:bg-red-400 text-white rounded-lg hover:shadow-inner w-full mb-2 mt-2'
                      >
                        Create Cake
                      </button>{' '}
                      <label htmlFor='name'>Name</label>
                      <input
                        id='name'
                        className='p-2 border-2 border-blue-400 text-xl rounded-sm'
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className='grid grid-cols-1 grid-rows-2'>
                      {' '}
                      <label htmlFor='price'>Price</label>
                      <input
                        id='price'
                        className='p-2 border-2 border-blue-400 text-xl rounded-sm'
                        onChange={(e) => setPrice(parseInt(e.target.value))}
                      />
                    </div>
                    <div className='grid grid-cols-1 grid-rows-2'>
                      {' '}
                      <label htmlFor='description'>Description</label>
                      <input
                        id='description'
                        className='p-2 border-2 border-blue-400 text-xl rounded-sm'
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div className='grid grid-cols-1 grid-rows-2'>
                      {' '}
                      <label htmlFor='flavour'>Flavour</label>
                      <input
                        id='flavour'
                        className='p-2 border-2 border-blue-400 text-xl rounded-sm'
                        onChange={(e) => setFlavour(e.target.value)}
                      />
                    </div>
                    <div className='grid grid-cols-1 grid-rows-2'>
                      {' '}
                      <label htmlFor='color'>Color</label>
                      <input
                        id='color'
                        className='p-2 border-2 border-blue-400 text-xl rounded-sm'
                        onChange={(e) => setColor(e.target.value)}
                      />
                    </div>
                    <div className='grid grid-cols-1 grid-rows-2'>
                      {' '}
                      <label htmlFor='numOfCakes'>NumOfCakes</label>
                      <input
                        id='numOfCakes'
                        className='p-2 border-2 border-blue-400 text-xl rounded-sm'
                        onChange={(e) =>
                          setNumOfCakes(parseInt(e.target.value))
                        }
                      />
                    </div>
                    <div className='grid grid-cols-1 grid-rows-2'>
                      {' '}
                      <label htmlFor='img'>Img</label>
                      <input
                        id='img'
                        className='p-2 border-2 border-blue-400 text-xl rounded-sm'
                        onChange={(e) => setImg(e.target.value)}
                      />
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion> */}
            <div className='bg-blue-200 border-2 border-blue-400 rounded-lg p-2 m-2 w-fit '>
              <div className='grid grid-cols-3  gap-2'>
                {cakes &&
                  cakes.map((cakes) => (
                    <CakesItem
                      key={cakes.id}
                      cakes={cakes}
                      basket={basket}
                      update={handleUpdate}
                      remove={handleRemove}
                      updateBasket={handleUpdateBasket}
                    />
                  ))}
              </div>
            </div>
          </div>
          {/* </div> */}
        </Stack>
      ) : null}
    </div>
  );
};
