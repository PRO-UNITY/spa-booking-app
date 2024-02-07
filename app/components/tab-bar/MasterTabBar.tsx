import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../../src/screens/user-profile/UserProfile';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import HeaderTitle from '../header/HeaderTitle';

import MasterHome from '../../src/screens/home/MasterHome';
import MasterCalendarAppointments from '../../src/screens/master/MasterCalendarAppointments';
import { getNotifications } from '../../src/services/notification/notification';
import { mainColor, redColor } from '../../src/utils/colors';
const Tab = createBottomTabNavigator();

const MasterTabBar = ({ navigation }: any) => {
  const [notifications, setNotifications] = React.useState<any[]>([]);
  const isFocused = useIsFocused();
  const headersTitleIcons = [
    { name: 'chatbox-outline', color: '#000', size: 25, screen: 'ChatList' },
    {
      name: notifications ? 'notifications' : 'notifications-outline',
      color: notifications ? redColor : '#000',
      size: 25,
      screen: 'Notification',
    },
  ];

  useEffect(() => {
    getNotifications(1).then((res: any) => {
      console.log(res);
      setNotifications(res.results);
    });
  }, [isFocused]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {};
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarActiveTintColor: mainColor,
          tabBarIcon: ({ color, size }) => (
            <Icon name='home' color={color} size={size} />
          ),
          headerTitle: () => (
            <View style={styles.header}>
              <HeaderTitle icons={headersTitleIcons} navigation={navigation} />
            </View>
          ),
        }}
        name='MasterHome'
        component={MasterHome}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Calendar',
          tabBarActiveTintColor: mainColor,
          tabBarIcon: ({ color, size }) => (
            <Icon name='calendar' color={color} size={size} />
          ),
        }}
        name='Calendar'
        component={MasterCalendarAppointments}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'User',
          tabBarActiveTintColor: mainColor,
          tabBarIcon: ({ color, size }) => (
            <Icon name='person' color={color} size={size} />
          ),
        }}
        name='User'
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default MasterTabBar;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    gap: 8,
  },
});
