import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';
import { IBasket } from '../../../models/IBasket';
import { MagazineApi } from '../base/apiMagazineService';

const basketAdapter = createEntityAdapter();
const initialState = basketAdapter.getInitialState();

export const extendedBasketSlice = MagazineApi.injectEndpoints({
  endpoints: (build) => ({
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
  useFetchAllBasketQuery,
  useUpdateBasketMutation,
  useDeleteBasketMutation,
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
