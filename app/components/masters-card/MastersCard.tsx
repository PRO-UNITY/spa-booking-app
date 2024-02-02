import { Image, StyleSheet, Text, View, Platform } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CardProps } from '../../src/types/CardProp';
import { grayColor } from '../../src/utils/colors';

const MastersCard: React.FC<CardProps> = ({
  imageUrl,
  name,
  specialty,
  navigation,
  screen,
  masterId,
}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(screen, { masterId })}>
      <View style={styles.container}>
        {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.phoneText}>{specialty}</Text>
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
    width: 70,
    height: 70,
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
    alignItems: 'flex-start',
    gap: 8,
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
});
