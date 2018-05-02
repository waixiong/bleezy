import React, { Component } from 'react';
import { ScrollView, ListView, TouchableHighlight, TouchableOpacity, View, StyleSheet, Button, Text, ImageBackground, Image, Alert, Modal, TextInput, FlatList } from 'react-native';
import { Constants, Font } from 'expo';
import ReactNativeModal from 'react-native-modal';
import { StackNavigator } from 'react-navigation';
import { List, ListItem } from 'react-native-elements'

import firebaseApp from '../components/database';

export default class OrderMenu extends Component {
    constructor (props) {
      super(props)
      this.state = {
        restaurant: '',
        order:[{restaurant: 'test', destination: 'test', rider: 'test'}]
      }
      console.log(JSON.stringify(this.props.navigation.state.params.o))
    }
  
      static navigationOptions = {
          
      }
  
      componentWillMount() {
        setTimeout(()=>{},3000)
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
        this.setState({restaurant : params.o.restaurant, order: this.state.o.concat([params.o])})
        console.log("params is " + params.o.restaurant)
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
        console.log("order render " + this.state.order[0].restaurant);
        
          return (
            <List>
            <FlatList
              data={this.state.order}
              renderItem={({item}) => {
                return (

              <TouchableOpacity style={{padding:5,margin:5}} onPress={()=>Alert.alert("Ok!!")}>
                <Text style={{fontSize:18}}>Restaurant : {item.restaurant}</Text>
                <Text style={{fontSize:15}}>Destination : {item.destination}</Text>
                <Text style={{fontSize:15}}>Rider : {item.rider}</Text>
              </TouchableOpacity>
              )}}
              
            keyExtractor={item => item.orderKey}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
            onEndReachedThreshold={50}
            />
            </List>
          )
        }
      }
  
  
  const styles = StyleSheet.create({
        container: {
          flex: 1,
          paddingTop: Constants.statusBarHeight,
          backgroundColor: '#aaaaaa',
          alignItems: 'center',
          justifyContent: 'center',
        },
  }); 