import { useState } from "react";
import { getMyEvents, getEvent } from "../services/eventService";
import { Event } from "../types/event";

export const useUserEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener los eventos del usuario
  const fetchMyEvents = async () => {
    try {
      const response = await getMyEvents();
      if (response.events) {
        setEvents(response.events);
      } else {
        setError("No se encontraron tus eventos.");
      }
    } catch (error) {
      setError("Error al obtener tus eventos.");
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener un evento específico por su ID
  const fetchEventById = async (id: string) => {
    setLoading(true);
    try {
      const response = await getEvent(id);
      if (response) {
        setEvent(response.event);
      } else {
        setError("No se encontró el evento.");
      }
    } catch (error) {
      setError("Error al obtener el evento.");
    } finally {
      setLoading(false);
    }
  };

  return {
    events,
    event,
    loading,
    error,
    fetchMyEvents,
    fetchEventById,
  };
};
