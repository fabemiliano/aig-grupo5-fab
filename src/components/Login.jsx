import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import '../CSS/Login.css';
import ambev from '../images/ambev.png';
import logo from '../images/biglogo.png';

function Login(props) {
  const { data } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const clickToEnter = (data, email, password, history) => {
    // const exist = (data)
    //   ? data.some((elem) => elem.email === email)
    //   : false;
    // const checkPassword = (data)
    //   ? data.some((elem) => (elem.email === email && elem.password === password))
    //   : false;
    const allDataOnLS = JSON.parse(localStorage.getItem('usersData') || '[]');
    const existLS = allDataOnLS.some((elem) => elem.email === email);
    const checkLSPassword = allDataOnLS.some((elem) => (elem.email === email && elem.password === password));
    if (checkLSPassword) {
      // const InfoUser = (checkLSPassword)
      //   ? allDataOnLS.map((elem) => elem.email === email)
      //   : data.map((elem) => elem.email === email);
      const InfoUser = allDataOnLS.filter((elem) => elem.email === email);
      console.log(InfoUser);
      localStorage.setItem('user', JSON.stringify({ log: InfoUser[0].email, name: InfoUser[0].name, id: InfoUser[0].id }));
      history.push('/mainPurchase');
      return;
    }
    if (existLS) {
      alert('Senha invalida');
      return;
    }
    alert('Email não cadastrado!');
  };

  const renderPasswordInput = (password, setPassword) => (
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

  const renderEmailInput = (email, setEmail) => (
    <div className="conteinerEmail">
      <label htmlFor="email">E-mail</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(elem) => setEmail(elem.target.value)}
      />
    </div>
  );

  const renderButtonInput = (data, email, password) => (
    <div className="conteinerButton">
      <button
        style={{ marginBottom: '10px' }}
        className="ButtonInput"
        type="button"
        onClick={() => clickToEnter(data, email, password, history)}
      >
        ENTRAR
      </button>
    </div>
  );

  return (
    <div>
      <div className="products-page-nav" />
      <div className="conteinerLogin">
        <img src={logo} width="100px" style={{ marginBottom: '10px' }} alt="" />
        {renderEmailInput(email, setEmail)}
        {renderPasswordInput(password, setPassword)}
        {renderButtonInput(data, email, password, history)}
        <Link to="/register" className="registeLink"> Ainda não sou cadastrado</Link>
      </div>
      <div className="footerL">
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
