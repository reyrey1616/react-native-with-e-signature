import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image ,
  ActivityIndicator , 
  Alert
} from "react-native";
import Hidden from '../component/Hidden';
import { Icon, Button, Container, Header, Tab, Tabs, TabHeading, Content, Left , Card , CardItem , Body , Right , Spinner } from 'native-base'
import AppHeader from '../component/Header';
import CardList from '../component/CardList';

class Feedback extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Feedback",
    headerLeft: <Icon name="ios-menu" style={{ paddingLeft: 10 }} onPress={() => navigation.navigate('DrawerOpen')} />,
    drawerLabel: <Hidden />
  })
  
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true ,
      dataSource: null ,
      draftDataSource: null
    }
  }

  componentDidMount(){
    return fetch('http://192.168.1.61/Aurorapp/incidents.php')
        .then(res => res.json())
        .then((response) => { 
            this.setState({
              isLoading: false ,
              dataSource: response.incidents ,
              draftDataSource: response.draft
            });
        })
        .catch(err => Alert.alert(err));
     }  


  render() {
    if(this.state.isLoading) {
      return (
      <Container>
        <AppHeader title="Employee Feedback" openDrawer={() => this.props.navigation.openDrawer()} />
        <Spinner color = 'blue' />       
      </Container>
      )
    }  else {
      let incidents = this.state.dataSource.map((val, key) => {
        return <CardList  openDetails = {() => this.props.navigation.navigate('FeedbackDetails' , {
           username: val.username ,
           id: val.id ,
           isDraft: false
         }) } fullName = {val.fullname} instance = {val.instance} dates = {val.dates}  key = {key} myKey = {key}  />
      });

      let draft = this.state.draftDataSource.map((val, key) => {
        return <CardList  openDetails = {() => this.props.navigation.navigate('FeedbackDetails' , {
           username: val.username ,
           id: val.id ,
           isDraft: true
         }) } fullName = {val.fullname} instance = {val.instance} dates = {val.dates}  key = {key} myKey = {key}  />
      });
      return (
        <Container>
          <AppHeader  title="Employee Feedback" openDrawer={() => this.props.navigation.openDrawer()} />
          <Tabs tabBarUnderlineStyle = {{borderBottomColor: 'black'}} >
          <Tab heading={ <TabHeading><Icon name="ios-browsers" /><Text style = {{color: 'white'}}> New</Text></TabHeading>}>
           <Content>
          { incidents }
          </Content>
          </Tab>
          <Tab heading={ <TabHeading ><Icon name="ios-bookmarks"/><Text style = {{color: 'white'}} > Draft</Text></TabHeading>}>
          <Content>
          { draft }
          </Content>
          </Tab>
        </Tabs>
        </Container>
        );    
      }
    }
  }



export default Feedback;

