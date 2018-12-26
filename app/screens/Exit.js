import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image
} from "react-native";

import { Icon, Button, Container, Header, Content, Left } from 'native-base'
import AppHeader from '../component/Header';
import Hidden from '../component/Hidden';

class ExitClearance extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "ExitClearance",
    headerLeft: <Icon name="ios-menu" style={{ paddingLeft: 10 }} onPress={() => navigation.navigate('DrawerOpen')} />,
    drawerLabel: <Hidden />
  })


  render() {
    return (
      <Container>
        <AppHeader title="Exit Clearance" openDrawer={() => this.props.navigation.openDrawer()} />
        <Content
          contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
          <Button
            onPress={() => this.props.navigation.navigate('ExitClearance')} full>
            <Text style={{ color: 'white' }}>Exit Clearance</Text>
          </Button>
        </Content>
      </Container>

    )
  }

}

export default ExitClearance;


const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});