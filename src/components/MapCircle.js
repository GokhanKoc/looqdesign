import React from 'react';
import { Platform,Dimensions,Text,View } from 'react-native';
import { Components, Location, Permissions, MapView } from 'expo';
import { mapStyle } from '../constants/mapConstants';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0322;
const LONGITUDE_DELTA = 0.0322; //LATITUDE_DELTA * ASPECT_RATIO;


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../redux/actions';

class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null,
      location: {
        latitude: 41.02549114190748,
        longitude: 28.974663549536412,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
    };
  }


  componentDidMount() {
    console.log("COMPONENT DID MOUNT");
    this._getLocationAsync();
  }

  componentWillMount() {
    console.log("COMPONENT WILL MOUNT");
    this.props.changeLocation(this.state.location);
  }


  onRegionChangeComplete = (region) => {
    console.log("ON REGION CHANGE");
    this.setState({location: region});
    this.props.changeLocation(region);
  }


  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let cuurentLocation = await Location.getCurrentPositionAsync({});

    let region = {
      longitude: cuurentLocation.coords.longitude,
      latitude: cuurentLocation.coords.latitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }
    this.setState({location: region});
    this.props.changeLocation(region);
  };


  render() {

    if(this.props.circle) {
      return (
          <MapView.Animated
            style={{ position: 'absolute', top: 0, left: 0,right: 0,bottom: 0 }}
            initialRegion={this.state.location}
            region={this.state.location}
            customMapStyle={mapStyle}
            provider="google"
            mapType="standard"
            showsUserLocation={true}
            onRegionChangeComplete={this.onRegionChangeComplete}
          >
            <MapView.Circle
              center={
                {latitude: this.props.location.latitude,
                longitude: this.props.location.longitude }
              }
              radius={2*width}
              strokeWidth={2}
              strokeColor="rgba(66, 180, 230, 1)"
            >
            </MapView.Circle>
          </MapView.Animated>
      );
    } else {
      return (
          <MapView.Animated
            style={{ position: 'absolute', top: 0, left: 0,right: 0,bottom: 0 }}
            initialRegion={this.state.location}
            region={this.state.location}
            customMapStyle={mapStyle}
            provider="google"
            mapType="standard"
            showsUserLocation={true}
            onRegionChangeComplete={this.onRegionChangeComplete}
          />
      );
    }

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return { location: state.location };
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
