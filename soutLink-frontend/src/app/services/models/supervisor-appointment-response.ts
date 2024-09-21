/* tslint:disable */
/* eslint-disable */
export interface SupervisorAppointmentResponse {
  date?: string;
  id?: number;
  status?: 'WAITING' | 'PENDING' | 'ACCEPTED' | 'CANCELED';
  subject?: string;
  supervisorName?: string;
  time?: string;
}
