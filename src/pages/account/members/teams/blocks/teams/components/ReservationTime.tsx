import { format } from 'date-fns';
import React from 'react';

type props = {
  visitTime: number;
  isReservationActive: boolean;
};

const ReservationTime: React.FC<props> = ({ visitTime, isReservationActive }) => {
  const visitDate = new Date(visitTime);
  const now = new Date();
  const formattedDate = format(visitDate, 'yyyy-MM-dd');
  const formattedTime = format(visitDate, 'HH:mm');
  const diffMs = visitDate.getTime() - now.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);
  const timeColor = !isReservationActive
    ? 'text-gray-700'
    : diffHours > 0 && diffHours < 1
      ? 'text-yellow-600'
      : diffHours > 0 && diffHours < 24
        ? 'text-green-600'
        : 'text-blue-600';
  return (
    <div>
      <p className={timeColor}>{formattedTime}</p>
      <p>{formattedDate}</p>
    </div>
  );
};

export { ReservationTime };
