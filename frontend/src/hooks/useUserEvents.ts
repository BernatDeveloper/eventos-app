import { useState } from "react";
import { getMyEventsParticipation, getEvent, updateEvent, createEvent } from "../services/eventService";
import { Event } from "../types/event";
import toast from "react-hot-toast";
import { validateEventDates } from "../utils/validateEventDates";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import {
  setEvents,
  setLoading as setReduxLoading,
  setError as setReduxError,
  updateEventInStore,
  addEvent,
} from "../store/slices/eventSlice";

export const useUserEvents = () => {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);
  const [creating, setCreating] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { joinedEvents, loaded } = useAppSelector((state) => state.events);


  // Get user events
  const fetchMyEventsParticipation = async () => {
    if (loaded) return;

    dispatch(setReduxLoading(true));
    try {
      const response = await getMyEventsParticipation();
      if (response.events) {
        dispatch(setEvents(response.events));
      } else {
        dispatch(setReduxError("No se encontraron tus eventos."));
      }
    } catch (error) {
      dispatch(setReduxError("Error al obtener tus eventos."));
    } finally {
      dispatch(setReduxLoading(false));
    }
  };

  // Get event
  const fetchEventById = async (id: string) => {
    setLoading(true);
    try {
      const response = await getEvent(id);
      setEvent(response.event);
      return response.event
    } catch (error: any) {
      toast.error(error.message)
      return false
    } finally {
      setLoading(false);
    }
  };

  // Update event
  const handleSaveEventChanges = async (id: string, updatedEvent: {
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
    participant_limit?: number;
  }) => {
    setUpdating(true);

    try {
      const response = await updateEvent(id, updatedEvent);
      toast.success(response.message);
      dispatch(updateEventInStore(response.event));
      setEvent(response.event);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setUpdating(false);
    }
  };

  // Create event
  const handleCreateEvent = async (newEvent: {
    location_id?: number | null;
    category_id?: number | null;
    title: string;
    description?: string;
    participant_limit?: number;
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
  }) => {
    const isValid = validateEventDates(
      newEvent.start_date,
      newEvent.end_date,
      newEvent.start_time,
      newEvent.end_time
    );

    if (!isValid) return false;

    setCreating(true);
    try {
      const response = await createEvent(newEvent);
      toast.success(response.message);
      dispatch(addEvent(response.event));
      return true;
    } catch (error: any) {
      toast.error(error.message);
      return false;
    } finally {
      setCreating(false);
    }
  };


  return {
    joinedEvents,
    event,
    loading,
    updating,
    creating,
    fetchMyEventsParticipation,
    fetchEventById,
    handleSaveEventChanges,
    handleCreateEvent
  };
};
