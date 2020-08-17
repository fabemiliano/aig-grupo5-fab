import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { chooseEvent } from '../actions';
import '../CSS/EventChoice.css';
import logo from '../images/logo.svg';
import userchar from '../images/user.svg';

function searchEvent(id, password, setRedirect, chooseEvent) {
  const currentEvents = JSON.parse(localStorage.getItem('storedEvents'));
  let eventExist = [];
  if (currentEvents !== null) {
    eventExist = currentEvents.filter((event) => event.id === id);
  }
  if (eventExist.length === 0 || eventExist[0].password !== password) {
    alert('Id ou Senha inválida');
  } else {
    chooseEvent(eventExist[0]);
    setRedirect(true);
  }
}

function EventChoice(props) {
  const [searchedID, setSearchedID] = useState('');
  const [password, setpassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { chooseEvent } = props;
  return (
    <div className="overall-div">
      <div className="products-page-nav">
        <Link to="/mainPurchase"><img src={logo} alt="" width="100px" /></Link>
      </div>
      <div className="choive-div">
        <label htmlFor="id-field">ID do Evento</label>
        <input
          id="id-field"
          type="text"
          onChange={(e) => setSearchedID(e.target.value)}
          value={searchedID}
        />
        <label htmlFor="password-field">Senha</label>
        <input
          id="password-field"
          type="password"
          onChange={(e) => setpassword(e.target.value)}
          value={password}
        />
        <button
          onClick={() => searchEvent(searchedID, password, setRedirect, chooseEvent)}
        >
          Buscar

        </button>
        <Link className="new-event" to="/create-event">
          <p>Cadastrar Novo Evento</p>

        </Link>
        {redirect && <Redirect to={`/event-page/${searchedID}`} />}
      </div>
      <div className="footer">
        <div />
        <Link to="/Perfil"><img src={userchar} alt="" width="30px" /></Link>
      </div>
    </div>

  );
}

const mapDispatchToProps = (dispatch) => ({
  chooseEvent: (e) => dispatch(chooseEvent(e)),
});

EventChoice.propTypes = {
  chooseEvent: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(EventChoice);
