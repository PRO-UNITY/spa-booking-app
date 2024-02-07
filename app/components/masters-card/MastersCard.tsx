import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { CardProps } from '../../src/types/CardProp';
import { grayColor } from '../../src/utils/colors';
import Icon from 'react-native-vector-icons/Ionicons';

const MastersCard: React.FC<CardProps> = ({
  imageUrl,
  name,
  specialty,
  navigation,
  screen,
  masterId,
  phone,
  rating,
  icon,
  iconColor,
}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(screen, { masterId })}>
      <View style={styles.container}>
        {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>Mr. {name}</Text>
          <Text style={styles.phoneText}>{phone}</Text>

          <View style={styles.ratingContainer}>
            {/* @ts-ignore */}
            <Icon name={icon} style={[styles.starIcon, { color: iconColor }]} />
            <Text style={styles.ratingText}>{rating}</Text>
            <Text style={styles.ratingText}>{specialty}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MastersCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16,
    padding: 18,
    paddingHorizontal: 0,
    borderRadius: 8,
    marginTop: 12,
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 35,
  },
  textContainer: {
    flex: 1,
    gap: 4,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: 1,
    marginTop: -8,
    color: '#404446',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 4,
    gap: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#404446',
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#404446',
  },

  phoneText: {
    fontSize: 16,
    color: '#404446',
  },
  starIcon: {
    fontSize: 16,
  },
});
