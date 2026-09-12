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

export interface ClinicSettings {
  id?: number;
  doctor_name: string;
  specialty: string;
  phone: string;
  email: string;
  address: string;
  working_hours: string;
  about_text: string;
  updated_at?: string;
}

export type ClinicSettingsInput = Omit<ClinicSettings, 'id' | 'updated_at'>;

