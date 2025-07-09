import {
  GetReservationUpdateModal,
  ReservationCreateModalDTO
} from '@/pages/account/members/teams/blocks/teams/components/modal/_models.ts';
import axios, { AxiosResponse } from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL;
export const RESERVATION_URL = `${API_URL}/v1/reservation`;
const SERVICE_URL = `${API_URL}/v1/service`;

export const getReservationForUpdateModal = (id: number): Promise<GetReservationUpdateModal> => {
  return axios
    .get(`${RESERVATION_URL}/get-reservation?id=${id}`)
    .then((response: AxiosResponse<GetReservationUpdateModal>) => response.data);
};
export const getReservationUserRole = (reservationId: number): Promise<string[]> => {
  return axios.get<string[]>(`${RESERVATION_URL}/get-reservation-userRole?id=${reservationId}`)
    .then((response) => response.data);
};
export const getServicesName = (): Promise<AxiosResponse<string[]>> => {
  return axios.get<string[]>(`${SERVICE_URL}/getServicesName`);
};

export const createReservation = (reservation: ReservationCreateModalDTO) => {
  return axios.post(`${RESERVATION_URL}/create-reservation`, reservation);
};
export const updateReservation = (reservation: GetReservationUpdateModal) => {
  return axios.post(`${RESERVATION_URL}/update-reservation`, reservation);
};
export const deleteReservation = (id: number) => {
  return axios.delete(`${RESERVATION_URL}/delete-reservation?id=${id}`);
}