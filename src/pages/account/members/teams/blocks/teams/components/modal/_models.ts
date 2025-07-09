export type ReservationCreateModalDTO = {
  username: string;
  phoneNumber: string;
  startTime: number;
  endTime: number;
  active: string;
  services: string[];
};
export type GetReservationUpdateModal = ReservationCreateModalDTO & { id: number };
export const initialReservationForCreateModal: ReservationCreateModalDTO = {
  username: '',
  phoneNumber: '',
  startTime: 0,
  endTime: 0,
  active: '',
  services: []
};
