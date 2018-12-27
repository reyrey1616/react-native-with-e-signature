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
  ListItem
} from "native-base";
import SignatureCapture from "react-native-signature-capture";
import { Grid, Col, Row } from "react-native-easy-grid";
import HeaderBack from '../component/HeaderBack'

class IncidentDetails extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Employee Feedback Details",
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
      isDraft: navigation.getParam("isDraft", 0),
      dataSource: null,
      isLoading: true,
      showToast: false , 
      par1: null , 
      par2: null ,
      dates: null ,
      fullname: null ,
      job: null ,
      chosenDate: new Date() ,
      modalVisible: false,
      fullWidth: Dimensions.get("window").width - 20 ,
      empSign: null , 
      signOne: null , 
      signTwo: null , 
      signThree: null ,
      signFour: null ,
      currentSigning: null ,
      signerName: null ,
      nameOne: null , 
      nameTwo: null ,
      nameThree:null , 
      nameFour: null ,
      photo: null ,
      dateOne: 0 , 
      dateTwo: 0 , 
      dateThree: 0 , 
      dateFour: 0 , 
      dateFive: 0 
    };

    this._onSaveEvent = this._onSaveEvent.bind(this);
    this._onDragEvent = this._onDragEvent.bind(this);
    this.resetSign = this.resetSign.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this)
    this.saveData = this.saveData.bind(this);

  }

  componentDidMount(){
    fetch(`http://192.168.1.61/Aurorapp/incident_paragraph.php?id=${this.state.id}&&username=${this.state.username}&&isdraft=${this.state.isDraft}`)
    .then(res => res.json())                     
    .then(response => {
        this.setState({
            isLoading: false ,
            par1: response.data.par1 ,
            par2: response.data.par2 , 
            fullname: response.data.fullname ,
            job: response.data.job ,
            dates: response.data.dates ,
            nameOne: response.data.name1 , 
            nameTwo: response.data.name2 , 
            nameThree: response.data.name3 , 
            nameFour: response.data.name4 ,
            signOne: response.data.one ,
            signTwo: response.data.two ,
            signThree: response.data.three ,
            signFour: response.data.four ,
            empSign: response.data.empSign ,
            photo: response.data.photo , 

        })
        setTimeout(() => console.log(this.state) , 2000);
    })
    .catch(err => JSON.stringify(err));
  }


  saveData(stat) {

    fetch('http://192.168.1.61/Aurorapp/saveIncident.php' , {
      method: 'POST' ,
      headers: {
        Accept: 'application/json' , 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        stat: stat , 
        empSign: this.state.empSign , 
        signOne: this.state.signOne ,
        signTwo: this.state.signTwo ,
        signThree: this.state.signThree ,
        signFour: this.state.signFour , 
        id: this.state.id ,
        dateOne: this.state.dateOne ,
        dateTwo: this.state.dateTwo ,
        dateThree: this.state.dateThree ,
        dateFour: this.state.dateFour ,
        dateFive: this.state.dateFive 
      })
    }) .then(res => res.json())
    .then(response => {
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
      console.log(response)
    setTimeout(() => {
      console.log(this.state)
      this.props.navigation.navigate('IncidentReport') 
    }, 2000);

    })
    .catch(err => JSON.stringify(err));
  }


  render() {
    if (this.state.isLoading == true) {
      return (
        <Container>
          {/* <AppHeader
            title="Employee Feedback"
            openDrawer={() => this.props.navigation.openDrawer()}
          /> */}
          <HeaderBack backTo = "IncidentReport" headTitle = "Incident Report Details"/>
          <Spinner color="blue" />
        </Container>
      );
    } else {


      return (
       <Container>
        <HeaderBack backTo = "IncidentReport" headTitle = "Incident Report Details"/>
           <Content>

              <List>
            
                <ListItem>
                  <Text> Name: {this.state.fullname}</Text>
                </ListItem>   

                <ListItem>
                  <Text> Designation: {this.state.job}</Text>
                </ListItem>  

                  <ListItem>
                  <Text> Date:  {this.state.dates}</Text>
                </ListItem>  

                <ListItem itemDivider>
                  <Text> Details  </Text>
                </ListItem>

                <ListItem>
                <Text> {this.state.par1 }    </Text>
                </ListItem> 
               <ListItem>
               { (this.state.photo == "") ? <Text style = {{textAlign: 'center' , padding: 10 , backgroundColor: '#eaeaea'}}> No Photo Attached. </Text> :  <Image
                  style={{
                    width: this.state.fullWidth,
                    height: 120,
                    borderWidth: 1,
                    borderColor: "red"
                  }}
                  source={{
                    uri: `data:image/png;base64, ${this.state.photo}`
                  }}
                /> }
               </ListItem>

              <ListItem>
              { (this.state.par2 == "") ? null : <Text> {this.state.par2} </Text> }
              </ListItem>


            {/* Employee Signature */}
                <ListItem>
                  <Button block primary style = {{flex: 1}} onPress = {() => this.setState({modalVisible: true , currentSigning: 'zero' , signerName: this.state.fullname})}>
                  <View>
                  <Text style = {{color: '#fff'}}> {this.state.fullname}'s Signature</Text>
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
                      uri: `data:image/png;base64, ${this.state.empSign}`
                    }}
                   />
              </ListItem>


                {/* Sign One */}
               <ListItem>
                  <Button block primary style = {{flex: 1}} onPress = {() => this.setState({modalVisible: true , currentSigning: 'one' ,
                  signerName: this.state.nameOne})}>
                  <View>
                  <Text style = {{color: '#fff'}}> {this.state.nameOne}'s Signature</Text>
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
                      uri: `data:image/png;base64, ${this.state.signOne}`
                    }}
                    />
              </ListItem>

                  {/* Sign Two */}
               <ListItem>
                  <Button block primary style = {{flex: 1}} onPress = {() => this.setState({modalVisible: true , currentSigning: 'two' ,
                  signerName: this.state.nameTwo})}>
                  <View>
                  <Text style = {{color: '#fff'}}> {this.state.nameTwo}'s Signature</Text>
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
                      uri: `data:image/png;base64, ${this.state.signTwo}`
                    }}
                />
              </ListItem>

              
                  {/* Sign Three */}
                  <ListItem>
                  <Button block primary style = {{flex: 1}} onPress = {() => this.setState({modalVisible: true , currentSigning: 'three' ,
                  signerName: this.state.nameThree})}>
                  <View>
                  <Text style = {{color: '#fff'}}> {this.state.nameThree}'s Signature</Text>
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
                      uri: `data:image/png;base64, ${this.state.signThree}`
                    }}
                />
              </ListItem>

              
                  {/* Sign Four */}
                  <ListItem>
                  <Button block primary style = {{flex: 1}} onPress = {() => this.setState({modalVisible: true , currentSigning: 'four' ,
                  signerName: this.state.nameFour})}>
                  <View>
                  <Text style = {{color: '#fff'}}> {this.state.nameFour}'s Signature</Text>
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
                      uri: `data:image/png;base64, ${this.state.signFour}`
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
                {this.state.signerName}'s Signature below.{" "}
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


  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  saveSign() {
    this.refs["sign"].saveImage();
  }

  resetSign() {
    this.refs["sign"].resetImage();

    
    if(this.state.currentSigning == 'zero') {
      this.setState({  dateOne: null});
    }
    else if(this.state.currentSigning == 'one') {
      this.setState({  dateTwo: null});      
    }
    else if(this.state.currentSigning == 'two') {
      this.setState({  dateThree: null});      
    }
    else if(this.state.currentSigning == 'three') {
      this.setState({ dateFour: null});      
    }
    else if(this.state.currentSigning == 'four') {
      this.setState({ dateFive: null});      
    }
  }

  _onSaveEvent(result) {

    // console.log(result.encoded);

    if(this.state.currentSigning == 'zero') {
      this.setState({empSign: result.encoded , dateOne: 1} , function() {
        console.log(this.state.dateOne);
      });
    }
    else if(this.state.currentSigning == 'one') {
      this.setState({signOne: result.encoded , dateTwo: 1});      
    }
    else if(this.state.currentSigning == 'two') {
      this.setState({signTwo: result.encoded , dateThree: 1});      
    }
    else if(this.state.currentSigning == 'three') {
      this.setState({signThree: result.encoded ,dateFour: 1});      
    }
    else if(this.state.currentSigning == 'four') {
      this.setState({signFour: result.encoded , dateFive: 1});      
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


export default IncidentDetails;
