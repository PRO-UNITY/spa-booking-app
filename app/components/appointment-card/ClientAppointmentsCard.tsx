// import { Image, StyleSheet, Text, View, Platform } from 'react-native';
// import React from 'react';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import { CardProps } from '../../src/types/CardProp';

// const ClientAppointmentCards: React.FC<CardProps> = ({
//   imageUrl,
//   name,
//   specialty,
//   navigation,
//   screen,
//   masterId,
// }) => {
//   return (
//     <TouchableOpacity onPress={() => navigation.navigate(screen, { masterId })}>
//       <View style={styles.container}>
//         {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
//         <View style={styles.textContainer}>
//           <Text style={styles.nameText}>{name}</Text>
//           <Text style={styles.phoneText}>{specialty}</Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };

// export default ClientAppointmentCards;

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     gap: 16,
//     padding: 18,
//     paddingHorizontal: 0,
//     borderRadius: 8,
//     marginTop: 12,
//   },
//   image: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//   },
//   textContainer: {
//     flex: 1,
//     gap: 4,
//     justifyContent: 'center',
//     alignItems: 'flex-start',
//     borderBottomColor: '#e0e0e0',
//     borderBottomWidth: 1,
//     marginTop: -8,
//     color: '#404446',
//   },
//   ratingContainer: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     gap: 8,
//   },

//   nameText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 8,
//     color: '#404446',
//   },

//   phoneText: {
//     fontSize: 16,
//     color: '#404446',
//   },
// });

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Platform, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { mainColor } from '../../src/utils/colors';
import moment from 'moment';
import { getChatAppointment } from '../../src/services/chat/chat';

interface CardProps {
  name?: string;
  specialty?: string;
  rating?: number;
  imageUrl?: string;
  phone?: string;
  icon?: string;
  iconColor?: any;
  navigation?: any;
  screen?: string;
  masterId?: any;
  date?: any;
  time?: any;
  status?: any;
  onCancelConfirmation?: any;
  onRescheduleAppointment?: any;
}

const ClientAppointmentCards: React.FC<CardProps> = ({
  imageUrl,
  name,
  specialty,
  icon,
  iconColor,
  masterId,
  date,
  time,
  status,
  onCancelConfirmation,
  onRescheduleAppointment,
  navigation,
}) => {
  const goChat = () => {
    console.log('hello');
    getChatAppointment(masterId)
      .then((res) => {
        console.log(res);
        navigation.navigate('Chat', { userId: res.id });
      })
      .catch((err) => console.log(err));
  };

  return (
    <TouchableOpacity>
      <View style={styles.main}>
        <View style={styles.cardTitle}>
          <Text style={styles.textTitle}>Specialist</Text>
          <View style={styles.iconsContainer}>
            {status === 'IN_QUEUE' && (
              <TouchableOpacity onPress={goChat} style={styles.chatButton}>
                <Icon name='chatbox' size={16} color='white' />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => onRescheduleAppointment(masterId)}
              style={styles.rescheduleButton}
            >
              <Icon name='reload' size={16} color='white' />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onCancelConfirmation(masterId)}
              style={styles.cancelButton}
            >
              <Icon name='close' size={16} color='white' />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container}>
          {imageUrl && (
            <Image source={{ uri: imageUrl }} style={styles.image} />
          )}
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>Name: {name}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>Specialty: {specialty}</Text>
            </View>
          </View>
        </View>

        <View style={styles.dateContainer}>
          <View style={styles.dateStatusTexts}>
            <Text>
              Date:{' '}
              <Text style={styles.dateText}>
                {moment(date, 'YYYY-MM-DD - HH:mm:ss').format('YYYY-MM-DD')}
              </Text>{' '}
            </Text>
            <Text>
              Time:{' '}
              <Text style={styles.dateText}>
                {moment(time, 'YYYY-MM-DD - HH:mm:ss').format('HH:mm')}
              </Text>{' '}
            </Text>
            <View style={styles.statusContainer}>
              <Icon
                name={icon || ''}
                style={[styles.starIcon, { color: iconColor }]}
              />
              <Text style={styles.textBold}>{status}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ClientAppointmentCards;

const styles = StyleSheet.create({
  main: {
    position: 'relative',
    flexDirection: 'column',
    borderRadius: 8,
    marginTop: 16,
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 8,
    backgroundColor: 'white',
    borderColor: '#e0e0e0',
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  cardTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  textTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: mainColor,
  },
  iconsContainer: {
    flexDirection: 'row',
    gap: 8,
    padding: 8,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  dateContainer: {
    flexDirection: 'row',
    gap: 8,
    alignContent: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  dateStatusTexts: {
    gap: 8,
  },
  cancelButton: {
    backgroundColor: '#DE1621',
    padding: 8,
    borderRadius: 8,
  },
  chatButton: {
    backgroundColor: '#3498db',
    padding: 8,
    borderRadius: 8,
  },
  rescheduleButton: {
    backgroundColor: '#9c88ff',
    padding: 8,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: 'white',
    textAlign: 'left',
    fontSize: 16,
  },
  textContainer: {
    gap: 4,
    alignItems: 'flex-start',
    marginTop: -8,
    color: '#404446',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
  starIcon: {
    fontSize: 16,
  },
  phoneText: {
    color: '#054A80',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateText: {
    maxWidth: 150,
    overflow: 'hidden',
    fontSize: 14,
    color: '#404446',
  },
  timeText: {
    maxWidth: 150,
    overflow: 'hidden',
    fontSize: 14,
    color: '#404446',
  },
  textBold: {
    fontWeight: 'bold',
  },
});
