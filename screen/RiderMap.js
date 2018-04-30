import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { Constants, Location, Permissions,MapView } from 'expo';


export default class RiderMap extends Component {
  state = {
    location: null,
    lat: null,
    long: null,
    errorMessage: null,
  };

  componentWillMount() {
    setTimeout(()=>{},3000)
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    let lat = location.coords.latitude;
    let long = location.coords.longitude;
    this.setState({ location , lat, long });
  };


  render() {
    let text = 'Loading..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      return (
        <View style={styles.container}>
      <MapView         
      style={styles.map}
        initialRegion={{
          latitude: this.state.lat,
          longitude: this.state.long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
      
      <MapView.Marker
      coordinate={this.state.location.coords}
      title="My Location"
      description="Some description"
    />
    </MapView>
    <TouchableOpacity style={styles.button} onPress={()=>Alert.alert("OK")}>
    <View style={{height:'100%', alignItems:'center', justifyContent:'center'}}>
        <Text style={{fontSize:20, textAlign:'center', fontWeight: 'bold', color:'#ffffff'}}>Ready</Text>
    </View>
    </TouchableOpacity>
    </View>
      
    );
    }
    
     
      
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>{text}</Text>
      </View>
    );
    
     
      
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
  button2: {
    flex: 0,
    alignItems: 'center',
    justifyContent :'center',
    backgroundColor: '#ffffff',
    borderRadius: 2,
    marginBottom: 0,
    width:'80%',
    height:'10%',
    marginRight: '0%',
    marginLeft: '0%',
  },
  button: {
    flex: 0,
    width: '100%',
    height:'10%',
    marginRight: '10%',
    marginLeft: '10%',
    backgroundColor:'#ff5500'
  },
  map:{
    flex:0,
    height:'90%',
    width:'100%',
  }
});
