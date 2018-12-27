import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

import { Header, Body, Title, Content, Left, Icon, Right} from 'native-base'
import { createStackNavigator , createDrawerNavigator , DrawerItems} from 'react-navigation';
import Hidden from './Hidden'

class AppHeader extends Component {
    render() {
        return (
            <Header>
                <Left><Icon name="md-menu" style = {{color: '#fff'}} onPress={() => this.props.openDrawer()} /></Left>
               
                <Body style = {{flex: 3}}>
                    <Title style = {{fontSize: 18 , textAlign: 'center'}}> {this.props.title} </Title>
                </Body>
                {/* <Right>
                <Icon name="ios-log-out" style={{ height: 24 , width: 24 , color: '#fff'}} onPress = { () => {
                 navigation.navigate('LogoutAccount');
                }}/>
                </Right> */}
             
            </Header>
        );
    }
}
export default AppHeader;