import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image ,
  Alert , 
  WebView
} from "react-native";
import { Icon, Button,  Title  , Container, Header, Tab, Tabs, ScrollableTab , TabHeading, Content, Left , Card , CardItem , Body , Right , Spinner } from 'native-base'
import AppHeader from '../component/Header';
import Offense from '../component/Offense';

class HomeContent extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Home",
    headerLeft: <Icon name="ios-menu" style={{ paddingLeft: 10 }} onPress={() => navigation.navigate('DrawerOpen')} />,
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Icon name="ios-home" style={{ height: 24 , width: 24 }} onPress={() => navigation.navigate('DrawerOpen')} />
    )
  })

  constructor(props) {
    super(props)

    this.state = {
      dataSource:null ,
      isLoaded: false ,
      Light: null  ,
      Moderate: null ,
      High: null  ,
      Extreme: null ,
      Grave: null
    }

    this.retrieveData = this.retrieveData.bind(this);
    // this.extractData = this.extractData.bind(this);

  }

  componentDidMount(){
    this.retrieveData();
 }



  retrieveData(){
    let url = `http://192.168.1.61/Aurorapp/home.php`;
    fetch(url , {
      method: 'GET' ,
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => {
     this.setState({
      isLoaded: true,
      Light: response[0].Light ,
      Moderate: response[1].Moderate ,
      High: response[2].High ,
      Extreme: response[3].Extreme ,
      Grave: response[4].Grave
     });

     setTimeout(() => console.log(this.state.Light) , 1000);
    })
    .catch(err => console.log(JSON.stringify(err)))
  }


  render() {

    if(this.state.isLoaded == false ) {
      return (
        <Container>
          <AppHeader title="Home" openDrawer={() => this.props.navigation.openDrawer()} />
        <Spinner color = 'blue' />
        </Container>
      )
    }

    else {

  
      let LightOffenses  = this.state.Light.map((val , key) => {
        return <Offense myKey = {key} key = {key} name = {val.name} description = {val.description} />
      });

      let ModerateOffenses  = this.state.Moderate.map((val , key) => {
        return <Offense myKey = {key} key = {key} name = {val.name} description = {val.description} />
      });
   

      let HighOffenses  = this.state.High.map((val , key) => {
        return <Offense myKey = {key} key = {key} name = {val.name} description = {val.description} />
      });
   

      let ExtremeOffenses  = this.state.Extreme.map((val , key) => {
        return <Offense  myKey = {key} key = {key} name = {val.name} description = {val.description} />
      });
   

      let GraveOffenses  = this.state.Grave.map((val , key) => {
        return <Offense myKey = {key} key = {key} name = {val.name} description = {val.description} />
      });
   
   

      return (
        <Container>
          <AppHeader title="Home" openDrawer={() => this.props.navigation.openDrawer()} />
        <Tabs tabBarPosition = "bottom" renderTabBar={()=> <ScrollableTab />} >

          <Tab  heading={ <TabHeading ><Text style = {{color: 'white'}} > Light Offense </Text></TabHeading>}>
            <Header>
                <Left>
                  <Button transparent>
                    <Icon name='ios-warning' />
                  </Button>
                 </Left>
                 <Body style = {{flex: 3}}>
                  <Title style = {{fontSize: 14}}>Kinds of Light Offenses </Title>
                  </Body>
                <Right>
                </Right>
            </Header>
            <Content>
            
            {LightOffenses}
            </Content>
             
          </Tab>

          <Tab  heading={ <TabHeading ><Text style = {{color: 'white'}} > Moderate Offense </Text></TabHeading>}>
             <Header>
                <Left>
                  <Button transparent>
                    <Icon name='ios-warning' />
                  </Button>
                 </Left>
                 <Body style = {{flex: 3}}>
                  <Title style = {{fontSize: 14}}>Kinds of Moderate Offenses </Title>
                  </Body>
                <Right>
                </Right>
            </Header>
          <Content>
            {ModerateOffenses}
          </Content>
          </Tab>



          <Tab  heading={ <TabHeading ><Text style = {{color: 'white'}} > High Offense </Text></TabHeading>}>
           <Header>
                <Left>
                  <Button transparent>
                    <Icon name='ios-warning' />
                  </Button>
                 </Left>
                 <Body style = {{flex: 3}}>
                  <Title style = {{fontSize: 14}}>Kinds of High Offenses </Title>
                  </Body>
                <Right>
                </Right>
            </Header>
          <Content>
            {HighOffenses}
          </Content>

          </Tab>

          <Tab  heading={ <TabHeading ><Text style = {{color: 'white'}} > Extreme Offense </Text></TabHeading>}>
            <Header>
                <Left>
                  <Button transparent>
                    <Icon name='ios-warning' />
                  </Button>
                 </Left>
                 <Body style = {{flex: 3}}>
                  <Title style = {{fontSize: 14}}>Kinds of Extreme Offenses </Title>
                  </Body>
                <Right>
                </Right>
            </Header>
            <Content>
              {ExtremeOffenses}
            </Content>

          </Tab>

          <Tab  heading={ <TabHeading ><Text style = {{color: 'white'}} > Grave Offense </Text></TabHeading>}>
            <Header>
                <Left>
                  <Button transparent>
                    <Icon name='ios-warning' />
                  </Button>
                 </Left>
                 <Body style = {{flex: 3}}>
                  <Title style = {{fontSize: 14}}>Kinds of Grave Offenses </Title>
                  </Body>
                <Right>
                </Right>
            </Header>
            <Content>
              {GraveOffenses}
            </Content>
          </Tab>


        </Tabs>
        </Container>

      )

    }

  }
}


export default HomeContent;
