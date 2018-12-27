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
import HeaderBack from '../component/HeaderBack';

class EndorsementDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Property Endorsement Details",
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
        fullWidth: Dimensions.get("window").width - 20  , 
        showToast: false  , 
        currentSigning: null ,
        surrender_sign: null , 
        hr_receivedsign: null , 
        received_by_sign: null  , 
        signOne: 0 , 
        signTwo: 0 , 
        signThree: 0
        };

        this._onSaveEvent = this._onSaveEvent.bind(this);
        this._onDragEvent = this._onDragEvent.bind(this);
        this.resetSign = this.resetSign.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
        this.saveData = this.saveData.bind(this);
  }


  componentDidMount(){

        fetch(`http://192.168.1.61/Aurorapp/endorsement_detail.php?id=${this.state.id}&&stat=${this.state.isDraft}`)
        .then(res => res.json())
        .then(response => {
            console.log(response.data)
            this.setState(
              {
                dataSource: response.data ,
                isLoading: false ,
                surrender_sign: response.data[0].surrender_sign , 
                hr_receivedsign: response.data[0].hr_receivedsign , 
                received_by_sign: response.data[0].received_sign  
              }
            )
            setTimeout(() => console.log(response.data[0].surrender_sign) , 1000);
        }).catch(err => JSON.stringify(err));

  }


  saveData(stat) {

    fetch('http://192.168.1.61/Aurorapp/saveEndorsement.php' ,{
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
          surrender_sign: this.state.surrender_sign ,
          hr_receivedsign: this.state.hr_receivedsign , 
          received_by_sign: this.state.received_by_sign  , 
          signOne: this.state.signOne , 
          signTwo: this.state.signTwo , 
          signThree: this.state.signThree , 
          stat: stat ,
          id: this.state.id
        })
     }
      ).then(res => res.json())
      .then(response => {
        console.log(response);
        console.log(this.state);
        if (stat == 'Draft')  
        {
         Toast.show({
           text: "Successfully Saved as Draft!",
           buttonText: "Okay",
           duration: 3000
         }) 
        }
       else
     {
       Toast.show({
         text: "Successfully Saved",
         buttonText: "Okay",
         duration: 3000
       });
     }
 
     setTimeout(() => this.props.navigation.navigate('PropertyEndorsement') , 2500);
      }).catch(err => console.log(JSON.stringify(err)))


  }




  render() {

    if (this.state.isLoading == true) {
      return (
        <Container>
          <HeaderBack backTo = "PropertyEndorsement" headTitle = "Property Endorsement Details"/>
          <Spinner color="blue" />
        </Container>
      );
    } else {

      return (
        <Container>
          <HeaderBack backTo = "PropertyEndorsement" headTitle = "Property Endorsement Details"/>
         <Content>
         <List>

         <ListItem>
          <Text>
             {" "}
              Surrendered By:{" "}
            <Text style={{ color: "#888" }}> {this.state.dataSource[0].surrendered_by.fullname} </Text>{" "}
          </Text>
        </ListItem>
        
        <ListItem>
          <Text>
             {" "}
              Job Title:{" "}
            <Text style={{ color: "#888" }}> {this.state.dataSource[0].surrendered_by.job} </Text>{" "}
          </Text>
        </ListItem>

          <ListItem>
          <Text>
             {" "}
              Dept.:{" "}
            <Text style={{ color: "#888" }}> {this.state.dataSource[0].surrendered_by.dept} </Text>{" "}
          </Text>
        </ListItem>


        <ListItem itemDivider>
          <Text> Other Details </Text>
        </ListItem>
      
        
        <ListItem>
          <Text>
             {" "}
              RE:{" "}
            <Text style={{ color: "#888" }}> {this.state.dataSource[0].subject} </Text>{" "}
          </Text>
        </ListItem>

          <ListItem>
          <Text>
             {" "}
              Suspension date (if any:):{" "}
            <Text style={{ color: "#888" }}> {this.state.dataSource[0].suspension_date} </Text>{" "}
          </Text>
        </ListItem>

        
        <ListItem>
          <Text>
             {" "}
              Propert Turned Over:{" "}
            <Text style={{ color: "#888" }}> {"\n  1. "}{this.state.dataSource[0].turned_over.one} </Text>{"\n "}
            <Text style={{ color: "#888" }}> {"2. "}{this.state.dataSource[0].turned_over.two} </Text>{"\n "}
            <Text style={{ color: "#888" }}> {"3. "}{this.state.dataSource[0].turned_over.three} </Text>
          </Text>
        </ListItem>

        
        <ListItem>
          <Text>
             {" "}
              Email:{" "}
            <Text style={{ color: "#888" }}> {this.state.dataSource[0].email} </Text>{" "}
          </Text>
        </ListItem>


       <ListItem>
          <Text>
             {" "}
              Date Surrendered:{" "}
            <Text style={{ color: "#888" }}> {this.state.dataSource[0].date_surrendered} </Text>{" "}
          </Text>
        </ListItem>

        <ListItem>
          <Text>
             {" "}
              Received By (HR):{" "}
            <Text style={{ color: "#888" }}> {this.state.dataSource[0].hr_receivedby.fullname} </Text>{" "}
          </Text>
        </ListItem>

          <ListItem>
          <Text>
             {" "}
             Returned to employee on:{" "}
            <Text style={{ color: "#888" }}> {this.state.dataSource[0].returned_to} </Text>{" "}
          </Text>
        </ListItem>


         <ListItem>
          <Text>
             {" "}
              Received by:{" "}
            <Text style={{ color: "#888" }}> {this.state.dataSource[0].received_by.fullname} </Text>{" "}
          </Text>
        </ListItem>

        <ListItem>
          <Text>
             {" "}
              Received date:{" "}
            <Text style={{ color: "#888" }}> {this.state.dataSource[0].received_date} </Text>{" "}
          </Text>
        </ListItem>


        <ListItem>
          <Text>
             {" "}
              Date Issued:{" "}
            <Text style={{ color: "#888" }}> {this.state.dataSource[0].date_created} </Text>{" "}
          </Text>
        </ListItem>

        <ListItem>
             <Button block primary style = {{flex: 1}} onPress = {() => this.setState({modalVisible: true , currentSigning: 'Surrenderee'})}>
                  <View>
                  <Text style = {{color: '#fff'}}> Surrenderee's Signature</Text>
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
                  uri: `data:image/png;base64, ${this.state.surrender_sign}`
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
                  uri: `data:image/png;base64, ${this.state.hr_receivedsign}`
                }}
              />
        </ListItem>


         <ListItem>
             <Button block primary style = {{flex: 1}} onPress = {() => this.setState({modalVisible: true , currentSigning: 'Receiver'})}>
                  <View>
                  <Text style = {{color: '#fff'}}> Receiver's Signature</Text>
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
                  uri: `data:image/png;base64, ${this.state.received_by_sign}`
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
                console.log("Modal has been closed.");
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

    if(this.state.currentSigning == "Surrenderee") {
      this.setState({surrender_sign: null , signOne: 1})
    }
    else if(this.state.currentSigning == "Receiver") {
      this.setState({received_by_sign: null , signTwo: 1})      
    }
    else if(this.state.currentSigning == "HR Officer") {
      this.setState({hr_receivedsign: null , signThree: 1})      
    }

  }

  _onSaveEvent(result) {

    if(this.state.currentSigning == "Surrenderee") {
      this.setState({surrender_sign: result.encoded , signOne: 1})
    }
    else if(this.state.currentSigning == "Receiver") {
      this.setState({received_by_sign: result.encoded , signTwo: 1})      
    }
    else if(this.state.currentSigning == "HR Officer") {
      this.setState({hr_receivedsign: result.encoded , signThree: 1})      
    }

    setTimeout(() => {
      Alert.alert(`${this.state.signOne} - ${this.state.signTwo} - ${this.state.signThree}`);
    } , 2000);
    
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


export default EndorsementDetail;
