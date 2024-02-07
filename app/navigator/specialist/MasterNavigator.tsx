// navigation.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Register from '../../src/screens/auth/register/Register';
import Login from '../../src/screens/auth/login/Login';
import ForgotPassword from '../../src/screens/auth/forgot-password/ForgotPassword';
import Verification from '../../src/screens/auth/verification/Verification';
import UserProfileEdit from '../../src/screens/user-profile/UserProfileEdit';
// import Chat from '../../src/screens/chat/ChatList';
import ChatList from '../../src/screens/chat/ChatList';
// import Welcome from '../../screens/welcome/Welcome';
import MasterHome from '../../src/screens/home/MasterHome';
import MasterTabBar from '../../components/tab-bar/MasterTabBar';
// import DoctorAppointmentUser from '../../screens/doctor-screen/doctor-appointment-user/DoctorAppointmentUser';
import MasterAppointmentUser from '../../src/screens/master/MasterAppointUser';
import MasterCalendarAppointments from '../../src/screens/master/MasterCalendarAppointments';
import Notification from '../../src/screens/notification/Notification';
import Chat from '../../src/screens/chat/Chat';
import SetPassword from '../../src/screens/auth/forgot-password/SetPassword';

const Stack = createStackNavigator();

const MasterNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
      <Stack.Screen name='Verification' component={Verification} />
      <Stack.Screen name='SetPassword' component={SetPassword} />
      <Stack.Screen name='UserEdit' component={UserProfileEdit} />
      <Stack.Screen name='Chat' component={Chat} />
      <Stack.Screen name='ChatList' component={ChatList} />
      <Stack.Screen name='MasterHome' component={MasterHome} />
      <Stack.Screen name='Notification' component={Notification} />
      <Stack.Screen
        name='MasterAppointmentUser'
        component={MasterAppointmentUser}
      />
      <Stack.Screen
        name='MasterCalendarAppointments'
        component={MasterCalendarAppointments}
      />

      {/* <Stack.Screen
        name='Welcome'
        component={Welcome}
        options={{
          headerShown: false,
        }}
      /> */}
      <Stack.Screen
        name='TabBarMaster'
        component={MasterTabBar}
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
        name='Login'
        component={Login}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default MasterNavigator;
