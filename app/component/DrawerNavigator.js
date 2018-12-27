
import React, {Component} from 'react';
import {AppRegistry ,  Image  } from 'react-native';
import {Container , Content ,  Body ,  Header , Left , Icon } from 'native-base';
import { createDrawerNavigator , DrawerItems} from 'react-navigation';
import  HomeScreen  from '../screens/HomeScreen';
import  HomeContent  from '../screens/HomeContent';
import Applicant from '../screens/Applicant';
import ExitClearance from '../screens/Exit';
import Notice from '../screens/Notice';
import PropertyEndorsement from '../screens/Property';
import Feedback from '../screens/Feedback';
import Recruitment from '../screens/Recruitment';
import Personnel from '../screens/Personnel';
import Services from '../screens/Services';
import FeedBackDetails from '../Details/FeedBackDetails';
import CardList from './CardList';
import IncidentReport from '../screens/IncidentReport';
import IncidentDetails from '../Details/IncidentDetails';
import NoticeDetails from '../Details/NoticeDetails';
import EndorsementDetail from '../Details/EndorsementDetail';
import KeyAccountability from '../screens/KeyAccountability';
import KeyDetails from '../Details/KeyDetails';
import EndorsementForms from '../screens/EndorsementForms';
import EquipmentDetails from '../Details/EquipmentDetails';
import EquipmentAccountability from '../screens/EquipmentAccountability';
import LoginForm from './LoginForm';
import LogoutAccount from './LogoutAccount';





const CustomSidebar = (props) => (
    <Container>
        <Header style = {{height: 150 , backgroundColor: 'rgb(25, 30, 36)' }}>
          <Body style = {{ justifyContent: 'center' , alignItems: 'center'}}>
            <Image
             style = {{height: 130 , width: 150 ,   borderRadius: 25}}
             source = {require('../../images/aurora.jpg')} />
          </Body>
        </Header>
        <Content>
          <DrawerItems {...props}/>
        </Content>
    </Container>
  )

  
 const SideBar =  new createDrawerNavigator({
    Home: { screen:   HomeContent , } ,
    Recruitment: { screen:   Recruitment , },
    Personnel: { screen:   Personnel , },
    Services: { screen:   Services , } ,
    Applicant: {screen: Applicant } ,
    ExitClearance: {screen: ExitClearance } ,
    Notice: {screen: Notice } ,
    PropertyEndorsement: {screen: PropertyEndorsement } ,
    Feedback: {screen: Feedback } ,
    FeedbackDetails: {screen: FeedBackDetails } ,
    CardList: { screen: CardList } ,
    IncidentReport: { screen: IncidentReport } ,
    IncidentDetails: {screen: IncidentDetails} ,
    NoticeDetails: {screen: NoticeDetails} ,
    EndorsementDetail: {screen: EndorsementDetail} ,
    KeyDetails: {screen: KeyDetails} ,
    KeyAccountability: {screen: KeyAccountability} ,
    EndorsementForms: {screen: EndorsementForms} ,
    EquipmentAccountability: {screen: EquipmentAccountability} ,
    EquipmentDetails: {screen: EquipmentDetails} ,
    LoginForm: {screen: LoginForm}  


    }
  , 
    {
      initialRouteName: 'Home' ,
      order: ['Home' , 'Recruitment' , 'Personnel' , 'Services' , 'Applicant' , 'ExitClearance' , 'Notice' , 'PropertyEndorsement' , 'Feedback' , 'FeedbackDetails' , 'CardList' , 'IncidentReport' , 'IncidentDetails' , 'NoticeDetails' , 'EndorsementDetail' , 'KeyAccountability' , 'KeyDetails' , 'EndorsementForms' , 'EquipmentAccountability' , 'EquipmentDetails' , 'LoginForm'] ,
      drawerPosition: 'left' , 
      contentComponent: CustomSidebar ,
      drawerOpenRoute: 'OpenDrawer',
      drawerCloseRoute: 'DrawerClose',
      drawerToggleRoute: 'DrawerToggle' ,
    //   navigationOptions: {
    //     gesturesEnabled:false
    //   },
                        
      tabBarOptions: {
        activeTintColor: 'blue' ,
        inactiveTintColor: 'grey'
      }
    }
  );

  export default SideBar;

  


