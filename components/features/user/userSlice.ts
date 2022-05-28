import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

type User = {
  id: number;
  name: string;
  username: string;
};

type InitialState = {
  loading: boolean;
  users: User[];
  error: string;
};

const initialState: InitialState = {
  loading: false,
  users: [],
  error: '',
};

// Generates pending, fulfilled and rejected action types
export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  return axios
    .get('https://jsonplaceholder.typicode.com/users')
    .then((resposnse) =>
      resposnse.data.map((user: []) => {
        return user;
      })
    );
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // pending - wait for incoming request
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    // fulfilled - when request succeed
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
        state.error = '';
      }
    );
    // rejected - when request have an a error, when request failed
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message || 'Something went wrong';
    });
  },
});

export default userSlice.reducer;
