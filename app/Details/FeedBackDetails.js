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
  Item,
  Button,
  Toast,
  Label,
  DatePicker,
  Input,
  Content,
  Icon,
  Textarea,
  Form,
  Container,
  Spinner,
  List,
  ListItem
} from "native-base";
import AppHeader from "../component/Header";
import SignatureCapture from "react-native-signature-capture";
import { Grid, Col, Row } from "react-native-easy-grid";
import HeaderBack from '../component/HeaderBack'

class FeedBackDetails extends Component {
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
      isDraft: navigation.getParam("isDraft", false),
      dataSource: null,
      isLoading: true,
      chosenDate: new Date(),
      modalVisible: false,
      encoded: null,
      pathName: null,
      findings: null,
      finalResult: null,
      currentSigning: null,
      ViolatorSign: null,
      IssuerSign: null,
      SupervisorSign: null,
      HRSign: null,
      violatorDone: null,
      issuerDone: null,
      supervisorDone: null,
      hrDone: null,
      isDragged: false,
      dateToInsert: null,
      fullWidth: Dimensions.get("window").width - 20 ,
      date1: null , 
      date2: null , 
      date3: null , 
      date4: null ,
      performance: null , 
      agreed: null ,
      showToast: false
    };

    this.setDate = this.setDate.bind(this);
    this._onSaveEvent = this._onSaveEvent.bind(this);
    this._onDragEvent = this._onDragEvent.bind(this);
    this.resetSign = this.resetSign.bind(this);
    this.saveAsDraft = this.saveAsDraft.bind(this);
  }

  componentDidMount() {
    fetch("http://192.168.1.61/Aurorapp/incident_detail.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        id: this.state.id
      })
    })
      .then(res => res.json())
      .then(response => {
        this.setState({
          dataSource: response.records,
          isLoading: false 
        });
        if(this.state.isDraft == true ) {
          let data = this.state.dataSource[0]
          setTimeout(() => {
          this.setState({
              findings: data.findings ,
              finalResult: data.final_result ,
              ViolatorSign: data.violator_sign ,
              IssuerSign: data.issuer_sign ,
              SupervisorSign: data.supervisor_sign ,
              HRSign: data.hr_sign ,
              date1: data.date1 , 
              date2: data.date2 ,
              date3: data.date3 ,
              date4: data.date4 
          });
          } , 1000);
        }
          

      })
      .catch(err => console.log(JSON.stringify(err)));
  }

  saveAsDraft(saveType) {
    fetch("http://192.168.1.61/Aurorapp/save_feedback.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        findings: this.state.findings,
        finalResult: this.state.finalResult,
        ViolatorSign: this.state.ViolatorSign,
        SupervisorSign: this.state.SupervisorSign,
        IssuerSign: this.state.IssuerSign,
        HRSign: this.state.HRSign,
        Date1: this.state.date1, 
        Date2: this.state.date2, 
        Date3: this.state.date3, 
        Date4: this.state.date4 , 
        id: this.state.id ,
        performance: this.state.performance , 
        agreed: this.state.agreed ,
        savedtype: saveType
      })
    })
      .then(res => res.json())
      .then(response => {
        console.log(response);
      if (saveType == 'Draft')  
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
        text: "Feedback Form Successfully Saved",
        buttonText: "Okay",
        duration: 3000
      });
    }

    setTimeout(() => this.props.navigation.navigate('Feedback') , 2500);

      })
      .catch(err => Alert.alert(JSON.stringify(err)));
  }

  render() {
    if (this.state.isLoading == true) {
      return (
        <Container>
          {/* <AppHeader
            title="Employee Feedback"
            openDrawer={() => this.props.navigation.openDrawer()}
          /> */}
          <HeaderBack backTo = "Feedback" headTitle = "Employee Feedback Form"/>
          <Spinner color="blue" />
        </Container>
      );
    } else {
      let details = this.state.dataSource.map((val, key) => {
        return (
          <Content key={key}>
            <List>
              <ListItem>
                <Text>
                  {" "}
                  Violator:{" "}
                  <Text style={{ color: "#888" }}> {val.fullname} </Text>{" "}
                </Text>
              </ListItem>
              <ListItem>
                <Text>
                  Dept:{" "}
                  <Text style={{ color: "#888" }}> {val.department} </Text>
                </Text>
              </ListItem>
              <ListItem last>
                <Text>
                  Job Title:{" "}
                  <Text style={{ color: "#888" }}> {val.jobtitle} </Text>{" "}
                </Text>
              </ListItem>
              <ListItem itemDivider>
                <Text>DETAILS</Text>
              </ListItem>
              <ListItem>
                <Text>
                  {" "}
                  Violation:{" "}
                  <Text style={{ color: "#888" }}>
                    {" "}
                    {`\n ${val.content}`}{" "}
                  </Text>{" "}
                </Text>
              </ListItem>
              <ListItem>
                <Text>
                  {" "}
                  Instance:{" "}
                  <Text style={{ color: "#888" }}> {val.instance} </Text>{" "}
                </Text>
              </ListItem>
              <ListItem>
                <Text>
                  Issued By:{" "}
                  <Text style={{ color: "#888" }}> {val.issuer_fullname} </Text>{" "}
                </Text>
              </ListItem>
              <ListItem>
                <Text>
                  Date of Occurence:{" "}
                  <Text style={{ color: "#888" }}> {val.date} </Text>{" "}
                </Text>
              </ListItem>
              <ListItem>
                <Text>
                  Supervisor Remarks:{" "}
                  <Text style={{ color: "#888" }}>{val.concerns} </Text>
                </Text>
              </ListItem>
              <ListItem last>
                <Text>
                  Date: <Text style={{ color: "#888" }}> {val.datess} </Text>
                </Text>
              </ListItem>
            </List>
            <Content padder>
              <Form>
                <Label>
                  {" "}
                  Describe Performance concerns , issue or recommendation (be
                  specific, and include dates and examples):{" "}
                </Label>
                <Textarea rowSpan={5} bordered placeholder={(this.state.isDraft == true) ? val.describe_performance : "State here ..."}  onChangeText = {val => this.state.performance = val}/>
                <Label>
                  {" "}
                  Describe agreed upon solution(s) or course of action:{" "}
                </Label>
                <Textarea rowSpan={5} bordered placeholder= {val.describe_agreed}  onChangeText = {val => this.state.agreed = val}/>
              </Form>
              <Form>
                <Text style={{ paddingTop: 20, fontSize: 17 }}>
                  {" "}
                  DISPUTE ACTION{" "}
                </Text>
                <Item stackedLabel style={{ padding: 6, paddingTop: 5 }}>
                  <Label>Findings *</Label>
                  <Input value = {this.state.findings}
                    onChangeText={val => {
                      this.state.findings = val;
                      this.setState({findings: val})
                    }} 
                  />
                </Item>
                <Item stackedLabel style={{ padding: 10}}>
                  <Label>Final Result *</Label>
                  <Input
                  returnKeyType = "next"
                   value = {this.state.finalResult}
                    onChangeText={val => {
                      this.state.finalResult = val;
                      this.setState({finalResult: val})
                    }}
                  />
                </Item>
              </Form>

              <Button
                block 
                primary
                style={{ padding: 7, margin: 5 , marginTop: 20 }}
                onPress={() => {
                  this.setModalVisible(true);
                  this.setState({
                    currentSigning: "Violator"
                  });
                }}
              >
                <Text style = {{color: 'white'}}> Add Violator Signature {this.state.violatorDone} </Text>
              </Button>
              <Image
                style={{
                  width: this.state.fullWidth,
                  height: 100,
                  borderWidth: 1,
                  borderColor: "red"
                }}
                source={{
                  uri: `data:image/png;base64, ${this.state.ViolatorSign}`
                }}
              />

              <Button
                block
                primary
                style={{ padding: 7, margin: 5 }}
                onPress={() => {
                  this.setModalVisible(true);
                  this.setState({
                    currentSigning: "Issuer"
                  });
                }}
              >
                <Text style = {{color: 'white'}}> Add Issuer Signature {this.state.issuerDone}</Text>
              </Button>
              <Image
                style={{
                  width: this.state.fullWidth,
                  height: 100,
                  borderWidth: 1,
                  borderColor: "red"
                }}
                source={{
                  uri: `data:image/png;base64, ${this.state.IssuerSign}`
                }}
              />

              <Button
                block
                prmary
                style={{ padding: 7, margin: 5 }}
                onPress={() => {
                  this.setModalVisible(true);
                  this.setState({
                    currentSigning: "Supervisor"
                  });
                }}
              >
                <Text style = {{color: 'white'}}>
                  {" "}
                  Add Direct Supervisor Signature {
                    this.state.supervisorDone
                  }{" "}
                </Text>
              </Button>
              <Image
                style={{
                  width: this.state.fullWidth,
                  height: 100,
                  borderWidth: 1,
                  borderColor: "red"
                }}
                source={{
                  uri: `data:image/png;base64, ${this.state.SupervisorSign}`
                }}
              />

              <Button
                block
                primary
                style={{ padding: 7, margin: 5 }}
                onPress={() => {
                  this.setModalVisible(true);
                  this.setState({
                    currentSigning: "HR"
                  });
                }}
              >
                <Text style = {{color: 'white'}}> Add HR Manager Signature {this.state.hrDone} </Text>
              </Button>
              <Image
                style={{
                  width: this.state.fullWidth,
                  height: 100,
                  borderWidth: 1,
                  borderColor: "red"
                }}
                source={{ uri: `data:image/png;base64, ${this.state.HRSign}` }}
              />

              <Grid style={{ paddingTop: 10 }}>
                <Row size={20}>

                  <Col style={{ padding: 7 }}>
                    <Button
                      block
                      rounded
                      bordered
                      dark
                      onPress = { () => this.saveAsDraft('Draft')}
                    >
                      <Text>Save as draft</Text>
                    </Button>
                  </Col>

                  <Col style={{ padding: 7 }}>
                    <Button block rounded> 
                      <Text style={{ color: "#fff" }}  onPress = { () => this.saveAsDraft('Finished')} >Declare as Finished</Text>
                    </Button>
                  </Col>

                </Row>
              </Grid>
            </Content>
          </Content>
        );
      });

      return (
        <Container>
          {/* <AppHeader
            title="Employee Feedback"
            openDrawer={() => this.props.navigation.openDrawer()}
          /> */}
    <HeaderBack backTo = "Feedback" headTitle = "Employee Feedback Form"/>
        
          {details}

          <View style={{ marginTop: 22 }}>
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
                Insert Signature below.{" "}
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
                
                <Form style={{ padding: 15 }}>
                <Button>
                  <DatePicker
                    defaultDate={new Date(2018, 11, 1)}
                    minimumDate={new Date(2018, 1, 1)}
                    maximumDate={new Date(2025, 12, 31)}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    placeHolderText="Select date"
                    textStyle={{ color: "white" }}
                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                    onDateChange={this.setDate}
                  />
                </Button>
                <Text>
                  Date: {this.state.chosenDate.toString().substr(4, 12)}
                </Text>
              </Form>

              </View>

          
            </Modal>
          </View>
        </Container>
      );
    }
  }

    setDate(newDate) {
        this.setState({ chosenDate: newDate });

        if (this.state.isDragged == true) {
            setTimeout(() => {
              if (this.state.currentSigning == "Violator")
                 { this.setState({date1: this.state.chosenDate.toString().substr(4, 12) }) }
              else if (this.state.currentSigning == "Issuer")
                { this.setState({date2: this.state.chosenDate.toString().substr(4, 12) }); }
              else if (this.state.currentSigning == "Supervisor")
                { this.setState({date3: this.state.chosenDate.toString().substr(4, 12) }); }
              else if (this.state.currentSigning == "HR")
                { this.setState({date4: this.state.chosenDate.toString().substr(4, 12) }); }
            console.log(this.state)
            } , 1000);
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
    this.setState({
      isDragged: false
    });

    setTimeout(() => {
      if (this.state.isDragged == false) {
        if (this.state.currentSigning == "Violator")
          this.setState({ violatorDone: "" });
        else if (this.state.currentSigning == "Issuer")
          this.setState({ issuerDone: "" });
        else if (this.state.currentSigning == "Supervisor")
          this.setState({ supervisorDone: "" });
        else if (this.state.currentSigning == "HR")
          this.setState({ hrDone: "" });
      }
    }, 1000);
  }

  _onSaveEvent(result) {

    if (this.state.isDragged == true) {
      if (this.state.currentSigning == "Violator")
        {this.setState({
          ViolatorSign: result.encoded,
          violatorDone: " - Done",
          isDragged: false
        }); }
      else if (this.state.currentSigning == "Issuer")
      {  this.setState({
        IssuerSign: result.encoded,
        issuerDone: " - Done",
        isDragged: false
      });}
      else if (this.state.currentSigning == "Supervisor"){ 
         this.setState({
        SupervisorSign: result.encoded,
        supervisorDone: " - Done",
        isDragged: false
      }); 
      }
      else if (this.state.currentSigning == "HR")
        {
          this.setState({
          HRSign: result.encoded,
          hrDone: " - Done",
          isDragged: false
        }); }
    } 
      else {
        Alert.alert("Please , Insert Signature!");
      }
  }

  _onDragEvent() {
    console.log("dragged");
    this.setState({
      isDragged: true
    });
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

export default FeedBackDetails;
