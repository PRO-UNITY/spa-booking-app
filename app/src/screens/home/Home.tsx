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
import { getFilteredMasters, getMasters } from '../../services/masters/masters';
import { grayColor, mainColor } from '../../utils/colors';
import { SearchBar } from 'react-native-elements';
import { getCategories } from '../../services/categories/categories';

const Home = ({ navigation }: any) => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    'All'
  );
  // const [categories, setCategories] = useState<any[]>([{}]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    loadDoctors(page);
  }, [page, selectedCategory]);

  useEffect(() => {
    getCategories().then((res) => {
      setCategories([{ name: 'All' }, ...res]);
    });
  }, []);
  const loadDoctors = async (currentPage: number) => {
    if (!hasMoreData || loading) {
      return;
    }
    setLoading(true);
    try {
      // @ts-ignore
      const response = await getMasters(currentPage);
      console.log(response.results);
      setDoctors((prevDoctors) => [
        ...prevDoctors,
        ...(response?.results || []),
      ]);
      if (response.next) {
        setPage(currentPage + 1);
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
      specialty={item.categories}
      icon='star'
      iconColor={mainColor}
      phone={item.phone}
      imageUrl={
        item.avatar
          ? item.avatar
          : 'https://thumbs.dreamstime.com/b/happy-african-american-man-showing-thumbs-up-gesture-satisfied-client-young-glasses-like-look-camera-smiling-male-student-165241106.jpg'
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
        {/* @ts-ignore */}
        {category.name}
      </Text>
    </TouchableOpacity>
  );

  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category);
    // setDoctors([]);
    setPage(1);
  };

  const handleSearch = (text: string) => {
    getFilteredMasters(text).then((res: any) => {
      setDoctors(res.results);
    });
    setSearchQuery(text);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder='Search Masters...'
        value={searchQuery}
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
    color: mainColor,
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
