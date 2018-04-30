import React, { Component } from 'react';
import { ScrollView, ListView, TouchableHighlight, TouchableOpacity, View, StyleSheet, Button, Text, ImageBackground, Image, Alert, Modal, TextInput, FlatList } from 'react-native';
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
  constructor (props) {
    super(props)
    this.state = {
      quit : false,
      detail: '',
      order: [],
      noOrder: [{message: "Sorry, that is no order", key: 'noOrder'}]
    }
    
  }

    static navigationOptions = {
        
    }

    componentWillMount() {
      setTimeout(()=>{},3000)
      this.orderListener()
      console.log(this.state.order[1])
      // var dataSource = new ListView.DataSource({rowHasChanged:(r1,r2) => r1.guid != r2.guid});
      // this.setState({orderListSource: dataSource.cloneWithRows(this.state.order)})
    }

    componentDidMount() {
      this._setting();
    }

    orderListener(){
      const orderRef = db.ref().child('OrderList')
      orderRef.on('child_added', snap => { var value = snap.val(); this.setState({order: this.state.order.concat([{order: snap.val(), orderKey: snap.key}])}); console.log("Order: "+value);console.log("Order is "+this.state.order)}, err => console.log(err))
      orderRef.on('child_changed', snap => { 
        this.setState({order: this._changeOrder(this.state.order, snap)})
       }, err => console.log(err))
      orderRef.on('child_removed', snap => { 
        this.setState({order: this._removeOrder(this.state.order, snap.key)})
      }, err => console.log(err))
    }

    _changeOrder(order, snap){//array, snap
      for(i = 0; i < order.length; i++){
        if(order[i].orderKey === snap.key){
          order[i].order = snap.val()
          break
        }
      }
      console.log("Change success")
      return order
    }

    _removeOrder(order, key){
      newOrder = []
      for(i = 0; i < order.length; i++){
        if(order[i].orderKey === key) continue;
        newOrder.push(order[i])
      }
      console.log("Remove success")
      return newOrder
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

    renderSeparator = () => {
      return (
        <View
          style={{
            height: 1,
            width: '90%',
            backgroundColor: '#CED0CE',
            marginLeft: '2%',
          }}
        />
      );
    };

    renderHeader = () => {
      return (<View>
      <View style={ { flex: 1, flexDirection:'row',
      height: 50,
      width: '100%',
      backgroundColor: '#ff5500',
      alignItems: 'center',} }>
          <TouchableOpacity style={{flex:0, height: 50, width: 50, backgroundColor: '#000000',}}/>
          <View style={{flex:1, height: 50, justifyContent: 'center', alignItems: 'center'}}><Text style={{fontSize:24, color:'#ffffff', fontWeight:'bold'}}>Bleezy</Text></View>
          <TouchableOpacity style={{flex:0, height: 50, width: 50, backgroundColor: '#000000',}}/>
              </View><View style={{height:40, width:'100%',backgroundColor:'#eeeeee', alignItems:'center', justifyContent:'center'}}><Text style={{justifyContent:'center', textAlign:'center'}}>Any existing offer is shown below</Text></View></View>);
    };

    render() {
      console.log("render");
      var {navigate} = this.props.navigation;
      var {params} = this.props.navigation.state;//parameter pass from before
      //if(this.state.order.length === 0){
        //console.log("if")
        const data = this.state.order
        //if(data.length > 0) {console.log('got data');console.log("total order: " + data); console.log("order: "+data.order);console.log("first order: "+data.order[0]);console.log("first orderKey: "+data.orderKey[0])}
        return (
            (data.length > 0) ? 
            (
              <List>
            <FlatList
              data={this.state.order}
              renderItem={({item}) => {
                return (

              <TouchableOpacity style={{padding:5,margin:5}} onPress={()=>{Alert.alert("U press " + item.order.rider + " offer")}}>
                <Text style={{fontSize:18}}>Restaurant : {item.order.restaurant}</Text>
                <Text style={{fontSize:15}}>Destination : {item.order.destination}</Text>
                <Text style={{fontSize:15}}>Rider : {item.order.rider}</Text>
              </TouchableOpacity>
              )}}
              
            keyExtractor={item => item.orderKey}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
            onEndReachedThreshold={50}
            />
            </List>
            ) : (//no order
              <List>
            <FlatList
              data={this.state.noOrder}
              renderItem={({item}) => {
                return (

              <TouchableOpacity style={{padding:10}} onPress={()=>{Alert.alert("U press " + item.rider + " offer")}}>
                <Text style={{fontSize:20, textAlign:'center', justifyContent:'center'}}>{item.message}</Text>
              </TouchableOpacity>
              )}}
              
            keyExtractor={item => item.key}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
            onEndReachedThreshold={50}
            />
            </List>
            ));            
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
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      pageContainer: {
        flex: 0,
        height: '92%',
        width: '100%',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        //justifyContent: 'center',
      },
      title: {
        marginTop: 0,
        fontSize: 16,
        fontWeight: 'normal',
        //textAlign: 'center',
        justifyContent: 'center',
        padding: 5,
        color: '#000000',
        width: '100%',
        backgroundColor:'transparent',
        fontFamily: '',
      },
      upBox: {
        flex: 0,
        height: '15%',
        width: '100%',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      downBox: {
        flex: 0,
        height: '100%',
        width: '100%',
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