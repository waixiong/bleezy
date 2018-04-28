import React, { Component } from 'react';
import { View, StyleSheet, Button, Text, ImageBackground, Image, Alert, Modal, TextInput, FlatList } from 'react-native';
import { Constants, Font } from 'expo';
import ReactNativeModal from 'react-native-modal';
import { StackNavigator } from 'react-navigation';
import { List, ListItem } from 'react-native-elements'

//import firebase from './components/database';
import firebaseApp from '../components/database';
//import _getOrder from '../components/database';

var db = firebaseApp.database()
//const orderList = <View style={StyleSheet.box}><Text>Sorry, that is no order</Text></View>;

export default class Home extends Component {
    state = {
      quit : false,
      detail: '',
      order: [],
      test:'',
    }

    static navigationOptions = {
        
    }

    componentWillMount() {
      this.orderListener()
      console.log(JSON.stringify(this.state.order[1]))
    }

    orderListener(){
      const orderRef = db.ref().child('OrderList')
      orderRef.on('child_added', snap => { var temp = snap.val(); this.setState({order: this.state.order.concat([temp])}); console.log("The data is "+temp); console.log(temp); console.log("The array is "+this.state.order[0]);console.log(this.state.order[0].restaurant) }, err => console.log(err))
    }

    Home(){
      this._setting();
    }

    _setting = async() => {
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
    }

    orderListing = async() => {
      console.log('running')
       if(this.state.order.length === 0){
        this.setState({test:<View style={StyleSheet.box}><Text>Sorry, that is no order</Text></View>})
      }else{
        this.setState({test:<FlatList data={this.state.order} renderItem={({item})=>( <ListItem title={item.restaurant} subtitle={ <View style={{flex:0}}>  <Text>{item.destination}</Text> </View> } /> )} keyExtractor={item=>item.restaurant}/>})
      }
    }

    render() {
      /*var db = firebaseApp.database();
      var testRef = db.ref('OrderList');
      console.log('run')
      testRef.on('value', snapshot => {const data = snapshot.val(); this.setState({order:data}); console.log("Description is " + this.state.order);}, err => {console.log(err)});
      */
      let orderList = <Text>Waitting...</Text>
      console.log("render");
      var {navigate} = this.props.navigation;
      var {params} = this.props.navigation.state;//parameter pass from before
      if(this.state.order.length === 0){
          orderList = <Text>Sorry, that is no order</Text>
                
      }else{
          orderList = <FlatList data={this.state.order} renderItem={({item})=>( <ListItem title={item.restaurant} subtitle={ <View style={{flex:0}}>  <Text>{item.destination}</Text> </View>}/> )} keyExtractor={item=>item.restaurant}/>
                
      }
      return (
        <View style={styles.container}>
          <Modal visible={true} supportedOrientations={['portrait']} onRequestClose={() => this.setState({quit:true})} animationType={'fade'} transparent={false}>
            <View style={styles.pageContainer}>
              <Text style={styles.paragraph}>
                Test firebase from cheeTest for order Page
              </Text>
              
              <Text>You : {params.type} with {this.state.detail}</Text>
              <Text>{this.state.order.length}</Text>
              <List>
                <View style={StyleSheet.box}>
                {orderList}
                </View>
              </List>
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
        //justifyContent: 'center',
        paddingTop: '10%'
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
      box: {
        flex: 0,
        height: '20%',
        width: '80%',
        marginBottom: 5,
        marginTop: 5,
        backgroundColor: '#aaaaaa'
      },
      // space: {
      //   flex: 0,
      //   height: '60%',
      //   width: '100%',
      //   backgroundColor:'transparent',
      // },
      // space2: {
      //   flex: 0,
      //   height: '20%',
      //   backgroundColor:'transparent',
      // },
      // button1: {
      //   flex: 0,
      //   width: '80%',
      //   marginRight: '10%',
      //   marginLeft: '10%',
      //   height: '10%',
      // },
      //exit interface
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