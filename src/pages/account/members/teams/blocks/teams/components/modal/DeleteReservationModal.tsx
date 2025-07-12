import * as React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useMutation, useQuery } from 'react-query';
import {
  deleteReservation,
  getReservationUserRole
} from '@/pages/account/members/teams/blocks/teams/_request.ts';
import { toast } from 'sonner';
import { KeenIcon } from '@/components';
import { useEffect } from 'react';

interface props {
  reservationId?: number;
  onClose: () => void;
  isOpen: boolean;
  setDeleteReservationId: (id: number | undefined) => void;
  reservationUserName: string;
  reservationStatus: string;
}

const DeleteReservationModal: React.FC<props> = ({
  reservationId,
  onClose,
  isOpen,
  setDeleteReservationId,
  reservationUserName,
  reservationStatus
}) => {
  console.log(reservationId)
  const enabledQuery: boolean = reservationId == 0 ? false : reservationId != undefined;
  const userRoleQuery = useQuery(
    `role-${reservationId}`,
    async () => {
      return await getReservationUserRole(reservationId!!);
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
  useEffect(() => {
    if (userRoleQuery.isSuccess && !userRoleQuery.data?.includes('guest') && reservationId) {
      toast.error('You can only delete reservations you have created');
      setDeleteReservationId(undefined);
      onClose();
    }
  }, [userRoleQuery.data, userRoleQuery.isSuccess, reservationId]);

  const deleteMutation = useMutation({
    mutationFn: () => deleteReservation(reservationId!!),
    onSuccess: () => {
      toast.success(`${reservationUserName} Reservation deleted`);
      reservationId = undefined;
      onClose();
    },
    onError: (error) => {
      reservationId = undefined;
      console.error(error);
      toast.error('Failed to delete reservation');
    }
  });

  const handleDelete = () => {
    if (userRoleQuery.isLoading) return;
    if (enabledQuery) {
      deleteMutation.mutate();
    }
  };
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
            <div className="flex justify-between">
              <p className="text-neutral-300 text-xl">Delete Reservation</p>
              <button onClick={onClose}>
                <KeenIcon icon="cross-circle" className="text-2xl" />
              </button>
            </div>
            <div className="mt-6 h-[2px] bg-gray-300 w-full"></div>
          </div>
          <div className="max-h-[70vh] py-7 overflow-y-auto bg-gray-300 rounded-lg w-8/12 mx-auto text-center">
            <p className="text-[19px] text-neutral-300">
              ?Are you sure you want to delete this reservation
            </p>
            <div className="pt-8 text-right mr-[94px]">
              <p className="pb-6 font-medium">
                {' '}
                <span className="mr-2 bg-gray-200 px-4 py-2 rounded-[10px] text-neutral-300 font-normal">
                  {reservationUserName}
                </span>{' '}
                :Username
              </p>
              <p className="font-medium">
                <span className="mr-[38px] bg-gray-200 px-4 py-2 rounded-[10px] text-neutral-300 font-normal">
                  {reservationStatus}
                </span>{' '}
                :Status{' '}
              </p>
            </div>
            <div className="flex justify-center">
              <button
                className="btn btn-light text-[16px] border-gray-500 mx-3 mt-10"
                onClick={() => {
                  setDeleteReservationId(undefined);
                  onClose();
                }}
              >
                Cancel <KeenIcon icon={'cross'} />
              </button>
              <button
                className="btn btn-danger font-semibold text-[16px] mx-3 mt-10"
                onClick={handleDelete}
              >
                Delete <KeenIcon icon={'trash'} />
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
export { DeleteReservationModal };
