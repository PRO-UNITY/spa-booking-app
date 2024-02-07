import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
} from 'react-native';
import {
  addMasterToSaved,
  getMasterById,
} from '../../services/masters/masters';
import MasterDetailCard from '../../../components/masters-card/MasterDetailCard';
import { grayColor, mainColor } from '../../utils/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import AppointmentCard from '../../../components/appointment-card/AppointmentCard';

const MasterDetails = ({ route }: any) => {
  const masterId = route.params.masterId;
  const [master, setMaster] = React.useState<any>({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAppointment, setIsAppointment] = useState(false);
  const [isSaved, setIsSaved] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);

  useEffect(() => {
    getMasterById(masterId).then((res) => {
      setMaster(res);
      setIsFavorite(res.is_favorite);
    });
  }, []);

  const handleMasterSave = () => {
    const data = {
      doctor: masterId,
    };
    addMasterToSaved(data)
      .then(() => {
        setIsSaved(true);
        console.log('saved');
      })
      .catch((error) => {
        console.error('Error saving master:', error);
      });
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    console.log(isModalVisible);
    console.log(123);
  };

  const handleAppointment = () => {
    console.log('hello');
  };

  const closeAppointmentModal = () => {
    setIsAppointment(false);
  };

  console.log('hello', master.first_name);

  const renderRatingStars = () => {
    const filledStars = Math.floor(master.reviews);
    const remainingStars = 5 - filledStars;
    let stars = [];
    for (let i = 0; i < filledStars; i++) {
      stars.push(<Icon key={i} name='star' color={mainColor} size={30} />);
    }
    for (let j = 0; j < remainingStars; j++) {
      stars.push(
        <Icon
          key={filledStars + j}
          name='star-outline'
          color={mainColor}
          size={30}
        />
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <>
        <ImageBackground
          source={{
            uri: master.avatar
              ? master.avatar
              : 'https://img.freepik.com/free-photo/handsome-young-man-with-arms-crossed-white-background_23-2148222620.jpg',
          }}
          style={styles.backgroundImage}
        >
          <View style={styles.infoContainer}>
            <Text style={styles.nameText}>Name: {master.first_name}</Text>
            <Text style={styles.categoryText}>
              Speciality {master.categories}
            </Text>
            <Text style={styles.phoneText}>Phone: {master.phone}</Text>
            <Pressable
              style={styles.appointmentButton}
              onPress={() => setIsAppointment(!isAppointment)}
            >
              <Text style={styles.readButtonText}>Appointment</Text>
            </Pressable>
            <Pressable style={styles.readMoreButton} onPress={toggleModal}>
              <Text style={styles.readButtonText}>Read More...</Text>
            </Pressable>
          </View>
        </ImageBackground>
        {/* appointment modal */}
        <Modal
          visible={isAppointment}
          transparent={true}
          animationType='slide'
          onRequestClose={toggleModal}
        >
          <AppointmentCard
            masterId={masterId}
            onClose={closeAppointmentModal}
          />
        </Modal>

        {/* Modal */}
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType='slide'
          onRequestClose={toggleModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalContentHeader}>
                {master.avatar && (
                  <Image source={{ uri: master.avatar }} style={styles.image} />
                )}
                <View style={styles.modalContentHeaderInfo}>
                  <Text style={styles.nameModalText}>{master.first_name}</Text>
                  <Text style={styles.categoryModalText}>
                    {master.categories}
                  </Text>
                  <Text style={styles.phoneModalText}>{master.phone}</Text>
                </View>
                <Pressable onPress={() => handleMasterSave()}>
                  {/* <Icon name='heart' color={mainColor} size={30} /> */}
                  <Icon
                    name={isFavorite ? 'heart' : 'heart-outline'}
                    size={24}
                    color={mainColor}
                  />
                </Pressable>
              </View>

              <View style={styles.modalContentTextContainer}>
                <View style={styles.raitingContainer}>
                  <Text style={styles.modalContentText}>Raiting: </Text>
                  <View style={styles.raitingContainer}>
                    {renderRatingStars()}
                  </View>
                </View>
                <Text style={styles.categoryModalText}>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Commodi error voluptatum consequatur deleniti ducimus cumque
                  doloribus minus architecto eligendi qui laboriosam sapiente
                  perferendis nemo, sit sunt id veritatis illum magni quod iure!
                  Doloribus, deleniti ut recusandae id, minus itaque iure
                </Text>
              </View>
              <Pressable style={styles.closeButton} onPress={toggleModal}>
                <Text style={styles.closeText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </>
    </View>
  );
};

export default MasterDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    padding: 20,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  infoContainer: {
    alignItems: 'flex-start',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  nameText: {
    color: 'red',
    fontSize: 30,
    fontWeight: 'bold',
  },
  categoryText: {
    color: 'red',
    fontSize: 20,
    marginTop: 2,
  },
  phoneText: {
    color: 'red',
    fontSize: 18,
    marginTop: 4,
  },
  appointmentButton: {
    backgroundColor: mainColor,
    padding: 8,
    paddingHorizontal: 28,
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 6,
  },
  readMoreButton: {
    backgroundColor: grayColor,
    padding: 10,
    paddingHorizontal: 28,
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 6,
  },
  readButtonText: {
    color: 'white',
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 30,
    elevation: 5,
  },
  modalContentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalContentHeaderInfo: {
    paddingHorizontal: 14,
    flex: 1,
  },
  nameModalText: {
    fontSize: 20,
  },
  categoryModalText: {
    fontSize: 16,
    color: 'gray',
    marginTop: 2,
    marginVertical: 10,
  },
  phoneModalText: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
  modalContentTextContainer: {
    marginTop: 18,
  },
  modalContentText: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 22,
  },
  closeButton: {
    backgroundColor: mainColor,
    padding: 12,
    alignItems: 'center',
    borderRadius: 6,
    marginVertical: 14,
  },
  closeText: {
    fontSize: 18,
    color: '#fff',
  },
  raitingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
