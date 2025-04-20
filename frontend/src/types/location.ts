export interface Location {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  created_at: string;
  updated_at: string;
}

export interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  location: UpdateLoction;
  refreshEvents: () => void;
}

export interface UpdateLoction {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}