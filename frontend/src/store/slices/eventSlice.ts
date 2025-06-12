import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event } from '../../types/event';
import { Category } from '../../types/category';

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
      state.joinedEvents.unshift(action.payload);
    },
    updateEventInStore(state, action: PayloadAction<Event>) {
      const index = state.joinedEvents.findIndex(ev => ev.id === action.payload.id);
      if (index !== -1) {
        state.joinedEvents[index] = action.payload;
      }
    },
    updateEventCategory(
      state,
      action: PayloadAction<{ eventId: string; category: Category }>
    ) {
      const { eventId, category } = action.payload;
      const event = state.joinedEvents.find(ev => ev.id === eventId);
      if (event) {
        event.category = category;
        event.category_id = category.id;
      }
    },
    deleteEventFromStore(state, action: PayloadAction<string>) {
      state.joinedEvents = state.joinedEvents.filter(ev => ev.id !== action.payload);
    },
    resetEventsState(state) {
      state.joinedEvents = [];
      state.loading = false;
      state.error = null;
      state.loaded = false;
    },
    setEventsLoaded(state, action: PayloadAction<boolean>) {
      state.loaded = action.payload;
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
  updateEventCategory,
  deleteEventFromStore,
  resetEventsState,
  setEventsLoaded,
  setLoading,
  setError
} = eventSlice.actions;

export default eventSlice.reducer;