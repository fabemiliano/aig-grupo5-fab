import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { temporaryEventData } from '../../actions/index';

const actualEvents = JSON.parse(localStorage.getItem('storedEvents'));
const user = JSON.parse(localStorage.getItem('user'));

const arrStates = [
  "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MG", "MS", "MT", "PA",
  "PB", "PE", "PI", "PR", "RJ", "RN", "RS", "RO", "RR", "SC", "SE", "SP", "TO",
];

const sendToTerms = (eventData, newObj, history) => {
  eventData(newObj);
  if (actualEvents !== null) {
    localStorage.setItem('storedEvents', JSON.stringify([...actualEvents, newObj]));
  } else {
    localStorage.setItem('storedEvents', JSON.stringify([newObj]));
  }
  history.push("/eventTerms");
}

function clickToRegister(
  eventName, eventDay, eventTime, eventCEP, eventStreet, eventAdressNumber, eventComplement,
  eventCity, eventState, eventData, history, id, eventPassword,
) {
  const newObj = {
    id,
    password: eventPassword,
    name: eventName, 
    date: eventDay,
    time: eventTime,
    cep: eventCEP,
    address: {
      address: eventStreet,
      number: eventAdressNumber,
      complement: eventComplement,
      city: eventCity,
      state: eventState,
    },
    participants: [user.log],
    products: []
  };
  sendToTerms(eventData, newObj, history);
}

const renderEventNameInput = (eventName, setEventName) => {
  return (
    <div>
      <label htmlFor="name">Nome do Evento</label>
      <input
        type="text"
        id="name"
        value={eventName}
        onChange={(elem) => setEventName(elem.target.value)}
        required
      />
    </div>
  );
}

const renderEventDayInput = (eventDay, setEventDay) => {
  return (
    <div>
      <label htmlFor="eventDay">Data de Nascimento</label>
      <input
        type="date"
        id="eventDay"
        value={eventDay}
        onChange={(elem) => setEventDay(elem.target.value)}
        required
        min="1920-01-01"
      />
    </div>
  );
}

const renderTimeInput = (eventTime, setEventTime) => {
  return (
    <div>
      <label htmlFor="time">Horário</label>
      <input
        type="time"
        id="time"
        value={eventTime}
        onChange={(elem) => setEventTime(elem.target.value)}
        required
      />
    </div>
  );
}

const renderCEPInput = (eventCEP, setEventCEP) => {
  return (
    <div>
      <label htmlFor="CEP">CEP</label>
      <input
        type="number"
        id="CEP"
        value={eventCEP}
        onChange={(elem) => setEventCEP(elem.target.value)}
        required
        maxlength="8"
        minlength="8"
      />
    </div>
  );
}

const renderStreetInput = (eventStreet, setEventStreet) => {
  return (
    <div>
      <label htmlFor="street">Rua</label>
      <input
        type="text"
        id="street"
        value={eventStreet}
        onChange={(elem) => setEventStreet(elem.target.value)}
        required
      />
    </div>
  );
}

const renderNumberInput = (eventAdressNumber, setEventAdressNumber) => {
  return (
    <div>
      <label htmlFor="numberAdres">Número</label>
      <input
        type="number"
        id="numberAdres"
        value={eventAdressNumber}
        onChange={(elem) => setEventAdressNumber(elem.target.value)}
        required
      />
    </div>
  );
}

const renderComplementInput = (eventComplement, setEventComplement) => {
  return (
    <div>
      <label htmlFor="complement">Complemento</label>
      <input
        type="text"
        id="complement"
        value={eventComplement}
        onChange={(elem) => setEventComplement(elem.target.value)}
      />
    </div>
  );
}

const renderCityInput = (eventCity, setEventCity) => {
  return (
    <div>
      <label htmlFor="city">Cidade</label>
      <input
        type="text"
        id="city"
        value={eventCity}
        onChange={(elem) => setEventCity(elem.target.value)}
        required
      />
    </div>
  );
}

const renderStateInput = (eventState, setEventState) => {
  return (
    <div>
      <select
        id="state"
        value={eventState}
        onChange={(elem) => setEventState(elem.target.value)}
        required
        >
        {
          arrStates.map((elem) => (
            <option key={elem} value={elem}>{elem}</option>
          ))
        }
      </select>
    </div>
  );
}

const renderNextButtonInput = (
  eventName, eventDay, eventTime, eventCEP, eventStreet, eventAdressNumber, eventComplement,
  eventCity, eventState, eventData, history, id, eventPassword
) => {
  return (
    <div>
        <button
          type="button"
          onClick={() => clickToRegister(
            eventName, eventDay, eventTime, eventCEP, eventStreet,
            eventAdressNumber, eventComplement, eventCity, eventState,
            eventData, history, id, eventPassword,
          )}
        >
          Próximo
        </button>
    </div>
  );
}

const generateCode = () => {
  const simbolo = `0123456789ABCDEFGHIJKLMNOPQRSTUVXZ`;
  let temporaryID = ``;
  for(var i=0;i<9;i++){
    temporaryID += simbolo[Math.floor(Math.random()*33)];
  }
  return temporaryID;
}

function MainEventRegister(props) {
  const { eventData } = props;
  const [eventName, setEventName] = useState('');
  const [eventDay, setEventDay] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventCEP, setEventCEP] = useState('');
  const [eventStreet, setEventStreet] = useState('');
  const [eventAdressNumber, setEventAdressNumber] = useState('');
  const [eventComplement, setEventComplement] = useState('');
  const [eventCity, setEventCity] = useState('');
  const [eventState, setEventState] = useState('');
  const history = useHistory();
  const id = generateCode();
  const eventPassword = generateCode();

  return (
    <div>
      {renderEventDayInput(eventName, setEventName)}
      {renderEventNameInput(eventDay, setEventDay)}
      {renderTimeInput(eventTime, setEventTime)}
      <h2>Local do evento</h2>
      {renderCEPInput(eventCEP, setEventCEP)}
      {renderStreetInput(eventStreet, setEventStreet)}
      {renderNumberInput(eventAdressNumber, setEventAdressNumber)}
      {renderComplementInput(eventComplement, setEventComplement)}
      {renderCityInput(eventCity, setEventCity)}
      {renderStateInput(eventState, setEventState)}
      {renderNextButtonInput(
        eventName, eventDay, eventTime, eventCEP, eventStreet, eventAdressNumber, eventComplement,
        eventCity, eventState, eventData, history , id, eventPassword
      )}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  eventData: (obj) => dispatch(temporaryEventData(obj)),
});

export default connect(null, mapDispatchToProps)(MainEventRegister);

MainEventRegister.propTypes = {
  eventData: PropTypes.func.isRequired,
};
