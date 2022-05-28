import { CurrencyRuble, ShoppingBasket } from '@mui/icons-material';
import React, { FC } from 'react';
import { IBasket } from '../../models/IBasket';

interface BasketItemProps {
  basket: IBasket;
  handleUpdateBasket: (basket: IBasket) => void;
}

export const BasketItem: FC<BasketItemProps> = ({
  basket,
  handleUpdateBasket,
}) => {
  const nullNumOfOrderedAndSumm = (event: React.MouseEvent) => {
    event.stopPropagation();
    const basketAllPrice = basket.basketAllPrice * 0;
    const numOfOrdered = basket.numOfOrdered * 0;
    handleUpdateBasket({ ...basket, numOfOrdered, basketAllPrice });
  };

  return (
    <div>
      <div className='float-left text-3xl font-bold p-2'>
        Delicious magazine
      </div>
      <div className='float-right p-2 dropdown hover:bg-gray-700 rounded-lg transition duration-300 cursor-pointer mr-6'>
        {basket.basketAllPrice > 0 && basket.numOfOrdered > 0 ? (
          <span className='flex h-3 w-3 relative float-right'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75'></span>
            <span className='relative inline-flex rounded-full h-3 w-3 bg-sky-500'></span>
          </span>
        ) : null}
        Magazine
        <div className='p-2 dropdown-content  hover:block text-black bg-blue-300 shadow-inner'>
          <ShoppingBasket /> - {basket.numOfOrdered} <br />
          <CurrencyRuble />- {basket.basketAllPrice}{' '}
          <button
            onClick={nullNumOfOrderedAndSumm}
            className='p-2 bg-red-600 rounded-lg border-2 border-black hover:bg-red-500'
          >
            Default
          </button>
        </div>
      </div>
    </div>
  );
};
