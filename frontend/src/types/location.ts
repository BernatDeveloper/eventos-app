import { Event } from "./event";

export interface Location {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  created_at?: string;
  updated_at?: string;
}

export interface UpdateLocationResponse {
  message: string;
  location: Location
}

export interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  location: Location;
  eventId: string | null;
  refreshEvents?: () => void;
  mode: 'edit' | 'create';
}

export interface LocationFormProps {
  address: string;
  setAddress: (value: string) => void;
  editedLocation: any;
  setEditedLocation: (value: any) => void;
  handleSearchLocation: () => void;
}

export interface LocationButtonsProps {
  handleSaveLocation: () => void;
  handleDeleteLocation: () => void;
  isSaving: boolean;
  isDeleting: boolean;
  onClose: () => void;
  mode: string;
  isSaveDisabled: boolean;
}

export interface LocationMapProps {
  latitude: number;
  longitude: number;
  setEditedLocation?: React.Dispatch<React.SetStateAction<Location>>;
  interactive?: boolean;
}

export interface EditLocationSectionProps {
  event: Event;
  fetchEvent: (id: string) => Promise<Event | boolean>;
}