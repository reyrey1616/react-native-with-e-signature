import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import {withNavigation } from 'react-navigation'
import { Header, Body, Title, Content, Left, Icon, Right , Button} from 'native-base'

class HeaderBack extends Component {

    constructor(props) {
        super(props)
    }
    
    render() {
        return (
         <Header>
          <Left>
            <Button transparent onPress = {() => this.props.navigation.navigate(`${this.props.backTo}`)}> 
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title style = {{fontSize: 13}}>{this.props.headTitle}</Title>
          </Body>
        </Header>
        );
    }
}
export default withNavigation(HeaderBack);