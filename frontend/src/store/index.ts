import { configureStore } from '@reduxjs/toolkit';
import eventReducer from './slices/eventSlice';

export const store = configureStore({
  reducer: {
    events: eventReducer,
  },
});

// Tipos para usar en el hook useSelector y useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
