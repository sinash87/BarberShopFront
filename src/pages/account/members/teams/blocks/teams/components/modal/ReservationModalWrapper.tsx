import { useQuery } from 'react-query';
import React from 'react';
import { GetUserUpdateModalDTO } from '@/pages/account/members/teams/blocks/teams/components/modal/_models.ts';
import axios, { AxiosResponse } from 'axios';
import { RESERVATION_URL } from '@/components';
import { ReservationModalForm } from './ReservationModalForm.tsx';

interface props {
  reservationId?: number;
  handleClose: () => void;
}

const getUserForUpdateModal = (id: number): Promise<GetUserUpdateModalDTO> => {
  return axios
    .get(`${RESERVATION_URL}/get-reservation?id=${id}`)
    .then((response: AxiosResponse<GetUserUpdateModalDTO>) => response.data);
};

const ReservationModalWrapper: React.FC<props> = ({ reservationId }) => {
  const enabledQuery: boolean = reservationId == 0 ? false : reservationId != undefined;
  const reservationQuery = useQuery(
    `reservation-${reservationId}`,
    async () => {
      return await getUserForUpdateModal(reservationId!!);
    },
    {
      cacheTime: 0,
      enabled: enabledQuery,
      onError: (err) => {
        reservationId = undefined;
        console.error(err);
      }
    }
  );
  console.log(reservationQuery.data);
  if (reservationQuery.isLoading) return;
  return <ReservationModalForm reservation={reservationQuery.data!!} />;
};

export { ReservationModalWrapper };
