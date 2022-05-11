/**
 * Actions for calendar events
 */

import { fetchToken } from '../helpers/fetch';
import { types } from '../types/types';
import Swal from 'sweetalert2';
import { prepareEvents } from '../helpers/prepareEvents';

/**
 * Action to fetch the post endpoint to insert a new event into DB
 * @param {Event} event
 * @returns
 */
export const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth;

    try {
      const resp = await fetchToken('events', event, 'POST');
      const body = await resp.json();

      if (body.ok) {
        event.id = body.event.id;
        event.user = {
          _id: uid,
          name: name,
        };
        dispatch(eventAddNew(event));
      } else {
        Swal.fire('Error', body.msg, 'error');
      }
    } catch (error) {
      console.error(error);
    }
  };
};

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
});

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
});

export const eventClearActiveEvent = () => ({
  type: types.eventClearActiveEvent,
});

/**
 * Action to fetch the update endpoint
 * @param {Event} event
 * @returns
 */
export const eventStartUpdate = (event) => {
  return async (dispatch) => {
    try {
      const resp = await fetchToken(`events/${event.id}`, event, 'PUT');
      const body = await resp.json();

      if (body.ok) {
        dispatch(eventUpdated(event));
      } else {
        Swal.fire('Error', body.msg, 'error');
      }
    } catch (error) {
      console.error(error);
    }
  };
};

const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event,
});

export const eventDeleted = () => ({ type: types.eventDeleted });

/**
 * Action to fetch the get endpoint to load the events from DB
 * @returns
 */
export const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchToken('events');
      const body = await resp.json();
      const events = prepareEvents(body.events);

      dispatch(eventLoaded(events));
    } catch (error) {
      console.error(error);
    }
  };
};

const eventLoaded = (events) => ({
  type: types.eventLoaded,
  payload: events,
});
