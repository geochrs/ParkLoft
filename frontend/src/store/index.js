import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modal';
import menuReducer from './menu';

const store = configureStore({
  reducer: { modal: modalReducer, menu: menuReducer },
});

export default store;
