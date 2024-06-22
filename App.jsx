import { StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/pages/home';
import EditView from './src/pages/EditView';
import Search from './src/pages/Search';
import CreateAccount from './src/pages/createAccount';
import Colors from './color.config';

const Stack = createNativeStackNavigator();

function App() {

  return (
    <>
      <StatusBar
        backgroundColor={Colors['white-1']}
        barStyle="dark-content"
      />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="CreateAccount" screenOptions={{ headerShown:false }}>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='EditView' component={EditView} />
          <Stack.Screen name='Search' component={Search} />
          <Stack.Screen name='CreateAccount' component={CreateAccount} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast position='bottom' />
    </>
  );
}

export default App;
