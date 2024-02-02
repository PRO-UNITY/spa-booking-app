import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../../src/screens/auth/login/Login';
import Register from '../../src/screens/auth/register/Register';
import TabBar from '../../components/tab-bar/TabBar';
import MasterDetails from '../../src/screens/master/MasterDetails';
import Verification from '../../src/screens/auth/verification/Verification';

const Stack = createStackNavigator();

const UserNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen
        name='Login'
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='Register'
        component={Register}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='Verification'
        component={Verification}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='TabBar'
        component={TabBar}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name='MasterDetails' component={MasterDetails} />
      {/* <Stack.Screen
        name='Welcome'
        component={Welcome}
        options={{
          headerShown: false,
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default UserNavigator;
