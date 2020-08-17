import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { chooseEvent } from '../actions';
import '../CSS/EventPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import logo from '../images/logo.svg';
import userchar from '../images/user.svg';
import {
  FacebookShareButton, FacebookIcon, TelegramShareButton, TelegramIcon, WhatsappShareButton, WhatsappIcon, TwitterShareButton, TwitterIcon,
} from 'react-share';

const storedEvents = JSON.parse(localStorage.getItem('storedEvents'));

function copyToClipboard(setHide) {
  navigator.clipboard.writeText(window.location.href);
  setHide(false);
}

function deleteEvent(event, setRedirect) {
  const newEventsList = storedEvents.reduce((acc, e) => {
    if (event.id !== e.id) acc.push(e);
    return acc;
  }, []);
  localStorage.setItem('storedEvents', JSON.stringify(newEventsList));
  setRedirect(true);
}

function deleteNonParticipantProducts(props) {
  const { event } = props;
  const user = JSON.parse(localStorage.getItem('user'));
  const newProducts = event.products.reduce((acc, p) => {
    if (p.user.log !== user.log) {
      acc.push(p);
    }
    return acc;
  }, []);
  chooseEvent({ ...event, products: newProducts });
}

function updateLocalStorage(props) {
  const { event } = props;
  const currentEvents = JSON.parse(localStorage.getItem('storedEvents'));
  const newEvents = currentEvents.reduce((acc, e) => {
    if (e.id !== event.id) {
      acc.push(e);
    } else {
      acc.push(event);
    }
    return acc;
  }, []);
  localStorage.setItem('storedEvents', JSON.stringify(newEvents));
}

function EventParticipation(isParticipant, setIsParticipant, props) {
  const { event, chooseEvent } = props;
  const user = JSON.parse(localStorage.getItem('user'));
  let newParticipants = [];

  if (!isParticipant) {
    newParticipants = [...event.participants, user];
    setIsParticipant(true);
  } else {
    newParticipants = event.participants.reduce((acc, p) => {
      if (p.log !== user.log) {
        acc.push(p);
      }
      return acc;
    }, []);
    deleteNonParticipantProducts(props);
    setIsParticipant(false);
  }
  chooseEvent({ ...event, participants: newParticipants });
  updateLocalStorage(props);
}

function rearrangeDate(dateString) {
  const numbers = dateString.substring(0, 4);
  return `${dateString.substring(5)}-${numbers}`;
}

function EventPage(props) {
  const { event } = props;
  const [isParticipant, setIsParticipant] = useState(false);
  const [open, setOpen] = useState(false);
  const [hide, setHide] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    event.participants.forEach((p) => {
      if (p.log === user.log) {
        setIsParticipant(true);
      }
    });
  }, []);

  return (
    <div>
      <div className="products-page-nav">
        <img src={logo} alt="" width="100vw" />
      </div>
      <div className="container">
        <div className="event-page-div">
          <div className="info-div">
            <h3>Informações do Evento</h3>
            <h2>{event.name}</h2>
            <p>{`Data: ${rearrangeDate(event.date)}`}</p>
            <p>{`Horário: ${event.time}`}</p>
            <p>{`${event.address.address}, ${event.address.number}, ${event.address.complement}`}</p>
            <p>{`${event.address.city}, ${event.address.state}`}</p>
          </div>

          <div className="share-div">
            <h3>Compartilhe com Seus Amigos</h3>
            <FacebookShareButton size="32" url="www.jao.com.br/event-choice" quote={`Participe de ${event.name}. Só entrar no Jao e digitar Id: ${event.id} e Senha: ${event.password}`}><FacebookIcon /></FacebookShareButton>
            <WhatsappShareButton size="32" url="www.jao.com.br/event-choice" title={`Participe de ${event.name}. Só entrar no Jao e digitar Id: ${event.id} e Senha: ${event.password}`}><WhatsappIcon /></WhatsappShareButton>
            <TelegramShareButton size="32" url="www.jao.com.br/event-choice" title={`Participe de ${event.name}. Só entrar no Jao e digitar Id: ${event.id} e Senha: ${event.password}`}><TelegramIcon /></TelegramShareButton>
            <TwitterShareButton size="32" url="www.jao.com.br/event-choice" title={`Participe de ${event.name}. Só entrar no Jao e digitar Id: ${event.id} e Senha: ${event.password}`}><TwitterIcon /></TwitterShareButton>
          </div>

          <div className="icon-text-div">
            {open && <FontAwesomeIcon icon={faAngleUp} onClick={() => setOpen(false)} size="1x" />}
            {!open && <FontAwesomeIcon icon={faAngleDown} onClick={() => setOpen(true)} size="1x" />}
            <h3>Participantes</h3>
          </div>

          {open && (
            <div className="participants-div">
              {event.participants.map((person) => <p>{person.log}</p>)}
            </div>
          )}

          <Link><h3>Carrinho do Evento</h3></Link>

          <div className="buttons-div">
            {user.log !== event.owner.log && !isParticipant && <button onClick={() => EventParticipation(isParticipant, setIsParticipant, props)}>Participar do Evento</button>}
            {user.log !== event.owner.log && isParticipant && <button onClick={() => EventParticipation(isParticipant, setIsParticipant, props)}>Deixar Evento</button>}
            {isParticipant && <Link to="/group-products-list"><button>Adicionar Itens</button></Link>}
            {user.log === event.owner.log && <Link to="/group-cart"><button>Finalizar Compra</button></Link>}
            {user.log === event.owner.log && <button onClick={() => deleteEvent(event, setRedirect)}>Excluir Evento</button>}
            {redirect && <Redirect to="/mainPurchase" />}
          </div>
        </div>
        <div className="footer">
          <div />
          <Link to="/Perfil"><img src={userchar} alt="" width="30px" /></Link>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  event: state.eventReducer.event,
});

const mapDispatchToProps = (dispatch) => ({
  chooseEvent: (e) => dispatch(chooseEvent(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);
