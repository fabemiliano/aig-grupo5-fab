import {
  SAVE_USER_EMAIL_AND_PASSWORD, SAVE_USER_REGISTRY_AND_ADRESS, SAVE_USER_CARD, CLEAR_LOGIN_INFO
} from '../actions/index';

const INITIAL_STATE = {
  email: '',
  password: '',
  name: '',
  CPF: '',
  birthDay: '',
  code: '',
  phone: '',
  CEP: '',
  street: '',
  adressNumber: '',
  complement: '',
  city: '',
  stateLetters: '',
  cardName: '',
  cardNumber: '',
  dueDate: '',
  CVV: '',
};

const inProgressRegister = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_USER_EMAIL_AND_PASSWORD:
      return {
        ...state,
        email: action.email,
        password: action.password,
      };
    case SAVE_USER_REGISTRY_AND_ADRESS:
      return {
        ...state,
        name: action.name,
        CPF: action.CPF,
        birthDay: action.birthDay,
        code: action.code,
        phone: action.phone,
        CEP: action.CEP,
        street: action.street,
        adressNumber: action.adressNumber,
        complement: action.complement,
        city: action.city,
        stateLetters: action.stateLetters,
      };
    case SAVE_USER_CARD:
      return {
        ...state,
        cardName: action.cardName,
        cardNumber: action.cardNumber,
        dueDate: action.dueDate,
        CVV: action.CVV,
      };
    case CLEAR_LOGIN_INFO: return INITIAL_STATE;
    default:
      return state;
  }
};

export default inProgressRegister;
