import { GetUserUpdateModalDTO } from '@/pages/account/members/teams/blocks/teams/components/modal/_models.ts';
import React from 'react';

interface props{
  reservation:GetUserUpdateModalDTO,
}
const ReservationModalForm:React.FC<props>= ({reservation}) => {
  return(<p>hi</p>)
}
export { ReservationModalForm };