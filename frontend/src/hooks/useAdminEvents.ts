import { useState, useEffect } from "react";
import { getAllEvents } from "../services/admin/adminEventService";
import { updateEvent, deleteEvent } from "../services/eventService";
import { Event } from "../types/event";
import { deleteLocation } from "../services/locationService";
import toast from "react-hot-toast";

export const useAdminEvents = (filter?: string, options = { autoFetch: true }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<{
    current_page: number | null;
    next_page_url: string | null;
    prev_page_url: string | null;
  }>({
    current_page: null,
    next_page_url: null,
    prev_page_url: null,
  });

  useEffect(() => {
    if (options.autoFetch) {
      fetchEvents(); // Cargar eventos de admin al inicio
    }
  }, [filter]); // Dependencia del filtro

  const fetchEvents = async (url: string = "/events") => {
    try {
      const response = await getAllEvents(url, filter);
      if (response) {
        setEvents(response.data.data);
        setPagination({
          current_page: response.data.current_page,
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
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        const deleted = await deleteEvent(id);
        if (!deleted) {
          toast.error("Failed to delete event.");
          return;
        }

        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));

        if (locationId) {
          const locationDeleted = await deleteLocation(locationId);
          if (locationDeleted) {
            toast.success("Event and location successfully deleted.");
          } else {
            toast("Event deleted, but location could not be deleted.", {
              icon: '⚠️',
              style: {
                background: '#fff3cd',
                color: '#856404',
              },
            });
          }
        } else {
          toast.success("Event successfully deleted.");
        }
      } catch (error) {
        toast.error("An error occurred while deleting the event.");
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
      toast.success("Event updated");
      fetchEvents(); // Refrescar los eventos después de la actualización
    } catch (error) {
      toast.error("Error al guardar los cambios.");
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
    currentPage: pagination.current_page,
    nextPageUrl: pagination.next_page_url,
    prevPageUrl: pagination.prev_page_url,
    fetchEventsByUrl: fetchEvents,
  };
};
