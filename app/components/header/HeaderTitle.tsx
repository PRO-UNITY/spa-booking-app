import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { mainColor } from '../../src/utils/colors';

const HeaderTitle = ({ icons, navigation }: any) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        // Implement any logic if needed
      }}
    >
      <View style={styles.header}>
        <Text style={styles.titleText}>SPA</Text>
        <View style={styles.iconsContainer}>
          {icons.map((icon: any, index: any) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.navigate(icon.screen)}
            >
              <View style={styles.iconContainer}>
                <Icon name={icon.name} color={icon.color} size={icon.size} />
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HeaderTitle;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    flex: 1,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: mainColor,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    padding: 8,
  },
});
