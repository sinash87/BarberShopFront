/* eslint-disable prettier/prettier */
import React, { useMemo, useState } from 'react';
import { Column, ColumnDef, RowSelectionState } from '@tanstack/react-table';
import {
  DataGrid,
  DataGridColumnHeader,
  DataGridRowSelect,
  DataGridRowSelectAll,
  KeenIcon,
  useDataGrid
} from '@/components';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { IReservationDate } from './';
import CopyToClipboard from 'react-copy-to-clipboard';
import { ReservationTime } from '@/pages/account/members/teams/blocks/teams/components/ReservationTime.tsx';
import { ReservationStatus } from '@/pages/account/members/teams/blocks/teams/components/ReservationStatus.tsx';
import { ReservationModalLayout } from '@/pages/account/members/teams/blocks/teams/components/modal/ReservationModalLayout.tsx';
import { DeleteReservationModal } from '@/pages/account/members/teams/blocks/teams/components/modal/DeleteReservationModal.tsx';

interface IColumnFilterProps<TData, TValue> {
  column: Column<TData, TValue>;
}

const ReservationList = () => {
  const [selectedReservationId, setSelectedReservationId] = useState<number | undefined>(undefined);
  const [deleteReservationId, setDeleteReservationId] = useState<number | undefined>(undefined);
  const [reservationUserNameForDeleteModal, setReservationUserNameForDeleteModal] =
    useState<string>('');
  const [reservationStatusForDeleteModal, setReservationStatusForDeleteModal] =
    useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleDeleteModal = (
    id: number,
    reservationUserName: string,
    reservationStatus: string
  ) => {
    setReservationUserNameForDeleteModal(reservationUserName);
    setReservationStatusForDeleteModal(reservationStatus);
    setDeleteReservationId(id);
    setIsDeleteModalOpen(true);
  };
  const handleCreateModal = () => {
    setSelectedReservationId(undefined);
    setIsModalOpen(true);
  };
  const handleEditModal = (id: number) => {
    setSelectedReservationId(id);
    setIsModalOpen(true);
  };
  const ColumnInputFilter = <TData, TValue>({ column }: IColumnFilterProps<TData, TValue>) => {
    return (
      <Input
        placeholder="Filter..."
        value={(column.getFilterValue() as string) ?? ''}
        onChange={(event) => column.setFilterValue(event.target.value)}
        className="h-9 w-full max-w-40"
      />
    );
  };

  const columns = useMemo<ColumnDef<IReservationDate>[]>(
    () => [
      {
        accessorKey: 'id',
        header: () => <DataGridRowSelectAll />,
        cell: ({ row }) => <DataGridRowSelect row={row} />,
        enableSorting: false,
        enableHiding: false,
        meta: {
          headerClassName: 'w-0'
        }
      },
      {
        accessorFn: (row) => row.username,
        id: 'username',
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Users List"
            filter={<ColumnInputFilter column={column} />}
            column={column}
          />
        ),
        enableSorting: true,
        filterFn: (row, columnId, filterValue) => {
          const user = row.original.username; // Access the original row data
          const nameMatch = user.toLowerCase().includes(filterValue.toLowerCase());
          return nameMatch;
        },
        cell: (info) => {
          return (
            <div className="flex flex-col gap-2">
              <div className="leading-none font-medium text-sm text-gray-900">
                {info.row.original.userGuest && (
                  <span className="mr-5 bg-gray-300 py-1.5 px-2 rounded-[8px] text-[12px] text-neutral-300">
                    guest
                  </span>
                )}
                {info.row.original.username}
              </div>
            </div>
          );
        },
        meta: {
          headerClassName: 'min-w-[350px]',
          cellClassName: 'text-gray-700 font-normal'
        }
      },
      {
        accessorFn: (row) => row.phoneNumber,
        id: 'phoneNumber',
        header: ({ column }) => <DataGridColumnHeader title="Phone Number" column={column} />,
        enableSorting: true,
        cell: (info) => (
          <CopyToClipboard
            text={info.row.original.phoneNumber}
            onCopy={() => {
              toast.success('phoneNumber copied to clipboard');
            }}
          >
            <button>{info.row.original.phoneNumber}</button>
          </CopyToClipboard>
        ),
        meta: {
          headerClassName: 'w-[200px]',
          cellClassName: 'text-gray-700 font-normal hover:text-primary'
        }
      },
      {
        accessorFn: (row) => row.services,
        id: 'services',
        header: ({ column }) => <DataGridColumnHeader title="Services" column={column} />,
        enableSorting: true,
        cell: (info) => (
          <ul className="flex flex-wrap">
            {info.row.original.services.map((service, index) => (
              <li
                className="list-none px-1.5 py-0.5 m-1 bg-emerald-500 rounded-[5px] border-2"
                key={index}
              >
                {service.name}
              </li>
            ))}
          </ul>
        ),
        meta: {
          headerClassName: 'w-[300px]',
          cellClassName: 'text-black font-normal'
        }
      },
      {
        accessorFn: (row) => row.visitTime,
        id: 'visitTime',
        enableSorting: true,
        header: ({ column }) => <DataGridColumnHeader title="Visit Time" column={column} />,
        cell: (info) => (
          <ReservationTime
            isReservationActive={info.row.original.active == 'ACTIVE' || false}
            visitTime={info.getValue() as number}
          />
        ),
        meta: {
          headerTitle: 'Last Modified',
          headerClassName: 'w-[200px]',
          cellClassName: 'text-gray-700 font-normal'
        }
      },
      {
        accessorFn: (row) => row.services,
        id: 'price',
        header: ({ column }) => <DataGridColumnHeader title="Total Price" column={column} />,
        enableSorting: true,
        cell: (info) => (
          <span className="flex flex-wrap">
            {info.row.original.services.reduce((sum, service) => sum + service.price, 0)}
          </span>
        ),
        meta: {
          headerClassName: 'w-[200px]',
          cellClassName: 'text-gray-700 font-normal'
        }
      },
      {
        accessorFn: (row) => row.active,
        id: 'active',
        header: ({ column }) => <DataGridColumnHeader title="Status" column={column} />,
        enableSorting: true,
        cell: (info) => {
          return <ReservationStatus status={info.getValue() as string} />;
        },
        meta: {
          headerClassName: 'w-[200px]',
          cellClassName: 'text-gray-700 font-normal'
        }
      },
      {
        id: 'edit',
        header: () => '',
        enableSorting: false,
        cell: ({ row }) => (
          <button
            className="btn btn-sm btn-icon btn-clear btn-light"
            onClick={() => handleEditModal(row.original.id)}
          >
            <KeenIcon icon="notepad-edit" />
          </button>
        ),
        meta: {
          headerClassName: 'w-[60px]'
        }
      },
      {
        id: 'delete',
        header: () => '',
        enableSorting: false,
        cell: ({ row }) => (
          <button
            className="btn btn-sm btn-icon btn-clear btn-light"
            onClick={() =>
              handleDeleteModal(row.original.id, row.original.username, row.original.active)
            }
          >
            <KeenIcon icon="trash" />
          </button>
        ),
        meta: {
          headerClassName: 'w-[60px]'
        }
      }
    ],
    []
  );
  const handleRowSelection = (state: RowSelectionState) => {
    const selectedRowIds = Object.keys(state);
    if (selectedRowIds.length > 0) {
      toast(`Total ${selectedRowIds.length} are selected.`, {
        description: `Selected row IDs: ${selectedRowIds}`,
        action: {
          label: 'Undo',
          onClick: () => console.log('Undo')
        }
      });
    }
  };

  const Toolbar = () => {
    const { table } = useDataGrid();

    return (
      <div className="card-header flex-wrap px-5 py-5 border-b-0">
        <h3 className="card-title">Reservation List</h3>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex gap-6">
            <div className="relative">
              <KeenIcon
                icon="magnifier"
                className="leading-none text-md text-gray-500 absolute top-1/2 start-0 -translate-y-1/2 ms-3"
              />
              <input
                type="text"
                placeholder="Search Reservations"
                className="input input-sm ps-8"
                value={(table.getColumn('username')?.getFilterValue() as string) ?? ''}
                onChange={(event) =>
                  table.getColumn('username')?.setFilterValue(event.target.value)
                }
              />
            </div>
          </div>
          {/*<DataGridColumnVisibility table={table} />*/}
          <button className="btn btn-light btn-sm" onClick={handleCreateModal}>
            Add Reservation
          </button>
          <label className="switch switch-sm">
            <input name="check" type="checkbox" value="1" className="order-2" readOnly />
            <span className="switch-label order-1">Only Active Groups</span>{' '}
            {/*TODO 2 create ActiveUsers component*/}
          </label>
        </div>
      </div>
    );
  };
  return (
    <>
      <DataGrid
        columns={columns}
        rowSelection={true}
        onRowSelectionChange={handleRowSelection}
        pagination={{ size: 10 }}
        sorting={[{ id: 'username', desc: false }]}
        toolbar={<Toolbar />}
        layout={{ card: true }}
        isModalOpen={isModalOpen}
        isDeleteModalOpen={isDeleteModalOpen}
      />
      <ReservationModalLayout
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        reservationId={selectedReservationId}
        setReservationId={(id) => setSelectedReservationId(id)}
      />
      <DeleteReservationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        reservationId={deleteReservationId}
        setDeleteReservationId={(id) => setDeleteReservationId(id)}
        reservationUserName={reservationUserNameForDeleteModal}
        reservationStatus={reservationStatusForDeleteModal}
      />
    </>
  );
};

export { ReservationList };
