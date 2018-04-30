import React, { Component } from 'react';
import { View, StyleSheet, Button, Text, ImageBackground, Image, Alert, Modal, TextInput } from 'react-native';
import { Constants, Font } from 'expo';
import ReactNativeModal from 'react-native-modal';

//import firebase from '../components/database';
import FacebookSignIn from '../components/FacebookSignln';
//import Navigator from '../App';

import "@expo/vector-icons"; // 5.2.0
import { Ionicons } from '@expo/vector-icons';
import firebaseApp from '../components/database';



export default class FirstPage extends Component {
  static navigationOptions = {
        
  }

  state = {
    firstPage : 'none',
    page : 0,
    quit: false,

    lEmail : '',
    lPass : '',
    LOGINorREGISTER : '',
    rName : '',
    rUser : '',
    rEmail : '',
    rPass : '',
    rConPass : '',   
  }

  done = () => {
    Alert.alert("Done")
  }

  register = () => { 
    Alert.alert("Register!!!")
  }

  componentWillMount() {
    setTimeout(()=>{},3000)
  }

  render() {
    var {navigate} = this.props.navigation

    return (
      <View style={styles.container}>
        
        <Modal visible={this.state.page === 0} supportedOrientations={['portrait']} onRequestClose={() => {this.setState({quit:true})}} animationType={'none'} transparent={false}>
          <View style={styles.pageContainer}>
            <ImageBackground style={styles.backgroundImage} source={require("../assets/foodex.jpg")}>
              <View style={styles.space}>
                <Text style={styles.title}> Bleezy </Text>
              </View>
              <View style={styles.button1}>
                <Button title="Login" color='#ff5500' onPress={() => {this.setState({firstPage:'login'})}}/>
              </View>
              <View style={styles.button1}>
                <Button title="Register" color='#ff5511' onPress={() => {this.setState({firstPage:'register'})}}/>
              </View>
            </ImageBackground>

            <ReactNativeModal isVisible={this.state.firstPage==='login'} animationIn="slideInLeft" animationOut="slideOutRight" onRequestClose={() => this.setState({firstPage:'none', lPass:''})}>
              <View style={styles.loginOut}>
              <View style={styles.loginIn}>
                <Text style={styles.loginText}>Login</Text>
                <TextInput style={styles.loginTextInput} underlineColorAndroid='rgba(0,0,0,0)' placeholder={'Email'} 
                  onChangeText={(lEmail) => this.setState({lEmail})} 
                  value={this.state.lEmail} 
                  autoCorrect={false}/>
                <TextInput style={styles.loginTextInput} underlineColorAndroid='rgba(0,0,0,0)' secureTextEntry={true} placeholder={'Password'} 
                  onChangeText={(lPass) => this.setState({lPass})} 
                  value={this.state.lPass} 
                  autoCorrect={false}/>
                <Text style={styles.forgotPass} onPress = {() => Alert.alert("Sorry, urs problem")}>Forgot Password?</Text>
                <View style={styles.loginButton}><Button title="Login" onPress={() => {firebaseApp.auth().signInWithEmailAndPassword(this.state.lEmail, this.state.lPass).then(() => {this.setState({firstPage:'none', page:1, hvLogin:true}); navigate('Home', {type:'login', email:this.state.lEmail})}).catch(function(error) {
                  // Handle Errors here.
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  // ...
                  Alert.alert(errorCode + '\n' + errorMessage);
                  });}} /></View>
                <View style={styles.loginButton}><FacebookSignIn navigation={this.props.navigation}/></View>
                <View style={styles.loginButton}><Button title="Alternative" onPress={() => {this.setState({firstPage:'none', page:1, LOGINorREGISTER:'login'}); navigate('Home', {type:'loginGoogle'})}} /></View>
              </View>
              </View>
            </ReactNativeModal>
            <ReactNativeModal isVisible={this.state.quit} animationIn="slideInLeft" animationOut="slideOutRight" onRequestClose={() => this.setState({quit:false})}>
              <View style={styles.outModal}><View style={styles.modal}>
                <Text>Are you sure want to quit?</Text>
                <View style={{flexDirection:'row'}}> 
                  <View style={styles.buttonModal}><Button title='Quit' onPress={()=>Alert.alert("Don't Quit!!!")} color='#ff5500'/></View>
                  <View style={styles.buttonModal}><Button title='Stay' onPress={()=>this.setState({quit:false})} color='#ff5500'/></View>
                  </View>
              </View></View>
            </ReactNativeModal>

            <Modal visible={this.state.firstPage === 'register'} supportedOrientations={['portrait']} onRequestClose={() => this.setState({firstPage:'none', rName:'',rEmail:'',rUser:'',rPass:'',rConPass:''})} animationType={'fade'} transparent={false}>
              <View style={styles.pageContainer}>
                <Text style={styles.registerTitle}>Register</Text>
                <Text style={styles.registerText}>Name</Text>
                <TextInput style={styles.registerTextInput} underlineColorAndroid='rgba(0,0,0,0)' placeholder={'Name'} 
                  onChangeText={(rName) => this.setState({rName})} 
                  value={this.state.rName} 
                  autoCorrect={false}/>
                <Text style={styles.registerText}>Email</Text>
                <TextInput style={styles.registerTextInput} underlineColorAndroid='rgba(0,0,0,0)' placeholder={'Email'} 
                  onChangeText={(rEmail) => this.setState({rEmail})} 
                  value={this.state.rEmail} 
                  autoCorrect={false}/>
                <Text style={styles.registerText}>Userame</Text>
                <TextInput style={styles.registerTextInput} underlineColorAndroid='rgba(0,0,0,0)' placeholder={'Username'} 
                  onChangeText={(rUser) => this.setState({rUser})} 
                  value={this.state.rUser} 
                  autoCorrect={false}/>
                <Text style={styles.registerText}>Password</Text>
                <TextInput style={styles.registerTextInput} underlineColorAndroid='rgba(0,0,0,0)' secureTextEntry={true} placeholder={'Password'} 
                  onChangeText={(rPass) => this.setState({rPass})} 
                  value={this.state.rPass} 
                  autoCorrect={false}/>
                <Text style={styles.registerText}>Comfirm Password</Text>
                <TextInput style={styles.registerTextInput} underlineColorAndroid='rgba(0,0,0,0)' secureTextEntry={true} placeholder={'Comfirm Password'} 
                  onChangeText={(rConPass) => this.setState({rConPass})} 
                  value={this.state.rConPass} 
                  autoCorrect={false}/>
                <View style={styles.registerButton}><Button title="Register" 
                onPress={() => {//this.setState({firstPage:'none', page:1, hvLogin:true}); 
                                if(this.state.rPass != '' && this.state.rPass === this.state.rConPass)
                                firebaseApp.auth().createUserWithEmailAndPassword(this.state.rEmail, this.state.rPass).then(() => {this.setState({firstPage:'none', page:1, hvLogin:true});navigate('Home', {type:'register', email:this.state.rEmail})}).catch(function(error) {
                                    // Handle Errors here.
                                    var errorCode = error.code;
                                    var errorMessage = error.message;
                                    // ...
                                    Alert.alert(errorCode + 'n' + errorMessage)
                                });
                                else Alert.alert('Please ensure ur confirm password is same as ur password');}} /></View>
                <Text style={styles.registerText}>You can also login with your facebook or google account without register.</Text>
                <View style={styles.registerButton}><Button title="Login" onPress={() => {this.setState({firstPage:'login'})}}/></View>
              </View>
            </Modal>
          </View>
        </Modal>

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
    fontSize: 16,
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
  outModal: {
    flex: 0,
    height:'100%',
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    flex: 0,
    width:'80%',
    backgroundColor:'#ffffff',
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonModal: {
    flex: 0,
    width: '40%',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
});