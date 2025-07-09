import * as yup from 'yup';

export function iranMobilePhoneNumber(phone: string | undefined) {
  if (!phone) return false;
  return new RegExp('^(0)(9)[0-9]{9}$').test(phone);
}

const ReservationValidationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .max(50, 'The username must not be greater than 50 characters')
    .required('Username is required'),
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .test('iranMobilePhoneNumber', 'Phone Number is wrong', (phoneNumber) =>
      iranMobilePhoneNumber(phoneNumber)
    ),
  services: yup
    .array()
    .of(yup.string())
    .min(1, 'at least 1 must be selected')
    .required('at least 1 must be selected'),
  active: yup
    .string()
    .min(1, 'at least 1 must be selected')
    .required('at least 1 must be selected'),
  startTime: yup.number().required('Start time is required'),
  endTime: yup
    .number()
    .required('End time is required')
    .test('is-after-start', 'End time must be equal or after start time', function (endTime) {
      const { startTime } = this.parent;
      if (!startTime || !endTime) return true;
      return Math.floor(endTime / 60000) >= Math.floor(startTime / 60000);
    })
});
export { ReservationValidationSchema };
