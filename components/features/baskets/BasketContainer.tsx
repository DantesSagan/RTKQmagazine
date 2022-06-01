/* eslint-disable react-hooks/exhaustive-deps */
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Pending } from '@mui/icons-material';
import React, { useEffect } from 'react';

import { BasketItem } from './BasketItem';
import { IBasket } from '../../models/IBasket';
import {
  useDeleteBasketMutation,
  useFetchAllBasketQuery,
  useUpdateBasketMutation,
} from '../../app/store/basket/BasketApi';

export default function BasketViewNavBar() {
  const { data: basket, error, isLoading } = useFetchAllBasketQuery();
  const [updateBasket, {}] = useUpdateBasketMutation();
  const [deleteBasket, {}] = useDeleteBasketMutation();
  // const { data: basketOne } = useGetBasketQuery(1);
  //   const basketAll = basket.basket.map((item) => item.basketAllPrice);
  //   const orderedAll = basket.basket.map((item) => item.numOfOrdered);
  //   const numOfPrice = Number(basketAll);
  //   const numOfOrdered = Number(orderedAll);
  // console.log(basketOne);
  const handleUpdateBasket = (basket: IBasket) => {
    updateBasket(basket);
  };

  return (
    <nav className='w-full bg-black border-8 border-blue-600 fixed z-10'>
      <div className='text-3xl  text-white '>
        {isLoading && (
          <div className='text-3xl font-bold col-span-2 p-2'>
            <Pending className='animate-spin transition duration-300 ' />{' '}
            Loading...
          </div>
        )}
        {!isLoading && error && (
          <div className='font-bold text-3xl bg-red-600 rounded-lg col-span-2 p-2'>
            Error 404
          </div>
        )}
        {!isLoading && (
          <div>
            {basket && (
              <BasketItem
                handleUpdateBasket={handleUpdateBasket}
                basket={basket}
              />
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
