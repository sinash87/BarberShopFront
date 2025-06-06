import React from 'react';
import { KeenIcon } from '@/components';

interface props {
  reservationId?: number;
  handleClose: () => void;
}

const ReservationModalHeader: React.FC<props> = ({ reservationId , handleClose}) => {
  const title = reservationId ? 'Update Reservation' : 'Create Reservation';
  return (
    <div className="flex justify-between">
      <p className="text-neutral-300 text-xl">{title}</p>
      <button onClick={handleClose}>
        <KeenIcon icon="cross-circle" className="text-2xl" />
      </button>
    </div>
  );
};
export { ReservationModalHeader };
