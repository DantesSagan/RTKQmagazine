import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { ICakes } from '../../../models/ICakes';
import { IBasket } from '../../../models/IBasket';
import { ICream } from '../../../models/ICreamIce';
import { HYDRATE } from 'next-redux-wrapper';

// const urlEnvBuild = process.env.NEXT_PUBLIC_URL_BUILD;
// const urlEnvDev = process.env.NEXT_PUBLIC_URL_DEV;
// https://dantessagan-rtkqmagazine-69rj9v57wfxq6r.github.dev/
export const MagazineApi = createApi({
  reducerPath: 'MagazineApi',
  // Проставим тэги, то есть тэг Cakes
  tagTypes: ['Magazine'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4001/',
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({
    // CAKES
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
      providesTags: (result) => ['Magazine'],
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
      invalidatesTags: ['Magazine'],
    }),
    updateCakes: build.mutation<ICakes, ICakes>({
      query: (put) => ({
        url: `/cakes/${put.id}`,
        method: 'PUT',
        body: put,
      }),
      // Этот endpoint обеспечивает доставку данных
      // А при создании поста(Cakes) становятся не актуальными
      invalidatesTags: ['Magazine'],
    }),
    deleteCakes: build.mutation<ICakes, ICakes>({
      query: (del) => ({
        url: `/cakes/${del.id}`,
        method: 'DELETE',
        body: del,
      }),
      // Этот endpoint обеспечивает доставку данных
      // А при создании поста(Cakes) становятся не актуальными
      invalidatesTags: ['Magazine'],
    }),

    // ICE CREAM
    fetchAllCream: build.query<ICream[], number>({
      query: (limit: number = 5) => ({
        url: `/iceCream`,
        params: {
          _limit: limit,
        },
      }),
      // Укажем ednpoints, что он работает с эти тэгом Cakes
      // И может быть несколько endpoints, что работают с разными данными
      // И их необходимо правильно сопоставить
      providesTags: (result) => ['Magazine'],
    }),
    // getCake: build.query<ICream[], ICream>({
    //   query: () => '/cakes',
    // }),
    createIceCream: build.mutation<ICream, ICream>({
      query: (post) => ({
        url: '/iceCream',
        method: 'POST',
        body: post,
      }),
      // Этот endpoint обеспечивает доставку данных
      // А при создании поста(Cakes) становятся не актуальными
      invalidatesTags: ['Magazine'],
    }),
    updateIceCream: build.mutation<ICream, ICream>({
      query: (put) => ({
        url: `/iceCream/${put.id}`,
        method: 'PUT',
        body: put,
      }),
      // Этот endpoint обеспечивает доставку данных
      // А при создании поста(Cakes) становятся не актуальными
      invalidatesTags: ['Magazine'],
    }),
    deleteIceCream: build.mutation<ICream, ICream>({
      query: (del) => ({
        url: `/iceCream/${del.id}`,
        method: 'DELETE',
        body: del,
      }),
      // Этот endpoint обеспечивает доставку данных
      // А при создании поста(Cakes) становятся не актуальными
      invalidatesTags: ['Magazine'],
    }),

    // BASKET
    fetchAllBasket: build.query<IBasket, number>({
      query: () => `/basket`,
      // Укажем ednpoints, что он работает с эти тэгом basket
      // И может быть несколько endpoints, что работают с разными данными
      // И их необходимо правильно сопоставить
      providesTags: (result) => ['Magazine'],
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
      invalidatesTags: ['Magazine'],
    }),
    deleteBasket: build.mutation<IBasket, IBasket>({
      query: (del) => ({
        url: `/basket/${del.id}`,
        method: 'DELETE',
        body: del,
      }),
      // Этот endpoint обеспечивает доставку данных
      // А при создании поста(basket) становятся не актуальными
      invalidatesTags: ['Magazine'],
    }),
  }),
});
export const {
  useFetchAllCakesQuery,
  useCreateCakesMutation,
  useDeleteCakesMutation,
  useUpdateCakesMutation,
  useFetchAllBasketQuery,
  useUpdateBasketMutation,
  useDeleteBasketMutation,
  useFetchAllCreamQuery,
  useCreateIceCreamMutation,
  useDeleteIceCreamMutation,
  useUpdateIceCreamMutation,
} = MagazineApi;
