import {
  GetReservationUpdateModal,
  initialReservationForCreateModal,
  ReservationCreateModalDTO
} from '@/pages/account/members/teams/blocks/teams/components/modal/_models.ts';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { clsx } from 'clsx';
import { ReservationValidationSchema } from '@/pages/account/members/teams/blocks/teams/components/modal/ReservationValidationSchema.tsx';
import {
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent
} from '@mui/material';
import Box from '@mui/material/Box';
import { ReservationDateTimePicker } from '@/pages/account/members/teams/blocks/teams/components/modal/ReservationTimeDatePicker.tsx';
import {
  createReservation,
  updateReservation
} from '@/pages/account/members/teams/blocks/teams/_request.ts';
import { toast } from 'sonner';
import axios from 'axios';
import { KeenIcon } from '@/components';

interface props {
  reservation: GetReservationUpdateModal;
  services: string[];
  handleClose: () => void;
}

const ReservationModalForm: React.FC<props> = ({ reservation, services, handleClose }) => {
  const [reservationForEdit] = useState<GetReservationUpdateModal>({
    ...reservation,
    username: reservation?.username || initialReservationForCreateModal.username,
    phoneNumber: reservation?.phoneNumber || initialReservationForCreateModal.phoneNumber,
    startTime: reservation?.startTime || initialReservationForCreateModal.startTime,
    endTime: reservation?.endTime || initialReservationForCreateModal.endTime,
    active: reservation?.active || initialReservationForCreateModal.active,
    services: reservation?.services || initialReservationForCreateModal.services
  });
  const isReservationExists = !!reservation;
  const formik = useFormik<ReservationCreateModalDTO | GetReservationUpdateModal>({
    initialValues: reservationForEdit,
    validationSchema: ReservationValidationSchema, // TODO 2 implement validation AND onSubmit :)
    onSubmit: async (values) => {
      try {
        // 1. Send the request
        let response;
        if (isReservationExists) {
          const v = values as GetReservationUpdateModal;
          v.id = reservation.id;
          response = await updateReservation(v);
        } else {
          response = await createReservation(values);
        }

        // 2. Handle success
        if (response.status === 200) {
          toast.success(
            reservation ? '!Reservation edited successfully!' : '!Reservation created successfully'
          );
          formik.resetForm();
          // reload();
          handleClose();
        }
      } catch (error) {
        // 3. Handle errors
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message || 'An error occurred');
        } else {
          toast.error('An unexpected error occurred');
        }
      } finally {
        formik.setSubmitting(false);
      }
    }
  });
  return (
    <>
      <form
        className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
        onSubmit={formik.handleSubmit}
      >
        {/*username*/}
        <div className="sm:col-span-5">
          {/* begin::Label */}
          <label className="block text-sm/6 font-medium text-neutral-300">
            username <KeenIcon icon="user" />
          </label>
          {/* end::Label */}

          {/* begin::Input */}
          <div className="mt-2">
            <input
              {...formik.getFieldProps('username')}
              type="text"
              name="username"
              className={clsx(
                'block w-full rounded-md bg-gray-300 px-3 py-1.5 text-base text-neutral-300 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6',
                { 'is-invalid': formik.touched.username && formik.errors.username },
                {
                  'is-valid': formik.touched.username && !formik.errors.username
                }
              )}
              autoComplete="off"
              disabled={formik.isSubmitting}
            />
            {formik.touched.username && formik.errors.username && (
              <div className="text-red-500 text-[14px] pt-2">
                <span role="alert">{formik.errors.username}</span>
              </div>
            )}
            {/* end::Input */}
          </div>
        </div>
        {/*end username*/}

        {/*phoneNumber*/}
        <div className="sm:col-span-5">
          {/* begin::Label */}
          <label className="block text-sm/6 font-medium text-neutral-300">
            Phone Number <KeenIcon icon="phone" className="text-[15px]" />
          </label>
          {/* end::Label */}

          {/* begin::Input */}
          <div className="mt-2">
            <input
              {...formik.getFieldProps('phoneNumber')}
              type="text"
              name="phoneNumber"
              className={clsx(
                'block w-full rounded-md bg-gray-300 px-3 py-1.5 text-base text-neutral-300 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6',
                { 'is-invalid': formik.touched.phoneNumber && formik.errors.phoneNumber },
                {
                  'is-valid': formik.touched.phoneNumber && !formik.errors.phoneNumber
                }
              )}
              autoComplete="off"
              disabled={formik.isSubmitting}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <div className="text-red-500 text-[14px] pt-2">
                <span role="alert">{formik.errors.phoneNumber}</span>
              </div>
            )}
            {/* end::Input */}
          </div>
        </div>
        {/*end phoneNumber*/}

        {/*visitTime*/}
        <div className="sm:col-span-5">
          {/* begin::Label */}
          <label className="block text-sm/6 font-medium text-neutral-300">
            Reservation Time <KeenIcon icon="calendar" />
          </label>
          {/* end::Label */}

          {/* begin::Input */}
          <ReservationDateTimePicker
            startDateTime={formik.values.startTime == 0 ? null : new Date(formik.values.startTime)}
            endDateTime={formik.values.endTime == 0 ? null : new Date(formik.values.endTime)}
            setStartDateTime={(date) => formik.setFieldValue('startTime', date)}
            setEndDateTime={(date) => formik.setFieldValue('endTime', date)}
            setFieldTouched={formik.setFieldTouched}
          />
          <div className="mt-2">
            {formik.touched.startTime && formik.errors.startTime && (
              <div className="text-red-500 text-[14px] pt-2">
                <span role="alert">{formik.errors.startTime}</span>
              </div>
            )}
            {/* end::Input */}
          </div>
          <div className="mt-2">
            {formik.touched.endTime && formik.errors.endTime && (
              <div className="text-red-500 text-[14px] pt-2">
                <span role="alert">{formik.errors.endTime}</span>
              </div>
            )}
            {/* end::Input */}
          </div>
        </div>
        {/*end visitTime*/}

        {/*Services*/}
        <div className="sm:col-span-5">
          {/* begin::Label */}
          <label className="block text-sm/6 font-medium text-neutral-300">
            Services <KeenIcon icon="plus-circle" />
          </label>
          {/* end::Label */}

          {/* begin::Input */}
          <div className="mt-2">
            <FormControl
              sx={{
                m: 1,
                width: 500,
                mt: 1,
                '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
                  transform: 'translate(13px, -8px) scale(0.5)' // Adjust focused label position
                }
              }}
            >
              <InputLabel
                sx={{
                  color: 'white',
                  fontSize: '16px',
                  pt: '2px',
                  '&.Mui-focused': {
                    color: 'gray'
                  }
                }}
                id="demo-multiple-chip-label"
              >
                services
              </InputLabel>
              <Select
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#363843'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#363843',
                    borderWidth: '2px'
                  }
                }}
                name="services"
                onBlur={() => formik.setFieldTouched('services', true)}
                id="demo-multiple-chip"
                multiple
                value={formik.values.services}
                onChange={(event: SelectChangeEvent<string[]>) => {
                  const {
                    target: { value }
                  } = event;
                  const newValue = typeof value === 'string' ? value.split(',') : value;
                  formik.setFieldValue('services', newValue.length > 0 ? newValue : []);
                }}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip
                        sx={{ backgroundColor: '#363843', color: '#c9d4d4' }}
                        key={value}
                        label={value}
                      />
                    ))}
                  </Box>
                )}
              >
                {services.map((service) => (
                  <MenuItem key={service} value={service}>
                    {service}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {formik.touched.services && formik.errors.services && (
              <div className="text-red-500 text-[14px] pt-2">
                <span role="alert">{formik.errors.services}</span>
              </div>
            )}
            {/* end::Input */}
          </div>
        </div>
        {/*end Services*/}

        {/*Status*/}
        <div className="sm:col-span-5">
          {/* begin::Label */}
          <label className="block text-sm/6 font-medium text-neutral-300">
            Status <KeenIcon icon="chart" />
          </label>
          {/* end::Label */}

          {/* begin::Input */}
          <div className="mt-2">
            <FormControl sx={{ m: 1, minWidth: 120, width: 500 }}>
              <InputLabel
                sx={{
                  color: 'white',
                  fontSize: '16px',
                  pt: '2px',
                  '&.Mui-focused': {
                    color: 'gray'
                  }
                }}
                id="demo-simple-select-helper-label"
              >
                Status
              </InputLabel>
              <Select
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#363843'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#363843',
                    borderWidth: '2px'
                  },
                  color:
                    formik.values.active == 'ACTIVE'
                      ? 'blue'
                      : formik.values.active == 'COMPLETED'
                        ? 'green'
                        : 'red'
                }}
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={formik.values.active}
                onBlur={() => formik.setFieldTouched('active', true)}
                label="active"
                onChange={(event: SelectChangeEvent) => {
                  formik.setFieldValue('active', event.target.value);
                }}
              >
                <MenuItem sx={{ color: 'blue' }} value="ACTIVE">
                  Active
                </MenuItem>
                <MenuItem sx={{ color: 'green' }} value="COMPLETED">
                  Completed
                </MenuItem>
                <MenuItem sx={{ color: 'red' }} value="CANCELLED">
                  Cancelled
                </MenuItem>
              </Select>
            </FormControl>
            {formik.touched.active && formik.errors.active && (
              <div className="text-red-500 text-[14px] pt-2">
                <span role="alert">{formik.errors.active}</span>
              </div>
            )}
            {/* end::Input */}
          </div>
        </div>
        {/*end status*/}
        <div className="sm:col-span-5">
          <div className="pt-7 text-center mr-[170px]">
            {/* Submit Button */}
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={
                formik.isSubmitting || !formik.isValid || Object.keys(formik.touched).length === 0
              }
            >
              <span className="flex items-center justify-center">
                {!formik.isSubmitting ? (
                  <span className="indicator-label">Submit</span>
                ) : (
                  <span className="indicator-progress flex items-center">
                    <span className="w-4 h-4 ml-2 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ...Please wait
                  </span>
                )}
              </span>
            </button>
            {/* Discard Button */}
            <button
              type="reset"
              onClick={handleClose}
              className="px-4 py-2 mr-3 text-neutral-300 bg-gray-300 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={formik.isSubmitting}
            >
              Discard
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
export { ReservationModalForm };
