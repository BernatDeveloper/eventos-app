import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InvitationNotification, RemovedFromEventNotification } from '../../types/notification';

interface NotificationState {
  notifications: (InvitationNotification | RemovedFromEventNotification)[];
  loading: boolean;
  error: string | null;
  loaded: boolean;
  notificationCount: number;
}

const initialState: NotificationState = {
  notifications: [],
  loading: false,
  error: null,
  loaded: false,
  notificationCount: 0, // El contador de notificaciones no leídas
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotifications(state, action: PayloadAction<(InvitationNotification | RemovedFromEventNotification)[]>) {
      state.notifications = action.payload;
      state.loaded = true;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setNotificationCount(state, action: PayloadAction<number>) {
      state.notificationCount = action.payload;
    },
    clearNotifications(state) {
      state.notifications = [];
      state.notificationCount = 0;
    },
  },
});

export const {
  setNotifications,
  setLoading,
  setError,
  setNotificationCount,
  clearNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;
