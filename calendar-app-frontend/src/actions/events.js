/**
 * Actions for calendar events
 */

import { fetchToken } from '../helpers/fetch';
import { types } from '../types/types';

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
        console.log(event);
        dispatch(eventAddNew(event));
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

export const eventUpdated = (event) => ({
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

      const events = body.events;

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
