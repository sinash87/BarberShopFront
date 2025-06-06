import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {
  ReservationModalHeader
} from '@/pages/account/members/teams/blocks/teams/components/modal/ReservationModalHeader.tsx';
import {
  ReservationModalWrapper
} from '@/pages/account/members/teams/blocks/teams/components/modal/ReservationModalWrapper.tsx';
import { useEffect } from 'react';

interface props{
  reservationId?:number,
  onClose: () => void
}
const ReservationModalLayout:React.FC<props> = ({reservationId , onClose}) => {
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    if (reservationId) {
      setOpen(true);
    }
  }, [reservationId]);
  const handleOpen = () => setOpen(true);
  return (
    <div>
      {/*<button className="btn btn-light btn-sm" onClick={handleOpen}>*/}
      {/*  Add Reservation*/}
      {/*</button>*/}
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] bg-[#1F212A] border-2 border-gray-300 p-7 rounded-xl">
          <ReservationModalHeader reservationId={reservationId} handleClose={onClose}/>
          <div className="my-6 h-[2px] bg-gray-300 w-full"></div>
          <ReservationModalWrapper reservationId={reservationId} handleClose={onClose}/>
        </Box>
      </Modal>
    </div>
  );
};

export { ReservationModalLayout };