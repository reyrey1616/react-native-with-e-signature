import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image
} from "react-native";

import { Icon, Button, Container, Header, Content, Left , Card , CardItem , Body} from 'native-base'
import AppHeader from '../component/Header';
import { Col, Row, Grid } from "react-native-easy-grid";

class Services extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "HR Services",
    headerLeft: <Icon name="ios-menu" style={{ paddingLeft: 10 }} onPress={() => navigation.navigate('DrawerOpen')} />,
    drawerLabel: 'HR Services',
    drawerIcon: ({ tintColor }) => (
      <Icon name="ios-paper" style={{ height: 24 , width: 24 }} onPress={() => navigation.navigate('DrawerOpen')} />
    ),
  })


  render() {
    return (
      <Container>
        <AppHeader title="HR Services" openDrawer={() => this.props.navigation.openDrawer()}/>
        <Grid style = {{padding: 20}}>
        <Col>
        <Card>
            <CardItem style = {{alignItems: 'center' , justifyContent: 'center'}}  button onPress = {() => this.props.navigation.navigate('ExitClearance')}>
              <Icon name = "ios-exit" style = {{fontSize: 35 , color: 'rgb(0 , 80 , 180)'}} />
            </CardItem>
            <CardItem  button onPress = {() => this.props.navigation.navigate('Applicant') }>
              <Body>
                <Text style= {{fontSize: 16}}>
                  Exit Clearance
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

export default Services;


const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});