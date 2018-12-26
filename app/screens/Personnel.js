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

class Personnel extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Personnel Management",
    headerLeft: <Icon name="ios-menu" style={{ paddingLeft: 10 }} onPress={() => navigation.navigate('DrawerOpen')} />,
    drawerLabel: 'Personnel Management',
    drawerIcon: ({ tintColor }) => (
      <Icon name="ios-create" style={{ height: 24 , width: 24 }} onPress={() => navigation.navigate('DrawerOpen')} />
    ),
  })

  render() {
    return (
      <Container>
        <AppHeader title="Personnel Management" openDrawer={() => this.props.navigation.openDrawer()}/>
        
        
    <Grid style = {{padding: 20}}>
       <Row size = {1}>
       <Col style = {{padding: 8 , height: 120}}>
        <Card>
            <CardItem style = {{alignItems: 'center' , justifyContent: 'center'}}  button onPress = {() => this.props.navigation.navigate('Feedback') }>
              <Icon name = "ios-chatbubbles" style = {{fontSize: 35 , color: 'rgb(0 , 80 , 180)'}} />
            </CardItem>
            <CardItem  button onPress = {() => this.props.navigation.navigate('Feedback') }>
              <Body>
                <Text style = {{fontSize: 16}}> 
                  Employee Feedback
                </Text>
              </Body>
            </CardItem>
       
          </Card>
        </Col>

        <Col style = {{padding: 8}}>
        <Card>
            <CardItem style = {{alignItems: 'center' , justifyContent: 'center'}}  button onPress = {() => this.props.navigation.navigate('IncidentReport') }>
              <Icon name = "ios-document" style = {{fontSize: 35 , color: 'rgb(0 , 80 , 180)'}} />
            </CardItem>
            <CardItem  button onPress = {() => this.props.navigation.navigate('IncidentReport') }>
              <Body>
                <Text style = {{fontSize: 17}}>
                  Incident Report
                </Text>
              </Body>
            </CardItem>
       
          </Card>
        </Col>
       </Row>

      <Row size = {1}>
       <Col style = {{padding: 8}}>
        <Card>
            <CardItem style = {{alignItems: 'center' , justifyContent: 'center'}}  button onPress = {() => this.props.navigation.navigate('Notice') }>
              <Icon name = "ios-git-network" style = {{fontSize: 35 , color: 'rgb(0 , 80 , 180)'}} />
            </CardItem>
            <CardItem  button onPress = {() => this.props.navigation.navigate('Notice') }>
              <Body>
                <Text style = {{fontSize: 16}}>
                 Notice to Decision
                </Text>
              </Body>
            </CardItem>
       
          </Card>
        </Col>

        <Col style = {{padding: 8}}>
        <Card>
            <CardItem style = {{alignItems: 'center' , justifyContent: 'center'}}  button onPress = {() => this.props.navigation.navigate('PropertyEndorsement') }>
              <Icon name = "ios-attach" style = {{fontSize: 35 , color: 'rgb(0 , 80 , 180)'}} />
            </CardItem>
            <CardItem  button onPress = {() => this.props.navigation.navigate('PropertyEndorsement') }>
              <Body>
                <Text style = {{fontSize: 16}}>
                  Property Endorsement
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

export default Personnel;


const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});