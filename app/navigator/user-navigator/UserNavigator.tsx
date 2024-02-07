import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../../src/screens/auth/login/Login';
import Register from '../../src/screens/auth/register/Register';
import TabBar from '../../components/tab-bar/TabBar';
import MasterDetails from '../../src/screens/master/MasterDetails';
import Verification from '../../src/screens/auth/verification/Verification';
import ChatList from '../../src/screens/chat/ChatList';
import Notification from '../../src/screens/notification/Notification';
import UserProfileEdit from '../../src/screens/user-profile/UserProfileEdit';
import Chat from '../../src/screens/chat/Chat';
import SavedMasters from '../../src/screens/master/MastersSaved';
import ForgotPassword from '../../src/screens/auth/forgot-password/ForgotPassword';
import SetPassword from '../../src/screens/auth/forgot-password/SetPassword';
import VerificationRegistration from '../../src/screens/auth/register/VerificationRegister';

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
        name='VerificationRegistration'
        component={VerificationRegistration}
      />

      <Stack.Screen
        name='Verification'
        component={Verification}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='ForgotPassword'
        component={ForgotPassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='SetPassword'
        component={SetPassword}
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
      <Stack.Screen name='ChatList' component={ChatList} />
      <Stack.Screen name='Notification' component={Notification} />
      <Stack.Screen name='UserEdit' component={UserProfileEdit} />
      <Stack.Screen name='Chat' component={Chat} />
      <Stack.Screen name='SavedMasters' component={SavedMasters} />
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
