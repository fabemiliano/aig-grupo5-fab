import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { getAddressByCep } from '../services/cep-api';
import { chooseEvent } from '../actions';
import '../CSS/CreateEvent.css';
import user from '../images/user.svg';
import logo from '../images/logo.svg';

const arrStates = [
  'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA',
  'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SE', 'SP', 'TO',
];

const currentEvents = JSON.parse(localStorage.getItem('storedEvents'));

const generateCode = () => {
  const simbolo = '0123456789ABCDEFGHIJKLMNOPQRSTUVXZ';
  let temporaryID = '';
  for (let i = 0; i < 5; i++) {
    temporaryID += simbolo[Math.ceil(Math.random() * 34)];
  }
  // const IDexists = currentEvents.some((event) => event.id === temporaryID);
  /* while (IDexists) {
    generateCode()
  }; */
  return temporaryID;
};

function addEvent(name, date, time, cep, add, numb, comp, city, state, chooseEvent, setRedirect) {
  const user = JSON.parse(localStorage.getItem('user'));
  const newEvent = {
    id: generateCode(),
    password: generateCode(),
    name,
    date,
    time,
    cep,
    address: {
      address: add,
      number: numb,
      complement: comp,
      city,
      state,
    },
    owner: user,
    participants: [user],
    products: [],
    delivery: {date, time: ""}, pickup: {date: "", time: ""}
  }
  if (currentEvents !== null) {
    localStorage.setItem('storedEvents', JSON.stringify([...currentEvents, newEvent]));
  } else {
    localStorage.setItem('storedEvents', JSON.stringify([newEvent]));
  }
  chooseEvent(newEvent);
  setRedirect(true);
}

function searchCep(cep, setCep, setAdd, setNeig, setCity, setState, setDisabledInput) {
  setCep(cep);
  if (cep.toString().length === 8) {
    getAddressByCep(cep)
      .then((answer) => {
        if (answer.erro === true) {
          alert('Cep Inválido');
        } else {
          setAdd(answer.logradouro);
          setNeig(answer.bairro);
          setCity(answer.localidade);
          setState(answer.uf);
          setDisabledInput(true);
        }
      });
  }
}

function CreateEvent(props) {
  const { chooseEvent } = props;
  const [name, setname] = useState('');
  const [date, setdate] = useState('');
  const [time, settime] = useState('');
  const [cep, setcep] = useState('');
  const [address, setaddress] = useState('');
  const [number, setnumber] = useState('');
  const [complement, setcomplement] = useState('');
  const [neighbor, setneighbor] = useState('');
  const [city, setcity] = useState('');
  const [state, setstate] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [disabledInput, setDisabledInput] = useState(false);
  return (
    <div>
      <div className="products-page-nav">
      <Link to="/mainPurchase"><img src={logo} alt="" width="100px" /></Link>
      </div>

      <form className="form-div">
        <label htmlFor="name-field">Nome do Evento</label>
        <input
          id="name-field"
          value={name}
          onChange={(e) => setname(e.target.value)}
          size="300"
          required
        />
        <div className="make-flex">
          <div className="time-div">
            <label htmlFor="date-field">Data do Evento</label>
            <input
              type="date"
              id="date-field"
              value={date}
              onChange={(e) => setdate(e.target.value)}
              required
            />
          </div>
          <div className="time-div">
            <label htmlFor="time-field">Horário</label>
            <input
              type="time"
              id="time-field"
              value={time}
              onChange={(e) => settime(e.target.value)}
              required
            />
          </div>
        </div>
        <h3>Local do Evento</h3>
        <label htmlFor="cep-field">CEP</label>
        <input
          maxLength="8"
          id="cep-field"
          value={cep}
          onChange={(e) => searchCep(e.target.value, setcep, setaddress, setneighbor, setcity, setstate, setDisabledInput)}
          required
        />
        <label htmlFor="address-field">Endereço</label>
        <input id="address-field" value={address} onChange={(e) => setaddress(e.target.value)} disabled={disabledInput} required />
        <label htmlFor="number-field">Número</label>
        <input id="number-field" value={number} onChange={(e) => setnumber(e.target.value)} required />
        <label htmlFor="complement-field">Complemento</label>
        <input id="complement-field" value={complement} onChange={(e) => setcomplement(e.target.value)} />
        <label htmlFor="neighbor-field">Bairro</label>
        <input id="neighbor-field" value={neighbor} onChange={(e) => setneighbor(e.target.value)} disabled={disabledInput} required />
        <div className="make-flex">
          <div className="make-flex-column">
            <label htmlFor="city-field">Cidade</label>
            <input id="city-field" value={city} onChange={(e) => setcity(e.target.value)} disabled={disabledInput} required />
          </div>
          <div className="make-flex-column">
            <label htmlFor="state-field">Estado</label>
            <select
              id="state-field"
              value={state}
              onChange={(e) => setstate(e.target.value)}
              disabled={disabledInput}
              required
            >
              {
                arrStates.map((elem) => (
                  <option key={elem} value={elem}>{elem}</option>
                ))
              }
            </select>
          </div>
        </div>
        <button
          onClick={() => addEvent(name, date, time, cep, address, number, complement, city, state, chooseEvent, setRedirect)}
        >
          Próximo
        </button>
        {redirect && <Redirect to="/event-confirmation" />}

      </form>
      <div className="footer">
        <div />
        <Link to="/Perfil"><img src={user} alt="" width="30px" /></Link>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  chooseEvent: (e) => dispatch(chooseEvent(e)),
});

export default connect(null, mapDispatchToProps)(CreateEvent);
