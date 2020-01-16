import { createAppContainer, createStackNavigator } from 'react-navigation'

import Main from "./pages/Main";
import Profile from "./pages/Profile";

const MainNavigation = createStackNavigator(
  {
    Main: {
      screen: Main,
      navigationOptions: {
        title: 'Main'
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: 'Profile'
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor:'#7d40ef'
      }
    }
  }
)

export default createAppContainer(MainNavigation)