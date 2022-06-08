import React, { useCallback, useRef, useState } from 'react';

import CreationPopup from './CreationPopup';

import TUICalendar from '@toast-ui/react-calendar';
import { ISchedule, ICalendarInfo } from 'tui-calendar';

import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

const start = new Date();
const end = new Date(new Date().setMinutes(start.getMinutes() + 30));

const schedules: ISchedule[] = [
  {
    calendarId: '1',
    category: 'time',
    isVisible: true,
    title: '수업1',
    id: '1',
    body: 'Test',
    start,
    end,
  },
  {
    calendarId: '2',
    category: 'time',
    isVisible: true,
    title: '수업2',
    id: '2',
    body: 'Description',
    start: new Date(new Date().setHours(start.getHours() + 1)),
    end: new Date(new Date().setHours(start.getHours() + 2)),
  },
];

const calendars: ICalendarInfo[] = [
  // {
  //   id: '1',
  //   name: 'My Calendar',
  //   color: '#ffffff',
  //   bgColor: '#9e5fff',
  //   dragBgColor: '#9e5fff',
  //   borderColor: '#9e5fff',
  // },
  // {
  //   id: '2',
  //   name: 'Company',
  //   color: '#ffffff',
  //   bgColor: '#00a9ff',
  //   dragBgColor: '#00a9ff',
  //   borderColor: '#00a9ff',
  // },
];

function _Calendar() {
  const cal = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModalHandler = () => {
    setIsOpen((check) => !check);
  };

  const onClickSchedule = useCallback((e) => {
    const { calendarId, id } = e.schedule;
    const el = cal.current.calendarInst.getElement(id, calendarId);
    console.log(e, el.getBoundingClientRect());
    console.log('-----------------on clcik');
  }, []);

  const onBeforeCreateSchedule = useCallback((scheduleData) => {
    console.log(scheduleData);
    console.log('-----------------before create schedule');

    const schedule = {
      id: String(Math.random()),
      title: '수업',
      // title: scheduleData.title,
      isAllDay: scheduleData.isAllDay,
      start: scheduleData.start,
      end: scheduleData.end,
      category: scheduleData.isAllDay ? 'allday' : 'time',
      dueDateClass: '',
      location: scheduleData.location,
      // raw: {
      //   class: scheduleData.raw['class'],
      // },
      state: scheduleData.state,
    };
    cal.current.calendarInst.createSchedules([schedule]);
  }, []);

  const onBeforeDeleteSchedule = useCallback((res) => {
    console.log(res);
    const { id, calendarId } = res.schedule;
    cal.current.calendarInst.deleteSchedule(id, calendarId);
  }, []);

  const onBeforeUpdateSchedule = useCallback((e) => {
    console.log(e);
    console.log('before update schedules');
    const { schedule, changes } = e;
    cal.current.calendarInst.updateSchedule(
      schedule.id,
      schedule.calendarId,
      changes
    );
  }, []);

  function _getFormattedTime(time) {
    const date = new Date(time);
    const h = date.getHours();
    const m = date.getMinutes();

    return `${h}:${m}`;
  }

  function _getTimeTemplate(schedule, isAllDay) {
    var html = [];
    if (!isAllDay) {
      html.push('<strong>' + _getFormattedTime(schedule.start) + '</strong> ');
    }
    if (schedule.isPrivate) {
      html.push('<span class="calendar-font-icon ic-lock-b"></span>');
      html.push(' Private');
    } else {
      if (schedule.isReadOnly) {
        html.push('<span class="calendar-font-icon ic-readonly-b"></span>');
      } else if (schedule.recurrenceRule) {
        html.push('<span class="calendar-font-icon ic-repeat-b"></span>');
      } else if (schedule.attendees.length) {
        html.push('<span class="calendar-font-icon ic-user-b"></span>');
      } else if (schedule.location) {
        html.push('<span class="calendar-font-icon ic-location-b"></span>');
      }
      html.push(' ' + schedule.title);
    }

    return html.join('');
  }

  const templates = {
    time: function (schedule) {
      console.log(schedule);

      return _getTimeTemplate(schedule, false);
    },
  };

  return (
    <>
      <TUICalendar
        ref={cal}
        height='100%'
        view='week'
        useCreationPopup={false}
        useDetailPopup={true}
        template={templates}
        calendars={calendars}
        schedules={schedules}
        onClickSchedule={onClickSchedule}
        onBeforeCreateSchedule={onBeforeCreateSchedule}
        onBeforeDeleteSchedule={onBeforeDeleteSchedule}
        onBeforeUpdateSchedule={onBeforeUpdateSchedule}
      />

      <CreationPopup open={isOpen} />
    </>
  );
}

export default _Calendar;
