import {
  Image,
  StyleSheet,
  Text,
  View,
  Platform,
  Pressable,
} from 'react-native';
import React from 'react';
import { Master } from '../../src/types/Master';
import Icon from 'react-native-vector-icons/Ionicons';
import { mainColor } from '../../src/utils/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { addMasterToSaved } from '../../src/services/masters/masters';
import ReviewContentsModal from '../review-modal/ReviewModal';

//   import { addDoctorToSaved } from '../../services/doctor/doctor';
//   import ReviewContentsModal from '../review-modal/ReviewContentsModal';

const DoctorInfo: React.FC<Master> = ({
  avatar,
  first_name,
  about,
  review,
  doctorId,
  isFavorite,
  onBookmarkPress,
  content,
  navigation,
}) => {
  const [isSaved, setIsSaved] = React.useState(false);
  const [isModalVisible, setModalVisible] = React.useState(false);

  const handleSaveDoctor = () => {
    const data = {
      doctor: doctorId,
    };
    addMasterToSaved(data).then(() => {
      setIsSaved(true);
      onBookmarkPress();
    });
  };

  const handleViewComments = () => {
    setModalVisible(true);
    console.log('modal visible', isModalVisible);
    navigation.navigate('Reviews', { doctorId });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: avatar }} style={styles.image} />
      <Text style={styles.name}>{first_name}</Text>
      <View style={styles.contentContainer}>
        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.infoContainerText}>Save</Text>
            <TouchableOpacity
              onPress={() => handleSaveDoctor()}
              style={styles.infoCard}
            >
              <Icon
                name={isFavorite ? 'bookmark' : 'bookmark-outline'}
                size={24}
                color={mainColor}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.infoContainerText}>Experiences</Text>
            <View style={styles.infoCard}>
              <Text style={styles.infoCardText}>+10 year</Text>
            </View>
          </View>
          <View>
            <Text style={styles.infoContainerText}>Rating</Text>
            <Pressable onPress={handleViewComments} style={styles.infoCard}>
              <Icon name='star' size={16} color='gold' />
              <Text style={styles.infoCardText}>{review}</Text>
            </Pressable>
          </View>
        </View>
        <View>
          <Text style={styles.aboutTitle}>About Doctor</Text>
          <Text style={styles.about}>{about}</Text>
        </View>
      </View>
      {isModalVisible && (
        <ReviewContentsModal
          contents={content}
          isVisible={isModalVisible}
          onClose={() => setModalVisible(false)}
        />
      )}
    </View>
  );
};

export default DoctorInfo;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    marginVertical: 12,
    backgroundColor: '#ffffff4e',
    padding: 4,
    paddingBottom: 20,
    width: '100%',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 20,
    paddingHorizontal: 4,
  },
  infoContainerText: {
    fontSize: 16,
    color: '#979C9E',
    textAlign: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#054A80',
  },
  infoCard: {
    flexDirection: 'row',
    gap: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 60,
    marginTop: 10,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  infoCardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#054A80',
  },
  aboutTitle: {
    fontSize: 18,
    marginTop: 10,
  },
  about: {
    fontSize: 16,
    color: '#979C9E',
    marginTop: 10,
  },
});
