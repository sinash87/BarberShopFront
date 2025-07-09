import React, { useRef } from 'react';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import Toolbar from 'react-multi-date-picker/plugins/toolbar';
import 'react-multi-date-picker/styles/colors/teal.css';
import 'react-multi-date-picker/styles/backgrounds/bg-dark.css';
import 'react-multi-date-picker/styles/colors/teal.css';

interface ReservationDateTimePickerProps {
  startDateTime: Date | null;
  endDateTime: Date | null;
  setStartDateTime: (date: number | null) => void;
  setEndDateTime: (date: number | null) => void;
  setFieldTouched: (field: string, touched?: boolean) => void;
}

const ReservationDateTimePicker: React.FC<ReservationDateTimePickerProps> = ({
  startDateTime,
  endDateTime,
  setStartDateTime,
  setEndDateTime,
  setFieldTouched
}) => {
  const isTypingRef = useRef(false);
  const handleStartChange = (dateObject: DateObject | null) => {
    if (!dateObject) {
      const roundedDate = roundTo5Minutes(new Date());
      setStartDateTime(roundedDate.getTime());
      return;
    }
    const date = dateObject.toDate();
    const roundedDate = roundTo5Minutes(date);
    setStartDateTime(roundedDate.getTime());
    if (!endDateTime || (roundedDate && endDateTime < roundedDate)) {
      setEndDateTime(roundedDate.getTime());
    }
  };
  const handleEndChange = (dateObject: DateObject | null) => {
    if (!dateObject) {
      const roundedDate = roundTo5Minutes(new Date());
      setEndDateTime(roundedDate.getTime());
      return;
    }

    const date = dateObject.toDate();
    const roundedDate = roundTo5Minutes(date);
    setEndDateTime(roundedDate.getTime());
  };

  const roundTo5Minutes = (date: Date) => {
    if (!date || isTypingRef.current) return date;
    const minutes = date.getMinutes();
    if (minutes % 5 === 0) return date;

    const newDate = new Date(date);
    newDate.setMinutes(Math.round(minutes / 5) * 5);
    return newDate;
  };

  return (
    <div dir="rtl" className="font-sans w-full max-w-md space-y-4">
      <div>
        <label className="block text-sm font-medium text-neutral-400 mb-3 mt-7">Start Time</label>
        <DatePicker
          value={startDateTime}
          className="bg-dark teal"
          onChange={handleStartChange}
          calendar={persian}
          locale={persian_fa}
          format="HH:mm   YYYY/MM/DD"
          calendarPosition="left"
          plugins={[
            <TimePicker
              position="bottom"
              hideSeconds
              mStep={5}
              onFocus={() => {
                isTypingRef.current = true;
              }}
              onBlur={() => {
                isTypingRef.current = false;
                if (startDateTime) {
                  const roundedDate = roundTo5Minutes(new Date(startDateTime));
                  setStartDateTime(roundedDate.getTime());
                }
              }}
            />,
            <Toolbar position="top" />
          ]}
          render={
            <input
              className="bg-gray-300 text-neutral-300 w-full p-3 border border-gray-300 rounded-lg text-right focus:ring-2 focus:ring-offset-white mb-3"
              onBlur={() => {
                setFieldTouched('startTime', true);
                setFieldTouched('endTime', true);
              }}
            />
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-400 mb-3">End Time</label>
        <DatePicker
          value={endDateTime}
          className="bg-dark teal"
          onChange={handleEndChange}
          calendar={persian}
          locale={persian_fa}
          format="HH:mm   YYYY/MM/DD"
          calendarPosition="left"
          plugins={[
            <TimePicker
              position="bottom"
              hideSeconds
              mStep={5}
              onFocus={() => {
                isTypingRef.current = true;
              }}
              onBlur={() => {
                isTypingRef.current = false;
                if (endDateTime) {
                  const roundedDate = roundTo5Minutes(new Date(endDateTime));
                  setEndDateTime(roundedDate.getTime());
                }
              }}
            />,
            <Toolbar position="top" />
          ]}
          render={
            <input
              className="w-full p-3 border rounded-lg text-right focus:ring-2 focus:ring-offset-white bg-gray-300 text-neutral-300"
              onBlur={() => {
                setFieldTouched('startTime', true);
                setFieldTouched('endTime', true);
              }}
            />
          }
        />
      </div>
    </div>
  );
};

export { ReservationDateTimePicker };
