import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { ICakes } from '../../../models/ICakes';
import { IBasket } from '../../../models/IBasket';

export const CakesApi = createApi({
  reducerPath: 'cakesApi',
  // Проставим тэги, то есть тэг Cakes
  //
  tagTypes: ['Cakes'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4001/',
  }),

  endpoints: (build) => ({
    fetchAllCakes: build.query<ICakes[], number>({
      query: (limit: number = 5) => ({
        url: `/cakes`,
        params: {
          _limit: limit,
        },
      }),
      // Укажем ednpoints, что он работает с эти тэгом Cakes
      // И может быть несколько endpoints, что работают с разными данными
      // И их необходимо правильно сопоставить
      providesTags: (result) => ['Cakes'],
    }),
    // getCake: build.query<ICakes[], ICakes>({
    //   query: () => '/cakes',
    // }),
    createCakes: build.mutation<ICakes, ICakes>({
      query: (post) => ({
        url: '/cakes',
        method: 'POST',
        body: post,
      }),
      // Этот endpoint обеспечивает доставку данных
      // А при создании поста(Cakes) становятся не актуальными
      invalidatesTags: ['Cakes'],
    }),
    updateCakes: build.mutation<ICakes, ICakes>({
      query: (put) => ({
        url: `/cakes/${put.id}`,
        method: 'PUT',
        body: put,
      }),
      // Этот endpoint обеспечивает доставку данных
      // А при создании поста(Cakes) становятся не актуальными
      invalidatesTags: ['Cakes'],
    }),
    deleteCakes: build.mutation<ICakes, ICakes>({
      query: (del) => ({
        url: `/cakes/${del.id}`,
        method: 'DELETE',
        body: del,
      }),
      // Этот endpoint обеспечивает доставку данных
      // А при создании поста(Cakes) становятся не актуальными
      invalidatesTags: ['Cakes'],
    }),

    fetchAllBasket: build.query<IBasket, number>({
      query: () => `/basket`,
      // Укажем ednpoints, что он работает с эти тэгом basket
      // И может быть несколько endpoints, что работают с разными данными
      // И их необходимо правильно сопоставить
      providesTags: (result) => ['Cakes'],
    }),
    // getCake: build.query<IBasket[], IBasket>({
    //   query: () => '/basket',
    // }),
    updateBasket: build.mutation<IBasket, IBasket>({
      query: (put) => ({
        url: `/basket`,
        method: 'PUT',
        body: put,
      }),
      // Этот endpoint обеспечивает доставку данных
      // А при создании поста(basket) становятся не актуальными
      invalidatesTags: ['Cakes'],
    }),
    deleteBasket: build.mutation<IBasket, IBasket>({
      query: (del) => ({
        url: `/basket/${del.id}`,
        method: 'DELETE',
        body: del,
      }),
      // Этот endpoint обеспечивает доставку данных
      // А при создании поста(basket) становятся не актуальными
      invalidatesTags: ['Cakes'],
    }),
  }),
});
export const {
  useCreateCakesMutation,
  useDeleteCakesMutation,
  useUpdateCakesMutation,
  useFetchAllCakesQuery,
  useFetchAllBasketQuery,
  useUpdateBasketMutation,
  useDeleteBasketMutation,
} = CakesApi;
