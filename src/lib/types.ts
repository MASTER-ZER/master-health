export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

export interface Booking {
  id: string;
  patient_name: string;
  phone: string;
  preferred_date: string;
  preferred_time: string;
  note?: string | null;
  status: BookingStatus;
  created_at: string;
}

export interface BookingInput {
  patient_name: string;
  phone: string;
  preferred_date: string;
  preferred_time: string;
  note?: string;
}
