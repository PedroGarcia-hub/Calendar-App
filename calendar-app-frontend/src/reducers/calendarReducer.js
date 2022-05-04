import moment from 'moment';
import { types } from '../types/types';

const initialState = {
  events: [
    {
      id: new Date().getTime(),
      title: 'Cumpleaños del jefe',
      start: moment().toDate(),
      end: moment().add(2, 'hour').toDate(),
      bgcolor: '#fafafa',
      user: {
        _id: '123',
        name: 'Pedro',
      },
    },
  ],
  activeEvent: null,
};

/**
 * Function to handle the events by a reducer
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload,
      };

    case types.eventAddNew:
      return {
        ...state,
        events: [...state.events, action.payload],
      };

    case types.eventClearActiveEvent:
      return {
        ...state,
        activeEvent: null,
      };

    case types.eventUpdated:
      return {
        ...state,
        events: state.events.map((e) =>
          e.id === action.payload.id ? action.payload : e
        ),
      };

    default:
      return state;
  }
};
