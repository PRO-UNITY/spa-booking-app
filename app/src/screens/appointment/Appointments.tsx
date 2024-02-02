import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import MastersCard from '../../../components/masters-card/MastersCard';
import RenderFooter from '../../../components/render-footer/RenderFooter';
import { getAppointments, getMasters } from '../../services/masters/masters';
import ClientAppointmentCards from '../../../components/appointment-card/ClientAppointmentsCard';

const Appointments = ({ navigation }: any) => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
  const isFocused = useIsFocused();

  // get appointment doctors
  useEffect(() => {
    getAppointments(page).then((res) => {
      console.log(res);
      setDoctors(res.results);
    });
  }, [isFocused]);

  //   const loadAppointments = async (currentPage: number) => {
  //     if (!hasMoreData || loading) {
  //       return;
  //     }
  //     setLoading(true);
  //     try {
  //       const response = await getAppointments(currentPage);

  //       if (response && response.results) {
  //         console.log(response);

  //         setDoctors((prevDoctors) => [...prevDoctors, ...response.results]);

  //         if (response.next) {
  //           // setPage(currentPage + 1);
  //           console.log('next page');
  //         } else {
  //           setHasMoreData(false);
  //         }
  //       } else {
  //         // Handle the case where response or results is undefined
  //         console.error(
  //           'Invalid response or results in getAppointments:',
  //           response
  //         );
  //       }
  //     } catch (error) {
  //       console.error('Error loading doctors:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  const renderItem = ({ item }: { item: any }) => (
    <ClientAppointmentCards
      key={item.id}
      name={item.doctor.first_name}
      rating={item.doctor.review}
      date={item.timestamp}
      time={item.timestamp}
      specialty={item.categories ? item.categories : 'Massajist'}
      imageUrl={
        item.doctor.avatar ||
        'https://t3.ftcdn.net/jpg/03/02/88/46/360_F_302884605_actpipOdPOQHDTnFtp4zg4RtlWzhOASp.jpg'
      }
      navigation={navigation}
      screen='MasterDetails'
      masterId={item.id}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.appointmentContent}>
        <Text style={styles.title}>Your Appointments</Text>
      </View>
      <FlatList
        data={doctors}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.1}
        // onEndReached={() => loadAppointments(page)}
        ListFooterComponent={
          <RenderFooter loading={loading} hasMoreData={hasMoreData} />
        }
      />
    </View>
  );
};

export default Appointments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: '#fff',
    paddingBottom: 16,
  },
  appointmentContent: {
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    marginTop: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#054A80',
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    marginBottom: 16,
  },
  searchBarInputContainer: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  footer: {
    marginVertical: 20,
  },
});
