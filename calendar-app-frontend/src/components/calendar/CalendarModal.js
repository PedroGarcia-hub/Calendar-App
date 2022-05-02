import React, { useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';

/**
 * Custom Styles for Calendar Modal
 */
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
Modal.setAppElement('#root');

// Variables to store the current and final date/hour for the event
const now = moment().minutes(0).second(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');

/**
 * Component for a Calendar Modal to introduce new events
 * @returns fragment JSX
 */
export const CalendarModal = () => {
  // useState hooks to handle de start and end date
  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());

  //   Form's values
  const [formValues, setFormValues] = useState({
    title: 'Evento',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate(),
  });

  const { title, notes } = formValues;

  /**
   * function to handle title and notes changes
   * @param {*} param target event input
   */
  const handleInputChange = ({ target }) => {
    setFormValues({ ...formValues, [target.name]: target.value });
  };

  const closeModal = () => {};

  /**
   * function to change the start date
   * @param {*} e Event
   */
  const handleStartDateChange = (e) => {
    setDateStart(e);
    setFormValues({ ...formValues, start: e });
  };

  /**
   * function to change the end date
   * @param {*} e Event
   */
  const handleEndDateChange = (e) => {
    setDateEnd(e);
    setFormValues({ ...formValues, end: e });
  };

  /**
   * function to handle the submit
   * @param {*} e Event
   */
  const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log(formValues);
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
    >
      {/* Form estructure HTML */}
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={handleSubmitForm}>
        <div className="form-group">
          <DateTimePicker
            onChange={handleStartDateChange}
            value={dateStart}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <DateTimePicker
            onChange={handleEndDateChange}
            value={dateEnd}
            minDate={dateStart}
            className="form-control"
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className="form-control"
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
