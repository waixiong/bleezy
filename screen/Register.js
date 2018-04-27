import React, { Component } from 'react';
import { View, StyleSheet, Button, Text, ImageBackground, Image, Alert } from 'react-native';
import { Constants, Font } from 'expo';
import Modal from 'react-native-modal';

import firebase from '../components/database';

import "@expo/vector-icons"; // 5.2.0

export default class Register extends Component {
    state = {
      modal : false,
      quit : false,
    }
  
    done = () => {
      Alert.alert("Done")
    }
  
    render() {
      return (
        <View style={styles.container}>
          <Button title="Test Modal" color='#ff5500' onPress={() => {this.setState({modal : true})}}></Button>
          <Button title="Quit" color='#ff5500' onPress={() => {this.setState({quit : true})}}></Button>

          <Modal isVisible={this.state.modal} animationIn="slideInLeft" animationRight="slideOutDown">
            <View style={styles.login}>
              <Text style={styles.loginText}>Test Ok, Modal can be builded</Text>
              <Text style={styles.loginText}>U can quit now for further testing</Text>
              <View style={styles.loginButton}><Button title="Close" onPress={() => {this.setState({modal:false})}} /></View>
            </View>
          </Modal>
  
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      top: 0,
      left: 0,
      flex: 1,
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#000000'
    },
    login: {
        flex: 0,
        height: '60%',
        width: '100%',
        backgroundColor:'#ffffff',
        justifyContent: 'center',
      },
      loginText: {
        fontSize: 30,
      },
      loginButton: {
        flex: 0,
        width: '80%',
        marginRight: '10%',
        marginLeft: '10%',
        height: '15%',
      },
  });