import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { userAdress } from '../../actions/index';
import { getAddressByCep } from '../../services/cep-api';
import '../../CSS/SecondPart.css';
import logo from '../../images/logo.svg';

const arrStates = [
  "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MG", "MS", "MT", "PA",
  "PB", "PE", "PI", "PR", "RJ", "RN", "RS", "RO", "RR", "SC", "SE", "SP", "TO",
];

function searchCep(cep, setCep, setAdd, setNeig, setCity, setState) {
  setCep(cep);
  if (cep.toString().length === 8) {
    getAddressByCep(cep)
      .then((answer) => {
        if (answer.error) {
          alert("Cep Inválido");
        } else {
          setAdd(answer.logradouro);
          setNeig(answer.bairro);
          setCity(answer.localidade);
          setState(answer.uf);
        }
    });
  }
}

const clickToRegister = (
  CEP, street, adressNumber, complement, city,
  stateLetters, saveUserAdress, history,
) => {
  saveUserAdress(CEP, street, adressNumber, complement, city, stateLetters);
  history.push('/RegisterCard');
};

const renderCEPInput = (
  CEP, setCEP, setStreet, setNeighbor, setCity, setStateLetters,
) => (
  <div className="adress-register-div">
    <label htmlFor="CEP">CEP</label>
    <input
      maxlength="8"
      id="CEP"
      value={CEP}
      onChange={(elem) => searchCep(
        elem.target.value, setCEP, setStreet, setNeighbor,
        setCity, setStateLetters,
      )}
    />
  </div>
);

const renderStreetInput = (street, setStreet) => {
  return (
    <div className="adress-register-div">
      <label htmlFor="street">Rua</label>
      <input
        type="text"
        id="street"
        value={street}
        onChange={(elem) => setStreet(elem.target.value)}
        required
      />
    </div>
  );
}

const renderNeighborInput = (neighbor, setNeighbor) => {
  return (
    <div className="adress-register-div">
      <label htmlFor="neighbor">Bairro</label>
      <input
        type="text"
        id="neighbor"
        value={neighbor}
        onChange={(elem) => setNeighbor(elem.target.value)}
        required
      />
    </div>
  );
}

const renderNumberInput = (adressNumber, setAdressNumber) => (
  <div className="adress-register-div">
    <label htmlFor="adressNumber">Número</label>
    <input
      type="number"
      id="adressNumber"
      value={adressNumber}
      onChange={(elem) => setAdressNumber(elem.target.value)}
      required
    />
  </div>
);

const renderComplementInput = (complement, setComplement) => (
  <div className="adress-register-div">
    <label htmlFor="complement">Complemento</label>
    <input
      type="text"
      id="complement"
      value={complement}
      onChange={(elem) => setComplement(elem.target.value)}
    />
  </div>
);

const renderCityInput = (city, setCity) => (
  <div className="adress-register-city-div">
    <label htmlFor="city">Cidade</label>
    <input
      type="text"
      id="city"
      value={city}
      onChange={(elem) => setCity(elem.target.value)}
      required
    />
  </div>
);

const renderStateInput = (stateLetters, setStateLetters) => (
  <div className="adress-register-state-div">
    <label htmlFor="stateLetters">Estado</label>
    <select
      id="stateLetters"
      value={stateLetters}
      onChange={(elem) => setStateLetters(elem.target.value)}
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

const isDisabled = (CEP, street, adressNumber, city, stateLetters) => {
  // if (s
  // ) {
  //   alert('Verifique o CPF, DDD, Telefone e CEP')
  // }
  if (CEP.length === 8 && street && adressNumber && city && stateLetters) {
    return false;
  }
  return true;
}

const renderNextButtonInput = (
  CEP, street, adressNumber, complement, city,
  stateLetters, saveUserAdress, history,
) => (
    <div className="adress-register-div">
      <button
        className="buttonSP"
        type="button"
        onClick={() => clickToRegister(
          CEP, street, adressNumber, complement, city,
          stateLetters, saveUserAdress, history,
        )}
        disabled={isDisabled(
          CEP, street, adressNumber, city, stateLetters,
        )}
      >
        Próximo
    </button>
    </div>
  );

function SecondPart(props) {
  const { saveUserAdress } = props;
  const [CEP, setCEP] = useState('');
  const [street, setStreet] = useState('');
  const [neighbor, setNeighbor] = useState('');
  const [adressNumber, setAdressNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [city, setCity] = useState('');
  const [stateLetters, setStateLetters] = useState('');
  const history = useHistory();

  return (
    <div>
      <div className="products-page-nav">
        <img src={logo} alt="" width="100px" />
      </div>
      <div className="adress-conteiner">
        {renderCEPInput(CEP, setCEP, setStreet, setNeighbor, setCity, setStateLetters)}
        {renderStreetInput(street, setStreet)}
        {renderNumberInput(adressNumber, setAdressNumber)}
        {renderNeighborInput(neighbor, setNeighbor)}
        {renderComplementInput(complement, setComplement)}
        <div className="adress-make-flex">
          {renderCityInput(city, setCity)}
          {renderStateInput(stateLetters, setStateLetters)}
        </div>
        {renderNextButtonInput(
          CEP, street, adressNumber, complement, city,
          stateLetters, saveUserAdress, history,
        )}
      </div>
      <div className="footerSP"> </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  saveUserAdress: (CEP, street, adressNumber, complement, city, stateLetters) => dispatch(
    userAdress(CEP, street, adressNumber, complement, city, stateLetters)),
});

export default connect(null, mapDispatchToProps)(SecondPart);

SecondPart.propTypes = {
  saveUserAdress: PropTypes.func.isRequired,
};
