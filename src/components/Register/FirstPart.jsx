import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { userPessoalInfo} from '../../actions/index';
import '../../CSS/FirstPart.css';
import logo from '../../images/logo.svg';

const renderEmailInput = (email, setEmail) => (
  <div className="initial-register-div">
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

const renderPasswordInput = (password, setPassword) => (
  <div className="initial-register-div">
    <label htmlFor="password">Senha</label>
    <input
      type="password"
      id="password"
      value={password}
      onChange={(elem) => setPassword(elem.target.value)}
      required
      minLength="8"
    />
  </div>
);

const renderCheckPasswordInput = (check, setCheck) => (
  <div className="initial-register-div">
    <label htmlFor="check">Confirme a Senha</label>
    <input
      type="password"
      id="check"
      value={check}
      onChange={(elem) => setCheck(elem.target.value)}
      required
      minLength="8"
    />
  </div>
);

const renderNameInput = (name, setName) => (
  <div className="initial-register-div">
    <label htmlFor="name">Nome Completo</label>
    <input
      type="text"
      id="name"
      value={name}
      onChange={(elem) => setName(elem.target.value)}
      required
    />
  </div>
);

const renderCPFInput = (CPF, setCPF) => (
  <div className="initial-register-cpf-birthday-div">
    <label htmlFor="CPF">CPF</label>
    <input
      type="number"
      id="CPF"
      value={CPF}
      onChange={(elem) => setCPF(elem.target.value)}
      required
      max="99999999999"
      minLength="10000000000"
    />
  </div>
);

const renderBirthDayInput = (birthDay, setBirthDay) => (
  <div className="initial-register-cpf-birthday-div">
    <label htmlFor="birthDay">Nascimento</label>
    <input
      type="date"
      id="birthDay"
      value={birthDay}
      onChange={(elem) => setBirthDay(elem.target.value)}
      required
      min="1920-01-01"
      max="2020-01-01"
    />
  </div>
);

const renderPhoneInput = (code, setCode, phone, setPhone) => (
  <div className="initial-make-flex">
    <div className="initial-register-ddd-div">
      <label htmlFor="code">DDD</label>
      <input
        type="number"
        id="code"
        value={code}
        onChange={(elem) => setCode(elem.target.value)}
        required
        max="99"
        min="10"
      />
    </div>
    <div className="initial-register-phone-div">
      <label htmlFor="phone">Celular</label>
      <input
        type="number"
        id="phone"
        value={phone}
        onChange={(elem) => setPhone(elem.target.value)}
        required
        max="999999999"
        minlength="100000000"
      />
    </div>
  </div>
);

const clickToRegister = (
  email, password, name, CPF, birthDay,
  code, phone, saveUserPessoalInfo, history,
) => {
  const allDataOnLS=  JSON.parse(localStorage.getItem('usersData') || '[]');
  const newId = ( allDataOnLS.length +1 )
  saveUserPessoalInfo(
    email, password, newId, name, CPF, birthDay,
    code, phone, saveUserPessoalInfo, history,
  );
  history.push("/RegisterAdress");
}

const isDisabled = (
  email, password, check, name, CPF, birthDay, code, phone,
) => {
  const emailTest = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  const allDataOnLS=  JSON.parse(localStorage.getItem('usersData') || '[]');
  const test = allDataOnLS.some((e) => e.email === email)
  if (test) alert('Email já cadastrado')
  if (
    password === check && password !== '' && password.length > 7 && email.match(emailTest)
    && !test && CPF.length === 11 && code.length === 2 && phone.length === 9
  ) {
    return false;
  }
  return true;
};

const renderNextButtonInput = (
  email, password, check, name, CPF, birthDay, code, phone, saveUserPessoalInfo, history,
) => {
  return (
    <div className="initial-register-div">
        <button
          className="buttonFP"
          type="button"
          onClick={() => clickToRegister(
            email, password, name, CPF, birthDay,
            code, phone, saveUserPessoalInfo, history,
          )}
          disabled={isDisabled(
            email, password, check, name, CPF, birthDay, code, phone,
          )}>
          Próximo
        </button>
    </div>
  );
}

function FirstPart(props) {
  const { saveUserPessoalInfo, cleardata } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [check, setCheck] = useState('');
  const [name, setName] = useState('');
  const [CPF, setCPF] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('');
  const history = useHistory();

  useEffect(() => {
    setEmail('');
    setCheck('');
    setName('');
    setCPF('');
    setBirthDay('');
    setPhone('');
  }, []);

  return (
    <div>
      <div className="products-page-nav">
        <img src={logo} alt="" width="100px" />
      </div>
      <div className="initial-conteiner">
        {renderEmailInput(email, setEmail)}
        {renderPasswordInput(password, setPassword)}
        {renderCheckPasswordInput(check, setCheck)}
        {renderNameInput(name, setName)}
        <div className="initial-make-flex">
          {renderCPFInput(CPF, setCPF)}
          {renderBirthDayInput(birthDay, setBirthDay)}
        </div>
        {renderPhoneInput(code, setCode, phone, setPhone)}
        {renderNextButtonInput(
          email, password, check, name, CPF, birthDay, code, phone, saveUserPessoalInfo, history,
        )}
      </div>
      <div className="footerFP"> </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  saveUserPessoalInfo: (
    email, password, check, name, CPF, birthDay, code, phone,
  ) => dispatch(
    userPessoalInfo(
      email, password, check, name, CPF, birthDay, code, phone,
    )
  ),
});

export default connect(null, mapDispatchToProps)(FirstPart);

FirstPart.propTypes = {
  saveUserPessoalInfo: PropTypes.func.isRequired,
};
