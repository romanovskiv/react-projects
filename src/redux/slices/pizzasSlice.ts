import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type FetchPizzasArgs = {
  currentPage: number;
  categoryId: number;
  sortType: string;
};

type Pizza = {
  id: string;
  price: number;
  types: number[];
  sizes: number[];
  title: string;
  count: number;
  imageUrl: string;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

export type SearchPizzaParams = { currentPage: string; categoryId: string; sortType: string };
export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzasStatus',
  async (params: FetchPizzasArgs) => {
    const { currentPage, categoryId, sortType } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://630a26ddf8a20183f77c99c3.mockapi.io/pizzas?page=${currentPage}&limit=8&${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sortType}&order=desc`,
    );
    return data as Pizza[];
  },
);

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
