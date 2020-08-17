import React from 'react';
import {
  Map, GoogleApiWrapper, InfoWindow, Marker,
} from 'google-maps-react';

const mapStyles = {
  width: '90%',
  height: '50vh',
  margin: '0 auto 0 auto',
  position: 'relative',
};

// how to use geolocation quert: https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API/Using_the_Permissions_API
// navigator.permissions.query({ name: 'geolocation' }).then((data) => console.log(data));

class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
    };
    this.showPosition = this.showPosition.bind(this);
  }

  componentDidMount() {
    this.getLocation();
  }

  // instructions to get geolocation: https://www.w3schools.com/html/html5_geolocation.asp

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      alert('Geolocation is not supported by this browser. Please change your settings to allow this feature');
    }
  }

  // getCurrentPosition requires a promisse to show coordinates

  showPosition(position) {
    this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude });
  }

  render() {
    const { google, center } = this.props;
    const { latitude, longitude } = this.state;
    return (
      <div className="map-container">
        <Map
          google={google}
          zoom={14}
          style={mapStyles}
          initialCenter={center}
          center={{ lat: latitude, lng: longitude }}
        >
          <Marker
            onClick={this.onMarkerClick}
            name="Current location"
            position={{ lat: latitude, lng: longitude }}
          />
        </Map>
      </div>
    );
  }
}
const auth_token = process.env.AUTH_TOKEN;
export default GoogleApiWrapper({
  apiKey: (auth_token),
})(MapComponent);
