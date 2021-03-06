import React from 'react';
import { Platform,Dimensions,Text,View } from 'react-native';
import { Constants, Components, Location, Permissions, MapView } from 'expo';
import { mapStyle } from '../constants/mapConstants';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.3;
const LONGITUDE_DELTA = 0.3; //LATITUDE_DELTA * ASPECT_RATIO;


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
    // this.props.changeLocation(this.state.location);
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
    
    console.log("onRegionChangeComplete...."+region.latitude+"-------"+region.longitude+"------");

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
    //console.log("ASYNC LOCATION LATITUDE------"+this.props.location.latitude+"-------"+region.latitude+"------")
    //console.log("ASYNC LOCATION LONGITUDE------"+this.props.location.longitude+"-------"+region.longitude+"------")

  };


  findPlace = () => {

    //console.log("SEARCH TEXT"+this.props.searchText);

  }

  componentWillReceiveProps(nextProps) {

    if(nextProps.location !== this.props.location) {
      this.setState({location: nextProps.location});
    }
  }

  _onMapReady = () => {
    console.log("HARITA HAZIRMIS NE GUZEL DI MI")
  }
 
  render() {

      console.log("MAP RERENDERED")
      //console.log("RENDER LOCATION------"+this.state.location.latitude+"-------"+this.state.location.longitude+"------")
      return (
          <MapView.Animated
            style={{ position: 'absolute', top: 0, left: 0,right: 0,bottom: 0 }}
            region={this.props.location}
            customMapStyle={mapStyle}
            provider="google"
            mapType="standard"
            showsUserLocation={true}
            onMapReady={this._onMapReady}
          />
        )
    }
}


export default Map;