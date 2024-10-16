import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modal';
import menuReducer from './menu';
import formReducer from './form';

const store = configureStore({
  reducer: { modal: modalReducer, menu: menuReducer, form: formReducer },
});

export default store;
