
import React, {Component} from 'react';
import {AppRegistry , Alert ,  Platform, StyleSheet, Text, View , Image , TextInput , KeyboardAvoidingView , Button , TouchableOpacity} from 'react-native';
import {Container, Header, Content, Item, Input, Icon } from 'native-base';

export default class LogoutAccount extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '' ,
            password: ''
        };
    }

    static navigationOptions = ({ navigation }) => ({
        title: "Log-out",
        headerLeft: <Icon name="ios-menu" style={{ paddingLeft: 10 }} onPress={() => navigation.navigate('DrawerOpen')} />,
        drawerLabel: 'Log-out',
        drawerIcon: ({ tintColor }) => (
          <Icon name="ios-log-out" style={{ height: 24 , width: 24 }} onPress={() => navigation.navigate('LoginForm')} />
        ),
      })
    

  render() {
    return (
        <Button title = "Logout" onPress = {() => {
            this.props.navigation.navigate('LoginForm')
        }}>
        <Text>
            Logout
        </Text>
        </Button>
    );
  }

 
}


// AppRegistry.registerComponent('LogoutAccount', () => LogoutAccount);
