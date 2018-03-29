import React from 'react';
import { Platform,Dimensions,Text,View } from 'react-native';
import { Constants, Components, Location, Permissions, MapView } from 'expo';
import { mapStyle } from '../constants/mapConstants';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.3;
const LONGITUDE_DELTA = 0.3; //LATITUDE_DELTA * ASPECT_RATIO;


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../redux/actions';

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


  componentWillMount() {
    console.log("COMPONENT WILL MOUNT");

    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
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
    //this.setState({location: region});
    console.log("ASYNC LOCATION FOUND")
    this.props.changeLocation(region);
  };


  findPlace = () => {

    //console.log("SEARCH TEXT"+this.props.searchText);

  }


  componentWillReceiveProps(nextProps) {
    console.log("NEXT PROPS" + nextProps);
    this.setState({location: nextProps.location});
    //this.state.location = this.props.location;
  }


 
  render() {

      return (
          <MapView.Animated
            style={{ position: 'absolute', top: 0, left: 0,right: 0,bottom: 0 }}
            //initialRegion={this.state.location}
            region={this.state.location}
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
