import React, { Component } from 'react';
import { View, StyleSheet, Button, Text, ImageBackground, Image, Alert, Modal, TextInput } from 'react-native';
import { Constants, Font } from 'expo';
import ReactNativeModal from 'react-native-modal';
import { Card } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';

//import firebase from './components/database';
import firebaseApp from './components/database';
import FacebookSignIn from './components/FacebookSignln';
import Home from './screen/Home';
import FirstPage from './screen/FirstPage';

import "@expo/vector-icons"; // 5.2.0
import { Ionicons } from '@expo/vector-icons';

export const Navigator = StackNavigator({
  Home: {
    screen: Home,
  },
  FirstPage: {
    screen: FirstPage,
  }
},{
  initialRouteName: 'FirstPage',
  headerMode: 'none',
});

export default class App extends Component {
  state = {
    firstPage : 'none',
    page : 0,     
  }

  static navigationOptions = {
    title: 'Self',
  }

  done = () => {
    Alert.alert("Done")
  }

  register = () => { 
    Alert.alert("Register!!!")
  }

  

  render() {
    return (
      <View style={styles.container}>
        
        <Navigator />

      </View>
    );
  }
}


const styles = StyleSheet.create({
  backgroundImage: {
    top: 0,
    left: 0,
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor:'transparent',
  },
  container: {
    flex: 0,
    height: '100%',
    width: '100%',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageContainer: {
    flex: 0,
    height: '100%',
    width: '100%',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: '75%',
    fontSize: 64,
    fontWeight: 'normal',
    textAlign: 'center',
    color: '#ffffff',
    width: '100%',
    backgroundColor:'transparent',
    fontFamily: '',
  },
  space: {
    flex: 0,
    height: '60%',
    width: '100%',
    backgroundColor:'transparent',
  },
  space2: {
    flex: 0,
    height: '20%',
    backgroundColor:'transparent',
  },
  button1: {
    flex: 0,
    width: '80%',
    marginRight: '10%',
    marginLeft: '10%',
    height: '10%',
  },
  
  loginOut: {
    flex: 0,
    height:'100%',
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  loginIn: {
    flex: 0,
    height: '60%',
    minHeight : 300,
    width: '90%',
    backgroundColor:'#ffffff',
    justifyContent: 'center',
    borderRadius: 20,
  },
  loginText: {
    fontSize: 30,
    marginLeft: '10%',
    marginRight: '10%',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  forgotPass: {
    fontSize: 10,
    marginLeft: '10%',
    marginRight: '10%',
    justifyContent: 'flex-end',
    textAlign: 'right',
    fontWeight: 'normal',
    marginBottom: 10
  },
  loginTextInput: {
    fontSize: 20,
    marginLeft: '10%',
    marginRight: '10%',
    height: 36,
    width: '80%',
    borderRadius: 5,
    borderColor: 'gray', borderWidth: 1,
  },
  loginButton: {
    flex: 0,
    width: '80%',
    marginRight: '10%',
    marginLeft: '10%',
    height: 36,
    justifyContent: 'center',
  },

  registerTitle: {
    fontSize: 30,
    marginLeft: '10%',
    marginRight: '10%',
    marginBottom: '5%',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  registerText: {
    fontSize: 10,
    marginLeft: '10%',
    marginRight: '10%',
    width:'80%',
    fontWeight: 'normal',
  },
  registerTextInput: {
    fontSize: 20,
    marginLeft: '10%',
    marginRight: '10%',
    height: 36,
    width: '80%',
    borderRadius: 5,
    borderColor: 'gray', borderWidth: 1,
    marginBottom: 10,
  },
  registerButton: {
    flex: 0,
    width: '80%',
    marginRight: '10%',
    marginLeft: '10%',
    height: 36,
    justifyContent: 'center',
  },
});