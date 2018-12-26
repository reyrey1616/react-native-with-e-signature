import React, { Component } from "react";
import {
  Text
} from "react-native";
import Hidden from '../component/Hidden';
import { Icon, Container, Tab, Tabs, TabHeading, Content , Spinner } from 'native-base'
import AppHeader from '../component/Header';
import CardList from '../component/CardList';
import EndorsementDetail from '../Details/EndorsementDetail';


class PropertyEndorsement extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Incident Report",
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
      fetch('http://192.168.1.61/Aurorapp/endorsement.php')
      .then(res => res.json())
      .then(response => {
        this.setState({
          isLoading: false ,
          dataSource: response.new ,
          draftDataSource: response.draft
        });

        setTimeout(() => console.log(this.state.dataSource) , 1000);

      }).catch(err => JSON.stringify(err));
   }

  render() {

    if(this.state.isLoading == true) {
      return(
        <Container>
        <AppHeader  title="Property Endorsement" openDrawer={() => this.props.navigation.openDrawer()} />
        <Spinner  color = 'blue' />
      </Container>
      );
    }
     else {

      let newData = this.state.dataSource.map((val , key) => {
        return <CardList  openDetails = {() => this.props.navigation.navigate('EndorsementDetail' , {
          username: val.surrendered_by ,
          id: val.id ,
          isDraft: ""
        }) } fullName = {val.surrendered_by.fullname} instance = {val.subject} dates = {val.date_created}  key = {key} myKey = {key}  />
      });

      let draftData = this.state.draftDataSource.map((val , key) => {
        return <CardList  openDetails = {() => this.props.navigation.navigate('EndorsementDetail' , {
          username: val.surrendered_by ,
          id: val.id ,
          isDraft: "Draft"
        }) } fullName = {val.surrendered_by.fullname} instance = {val.subject} dates = {val.date_created}  key = {key} myKey = {key}  />
      });

      return (
        <Container>
          <AppHeader  title="Property Endorsement" openDrawer={() => this.props.navigation.openDrawer()} />
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
  



export default PropertyEndorsement;

