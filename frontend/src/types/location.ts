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
  refreshEvents: () => void;
  mode: 'edit' | 'create';
}