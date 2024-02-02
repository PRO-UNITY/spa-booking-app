// import React, { useEffect, useState } from 'react';
// import { StyleSheet, Text, View, FlatList } from 'react-native';
// import MastersCard from '../../../components/masters-card/MastersCard';
// import RenderFooter from '../../../components/render-footer/RenderFooter';
// import { getMasters } from '../../services/masters/masters';

// const Home = ({ navigation }: any) => {
//   const [doctors, setDoctors] = useState<any[]>([]);
//   const [page, setPage] = useState<number>(1);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [hasMoreData, setHasMoreData] = useState<boolean>(true);

//   useEffect(() => {
//     loadDoctors(page);
//   }, [page]);

//   const loadDoctors = async (currentPage: number) => {
//     if (!hasMoreData || loading) {
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await getMasters(currentPage);
//       console.log(response);

//       setDoctors((prevDoctors) => [...prevDoctors, ...response.results]);

//       if (response.next) {
//         // setPage(currentPage + 1);
//         console.log('next page');
//       } else {
//         setHasMoreData(false);
//       }
//     } catch (error) {
//       console.error('Error loading doctors:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderItem = ({ item }: { item: any }) => (
//     <MastersCard
//       key={item.id}
//       name={item.first_name}
//       rating={item.reviews}
//       specialty={item.categories ? item.categories : 'Massajist'}
//       imageUrl={
//         item.avatar ||
//         'https://t3.ftcdn.net/jpg/03/02/88/46/360_F_302884605_actpipOdPOQHDTnFtp4zg4RtlWzhOASp.jpg'
//       }
//       navigation={navigation}
//       screen='MasterDetails'
//       masterId={item.id}
//     />
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Categories</Text>
//       <FlatList
//         data={doctors}
//         renderItem={renderItem}
//         keyExtractor={(item, index) => index.toString()}
//         onEndReachedThreshold={0.1}
//         onEndReached={() => loadDoctors(page)}
//         ListFooterComponent={
//           <RenderFooter loading={loading} hasMoreData={hasMoreData} />
//         }
//       />
//     </View>
//   );
// };

// export default Home;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 25,
//     paddingHorizontal: 25,
//     backgroundColor: '#fff',
//     paddingBottom: 16,
//   },
//   title: {
//     fontSize: 24,
//     marginTop: 20,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     color: '#054A80',
//   },
//   searchBarContainer: {
//     backgroundColor: 'transparent',
//     borderBottomColor: 'transparent',
//     borderTopColor: 'transparent',
//     marginBottom: 16,
//   },
//   searchBarInputContainer: {
//     backgroundColor: '#e0e0e0',
//     borderRadius: 8,
//   },
//   footer: {
//     marginVertical: 20,
//   },
// });

import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MastersCard from '../../../components/masters-card/MastersCard';
import RenderFooter from '../../../components/render-footer/RenderFooter';
import { getMasters } from '../../services/masters/masters';
import { grayColor, mainColor } from '../../utils/colors';
import { SearchBar } from 'react-native-elements';

const Home = ({ navigation }: any) => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    'Massajist'
  );

  const categories = [
    'Massajist',
    'Dentist',
    'Psychologist',
    'Dermatologist',
    'Cardiologist',
  ];

  useEffect(() => {
    loadDoctors(page);
  }, [page, selectedCategory]);

  const loadDoctors = async (currentPage: number) => {
    if (!hasMoreData || loading) {
      return;
    }
    setLoading(true);
    try {
      // @ts-ignore
      const response = await getMasters(currentPage, selectedCategory);
      console.log(response);

      setDoctors((prevDoctors) => [...prevDoctors, ...response.results]);

      if (response.next) {
        // setPage(currentPage + 1);
        console.log('next page');
      } else {
        setHasMoreData(false);
      }
    } catch (error) {
      console.error('Error loading doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <MastersCard
      key={item.id}
      name={item.first_name}
      rating={item.reviews}
      specialty={item.categories ? item.categories : 'Massajist'}
      imageUrl={
        item.avatar ||
        'https://t3.ftcdn.net/jpg/03/02/88/46/360_F_302884605_actpipOdPOQHDTnFtp4zg4RtlWzhOASp.jpg'
      }
      navigation={navigation}
      screen='MasterDetails'
      masterId={item.id}
    />
  );

  const renderCategoryButton = (category: string, index: number) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.categoryButton,
        {
          backgroundColor: category === selectedCategory ? mainColor : '#fff',
          borderColor: category === selectedCategory ? mainColor : grayColor,
        },
      ]}
      onPress={() => handleCategoryPress(category)}
    >
      <Text
        style={[{ color: category === selectedCategory ? '#fff' : '#000' }]}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );

  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category);
    setDoctors([]);
    setPage(1);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder='Search Masters...'
        // value={searchQuery}
        platform='default'
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
        loadingProps={{}}
        showLoading={false}
        lightTheme={false}
        round={false}
        onClear={() => {}}
        onFocus={() => {}}
        onBlur={() => {}}
        //@ts-ignore
        onChangeText={(text: any) => handleSearch(text)}
      />
      <Text style={styles.title}>Categories</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
      >
        {categories.map((category, index) =>
          renderCategoryButton(category, index)
        )}
      </ScrollView>
      <FlatList
        data={doctors}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.1}
        onEndReached={() => loadDoctors(page)}
        ListFooterComponent={
          <RenderFooter loading={loading} hasMoreData={hasMoreData} />
        }
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    paddingHorizontal: 25,
    backgroundColor: '#fff',
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#054A80',
  },
  categoryScroll: {
    flexGrow: 0,
    height: 45,
  },

  categoryButton: {
    borderColor: grayColor,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderRadius: 22,
    marginRight: 4,
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
