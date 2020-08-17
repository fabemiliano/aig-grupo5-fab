import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';
import userchar from '../images/user.svg';

function deleteEvent(event) {
  const storedEvents = JSON.parse(localStorage.getItem('storedEvents'));
  const newEventsList = storedEvents.reduce((acc, e) => {
    if (event.id !== e.id) acc.push(e);
    return acc;
  }, []);
  localStorage.setItem('storedEvents', JSON.stringify(newEventsList));
}

function EventConfirmation(props) {
  const { event } = props;
  return (
    <div>
      <div className="products-page-nav">
        <Link to="/mainPurchase"><img src={logo} alt="" width="100px" /></Link>
      </div>
      <div className="container">
        <h3>O seguinte evento foi criado:</h3>
        <p>{`ID: ${event.id}`}</p>
        <p>{`Nome: ${event.name}`}</p>
        <p>{`Data: ${event.date}`}</p>
        <p>{`Horário: ${event.time}`}</p>
        <p>{`${event.address.address}, ${event.address.number}, ${event.address.complement}`}</p>
        <p>{`${event.address.city}, ${event.address.state}`}</p>

        <h3>Informações Importantes:</h3>
        <p>Mussum Ipsum, cacilds vidis litro abertis. Quem num gosta di mé, boa gentis num é. Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus. Leite de capivaris, leite de mula manquis sem cabeça. Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo!</p>
        <p>Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis. Copo furadis é disculpa de bebadis, arcu quam euismod magna. Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Mais vale um bebadis conhecidiss, que um alcoolatra anonimis.</p>
        <p>Delegadis gente finis, bibendum egestas augue arcu ut est. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis. Paisis, filhis, espiritis santis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis.</p>
        <p>Mé faiz elementum girarzis, nisi eros vermeio. Diuretics paradis num copo é motivis de denguis. A ordem dos tratores não altera o pão duris. Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum.</p>
        <div className="agreement-buttons">
          <Link to={`/event-page/${event.id}`}><button>Concordo</button></Link>
          <Link to="/mainPurchase" onClick={() => deleteEvent(event)}><button>Discordo</button></Link>
        </div>
      </div>
      <div className="footer">
        <div />
        <Link to="/Perfil"><img src={userchar} alt="" width="30px" /></Link>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  event: state.eventReducer.event,
});

export default connect(mapStateToProps)(EventConfirmation);
