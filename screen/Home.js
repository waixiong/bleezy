import React, { Component } from 'react';
import { View, StyleSheet, Button, Text, ImageBackground, Image, Alert, Modal, TextInput } from 'react-native';
import { Constants, Font } from 'expo';
import ReactNativeModal from 'react-native-modal';
import { StackNavigator } from 'react-navigation';

//import firebase from './components/database';
import firebaseApp from '../components/database';

export default class Home extends Component {
    state = {
      quit : false,
      detail: '',
      order: 'null'
    }

    static navigationOptions = {
        
    }

    componentWillMount() {
      var {params} = this.props.navigation.state;//parameter pass from before
      if(params.type==='login' || params.type==='register'){
        this.setState({detail:params.email});
        console.log("detail = " + this.state.detail);
        console.log("params.login = " + params.email);
      }
      else if(params.type==='loginFB'){
        this.setState({detail:params.id});
        console.log("detail = " + this.state.detail);
        console.log("params.loginFB = " + params.id);
      }
      else{
        this.setState({detail:'unknown'});
        console.log("detail = " + this.state.detail);
      }
      
      /*return db.ref('/OrderList/Description').once('value').then(function(snapshot) {
        this.setState({order:snapshot.val()});
        console.log("Description is " + this.state.order);
        // ...not work
      });*/
    }

    render() {
      /*var db = firebaseApp.database();
      var testRef = db.ref('OrderList');
      console.log('run')
      testRef.on('value', snapshot => {const data = snapshot.val(); this.setState({order:data}); console.log("Description is " + this.state.order);}, err => {console.log(err)});
      */
      var starCountRef = firebaseApp.database().ref('OrderList');
      starCountRef.on('value', function(snapshot) {
      () => this.setState({order:snapshot});
      });
      var {navigate} = this.props.navigation;
      var {params} = this.props.navigation.state;//parameter pass from before

        return (
          <View style={styles.container}>
            <Modal visible={true} supportedOrientations={['portrait']} onRequestClose={() => this.setState({quit:true})} animationType={'fade'} transparent={false}>
              <View style={styles.pageContainer}>
                <Text style={styles.paragraph}>
                  Test firebase from cheeTest
                </Text>
                <Text style={{fontSize:40}}>No function Page</Text>
                <View style={styles.button1}>
                  <Button title="Login" color='#ff5500' onPress={() => Alert.alert('I said no function page')}/>
                </View>
                <View style={styles.button1}>
                  <Button title="Register" color='#ff5511' onPress={() => Alert.alert('I said no function page')}/>
                </View>
                <Text>You : {params.type} with {this.state.detail}</Text>
                <Text>{this.state.order}</Text>

                <ReactNativeModal isVisible={this.state.quit} animationIn="slideInLeft" animationOut="slideOutRight" onRequestClose={() => this.setState({quit:false})}>
                  <View style={styles.outModal}><View style={styles.modal}>
                    <Text>Are you sure want to quit?</Text>
                    <View style={{flexDirection:'row'}}> 
                      <View style={styles.buttonModal}><Button title='Quit' onPress={()=>navigate('FirstPage')} color='#ff5500'/></View>
                      <View style={styles.buttonModal}><Button title='Stay' onPress={()=>this.setState({quit:false})} color='#ff5500'/></View>
                    </View>
                  </View></View>
                </ReactNativeModal>

              </View>
            </Modal>
          </View>);
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