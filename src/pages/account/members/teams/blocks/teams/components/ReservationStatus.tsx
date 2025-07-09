import React from 'react';

type props = {
  status: string;
};

const ReservationStatus: React.FC<props> = ({status}) => {
  const bgColor = status === 'ACTIVE' ? 'bg-blue-500' : status === 'COMPLETED' ? 'bg-emerald-500' : status === 'CANCELLED' ? 'bg-red-400' : 'bg-yellow-500';
  return(
    <span className={`${bgColor} text-black py-1 px-1.5 rounded text-[13px]`}>{status}</span>
  )
};

export { ReservationStatus };
