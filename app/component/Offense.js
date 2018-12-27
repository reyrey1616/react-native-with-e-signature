import React, { Component } from "react";
import {
  View,
  Text,
  Alert ,
  TouchableOpacity
} from "react-native";
import Hidden from './Hidden'
import { Card , CardItem , Body , Right } from 'native-base'

class Offense extends Component {
  static navigationOptions = ({ navigation }) => ({
    drawerLabel: <Hidden />
  })

  render() { 
       return(
            <Card transparent>
            <CardItem header bordered>
              <Text style = {{fontWeight: 'bold' , color: 'rgb(56, 56, 149)'}}> {this.props.name} </Text>
            </CardItem>
            <CardItem bordered>
              <Body style = {{flex: 5}}>
             <Text style = {{color: this.props.textColor}}>
               {this.props.description}
             </Text>
              </Body>
              <Right>
                  
              </Right>
            </CardItem>
          </Card>
       )
      }
     
}



export default Offense;

