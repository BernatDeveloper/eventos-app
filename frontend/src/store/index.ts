import { configureStore } from '@reduxjs/toolkit';
import eventReducer from './slices/eventSlice';
import notificationReducer from './slices/notificationSlice'

export const store = configureStore({
  reducer: {
    events: eventReducer,
    notifications: notificationReducer
  },
});

// Tipos para usar en el hook useSelector y useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
