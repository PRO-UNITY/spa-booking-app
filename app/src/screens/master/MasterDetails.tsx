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
import { getMasterById } from '../../services/masters/masters';
import MasterDetailCard from '../../../components/masters-card/MasterDetailCard';
import { grayColor, mainColor } from '../../utils/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import AppointmentCard from '../../../components/appointment-card/AppointmentCard';
// import ReadMoreModal from '../../../components/ReadMoreModal'; // Import the modal component

const MasterDetails = ({ route }: any) => {
  const masterId = route.params.masterId;
  const [master, setMaster] = React.useState<any>({});
  const [isModalVisible, setIsModalVisible] = useState(false); // State to manage modal visibility
  const [isAppointment, setIsAppointment] = useState(false); // State to manage modal visibility

  useEffect(() => {
    getMasterById(masterId).then((res) => {
      console.log(res);
      setMaster(res);
    });
  }, []);

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

  return (
    <View style={styles.container}>
      {master.avatar && (
        <>
          <ImageBackground
            source={{ uri: master.avatar }}
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
                    <Image
                      source={{ uri: master.avatar }}
                      style={styles.image}
                    />
                  )}
                  <View style={styles.modalContentHeaderInfo}>
                    <Text style={styles.nameModalText}>
                      {master.first_name}
                    </Text>
                    <Text style={styles.categoryModalText}>
                      {master.categories}
                    </Text>
                    <Text style={styles.phoneModalText}>{master.phone}</Text>
                  </View>
                  <View>
                    <Icon name='heart' color={mainColor} size={30} />
                  </View>
                </View>

                <View style={styles.modalContentTextContainer}>
                  <Text style={styles.modalContentText}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Adipisci libero minus perspiciatis, officiis sapiente
                    temporibus nobis, ullam nulla voluptate quod nam ea esse,
                    obcaecati voluptas harum molestiae commodi laudantium
                    numquam unde omnis. Maxime nisi illo earum veritatis tenetur
                    repellendus, dicta quis sequi nostrum aspernatur delectus
                    non alias? Debitis natus, et numquam sunt, quod nostrum
                    dolores nam harum eius quasi veritatis quaerat repudiandae
                  </Text>
                </View>
                <Pressable style={styles.closeButton} onPress={toggleModal}>
                  <Text style={styles.closeText}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </>
      )}
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
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },
  categoryText: {
    color: 'black',
    fontSize: 20,
    marginTop: 2,
  },
  phoneText: {
    color: 'black',
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
    flex: 0.5,
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
  },
  phoneModalText: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
  modalContentTextContainer: {
    marginTop: 8,
  },
  modalContentText: {
    fontSize: 16,
    lineHeight: 22,
  },
  closeButton: {
    backgroundColor: mainColor,
    padding: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 6,
  },
  closeText: {
    fontSize: 18,
    color: '#fff',
  },
});
