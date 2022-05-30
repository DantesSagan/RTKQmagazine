import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';
import { ICream } from '../../../models/ICreamIce';
import { MagazineApi } from '../base/apiMagazineService';

// const basketAdapter = createEntityAdapter();
// const initialState = basketAdapter.getInitialState();

export const extendedBasketSlice = MagazineApi.injectEndpoints({
  endpoints: (build) => ({
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
  }),
});

export const {
  useFetchAllCreamQuery,
  useUpdateIceCreamMutation,
  useDeleteIceCreamMutation,
  useCreateIceCreamMutation,
} = extendedBasketSlice;

// // Calling `someEndpoint.select(someArg)` generates a new selector that will return
// // the query result object for a query with those parameters.
// // To generate a selector for a specific query argument, call `select(theQueryArg)`.
// // In this case, the users query has no params, so we don't pass anything to select()
// export const selectBasketResult =
//   extendedBasketSlice.endpoints.getBasket.select(1);

// export const selectBasketData = createSelector(
//   selectBasketResult,
//   (basketResult) =>
//     // basketResult?.data ?? emptybasket
//     basketResult.data
// );

// export const selectBasketById = createSelector(
//   selectBasketData,
//   (state, basketID) => basketID,
//   (basket, basketID) => basket.find((basket) => basket.id === basketID)
// );

// export const { selectAll: selectBasketData, selectById: selectBasketById } =
//   basketAdapter.getSelectors(
//     (state) => selectBasketData(state) ?? initialState
//   );
