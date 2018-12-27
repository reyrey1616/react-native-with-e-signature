
import React, {Component} from 'react';
// import {AppRegistry ,  Alert ,  Platform, StyleSheet, Text, View , Image , TextInput , KeyboardAvoidingView , Button , TouchableOpacity} from 'react-native';
import {Root } from 'native-base';
import LoginForm from './app/component/LoginForm';
import { createStackNavigator , createDrawerNavigator , DrawerItems} from 'react-navigation';
// import  HomeScreen  from './app/screens/HomeScreen';
// import  SideBar  from './app/component/DrawerNavigator';
import HomeScreen from './app/screens/HomeScreen';
import  LogoutAccount  from './app/component/LogoutAccount';

type Props = {};
 export default class App extends Component<Props> {
  // static navigationOptions = ({ navigation }) => ({
  //   title: "Recruitment",
  //   headerLeft: <Icon name="ios-menu" style={{ paddingLeft: 10 }} onPress={() => navigation.navigate('MyApp')} />,
  //   drawerLabel: 'Logout',
  //   drawerIcon: ({ tintColor }) => (
  //     <Icon name="ios-log-out" style={{ height: 24 , width: 24 }} onPress={() => navigation.navigate('MyApp')} />
  //   ),
  // })
  constructor(props){
    super(props)
    this.state = {
      username: 'rey' , 
      isLoggedIn: 0
    }
  }

  static navigationOptions = {
    header: null
  }
 
  render() {
    return (
     <Root>
        <MyRouter />
     </Root>
    );
  }
}

 
 const MyRouter = createStackNavigator({
  Login: { screen: LoginForm },
  Home: { screen: HomeScreen } ,
  LogoutAccount: { screen: LogoutAccount }
       } , 
  { initialRouteName: 'Home', }
);


