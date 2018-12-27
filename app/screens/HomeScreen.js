
import React, {Component} from 'react';
import {AppRegistry ,  Alert ,  Platform, StyleSheet, Text, View , Image , TextInput , KeyboardAvoidingView , Button , TouchableOpacity} from 'react-native';
import  SideBar  from '../component/DrawerNavigator';

export default class HomeScreen extends Component {

    static navigationOptions = {
      header: null
    }

    constructor(props) {
      super(props)
      this.state = {
        username : 'rey'
      }
    }

    render() {
      return (
        <SideBar username = {this.state.username} />
      );
    }

}
AppRegistry.registerComponent('HomeScreen', () => HomeScreen);
