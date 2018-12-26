import React, { Component } from "react";
import {
  View,
  Text,
  Alert ,
  TouchableOpacity
} from "react-native";
import Hidden from './Hidden'
import { Icon,  Card , CardItem  , Right } from 'native-base'

class CardList extends Component {
  static navigationOptions = ({ navigation }) => ({
    drawerLabel: <Hidden />
  })

  render() { 
      var user = this.props.fullName;
        return(
        <Card key = {this.props.myKey}>
           <TouchableOpacity   onPress={() => this.props.openDetails() } >
           <CardItem >
          <Icon active name="ios-chatbubbles" />
           <Text> {  this.props.fullName } </Text>
          <Right>
            <Text> { this.props.dates }</Text>
          </Right>
         </CardItem>
         <CardItem> 
            <Text>
                { this.props.instance }
            </Text>
         </CardItem>
           </TouchableOpacity>
       </Card>
       )
      }
     
}



export default CardList;

