import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { userData, clearTemporaryData } from '../../actions/index';

const actualEvents = JSON.parse(localStorage.getItem('storedEvents'));
const user = JSON.parse(localStorage.getItem('user'));

class EventRegisterTerms extends Component {
  renderGroupTerms() {
    return (
      <div>
        <h2>Condições de Uso</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus ut tellus nec rutrum. Nullam at ipsum id mi fringilla eleifend. Fusce sollicitudin tristique eleifend. Cras fermentum dolor at eros bibendum convallis. Cras justo nisl, tempus ut turpis sit amet, blandit pharetra diam. Cras cursus ipsum id sodales vulputate. Mauris tempus dolor volutpat sem ultricies pulvinar. Phasellus a augue vestibulum ligula congue imperdiet imperdiet vitae nulla. Duis feugiat urna ut velit consectetur molestie. Integer commodo massa ante, non lobortis odio vulputate eu. Mauris sit amet euismod tortor, eu luctus elit. Ut aliquet porta sem id volutpat. 
          Aliquam erat volutpat. Cras eu placerat quam. Mauris gravida pulvinar urna, sit amet molestie mauris tempus vitae. Sed rutrum commodo erat, sit amet posuere quam pretium quis. Ut convallis tempus velit at congue. Nulla mollis nisi auctor cursus hendreritna.
        </p>
      </div>
    );
  }

  clickToRegister() {
    const { eventData } = this.props;
    eventData(this.state);
  }

  clickToClear() {
    const { clearInProgress } = this.props;
    clearInProgress();
    if (actualEvents.lenght === 1) {
      localStorage.setItem('storedEvents', JSON.stringify(''));
    }
    const newEventList = actualEvents.map((elem, index) => (
      elem.participants[0] === user.log && index !== actualEvents.lenght - 1
    ));
    localStorage.setItem('storedEvents', JSON.stringify(newEventList));
  }

  renderFinshButton() {
    return (
      <div>
        <Link to="/login">
        <button
          type="button"
          onClick={() => this.clickToRegister()}
        >
          Grupo
        </button>
        </Link>
      </div>
    );
  }

  renderCancelButton() {
    return (
      <div>
        <Link to="/Perfil">
          <button
            type="button"
            onClick={() => this.clickToClear()}
          >
            Ir Para Perfil
          </button>
        </Link>  
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderGroupTerms()}
        {this.renderFinshButton()}
        {this.renderCancelButton()}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveUserData: (obj) => dispatch(userData(obj)),
  clearInProgress: () => dispatch(clearTemporaryData()),
});

const mapStateToProps = (state) => ({
  data: state.finishedUserData,
  temporaryData: state.inProgressResgister,
});

export default connect(mapStateToProps, mapDispatchToProps)(EventRegisterTerms);

EventRegisterTerms.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  temporaryData: PropTypes.arrayOf(PropTypes.object).isRequired,
};
