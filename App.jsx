import { StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Home from './src/pages/home';
import EditView from './src/pages/EditView';
import Search from './src/pages/Search';
import CreateAccount from './src/pages/createAccount';
import Login from './src/pages/Login';
import Splash from './src/pages/splash';
import Colors from './color.config';

const Stack = createNativeStackNavigator();

function App() {

  return (
    <>
      <StatusBar
        backgroundColor={Colors['white-1']}
        barStyle="dark-content"
      />
      <GestureHandlerRootView>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown:false }}>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='EditView' component={EditView} />
          <Stack.Screen name='Search' component={Search} />
          <Stack.Screen name='CreateAccount' component={CreateAccount} />
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Splash' component={Splash} />
        </Stack.Navigator>
      </NavigationContainer>
      </GestureHandlerRootView>
      <Toast position='bottom' />
    </>
  );
}

export default App;
