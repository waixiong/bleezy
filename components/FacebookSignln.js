import React from 'react'
import { View, Button, Alert } from 'react-native';

import { Facebook } from "expo";
import * as firebase from 'firebase'
import firebaseApp from './database'

export default class FacebookSignIn extends React.Component {

  static nagivationOptions = {

  }

  _handleFacebookLogin = async () => {
    var {navigate} = this.props.navigation;
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        '171029540358111', // Replace with your own app id in standalone app
        { permissions: ['public_profile','email'] }
      );

      switch (type) {
        case 'success': {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
          const profile = await response.json();
          //const picture = await fetch('https//graph.facebook.com/$(profile.id)/picture?access_token=${token}');
         // const pictureURL = await picture.json()
          
          
          Alert.alert(
            'Logged in!',
            `Hi ${profile.name}!`,
            //`Hi ${JSON.stringify(profile)}!`,   <---to gain facebook info
          );
          const credential = firebase.auth.FacebookAuthProvider.credential(token)
          firebaseApp.auth().signInWithCredential(credential).then(() => {
            navigate('Home', {type:'loginFB', id:profile.id});
            
          }).catch((error) => {
            Message = error.message
            Alert.alert(error.code + '\n'+Message)
          })
          
          break;
        }
        case 'cancel': {
          Alert.alert(
            'Cancelled!',
            'Login was cancelled!',
          );
          break;
        }
        default: {
          Alert.alert(
            'Oops!',
            'Login failed!',
          );
        }
      }
    } catch (e) {
      Alert.alert(
        'Oops!',
        'Login failed!',
      );
    }
  };

  render() {
    return (
      <View>

        <Button
          title='Login with facebook'
          onPress={this._handleFacebookLogin}
        />
      
      </View>)
  }
}

export const x = {
  hello: 'hello'
}