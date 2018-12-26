import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image
} from "react-native";

import { Icon, Button, Container, Header, Content, Left } from 'native-base'

class Dashboard extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Dashboard",
        headerLeft: <Icon name="ios-menu" style={{ paddingLeft: 10 }} onPress={() => navigation.navigate('DrawerOpen')} />,
        drawerLabel: 'Dashboard',
        drawerIcon: ({ tintColor }) => (
          <Icon name="ios-analytics" style={{ height: 24 , width: 24 }} onPress={() => navigation.navigate('DrawerOpen')} />
        ),
      })


  render() {
    return (
      <Container>
      </Container>

    )
  }
}

export default Dashboard;
