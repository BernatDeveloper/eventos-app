import { useState, useEffect } from "react";
import { getAllEvents } from "../services/admin/adminEventService";
import { deleteEvent } from "../services/eventService";
import { useUserEvents } from "./useUserEvents";
import { Event } from "../types/event";
import { deleteLocation } from "../services/locationService";
import toast from "react-hot-toast";
import { deleteEventFromStore } from "../store/slices/eventSlice";
import { useAppDispatch } from "./store";
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';

export const useAdminEvents = (filter?: string, options = { autoFetch: true }) => {
  const { handleSaveEventChanges } = useUserEvents()
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch()
  const { t } = useTranslation();
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
    const result = await Swal.fire({
      title: t('swal.delete_title'),
      text: t('swal.delete_event'),
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#bbb',
      confirmButtonText: t('button.confirm_delete'),
      cancelButtonText: t('button.cancel'),
    });

    if (result.isConfirmed) {
      setDeleting(true);
      try {
        const response = await deleteEvent(id);

        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
        dispatch(deleteEventFromStore(id));

        if (locationId) {
          const locationDeleted = await deleteLocation(locationId);
          if (locationDeleted) {
            toast.success(locationDeleted.message);
            toast.success(response.message);
          } else {
            toast(t('error.event_deleted_location_no'), {
              icon: '⚠️',
              style: {
                background: '#fff3cd',
                color: '#856404',
              },
            });
          }
        } else {
          toast.success(response.message);
        }
        return true;
      } catch (error: any) {
        toast.error(error.message);
        return false;
      } finally {
        setDeleting(false);
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
    try {
      handleSaveEventChanges(id, updatedEvent)
      fetchEvents();
    } catch (error) {
      toast.error("Error al guardar los cambios.");
    } finally {
      setUpdating(false);
    }
  };

  return {
    events,
    loading,
    updating,
    deleting,
    error,
    handleDelete,
    handleSaveChanges,
    currentPage: pagination.current_page,
    nextPageUrl: pagination.next_page_url,
    prevPageUrl: pagination.prev_page_url,
    fetchEventsByUrl: fetchEvents,
  };
};
