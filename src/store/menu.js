import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggleMenu(state) {
      state.isOpen = !state.isOpen;
    },
    closeMenu(state) {
      state.isOpen = false;
    },
  },
});

export const menuActions = menuSlice.actions;

export default menuSlice.reducer;
