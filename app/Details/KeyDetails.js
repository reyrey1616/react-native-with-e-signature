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

class KeyDetails extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Key Accountability Details",
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
      chosenDate: new Date() ,
      modalVisible: false,
      fullWidth: Dimensions.get("window").width - 20 ,
      currentSigning: null ,
      conformeSign: null , 
      issuerSign: null ,
      conforme: 0 ,
      issuer:0 
    };

    this._onSaveEvent = this._onSaveEvent.bind(this);
    this._onDragEvent = this._onDragEvent.bind(this);
    this.resetSign = this.resetSign.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this)
    this.saveData = this.saveData.bind(this);

  }

  componentDidMount(){
    fetch(`http://192.168.1.61/Aurorapp/key_details.php?id=${this.state.id}`)
    .then(res => res.json())                     
    .then(response => {
       
      this.setState({ dataSource: response.data ,
         isLoading: false ,
         conformeSign: response.data.confirm_by_sign , 
         issuerSign: response.data.issued_by_sign
        });
      console.log(response.data)

    })
    .catch(err => JSON.stringify(err));
  }

  saveData(stat) {

    fetch('http://192.168.1.61/Aurorapp/saveKeyAccountabilityDetails.php' ,{
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
          conformeSign: this.state.conformeSign ,
          issuerSign: this.state.issuerSign , 
          conforme: this.state.conforme  , 
          issuer: this.state.issuer , 
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
 
     setTimeout(() => this.props.navigation.navigate('KeyAccountability') , 2500);
      }).catch(err => console.log(JSON.stringify(err)))


  }


  

  render() {


    if (this.state.isLoading == true) {
      return (
        <Container>
          <HeaderBack backTo = "KeyAccountability" headTitle = "Key Accountability Details"/>
          <Spinner color="blue" />
        </Container>
      );
    } else {

      let keyDetails = this.state.dataSource.keys.map((val , key ) => {
          return <List key = {key}> 
            <ListItem itemDivider> 
              <Text> {"Key "}{key + 1}</Text>
            </ListItem>
            <ListItem>
              <Text> Key Type: {val.key_type}</Text>
            </ListItem>
            <ListItem>
              <Text> Bldg: {val.building_name}</Text>
            </ListItem>
            <ListItem>
              <Text> Room: {val.room_name}</Text>
            </ListItem>
          </List>
      })

      return (
       <Container>
        <HeaderBack backTo = "KeyAccountability" headTitle = "Key Accountability Details"/>
        <Content>
        <List>

          <ListItem itemDivider>
           <Text> EMPLOYEE PERSONAL INFORMATION </Text>
         </ListItem>

        <ListItem>
          <Text>
             {" "}
              Conforme:{" "}
            <Text style={{ color: "#888" }}> {this.state.dataSource.confirm_by.fullname } </Text>{" "}
          </Text>
        </ListItem>

        <ListItem>
          <Text>
             {" "}
              Dept:{" "}
            <Text style={{ color: "#888" }}> {this.state.dataSource.confirm_by.dept } </Text>{" "}
          </Text>
        </ListItem>

        
        <ListItem>
          <Text>
             {" "}
              Job Title:{" "}
            <Text style={{ color: "#888" }}> {this.state.dataSource.confirm_by.job } </Text>{" "}
          </Text>
        </ListItem>

        
        <ListItem itemDivider>
           <Text> Other Details </Text>
         </ListItem>

           
        <ListItem>
          <View>
              {keyDetails}
          </View>
        </ListItem>


        <ListItem>
          <Text>
             {" "}
              Issued By:{" "}
            <Text style={{ color: "#888" }}> {this.state.dataSource.issued_by.fullname } </Text>{" "}
          </Text>
        </ListItem>

        <ListItem>
             <Button block primary style = {{flex: 1}} onPress = {() => this.setState({modalVisible: true , currentSigning: 'Conforme'})}>
                  <View>
                  <Text style = {{color: '#fff'}}> Conforme's Signature</Text>
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
                  uri: `data:image/png;base64, ${this.state.conformeSign}`
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
                  uri: `data:image/png;base64, ${this.state.issuerSign}`
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


  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  saveSign() {
    this.refs["sign"].saveImage();
  }

  resetSign() {
    this.refs["sign"].resetImage();
    if(this.state.currentSigning == "Conforme") {
      this.setState({ conformeSign: null , conforme: 1});
    }
    else {
      this.setState({ issuerSign: null , issuer: 1 });
    }
  }

  _onSaveEvent(result) {

    console.log(result.encoded);
    if(this.state.currentSigning == "Conforme") {
      this.setState({ conformeSign: result.encoded , conforme: 1});
    }
    else {
      this.setState({ issuerSign: result.encoded , issuer: 1 });
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


export default KeyDetails;
