import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image , 
  Alert
} from "react-native";

import { Icon, Container , Card , CardItem  , Body} from 'native-base'
import AppHeader from '../component/Header';
import { Col, Row, Grid } from "react-native-easy-grid";

class EndorsementForms extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Endorsement Forms",
    headerLeft: <Icon name="ios-menu" style={{ paddingLeft: 10 }} onPress={() => navigation.navigate('DrawerOpen')} />,
    drawerLabel: 'Endorsement Forms',
    drawerIcon: ({ tintColor }) => (
      <Icon name="ios-document" style={{ height: 24 , width: 24 }} onPress={() => navigation.navigate('DrawerOpen')} />
    ),
  })

  render() {
    return (
      <Container>
        <AppHeader title="Endorsement Forms" openDrawer={() => this.props.navigation.openDrawer()}/>
        
        
    <Grid style = {{padding: 20}}>
       <Row size = {1}>
       <Col style = {{padding: 8 , height: 120}}>
        <Card>
            <CardItem style = {{alignItems: 'center' , justifyContent: 'center'}}  button onPress = {() => this.props.navigation.navigate('Feedback') }>
              <Icon name = "ios-key" style = {{fontSize: 35 , color: 'rgb(0 , 80 , 180)'}} />
            </CardItem>
            <CardItem  button onPress = {() => this.props.navigation.navigate('KeyAccountability') }>
              <Body>
                <Text style = {{fontSize: 16}}> 
                  Key Accountability 
                </Text>
              </Body>
            </CardItem>
       
          </Card>
        </Col>

        <Col style = {{padding: 8}}>
        <Card>
            <CardItem style = {{alignItems: 'center' , justifyContent: 'center'}}  button onPress = {() => this.props.navigation.navigate('IncidentReport') }>
              <Icon name = "ios-build" style = {{fontSize: 35 , color: 'rgb(0 , 80 , 180)'}} />
            </CardItem>
            <CardItem  button onPress = {() => this.props.navigation.navigate('IncidentReport') }>
              <Body>
                <Text style = {{fontSize: 17}}>
                Equipment Accountability 
                </Text>
              </Body>
            </CardItem>
       
          </Card>
        </Col>
       </Row>

       <Row></Row>
       <Row></Row>
        </Grid>
     </Container>

    )
  }

}

export default EndorsementForms;


const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});