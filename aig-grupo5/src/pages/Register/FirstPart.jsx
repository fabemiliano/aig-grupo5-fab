import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { userEmailAndPassword } from '../../actions/index';
import '../../CSS/FirstPart.css';

const renderEmailInput = (email, setEmail) => {
  return (
    <div className="conteinerEmailFP">
      <label htmlFor="email">E-mail</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(elem) => setEmail(elem.target.value)}
        required
      />
    </div>
  );
}

const renderPasswordInput = (password, setPassword) => {
  return (
    <div className="conteinerPasswordFP">
      <label htmlFor="password">Senha</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(elem) => setPassword(elem.target.value)}
        required
        minlength="8"
      />
    </div>
  );
}

const renderCheckPasswordInput = (check, setCheck) => {
  return (
    <div className="conteinerCheckFP">
      <label htmlFor="check">Confirme a Senha</label>
      <input
        type="password"
        id="check"
        value={check}
        onChange={(elem) => setCheck(elem.target.value)}
        required
        minlength="8"
      />
    </div>
  );
}

const clickToRegister = (email, password, saveEmailAndPassword, history) => {
  localStorage.setItem('user', JSON.stringify({log: email}));
  saveEmailAndPassword(email, password);
  history.push("/RegisterAdress");
}

const isDisabled = (email, password, check) => {
  const emailTest = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  if (password === check && password !== '' && password.length > 7 && email.match(emailTest)) {
    return false;
  }
  return true;
}

const renderNextButtonInput = (email, password, check, saveEmailAndPassword, history) => {
  return (
    <div className="conteinerButtonFP">
        <button
          className="buttonFP"
          type="button"
          onClick={() => clickToRegister(email, password, saveEmailAndPassword, history)}
          disabled={isDisabled(email, password, check)}
        >
          Próximo
        </button>
    </div>
  );
}

function FirstPart(props) {
  const { saveEmailAndPassword } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [check, setCheck] = useState('');
  const history = useHistory();

  return (
    <div className="conteinerCadastro1">
      <div className="headerFP"></div>
      {renderEmailInput(email, setEmail)}
      {renderPasswordInput(password, setPassword)}
      {renderCheckPasswordInput(check, setCheck)}
      {renderNextButtonInput(email, password, check, saveEmailAndPassword, history)}
      <div className="footerFP"> </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  saveEmailAndPassword: (email, password) => dispatch(userEmailAndPassword(email, password)),
});

export default connect(null, mapDispatchToProps)(FirstPart);

FirstPart.propTypes = {
  saveEmailAndPassword: PropTypes.func.isRequired,
};
