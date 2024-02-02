import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Home from '../../screens/home/Home';
// import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, View } from 'react-native';
// import HeaderTitle from '../header/HeaderTitle';
const Tab = createBottomTabNavigator();
import { useIsFocused } from '@react-navigation/native';
import Register from '../../src/screens/auth/register/Register';
import Login from '../../src/screens/auth/login/Login';
import Home from '../../src/screens/home/Home';
import Appointments from '../../src/screens/appointment/Appointments';

const TabBar = ({ navigation }: any) => {
  const [notifications, setNotifications] = React.useState<any[]>([]);
  const isFocused = useIsFocused();

  const headersTitleIcons = [
    { name: 'chatbox-outline', color: '#000', size: 25, screen: 'ChatList' },
    {
      name:
        notifications.length > 0 ? 'notifications' : 'notifications-outline',
      color: notifications.length > 0 ? 'red' : '#000',
      size: 25,
      screen: 'Notification',
    },
    {
      name: 'bookmark-outline',
      color: '#000',
      size: 25,
      screen: 'SavedDoctors',
    },
  ];

  //   useEffect(() => {
  //     getNotifications(1).then((res:any) => {
  //       console.log(res);
  //       setNotifications(res.results);
  //     });
  //   }, [isFocused]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {};
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name='home' color={color} size={size} />
          ),
          //   headerTitle: () => (
          //     <View style={styles.header}>
          //       <HeaderTitle icons={headersTitleIcons} navigation={navigation} />
          //     </View>
          //   ),
        }}
        name='Home'
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Appointments',
          tabBarIcon: ({ color, size }) => (
            <Icon name='calendar' color={color} size={size} />
          ),
        }}
        name='Appointment'
        component={Appointments}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Categories',
          tabBarIcon: ({ color, size }) => (
            <Icon name='apps' color={color} size={size} />
          ),
        }}
        name='Categories'
        component={Register}
      />
    </Tab.Navigator>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    gap: 8,
  },
});
