export const SAVE_USER_EMAIL_AND_PASSWORD = 'SAVE_USER_EMAIL_AND_PASSWORD';

export const SAVE_USER_REGISTRY_AND_ADRESS = 'SAVE_USER_REGISTRY_AND_ADRESS';

export const SAVE_USER_CARD = 'SAVE_USER_CARD';

export const SAVE_USER_DATA = 'SAVE_USER_DATA';

export const CLEAR_LOGIN_INFO = 'CLEAR_LOGIN_INFO';

export const SAVE_TEMPORARY_EVENT = 'SAVE_TEMPORARY_EVENT';

export const CLEAR_TEMPORARY_EVENT = 'CLEAR_TEMPORARY_EVENT';

export const userData = (obj) => ({
  type: SAVE_USER_EMAIL_AND_PASSWORD,
  obj,
});

export const userEmailAndPassword = (email, password) => ({
  type: SAVE_USER_EMAIL_AND_PASSWORD,
  email,
  password,
});

export const userRegisterAndPassword = (
  name, CPF, birthDay, code, phone, CEP, street, adressNumber, complement, city,
) => ({
  type: SAVE_USER_REGISTRY_AND_ADRESS,
  name,
  CPF,
  birthDay,
  code,
  phone,
  CEP,
  street,
  adressNumber,
  complement,
  city,
});

export const userCard = (cardName, cardNumber, dueDate, CVV) => ({
  type: SAVE_USER_CARD,
  cardName,
  cardNumber,
  dueDate,
  CVV,
});

export const clearTemporaryData = () => ({
  type: CLEAR_LOGIN_INFO,
});

export const temporaryEventData = (obj) => ({
  type: SAVE_TEMPORARY_EVENT,
  obj,
});

export const clearTemporaryEvent = () => ({
  type: CLEAR_TEMPORARY_EVENT,
});
  
