// import {
//   createSlice,
//   createEntityAdapter,
//   createSelector,
// } from '@reduxjs/toolkit';

// import { MagazineApi } from '../api/services/apiCakesService';

// // Calling `someEndpoint.select(someArg)` generates a new selector that will return
// // the query result object for a query with those parameters.
// // To generate a selector for a specific query argument, call `select(theQueryArg)`.
// // In this case, the users query has no params, so we don't pass anything to select()
// // export const selectbasketResult = basketApi.endpoints.getbasket.select();

// const basketAdapter = createEntityAdapter();
// const initialState = basketAdapter.getInitialState();

// export const extendedBasketSlice = MagazineApi.injectEndpoints({
//   endpoints: (build) => ({
//     getbasket: build.query({
//       query: () => `/basket`,
//       transformResponse: (responseData) => {
//         return basketAdapter.setAll(initialState, responseData);
//       },
//     }),
//   }),
// });

// export const { useGetbasketQuery } = extendedBasketSlice;

// // Calling `someEndpoint.select(someArg)` generates a new selector that will return
// // the query result object for a query with those parameters.
// // To generate a selector for a specific query argument, call `select(theQueryArg)`.
// // In this case, the users query has no params, so we don't pass anything to select()
// export const selectbasketResult =
//   extendedBasketSlice.endpoints.getbasket.select();

// export const selectbasketData = createSelector(
//   selectbasketResult,
//   (basketResult) =>
//     // basketResult?.data ?? emptybasket
//     basketResult.data
// );

// export const selectbasketById = createSelector(
//   selectbasketData,
//   (state, basketID) => basketID,
//   (basket, basketID) => basket.find((basket) => basket.id === basketID)
// );

// export const { selectAll: selectbasketData, selectById: selectbasketById } =
//   basketAdapter.getSelectors(
//     (state) => selectbasketData(state) ?? initialState
//   );
