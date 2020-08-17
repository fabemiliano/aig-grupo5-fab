import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import '../CSS/Login.css';
import ambev from '../img/ambev.png'

function Login(props) {
  const { data } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const clickToEnter = (data, email, password, history) => {
    const exist = (data)
      ? data.some((elem) => elem.email === email)
      : false;
    const checkPassword = (data)
      ? data.some((elem) => (elem.email === email && elem.password === password))
      : false;
    if (checkPassword) {
      localStorage.setItem('user', JSON.stringify({log: email}));
      history.push("/Perfil");
      return;
    }
    if (exist) {
      alert("Senha invalida");
      return;
    }
    alert("Email não cadastrado!");
  }

  const renderPasswordInput = (password, setPassword) => {
    return (
      <div className="conteinerPassword">
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(elem) => setPassword(elem.target.value)}
          min="8"
        />
      </div>
    );
  }

  const renderEmailInput = (email, setEmail) => {
    return (
      <div className="conteinerEmail" >
        <label htmlFor="email" >E-mail</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(elem) => setEmail(elem.target.value)}
        />
      </div>
    );
  }

  const renderButtonInput = (data, email, password) => {
    return (
        <div className="conteinerButton" >
          <button
            className="ButtonInput" 
            type="button"
            onClick={() => clickToEnter(data, email, password, history)}
          >
            ENTRAR
          </button>
      </div>
    );
  }

  return (
    <div className="conteinerLogin">
      <div className="header"></div>
      {renderEmailInput(email, setEmail)}
      {renderPasswordInput(password, setPassword)}
      {renderButtonInput(data, email, password, history)}
      <Link to="/register" className="registeLink"> Ainda não sou cadastrado</Link>
      <div className="footer">
        <img src={ambev} alt="ambevLogo" />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  userData: state.finishedUserData,
});

export default connect(null, mapStateToProps)(Login);

Login.propTypes = {
  userData: PropTypes.arrayOf(PropTypes.object).isRequired,
};
