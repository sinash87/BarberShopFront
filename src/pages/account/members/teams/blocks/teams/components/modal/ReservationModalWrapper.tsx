import { useQuery } from 'react-query';
import React from 'react';
import { AxiosResponse } from 'axios';
import { ReservationModalForm } from './ReservationModalForm.tsx';
import {
  getReservationForUpdateModal,
  getServicesName
} from '@/pages/account/members/teams/blocks/teams/_request.ts';

interface props {
  reservationId?: number;
  handleClose: () => void;
}

const ReservationModalWrapper: React.FC<props> = ({ reservationId, handleClose }) => {
  const enabledQuery: boolean = reservationId == 0 ? false : reservationId != undefined;
  const reservationQuery = useQuery(
    `reservation-${reservationId}`,
    async () => {
      return await getReservationForUpdateModal(reservationId!!);
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

  const { data: servicesResponse, isLoading } = useQuery<AxiosResponse<string[]>>(
    `services-${reservationId}`,
    getServicesName,
    { cacheTime: 0 }
  );

  if (reservationQuery.isLoading || isLoading) return;
  const services = servicesResponse?.data || [];
  return (
    <ReservationModalForm
      reservation={reservationQuery.data!!}
      services={services}
      handleClose={handleClose}
    />
  );
};

export { ReservationModalWrapper };
