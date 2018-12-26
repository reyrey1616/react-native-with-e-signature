import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableHighlight,
  Modal,
  Image,
  Dimensions
} from "react-native";
import Hidden from "../component/Hidden";
import {
  Button,
  Toast,
  Content,
  Icon,
  Container,
  Spinner,
  List,
  ListItem ,
  Item ,
  Label ,
  Input
} from "native-base";
import SignatureCapture from "react-native-signature-capture";
import { Grid, Col, Row } from "react-native-easy-grid";
import HeaderBack from '../component/HeaderBack';

class NoticeDetails extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Notice to Decision Details",
    headerLeft: (
      <Icon
        name="ios-menu"
        style={{ paddingLeft: 10 }}
        onPress={() => navigation.navigate("DrawerOpen")}
      />
    ),
    drawerLabel: <Hidden />
  });

  constructor(props) {
        super(props);
        const { navigation } = this.props;
        this.state = {
        username: navigation.getParam("username", "NO-USERNAME"),
        id: navigation.getParam("id", "NO-ID"),
        isDraft: navigation.getParam("isDraft", ""),
        dataSource: null ,
        isLoading: true ,
        modalVisible: false , 
        currentSigning: null , 
        violatorSign: null , 
        issuerSign: null , 
        supervisorSign:null , 
        hrSign: null ,
        fullWidth: Dimensions.get("window").width - 20  , 
        signOne: 0 , 
        signTwo: 0 , 
        signThree: 0 , 
        signFour: 0 ,
        showToast: false ,
        remarks: null
        };

        this._onSaveEvent = this._onSaveEvent.bind(this);
        this._onDragEvent = this._onDragEvent.bind(this);
        this.resetSign = this.resetSign.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
        this.saveData = this.saveData.bind(this);
  }


  componentDidMount(){

        fetch(`http://192.168.1.61/Aurorapp/notice_details.php?id=${this.state.id}&&stat=${this.state.isDraft}`)
        .then(res => res.json())
        .then(response => {
            console.log(response)
            this.setState(
              {
                dataSource: response.data ,
                isLoading: false ,
                remarks: response.data.supervisor_remarks
              }
            )
            setTimeout(() => console.log(this.state.dataSource) , 1000);
        }).catch(err => JSON.stringify(err));

  }


  saveData(stat) {

    console.log(this.state);

    fetch('http://192.168.1.61/Aurorapp/saveNotice.php' , {
      method: 'POST' ,
      headers: {
        accept: 'application/json' ,
        'Content-type': 'application/json'
      } ,
      body: JSON.stringify({
        stat: stat , 
        violatorSign: this.state.violatorSign , 
        issuerSign: this.state.issuerSign , 
        supervisorSign: this.state.supervisorSign , 
        hrSign: this.state.hrSign ,
        signOne: this.state.signOne ,
        signTwo: this.state.signTwo ,
        signThree: this.state.signThree ,
        signFour: this.state.signFour ,
        id: this.state.id ,
        remarks: this.state.remarks
      })
    }).then(res => res.json())
    .then(response => {
      console.log(response);

      if(stat == 'Draft') {
        Toast.show({
          text: "Successfully Saved as Draft!",
          buttonText: "Okay",
          duration: 3000
        }) 
      }
      else {
        Toast.show({
          text: "Successfully Saved!",
          buttonText: "Okay",
          duration: 3000
        }) 
      }

      setTimeout(() => {
        console.log(this.state)
        this.props.navigation.navigate('Notice');
      }, 2000);



    }).catch(err => console.log(JSON.stringify(err)));

  }

  

  render() {

    if (this.state.isLoading == true) {
      return (
        <Container>
          <HeaderBack backTo = "Notice" headTitle = "Notice to Decision Details"/>
          <Spinner color="blue" />
        </Container>
      );
    } else {

      return (
        <Container>
          <HeaderBack backTo = "Notice" headTitle = "Notice to Decision Details"/>
         <Content>
         <List>
         <ListItem>
                <Text>
                  Name: {" "}
                  <Text style={{ color: "#888" }}>{ this.state.dataSource.employee_info.fullname} </Text>
                </Text>
        </ListItem>

        <ListItem>
                <Text>
                  Job Title: {" "}
                  <Text style={{ color: "#888" }}>{ this.state.dataSource.employee_info.job} </Text>
                </Text>
        </ListItem>

        <ListItem>
                <Text>
                  Dept.: { " " }
                  <Text style={{ color: "#888" }}>{ this.state.dataSource.employee_info.dept} </Text>
                </Text>
        </ListItem>

          <ListItem>
              <Text>
                  Issued By: { " " }
                  <Text style={{ color: "#888" }}>{ this.state.dataSource.issued_by.fullname} </Text>
                </Text>
        </ListItem>

          <ListItem>
              <Text>
                  Job Title: { " " }
                  <Text style={{ color: "#888" }}>{ this.state.dataSource.issued_by.job} </Text>
                </Text>
        </ListItem>

          <ListItem>
              <Text>
                  Dept.: { " " }
                  <Text style={{ color: "#888" }}>{ this.state.dataSource.issued_by.dept} </Text>
                </Text>
        </ListItem>
        <ListItem>
            <View style = {{paddingTop: 20 , paddingLeft: 10 , paddingRight: 10}}>
                
              <View>
              <Text style = {{fontStyle: 'italic' }}> Dear {this.state.dataSource.employee_info.fullname} </Text> 
              </View>
                
                <View>
                <Text style = {{paddingTop: 25}}> Per Company records and reports it shows that you have been neglectful in your duties and responsibilities to the Company by commiting the following acts that are inimical to the interest of the Company and its customer/clients particularly in the following instances. </Text>
                </View>

                <View style = {{paddingTop: 10}}>
                <Text style = {{color: 'red'}}>
                TYPE OF VIOLATION, # OF INSTANCE AND BRIEF DESCRIPTION
                </Text>
                </View>

                <View style = {{paddingTop: 15}}>
                  <Text style = {{textDecorationLine: 'underline'}}>
                    {this.state.dataSource.type_violation}
                  </Text>
                </View>

                <View style = {{paddingTop: 10}}>
                  <Text>
                  The Afore-mentioned act/s in violation of the company's 
                  </Text>
                  <Text style = {{fontStyle: 'italic'}}>[documentation of concern (s), issue (s) or incident (s),]</Text>
                  <Text style = {{paddingTop: 5 , fontWeight: 'bold'}}> {this.state.dataSource.concerns} </Text>
                </View>

                <View style = {{paddingTop: 15}}>
                  <Text>Considering the nature and gravity of the offense charged and the sensitive nature of you work, you are hereby placed under SUSPENSION for {this.state.dataSource.suspension_for } {" "} { this.state.dataSource.days} day/s without pay, as set forth in out Company Adherence Policy of 2018.</Text>
                </View>

                <View style = {{paddingTop: 15}}>
                  <Text>
                  By signing this Notice, I herevy acknowledge the afore-mentioned decision and I therefore accept the corresponding sanction without any reservation or any contest to the foregoing.
                  </Text>
                </View>

                <View style = {{paddingTop: 15}}>
                  <Text>That the violation I committed was explained to me and I understood the same to it's full context. That I therefore submit myself to said suspension without question nor reservation.</Text>
                </View>

                <View style = {{paddingTop: 15}}>
                  <Text>During the time of my suspension, if any, I hereby bind myself to inhibit from engaging in any work-related tasks, including but not limited to participating in any group chat of all sorts and accessing of the company's records and to surrender all company property upod the management's request.</Text>
                </View>  
                    

                {/* <View style = {{paddingTop: 25}}>
                  <Text style = {{fontStyle: 'italic'}}>
                  Immediate Supervisor's remarks/recommendation:
                  </Text>
                </View>
                <View style = {{padding: 7}}>
                  <Text style = {{textDecorationLine: 'underline'}}>{this.state.dataSource.supervisor_remarks}</Text>
              
              
                </View> */}
            </View>
        </ListItem>

                <ListItem>
                <Item stackedLabel style={{ padding: 10}}>
                  <Label>Immediate Supervisor's remarks/recommendation: </Label>
                  <Input
                  returnKeyType = "next"
                   value = { this.state.remarks}
                    onChangeText={val => {
                      this.state.remarks = val;
                      this.setState({remarks: val})
                      console.log(this.state.remarks);
                    }
                    }
                
                  />
                </Item>
                </ListItem>

          <ListItem>
                  <Button block primary style = {{flex: 1}} onPress = {() => this.setState({modalVisible: true , currentSigning: 'Violator'})}>
                  <View>
                  <Text style = {{color: '#fff'}}> Violator's Signature</Text>
                  </View>
                </Button>
              </ListItem>
              <ListItem>
                  <Image
                    style={{
                      width: this.state.fullWidth,
                      height: 100,
                      borderWidth: 1,
                      borderColor: "red"
                    }}
                    source={{
                      uri: `data:image/png;base64, ${this.state.dataSource.violatorSign}`
                    }}
                />
              </ListItem>
      

        <ListItem>
                  <Button block primary style = {{flex: 1}} onPress = {() => this.setState({modalVisible: true , currentSigning: 'Issuer'})}>
                  <View>
                  <Text style = {{color: '#fff'}}> Issuer's Signature</Text>
                  </View>
                </Button>
              </ListItem>
              <ListItem>
                  <Image
                    style={{
                      width: this.state.fullWidth,
                      height: 100,
                      borderWidth: 1,
                      borderColor: "red"
                    }}
                    source={{
                      uri: `data:image/png;base64, ${this.state.dataSource.issuerSign}`
                    }}
                />
              </ListItem>

                <ListItem>
                  <Button block primary style = {{flex: 1}} onPress = {() => this.setState({modalVisible: true , currentSigning: 'Supervisor'})}>
                  <View>
                  <Text style = {{color: '#fff'}}> Direct Supervisor's Signature</Text>
                  </View>
                </Button>
              </ListItem>
              <ListItem>
                  <Image
                    style={{
                      width: this.state.fullWidth,
                      height: 100,
                      borderWidth: 1,
                      borderColor: "red"
                    }}
                    source={{
                      uri: `data:image/png;base64, ${this.state.dataSource.supervisorSign}`
                    }}
                />
              </ListItem>

                <ListItem>
                  <Button block primary style = {{flex: 1}} onPress = {() => this.setState({modalVisible: true , currentSigning: 'HR Officer'})}>
                  <View>
                  <Text style = {{color: '#fff'}}> HR Officer's Signature</Text>
                  </View>
                </Button>
              </ListItem>
              <ListItem>
                  <Image
                    style={{
                      width: this.state.fullWidth,
                      height: 100,
                      borderWidth: 1,
                      borderColor: "red"
                    }}
                    source={{
                      uri: `data:image/png;base64, ${this.state.dataSource.hrSign}`
                    }}
                />
              </ListItem>
      
          </List>
          <Grid style={{ paddingTop: 10 , paddingBottom: 10 }}>
                <Row size={20}>
                  <Col style={{ padding: 7 }}>
                    <Button
                      block
                      rounded
                      bordered
                      dark
                      onPress = {() => this.saveData('Draft')}
                    >
                      <Text>Save as draft</Text>
                    </Button>
                  </Col>

                  <Col style={{ padding: 7 }}>
                    <Button block rounded onPress = {() => this.saveData('Finished')}> 
                      <Text style={{ color: "#fff" }}  >Declare as Finished</Text>
                    </Button>
                  </Col>
                </Row>
              </Grid>
         </Content>

         
         <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
              style={{ flex: 1, flexDirection: "column" }}
            >
              <Text
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 10
                }}
              >
                {" "}
                {this.state.currentSigning}'s Signature below.{" "}
              </Text>
              <SignatureCapture
                style={[{ flex: 1 }, styles.signature]}
                ref="sign"
                onSaveEvent={this._onSaveEvent}
                onDragEvent={this._onDragEvent}
                saveImageFileInExtStorage={false}
                showNativeButtons={false}
                showTitleLabel={false}
                showBorder={true}
                viewMode={"portrait"}
              />

              <View style={{ flex: 1, flexDirection: "row" }}>
                <TouchableHighlight
                  style={styles.buttonStyle}
                  onPress={() => {
                    this.saveSign();
                  }}
                >
                  <Text>Save</Text>
                </TouchableHighlight>

                <TouchableHighlight
                  style={styles.buttonStyle}
                  onPress={() => {
                    this.resetSign();
                  }}
                >
                  <Text>Reset</Text>
                </TouchableHighlight>

                <TouchableHighlight
                  style={styles.buttonStyle}
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <Text>Close</Text>
                </TouchableHighlight>
              </View>
            </Modal> 
        </Container>
      );

    }


  }



//   FUNCTIONS
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  saveSign() {
    this.refs["sign"].saveImage();
  }

  resetSign() {
    this.refs["sign"].resetImage();

    if(this.state.currentSigning == 'Violator') {
      this.setState({  violatorSign: null});      
    }
    else if(this.state.currentSigning == 'Issuer') {
      this.setState({  issuerSign: null});      
    }
    else if(this.state.currentSigning == 'Supervisor') {
      this.setState({ supervisorSign: null});      
    }
    else if(this.state.currentSigning == 'HR Officer') {
      this.setState({ hrSign: null});      
    }

  }

  _onSaveEvent(result) {
    console.log(result.encoded);
    if(this.state.currentSigning == "Violator") {
      this.setState({violatorSign: result.encoded , signOne: 1})
    }
    else if(this.state.currentSigning == "Issuer") {
      this.setState({issuerSign: result.encoded , signTwo: 1})      
    }
    else if(this.state.currentSigning == "Supervisor") {
      this.setState({supervisorSign: result.encoded , signThree: 1})      
    }
    else if(this.state.currentSigning == "HR Officer") {
      this.setState({hrSign: result.encoded , signFour: 1})      
    }
}

  _onDragEvent() {
    console.log("dragged");
  }

}

const styles = StyleSheet.create({
  signature: {
    flex: 1,
    borderColor: 'rgb(35 , 35 , 35)',
    borderWidth: 1
  },
  buttonStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    backgroundColor: "#eeeeee",
    margin: 10
  }
});


export default NoticeDetails;
