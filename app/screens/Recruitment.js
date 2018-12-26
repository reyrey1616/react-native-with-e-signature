import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image ,
  Alert

} from "react-native";

import { Icon, Button, Container, Header, Content, Left , Card , CardItem  , Right , Body } from 'native-base'
import AppHeader from '../component/Header';
import { Col, Row, Grid } from "react-native-easy-grid";

class Recruitment extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Recruitment",
    headerLeft: <Icon name="ios-menu" style={{ paddingLeft: 10 }} onPress={() => navigation.navigate('DrawerOpen')} />,
    drawerLabel: 'Recruitment',
    drawerIcon: ({ tintColor }) => (
      <Icon name="ios-people" style={{ height: 24 , width: 24 }} onPress={() => navigation.navigate('DrawerOpen')} />
    ),
  })


  render() {
    return (
      <Container>
        <AppHeader title="Recruitment" openDrawer={() => this.props.navigation.openDrawer()}/>

        <Grid style = {{padding: 20}}>
        <Col>
        <Card>
            <CardItem style = {{alignItems: 'center' , justifyContent: 'center'}}  button onPress = {() => this.props.navigation.navigate('Applicant')}>
              <Icon name = "ios-people" style = {{fontSize: 35 , color: 'rgb(0 , 80 , 180)'}} />
            </CardItem>
            <CardItem  button onPress = {() => this.props.navigation.navigate('Applicant') }>
              <Body>
                <Text style = {{fontSize: 16}}>
                  Applicant's Interview
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Col>
        <Col>

        </Col>

        </Grid>
      </Container>

    )
  }

}

export default Recruitment;


const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});