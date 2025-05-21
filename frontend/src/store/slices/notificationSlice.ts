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
  notificationCount: 0,
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
    resetNotificationsState(state) {
      state.notifications = [];
      state.loading = false;
      state.error = null;
      state.loaded = false;
      state.notificationCount = 0;
    },
    setNotificationCount(state, action: PayloadAction<number>) {
      state.notificationCount = action.payload;
    },
    clearNotifications(state) {
      state.notifications = [];
      state.notificationCount = 0;
    },
    deleteNotification(state, action: PayloadAction<string>) {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
      state.notificationCount = state.notifications.length;
    },
  },
});

export const {
  setNotifications,
  setLoading,
  setError,
  resetNotificationsState,
  setNotificationCount,
  clearNotifications,
  deleteNotification
} = notificationSlice.actions;

export default notificationSlice.reducer;
