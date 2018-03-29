import React from 'react';
import { Platform,Dimensions,Text,View } from 'react-native';
import { Components, Location, Permissions, MapView } from 'expo';
import { mapStyle } from '../constants/mapConstants';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.3;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'

class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null,
      location: {
        latitude: 52.52000659954049,
        longitude: 13.40495377779007,
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

    let currentLocation = await Location.getCurrentPositionAsync({});

    let region = {
      longitude: currentLocation.coords.longitude,
      latitude: currentLocation.coords.latitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }
    this.setState({location: region});
    this.props.changeLocation(region);
  };


  findPlace = () => {

    //console.log("SEARCH TEXT"+this.props.searchText);

  }


  componentWillReceiveProps() {
    this.state.location = this.props.location;
  }

  render() {

      return (
          <MapView.Animated
            style={{ position: 'absolute', top: 0, left: 0,right: 0,bottom: 0 }}
            //initialRegion={this.state.location}
            region={this.props.location}
            customMapStyle={mapStyle}
            provider="google"
            mapType="standard"
            showsUserLocation={true}
            onRegionChangeComplete={this.onRegionChangeComplete}
          />
        )
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return { location: state.location };
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
