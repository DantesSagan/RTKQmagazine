import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import.meta.env.NEXT_PUBLIC_URL_BUILD;
type Cakes = {
  id: number;
  name: string;
  idCheck: number;
  price: number;
  description: string;
  flavour: string;
  color: string;
  numOfCakes: number;
  img: string;
};

type InitialState = {
  loading: boolean;
  cakes: Cakes[];
  error: string;
};

const initialState: InitialState = {
  loading: false,
  cakes: [],
  error: '',
};

// Generates pending, fulfilled and rejected action types
export const fetchCakes = createAsyncThunk('cakes/fetchCakes', async () => {
  const urlEnvBuild = process.env.NEXT_PUBLIC_URL_BUILD;
  const urlEnvDev = process.env.NEXT_PUBLIC_URL_DEV;
  if (`http://${urlEnvDev}/cakes`) {
    return axios.get(`http://${urlEnvDev}/cakes`).then((resposnse) =>
      resposnse.data.map((cakes: []) => {
        return cakes;
      })
    );
  } else if (`http://${urlEnvBuild}/cakes`) {
    return axios.get(`http://${urlEnvBuild}/cakes`).then((resposnse) =>
      resposnse.data.map((cakes: []) => {
        return cakes;
      })
    );
  } else {
    console.log('mistake');
  }
});

const cakeSlice = createSlice({
  name: 'cake',
  initialState,
  reducers: {
    orderedCake(state, action: PayloadAction<number>) {
      state.cakes.map((cake) => {
        if (cake.id === action.payload) {
          if (cake.numOfCakes <= 0) {
            cake.numOfCakes;
          } else {
            cake.numOfCakes--;
          }
        }
      });
    },

    restockedCake(state, action: PayloadAction<number>) {
      state.cakes.map((cake) => {
        // if (cake.numOfCakes > action.payload) {
        //   let diff = cake.numOfCakes - action.payload;
        //   return (diff += action.payload);
        // }
        cake.numOfCakes += action.payload;
      });
    },
  },
  extraReducers: (builder) => {
    // pending - wait for incoming request
    builder.addCase(fetchCakes.pending, (state) => {
      state.loading = true;
    });
    // fulfilled - when request succeed
    builder.addCase(
      fetchCakes.fulfilled,
      (state, action: PayloadAction<Cakes[]>) => {
        state.loading = false;
        state.cakes = action.payload;
        state.error = '';
      }
    );
    // rejected - when request have an a error, when request failed
    builder.addCase(fetchCakes.rejected, (state, action) => {
      state.loading = false;
      state.cakes = [];
      state.error = action.error.message || 'Something went wrong';
    });
  },
});

export default cakeSlice.reducer;
export const { orderedCake, restockedCake } = cakeSlice.actions;
