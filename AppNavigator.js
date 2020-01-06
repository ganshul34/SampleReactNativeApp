import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Home from './components/Home';
import UserRegisteration from './components/UserRegisteration';

const MainNavigator = createStackNavigator({
  Home: {screen: Home},
  UserRegisteration: {screen: UserRegisteration},
});

const AppNavigator = createAppContainer(MainNavigator);

export default AppNavigator;