import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image
} from "react-native";

import { Icon, Button, Container, Header, Content, Left } from 'native-base'
import AppHeader from '../component/Header';

class LeaveRequest extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Leave Request",
    headerLeft: <Icon name="ios-menu" style={{ paddingLeft: 10 }} onPress={() => navigation.navigate('DrawerOpen')} />,
    drawerLabel: 'Leave Request',
    drawerIcon: ({ tintColor }) => (
      <Icon name="ios-car" style={{ height: 24 , width: 24 }} onPress={() => navigation.navigate('DrawerOpen')} />
    ),
  })


  render() {
    return (
      <Container>
        <AppHeader title="Leave Request" openDrawer={() => this.props.navigation.openDrawer()} />
        <Content
          contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
          <Button
            onPress={() => this.props.navigation.navigate('DrawerOpen')} full>
            <Text style={{ color: 'white' }}>Leave Request</Text>
          </Button>
        </Content>
      </Container>

    )
  }

}

export default LeaveRequest;


const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});