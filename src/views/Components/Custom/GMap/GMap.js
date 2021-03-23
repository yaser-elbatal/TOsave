import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
// import { googleMapToken } from '../../../constants/environment'
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class SimpleMap extends Component {

  async componentDidMount() {

  }

  // static defaultProps = {
  //   center: {
  //     lat: this.props.lat,
  //     lng: this.props.lng
  //   },
  //   zoom: 11
  // };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '60vh', width: '100%' }}>
        <GoogleMapReact
          // bootstrapURLKeys={{ key: googleMapToken }}
          bootstrapURLKeys={{ key: "AIzaSyBa6F73tNUJygFHnBmcHGrVwRuLVfro3Yo" }}
          // defaultCenter={this.props.center}
          defaultCenter={{lat: this.props.lat, lng: this.props.lng}}
          defaultZoom={16 || this.props.zoom}
        >
          <AnyReactComponent
            lat={this.props.lat}
            lng={this.props.lng}
            text="Here"
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default SimpleMap;