import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type IceCream = {
  id: number;
  name: string;
  idCheck: number;
  price: number;
  description: string;
  flavour: string;
  color: string;
  numOfIceCream: number;
  img?: string;
};

type InitialState = {
  loading: boolean;
  iceCream: IceCream[];
  error: string;
};

const initialState: InitialState = {
  loading: false,
  iceCream: [],
  error: '',
};

// Generates pending, fulfilled and rejected action types
export const fetchIceCream = createAsyncThunk(
  'iceCream/fetchIceCream',
  async () => {
    const urlEnvBuild = process.env.NEXT_PUBLIC_URL_BUILD;
    const urlEnvDev = process.env.NEXT_PUBLIC_URL_DEV;

    if (`http://${urlEnvDev}/iceCream`) {
      return axios.get(`http://${urlEnvDev}/iceCream`).then((resposnse) =>
        resposnse.data.map((iceCream: []) => {
          return iceCream;
        })
      );
    } else if (`http://${urlEnvBuild}/iceCream`) {
      return axios.get(`http://${urlEnvBuild}/iceCream`).then((resposnse) =>
        resposnse.data.map((iceCream: []) => {
          return iceCream;
        })
      );
    } else {
      console.log('mistake');
    }
  }
);

const IceCreamlice = createSlice({
  name: 'iceCream',
  initialState,
  reducers: {
    orderedIceCream(state, action: PayloadAction<number>) {
      state.iceCream.map((iceCream) => {
        if (iceCream.id === action.payload) {
          if (iceCream.numOfIceCream <= 0) {
            iceCream.numOfIceCream;
          } else {
            iceCream.numOfIceCream--;
          }
        }
      });
    },

    restockedIceCream(state, action: PayloadAction<number>) {
      state.iceCream.map((IceCream) => {
        IceCream.numOfIceCream += action.payload;
      });
    },
  },
  extraReducers: (builder) => {
    // pending - wait for incoming request
    builder.addCase(fetchIceCream.pending, (state) => {
      state.loading = true;
    });
    // fulfilled - when request succeed
    builder.addCase(
      fetchIceCream.fulfilled,
      (state, action: PayloadAction<IceCream[]>) => {
        state.loading = false;
        state.iceCream = action.payload;
        state.error = '';
      }
    );
    // rejected - when request have an a error, when request failed
    builder.addCase(fetchIceCream.rejected, (state, action) => {
      state.loading = false;
      state.iceCream = [];
      state.error = action.error.message || 'Something went wrong';
    });
  },
});

export default IceCreamlice.reducer;
export const { orderedIceCream, restockedIceCream } = IceCreamlice.actions;
