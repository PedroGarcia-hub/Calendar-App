import React, { useEffect, useState } from 'react';
import { Navbar } from '../ui/Navbar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import {
  eventClearActiveEvent,
  eventSetActive,
  eventStartLoading,
} from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');
const localizer = momentLocalizer(moment);

/**
 * Calendar Screen component
 * @returns JSX fragment
 */
export const CalendarScreen = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { uid } = useSelector((state) => state.auth);

  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'month'
  );

  /**
   * Call the load events action
   */
  useEffect(() => {
    dispatch(eventStartLoading());
  }, [dispatch]);

  /**
   * Function to open a CalendarModal component on doubleclick
   * @param {Event} e Event
   */
  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  };

  /**
   * Function to select event to active when a event is selected
   * @param {Event} e
   */
  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
  };

  /**
   * function to save in localStorage the last view
   * @param {Event} e Event
   */
  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
  };

  /**
   * Function to clean delete button when the event is no longer selected
   * @param {Event} e
   */
  const onSelectSlot = (e) => {
    dispatch(eventClearActiveEvent());
  };

  /**
   * Function to set the calendar style
   * @returns style
   */
  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: uid === event.user._id ? '#367CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white',
    };
    return {
      style,
    };
  };
  return (
    <div className="calendar-screen">
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        onSelectSlot={onSelectSlot}
        selectable={true}
        view={lastView}
        components={{ event: CalendarEvent }}
      />
      <AddNewFab />

      {activeEvent && <DeleteEventFab />}

      <CalendarModal />
    </div>
  );
};
