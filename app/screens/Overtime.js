import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image ,
  Alert
} from "react-native";

import { Icon, Button, Container, Header, Content, Left , Card  , CardItem ,  Right} from 'native-base'
import AppHeader from '../component/Header';

class Overtime extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Overtime Request",
    headerLeft: <Icon name="ios-menu" style={{ paddingLeft: 10 }} onPress={() => navigation.navigate('DrawerOpen')} />,
    drawerLabel: 'Overtime Request',
    drawerIcon: ({ tintColor }) => (
      <Icon name="ios-time" style={{ height: 24 , width: 24 }} onPress={() => navigation.navigate('DrawerOpen')} />
    ),
  })


  render() {
    return (
      <Container>
        <AppHeader title="Overtime Request" openDrawer={() => this.props.navigation.openDrawer()} />
        <Container>
        {/* <Header /> */}
        <Content>
          <Card >
            <CardItem>
              <Icon active name="ios-time" />
              <Text>Rey Guidoriagao Jr.</Text>
              <Right>
                <Icon name="arrow-forward" onPress = {() => { Alert.alert("aw"); }} />
              </Right>
             </CardItem>
           </Card>
           <Card>
            <CardItem>
              <Icon active name="ios-time" />
              <Text>David Lester Baron</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
           </Card>
           <Card>
            <CardItem>
              <Icon active name="ios-time" />
              <Text>Jovie Ticar Jr.</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
           </Card>
           <Card>
            <CardItem>
              <Icon active name="ios-time" />
              <Text>Richard Dave Coo</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
           </Card>
           <Card>
            <CardItem>
              <Icon active name="ios-time" />
              <Text>Patrick Patrick</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
           </Card>

             <Card>
            <CardItem>
              <Icon active name="ios-time" />
              <Text>Louie Doromal</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
           </Card>
           
        </Content>
      </Container>
      </Container>

    )
  }

}

export default Overtime;


const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});