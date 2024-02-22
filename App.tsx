import { View, Text } from 'react-native'
import React, {createContext, useState}from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Bluetooth from './components/Bluetooth';
export const GlobalContext = createContext<any>(null);

const Tab = createBottomTabNavigator()

const App = () => {
  const [username, setUsername] = useState<null | string>(null);
  const [password, setPassword] = useState<null | string>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  return (
    <GlobalContext.Provider value={{
      username, setUsername, password, setPassword, isLoggedIn, setIsLoggedIn
    }}>   
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='Login' component={Login} />
        <Tab.Screen name='SignUp' component={SignUp} />
        <Tab.Screen name='Bluetooth' component={Bluetooth} />
      </Tab.Navigator>
    </NavigationContainer>
    </GlobalContext.Provider>
  )
}

export default App