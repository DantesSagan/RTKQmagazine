import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import {IBasket} from '../../../models/IBasket'

export const BasketApi = createApi({
  reducerPath: 'basketApi',
  // Проставим тэги, то есть тэг basket
  //
  tagTypes: ['Basket'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4001/',
  }),

  endpoints: (build) => ({
    fetchAllBasket: build.query<IBasket, number>({
      query: () => `/basket`,
      // Укажем ednpoints, что он работает с эти тэгом basket
      // И может быть несколько endpoints, что работают с разными данными
      // И их необходимо правильно сопоставить
      providesTags: (result) => ['Basket'],
    }),
    // getCake: build.query<IBasket[], IBasket>({
    //   query: () => '/basket',
    // }),
    updateBasket: build.mutation<IBasket, IBasket>({
      query: (put) => ({
        url: `/basket/${put.id}`,
        method: 'PUT',
        body: put,
      }),
      // Этот endpoint обеспечивает доставку данных
      // А при создании поста(basket) становятся не актуальными
      invalidatesTags: ['Basket'],
    }),
    deleteBasket: build.mutation<IBasket, IBasket>({
      query: (del) => ({
        url: `/basket/${del.id}`,
        method: 'DELETE',
        body: del,
      }),
      // Этот endpoint обеспечивает доставку данных
      // А при создании поста(basket) становятся не актуальными
      invalidatesTags: ['Basket'],
    }),
  }),
});
export const {
  useDeleteBasketMutation,
  useFetchAllBasketQuery,
  useUpdateBasketMutation,
} = BasketApi;
