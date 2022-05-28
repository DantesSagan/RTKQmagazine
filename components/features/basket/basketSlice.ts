import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type Basket = {
  id: number;
  numOfOrdered: number;
  basketAllPrice: number;
};

type InitialState = {
  loading: boolean;
  basket: Basket[];
  error: string;
};

const initialState: InitialState = {
  loading: false,
  basket: [],
  error: '',
};

// Generates pending, fulfilled and rejected action types
export const fetchBasket = createAsyncThunk('basket/fetchBasket', async () => {
  const urlEnvBuild = process.env.NEXT_PUBLIC_URL_BUILD;
  const urlEnvDev = process.env.NEXT_PUBLIC_URL_DEV;

  if (`http://${urlEnvDev}/basket`) {
    return axios.get(`http://${urlEnvDev}/basket`).then((resposnse) =>
      resposnse.data.map((basket: []) => {
        return basket;
      })
    );
  } else if (`http://${urlEnvBuild}/basket`) {
    return axios.get(`http://${urlEnvBuild}/basket`).then((resposnse) =>
      resposnse.data.map((basket: []) => {
        return basket;
      })
    );
  } else {
    console.log('mistake');
  }
});

const basketlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    orderedBasket(state, action: PayloadAction<number>) {
      state.basket.map((basket) => {
        // if (cake.id === cake.idCheck) {
        // basket.basketAllPrice--;
        // }
        basket.basketAllPrice += action.payload;
      });
    },
    orderedBasketOrder(state, action: PayloadAction<number>) {
      state.basket.map((basket) => {
        // if (cake.id === cake.idCheck) {
        // basket.basketAllPrice--;
        // }
        basket.numOfOrdered += action.payload;
      });
    },
    nullBasket(state, action: PayloadAction<number>) {
      state.basket.map((basket) => {
        // if (cake.id === cake.idCheck) {
        // basket.basketAllPrice--;
        // }
        basket.basketAllPrice *= action.payload;
      });
    },
    nullOrdered(state, action: PayloadAction<number>) {
      state.basket.map((basket) => {
        // if (cake.id === cake.idCheck) {
        // basket.basketAllPrice--;
        // }
        basket.numOfOrdered *= action.payload;
      });
    },
  },
  extraReducers: (builder) => {
    // pending - wait for incoming request
    builder.addCase(fetchBasket.pending, (state) => {
      state.loading = true;
    });
    // fulfilled - when request succeed
    builder.addCase(
      fetchBasket.fulfilled,
      (state, action: PayloadAction<Basket[]>) => {
        state.loading = false;
        state.basket = action.payload;
        state.error = '';
      }
    );
    // rejected - when request have an a error, when request failed
    builder.addCase(fetchBasket.rejected, (state, action) => {
      state.loading = false;
      state.basket = [];
      state.error = action.error.message || 'Something went wrong';
    });
  },
});

export default basketlice.reducer;
export const { orderedBasket, orderedBasketOrder, nullBasket, nullOrdered } =
  basketlice.actions;
