
import React, {Component} from 'react';
import {AppRegistry , Alert ,  Platform, StyleSheet, Text, View , Image , TextInput , KeyboardAvoidingView , Button , TouchableOpacity} from 'react-native';
import {Container, Header, Content, Item, Input, Icon } from 'native-base';

export default class LoginForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '' ,
            password: ''
        };
    }

    static navigationOptions = {
      header: null
    }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} >
    
          <KeyboardAvoidingView style = {{backgroundColor: 'transparent'} }  behavior = "height">
          <Image source = {require("../../images/aurora.jpg")} style = {{ width: null ,height: 200 , resizeMode: 'cover'}} />

            <Text style = {{fontSize: 23 , color: '#888' , padding: 10 }}> Login your account. </Text>
          </KeyboardAvoidingView>

          <KeyboardAvoidingView style = {{flex: 3 , padding:12 }}>

          <Item style = {{padding: 10}}>
            <Icon active name='ios-people' style = {{color: '#555'}} />
            <Input placeholder='Username *' style = {{color: '#555'}} onChangeText = {(text) => {
              this.setState({
                username: text
              });
            }} ref={input => { this.userText = input }} />
          </Item>

          <Item style = {{padding: 10}}>
            <Icon active name='md-key'  style = {{color: '#555'}} />
            <Input placeholder='Password *' style = {{color: '#555'}} secureTextEntry onChangeText = {(pass) => {
              this.setState({
                password: pass
              });
            }} ref = {pass => this.passText = pass }/>
          </Item>
            <View style = {{padding: 15 , margin: 25 , borderRadius: 30 , flex: 1}}>
            <TouchableOpacity onPress = {() => {
              if(this.state.username == "" && this.state.password == "") {
                Alert.alert("Please insert username and password.")
              }
              else if(this.state.username == "") {
                Alert.alert("Please insert username.")                
              }
              else if(this.state.password == "") {
                Alert.alert("Please insert password.")                
              }
              else {

                  fetch('http://192.168.1.61/Aurorapp/loginapi.php' , {
                    method: 'POST' ,
                    headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  } ,
                    body: JSON.stringify({
                      username: this.state.username ,
                      password: this.state.password
                    })
                  }).then(res => res.json())
                  .then((response) => {
                      const resp = JSON.stringify(response.success);
                        if(resp == 1) {
                            Alert.alert("Access Granted");
                            // this.userText.clear();
                            // this.passText.clear();
                            this.props.navigation.navigate('Home');
                        }
                        else if(resp == 0) {
                          Alert.alert("Username or Password is Incorrect!");
                        }
                  }).catch(err => Alert.alert(err));

              }
             
            }} style = {{backgroundColor: 'rgb(0 , 80 , 180)' , alignContent: 'center' ,justifyContent: 'center' , alignItems: 'center' , padding: 17 , borderRadius: 50}}>
              <Text style = {{color: '#fff' , fontSize: 20}}> Login </Text>
            </TouchableOpacity>

            </View>
          </KeyboardAvoidingView>
          

          
      </KeyboardAvoidingView>
    );
  }

 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  } ,
  miniView: {
    flex: 1 ,
  }
  , 
  imageContainer: {
    flex:1,
    alignItems: 'stretch'
  } ,
  textInput: {
    justifyContent: 'center' , 
    flex: 1 

  } ,
  textBox: {
    fontSize: 20 ,
    borderWidth: 0 ,
    borderBottomWidth: 2 , 
    borderColor: '#999' ,
    padding: 5
  }
})

AppRegistry.registerComponent('LoginForm', () => LoginForm);
