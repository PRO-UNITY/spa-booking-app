// import React, { useEffect, useState } from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import UserNavigator from './user-navigator/UserNavigator';
// import MasterNavigator from './specialist/MasterNavigator';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Stack = createStackNavigator();

// const AppNavigator = () => {
//   const [role, setRole] = useState('');

//   useEffect(() => {
//     const fetchRole = async () => {
//       try {
//         const storedRole = await AsyncStorage.getItem('role');
//         setRole(storedRole || '');
//       } catch (error) {
//         console.error('Error fetching role from AsyncStorage:', error);
//       }
//     };

//     fetchRole();
//   }, []);

//   return <>{role === 'client' ? <UserNavigator /> : <MasterNavigator />}</>;
// };

// export default AppNavigator;

import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserNavigator from './user-navigator/UserNavigator';
import MasterNavigator from './specialist/MasterNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'react-native';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const storedRole = await AsyncStorage.getItem('role');
        //@ts-ignore
        setRole(storedRole || 'client');
      } catch (error) {
        console.error('Error fetching role from AsyncStorage:', error);
        setRole(null);
      }
    };
    fetchRole();
  }, []);
  if (role === null) {
    return <Text>Loading</Text>;
  }
  return role === 'client' ? <UserNavigator /> : <MasterNavigator />;
};

export default AppNavigator;
