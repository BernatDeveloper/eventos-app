import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event } from '../../types/event';

interface EventsState {
  joinedEvents: Event[];
  loading: boolean;
  error: string | null;
  loaded: boolean;
}

const initialState: EventsState = {
  joinedEvents: [],
  loading: false,
  error: null,
  loaded: false,
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents(state, action: PayloadAction<Event[]>) {
      state.joinedEvents = action.payload;
      state.loaded = true;
    },
    addEvent(state, action: PayloadAction<Event>) {
      state.joinedEvents.push(action.payload);
    },
    updateEventInStore(state, action: PayloadAction<Event>) {
      const index = state.joinedEvents.findIndex(ev => ev.id === action.payload.id);
      if (index !== -1) {
        state.joinedEvents[index] = action.payload;
      }
    },
    deleteEventFromStore(state, action: PayloadAction<string>) {
      state.joinedEvents = state.joinedEvents.filter(ev => ev.id !== action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    }
  },
});

export const {
  setEvents,
  addEvent,
  updateEventInStore,
  deleteEventFromStore,
  setLoading,
  setError
} = eventSlice.actions;

export default eventSlice.reducer;