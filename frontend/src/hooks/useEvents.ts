import { useState, useEffect } from "react";
import { getAllEvents } from "../services/admin/adminEventService";
import { updateEvent, deleteEvent } from "../services/eventService";
import { Event } from "../types/event";
import { deleteLocation } from "../services/locationService";

export const useEvents = (filter: string) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<{
    next_page_url: string | null;
    prev_page_url: string | null;
  }>({
    next_page_url: null,
    prev_page_url: null,
  });

  useEffect(() => {
    fetchEvents(); // Cargar los eventos al inicio y al filtrar
  }, [filter]); // Volver a ejecutar cuando el filtro cambie

  const fetchEvents = async (url: string = "/events") => {
    try {
      const response = await getAllEvents(url, filter);
      if (response) {
        console.log(response.data)
        setEvents(response.data.data);
        setPagination({
          next_page_url: response.data.next_page_url,
          prev_page_url: response.data.prev_page_url,
        });
      } else {
        setError("No se encontraron eventos.");
      }
    } catch (error) {
      setError("Error al obtener los eventos.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, locationId?: number) => {
    if (confirm("¿Estás seguro de que deseas eliminar este evento?")) {
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
      try {
        await deleteEvent(id);
        if (locationId) {
          await deleteLocation(locationId);
          alert("Evento y ubicación eliminados con éxito.");
        } else {
          alert("Evento eliminado con éxito. No había ubicación asociada.");
        }
      } catch (error) {
        setEvents((prevEvents) => [...prevEvents]);
        alert("Hubo un error al eliminar el evento.");
      }
    }
  };

  const handleSaveChanges = async (id: string, updatedEvent: {
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
      await updateEvent(id, updatedEvent);
      fetchEvents()
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
      alert("Error al guardar los cambios.");
    } finally {
      setUpdating(false); // Finaliza el proceso de actualización
    }
  };

  return {
    events,
    loading,
    updating,
    error,
    handleDelete,
    handleSaveChanges,
    nextPageUrl: pagination.next_page_url,
    prevPageUrl: pagination.prev_page_url,
    fetchEventsByUrl: fetchEvents,
  };
};
