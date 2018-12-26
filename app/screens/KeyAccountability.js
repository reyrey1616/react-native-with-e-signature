import React, { Component } from "react";
import {
  Text
} from "react-native";
import Hidden from '../component/Hidden';
import { Icon, Container, Tab, Tabs, TabHeading, Content , Spinner } from 'native-base'
import AppHeader from '../component/Header';
import CardList from '../component/CardList';

class KeyAccountability extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Key Accountability",
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
      fetch('http://192.168.1.61/Aurorapp/key_accountability.php')
      .then(res => res.json())
      .then(response => {
        this.setState({
          isLoading: false ,
          dataSource: response.new ,
          draftDataSource: response.draft
        });

        setTimeout(() => console.log(this.state) , 1000);

      }).catch(err => JSON.stringify(err));
   }

  render() {

    if(this.state.isLoading == true) {
      return(
        <Container>
        <AppHeader  title="Key Accountability" openDrawer={() => this.props.navigation.openDrawer()} />
        <Spinner  color = 'blue' />
      </Container>
      );
    }

     else {

      let newData = this.state.dataSource.map((val , key) => {
        return <CardList  openDetails = {() => this.props.navigation.navigate('KeyDetails' , {
          username: val.username ,
          id: val.id ,
          isDraft: 0
        }) } fullName = {val.user_info.fullname} instance = {val.numkeys} dates = {val.dates}  key = {key} myKey = {key}  />
      });


      let draftData = this.state.draftDataSource.map((val , key) => {
        return <CardList  openDetails = {() => this.props.navigation.navigate('KeyDetails' , {
          username: val.username ,
          id: val.id ,
          isDraft: 1
        }) } fullName = {val.user_info.fullname} instance = {val.numkeys} dates = {val.dates}  key = {key} myKey = {key}  />
      });


      return (
        <Container>
          <AppHeader  title="Key Accountability" openDrawer={() => this.props.navigation.openDrawer()} />
          <Tabs tabBarUnderlineStyle = {{borderBottomColor: 'black'}} >

          <Tab heading={ <TabHeading><Icon name="ios-browsers" /><Text style = {{color: 'white'}}> New</Text></TabHeading>}>
           <Content>
            
                { newData }
           
          </Content>
          </Tab>

          <Tab heading={ <TabHeading ><Icon name="ios-bookmarks"/><Text style = {{color: 'white'}} > Draft</Text></TabHeading>}>
          <Content>
            
                { draftData }
           
          </Content>
          </Tab>

        </Tabs>
        </Container>
        );  
       }  
      }
    }
  



export default KeyAccountability;

