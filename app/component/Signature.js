import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet ,
    Alert ,
    TouchableHighlight ,
    Modal
} from "react-native";
import Hidden from '../component/Hidden'
import { Header, Body, Item, Title , Button ,  Label , DatePicker , Input, Content, Left, Icon, Right , Textarea , Form , Container , Spinner , List , ListItem  } from 'native-base'
// import AppHeader from '../component/Header';
import SignatureCapture from 'react-native-signature-capture';


class Signature extends Component {
  static navigationOptions = ({ navigation }) => ({
    drawerLabel: <Hidden />
  })
   
  render() { 
        return(
            <View>  
                <Text style={{alignItems:"center",justifyContent:"center",paddingLeft: 10}}>Employee Signature </Text>
                <SignatureCapture
                    style={[{flex:1},styles.signature]}
                    ref="sign"
                    onSaveEvent={this._onSaveEvent}
                    onDragEvent={this._onDragEvent}
                    saveImageFileInExtStorage={false}
                    showNativeButtons={false}
                    showTitleLabel={false}
                    showBorder = {false}
                    viewMode={"portrait"}/>

                <View style={{ flex: 1, flexDirection: "row" }}>

                    <TouchableHighlight style={styles.buttonStyle}
                        onPress={() => { this.saveSign() } } >
                        <Text>Save</Text>
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.buttonStyle}
                        onPress={() => { this.resetSign() } } >
                        <Text>Reset</Text>
                    </TouchableHighlight>

                </View>
            </View>
        
       )
      }

     saveSign() {
        this.refs["sign"].saveImage();
    }
  
    resetSign() {
        this.refs["sign"].resetImage();
    }
  
  
      _onSaveEvent(result) {
        this.setState({
          encoded: result.encoded
        })
        console.log(result.encoded)
    }
  
    _onDragEvent() {
        console.log("dragged");
    }
     
}


const styles = StyleSheet.create({
    signature: {
        flex: 1,
        borderColor: '#333',
        borderWidth: 1,
    },
    buttonStyle: {
        flex: 1, justifyContent: "center", alignItems: "center", height: 50,
        backgroundColor: "#eeeeee",
        margin: 10
    }
  });

export default Signature;

