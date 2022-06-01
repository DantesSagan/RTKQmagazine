// import {
//   createSlice,
//   createEntityAdapter,
//   createSelector,
// } from '@reduxjs/toolkit';
import { IUsers } from '../../../models/IUsers';
import { MagazineApi } from '../base/apiMagazineService';

// const basketAdapter = createEntityAdapter();
// const initialState = basketAdapter.getInitialState();

export const extendedUsersSlice = MagazineApi.injectEndpoints({
  endpoints: (build) => ({
    // ICE CREAM
    fetchAllUsers: build.query<IUsers[], number>({
      query: (limit: number = 5) => ({
        url: `/users`,
        params: {
          _limit: limit,
        },
      }),
      // Укажем ednpoints, что он работает с эти тэгом Cakes
      // И может быть несколько endpoints, что работают с разными данными
      // И их необходимо правильно сопоставить
      providesTags: (result) => ['Magazine'],
    }),
    // getCake: build.query<IUsers[], IUsers>({
    //   query: () => '/cakes',
    // }),
    createUser: build.mutation<IUsers, IUsers>({
      query: (post) => ({
        url: '/users',
        method: 'POST',
        body: post,
      }),
      // Этот endpoint обеспечивает доставку данных
      // А при создании поста(Cakes) становятся не актуальными
      invalidatesTags: ['Magazine'],
    }),
    updateUser: build.mutation<IUsers, IUsers>({
      query: (put) => ({
        url: `/users/${put.id}`,
        method: 'PUT',
        body: put,
      }),
      // Этот endpoint обеспечивает доставку данных
      // А при создании поста(Cakes) становятся не актуальными
      invalidatesTags: ['Magazine'],
    }),
    deleteUser: build.mutation<IUsers, IUsers>({
      query: (del) => ({
        url: `/users/${del.id}`,
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
  useFetchAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useCreateUserMutation,
} = extendedUsersSlice;

// // Calling `someEndpoint.select(someArg)` generates a new selector that will return
// // the query result object for a query with those parameters.
// // To generate a selector for a specific query argument, call `select(theQueryArg)`.
// // In this case, the users query has no params, so we don't pass anything to select()
// export const selectBasketResult =
//   extendedUsersSlice.endpoints.getBasket.select(1);

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
