import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/pages/home';
import EditView from './src/pages/EditView';

const Stack = createNativeStackNavigator();

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown:false }}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='EditView' component={EditView} />
      </Stack.Navigator>
    </NavigationContainer> 
  );
}

export default App;
