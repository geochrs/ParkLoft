import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  errors: {},
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setErrors(state, action) {
      state.errors = action.payload;
    },
    clearErrors(state) {
      state.errors = {};
    },
  },
});

export const formActions = formSlice.actions;

export default formSlice.reducer;
