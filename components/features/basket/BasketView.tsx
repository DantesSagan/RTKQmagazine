/* eslint-disable react-hooks/exhaustive-deps */
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Pending } from '@mui/icons-material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  fetchBasket,
  nullBasket,
  nullOrdered,
  orderedBasket,
} from './basketSlice';

export default function BasketViewNavBar() {
  const dispatch = useAppDispatch();
  const baskets = useAppSelector((state) => state.basket);
  const basketAll = baskets.basket.map((item) => item.basketAllPrice);
  const orderedAll = baskets.basket.map((item) => item.numOfOrdered);
  const numOfPrice = Number(basketAll);
  const numOfOrdered = Number(orderedAll);

  useEffect(() => {
    dispatch(fetchBasket());
  }, []);

  return (
    <nav className='w-full bg-black border-8 border-blue-600 fixed z-10'>
      <div className='text-3xl  text-white '>
        {baskets.loading && (
          <div className='text-3xl font-bold col-span-2 p-2'>
            <Pending className='animate-spin transition duration-300 ' />{' '}
            Loading...
          </div>
        )}
        {!baskets.loading && baskets.error && (
          <div className='font-bold text-3xl bg-red-600 rounded-lg col-span-2 p-2'>
            Error 404
          </div>
        )}
        {!baskets.loading && (
          <div>
            <div className='float-left text-3xl font-bold p-2'>
              Delicious magazine
            </div>
            <div className='float-right p-2 dropdown hover:bg-gray-700 rounded-lg transition duration-300 cursor-pointer mr-6'>
              {numOfOrdered > 0 && numOfPrice > 0 ? (
                <span className='flex h-3 w-3 relative float-right'>
                  <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75'></span>
                  <span className='relative inline-flex rounded-full h-3 w-3 bg-sky-500'></span>
                </span>
              ) : null}
              Magazine
              <div className='p-2 dropdown-content  hover:block text-black bg-blue-300 shadow-inner'>
                <ShoppingBasketIcon /> - {numOfOrdered} <br />
                <CurrencyRubleIcon />- {numOfPrice}{' '}
                <button
                  onClick={() => {
                    dispatch(nullBasket(0));
                    dispatch(nullOrdered(0));
                  }}
                  className='p-2 bg-red-600 rounded-lg border-2 border-black hover:bg-red-500'
                >
                  Default
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
