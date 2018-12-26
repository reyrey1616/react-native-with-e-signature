import { createStackNavigator } from 'react-navigation';
  
  const myRouter = createStackNavigator({
    Login: { screen: LoginScreen },
    Profile: { screen: ProfileScreen },
  });
  
  export default myRouter;