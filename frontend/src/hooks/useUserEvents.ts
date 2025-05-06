import { useState } from "react";
import { getMyEventsParticipation, getEvent, updateEvent, createEvent } from "../services/eventService";
import { Event } from "../types/event";
import toast from "react-hot-toast";

export const useUserEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<boolean>(false);
  const [creating, setCreating] = useState<boolean>(false);

  // Función para obtener los eventos del usuario
  const fetchMyEventsParticipation = async () => {
    try {
      const response = await getMyEventsParticipation();
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

  const handleSaveUserChanges = async (id: string, updatedEvent: {
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
      fetchEventById(id);
    } catch (error) {
      toast.error("Error al guardar los cambios.");
    } finally {
      setUpdating(false); // Finaliza el proceso de actualización
    }
  };

  // Función para crear un nuevo evento
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
    setCreating(true);
    try {
      const response = await createEvent(newEvent);
      toast.success(response.message);
      // Opcional: Puedes optar por recargar la lista de eventos o redirigir a la nueva página del evento
      fetchMyEventsParticipation(); // Si deseas actualizar la lista de eventos
    } catch (error) {
      toast.error("Error al crear el evento.");
    } finally {
      setCreating(false);
    }
  };

  return {
    events,
    event,
    loading,
    updating,
    creating,
    error,
    fetchMyEventsParticipation,
    fetchEventById,
    handleSaveUserChanges,
    handleCreateEvent
  };
};
