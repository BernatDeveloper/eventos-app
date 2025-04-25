import React, { useState } from "react";
import { EventModal } from "./components/EventModal";
import { useAdminEvents } from "../../../hooks/useAdminEvents";
import { Event } from "../../../types/event";
import { PaginationButtons } from "./components/PaginationButtons";
import { EventFilter } from "./components/EventFilter";
import { EventTable } from "./components/EventTable";

export const EventsAdminPage: React.FC = () => {
  const [filter, setFilter] = useState<string>("");
  const {
    events,
    loading,
    updating,
    error,
    handleDelete,
    handleSaveChanges,
    currentPage,
    nextPageUrl,
    prevPageUrl,
    fetchEventsByUrl,
  } = useAdminEvents(filter);

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleEdit = (id: string) => {
    const eventToEdit = events.find((event) => event.id === id) || null;
    setSelectedEvent(eventToEdit);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Event Management</h1>
      <EventFilter filter={filter} onFilterChange={handleFilterChange} />
      <EventTable
        events={events}
        onEdit={handleEdit}
        onDelete={handleDelete}
        refreshEvents={fetchEventsByUrl}
      />

      {(loading || updating) && <p>Cargando eventos...</p>}
      {error && <p>{error}</p>}

      <PaginationButtons
        currentPage={currentPage}
        nextPageUrl={nextPageUrl}
        prevPageUrl={prevPageUrl}
        onPageChange={fetchEventsByUrl}
      />

      {isModalOpen && selectedEvent && (
        <EventModal
          isOpen={isModalOpen}
          event={selectedEvent}
          onClose={handleCloseModal}
          onEdit={handleSaveChanges}
        />
      )}
    </>
  );
};
