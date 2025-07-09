import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { ReservationModalHeader } from '@/pages/account/members/teams/blocks/teams/components/modal/ReservationModalHeader.tsx';
import { ReservationModalWrapper } from '@/pages/account/members/teams/blocks/teams/components/modal/ReservationModalWrapper.tsx';
import { useQuery } from 'react-query';
import { getReservationUserRole } from '@/pages/account/members/teams/blocks/teams/_request.ts';
import { toast } from 'sonner';

interface props {
  reservationId?: number;
  onClose: () => void;
  isOpen: boolean;
  setReservationId: (id: number | undefined) => void;
}

const ReservationModalLayout: React.FC<props> = ({ reservationId, onClose, isOpen, setReservationId}) => {
  const enabledQuery: boolean = reservationId == 0 ? false : reservationId != undefined;
  const userRoleQuery = useQuery(
    `role-${reservationId}`,
    async () => {
      return await getReservationUserRole(reservationId!!)
    },
    {
      cacheTime: 5000,
      enabled: enabledQuery,
      onError: (err) => {
        reservationId = undefined;
        console.error(err);
      }
    }
  );
  if (userRoleQuery.isLoading) return;
  if (!userRoleQuery.data?.includes('guest') && reservationId) {
    toast.error('.You can only edit reservations you have create')
    setReservationId(undefined)
    onClose()
    return
  }
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] bg-[#1F212A] border-2 border-gray-300 p-7 rounded-xl scrollable">
          <div className="sticky top-0 z-10 bg-[#1F212A] pb-6">
            <ReservationModalHeader reservationId={reservationId} handleClose={onClose} />
            <div className="mt-6 h-[2px] bg-gray-300 w-full"></div>
          </div>
          <div className="max-h-[70vh] overflow-y-auto">
            <ReservationModalWrapper reservationId={reservationId} handleClose={onClose} />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export { ReservationModalLayout };
