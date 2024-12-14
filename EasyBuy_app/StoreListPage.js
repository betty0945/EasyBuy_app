import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image, SafeAreaView, TextInput } from 'react-native';
import { db } from './FirebaseConfig'; 
import { collection, getDocs } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 

const StorePage = () => {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const navigation = useNavigation();

  // Fetch stores from Firebase Firestore
  const fetchStores = async () => {
    try {
      const storesCollection = collection(db, 'Stores');
      const storeSnapshot = await getDocs(storesCollection);
      const storeList = storeSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setStores(storeList);
      setFilteredStores(storeList); // Initially set filtered stores to all stores
    } catch (error) {
      console.error('Error fetching stores:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  // Filter stores based on the search query
  useEffect(() => {
    if (searchQuery === '') {
      setFilteredStores(stores); // If search query is empty, show all stores
    } else {
      const filtered = stores.filter(store =>
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredStores(filtered); // Set filtered stores based on the search
    }
  }, [searchQuery, stores]);

  // Handle store selection to navigate to ItemsPage
  const handleStoreSelect = (storeId) => {
    navigation.navigate('ItemsPage', { storeId });
  };

  // Handle cart icon press to navigate to CartPage
  const handleCartPress = () => {
    navigation.navigate('Cart'); // Navigate to CartPage
  };

  const renderStoreItem = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => handleStoreSelect(item.id)}
      style={styles.store}
    >
      <Image source={{ uri: item.imageURL }} style={styles.storeImage} />
      <Text style={styles.storeName}>{item.name}</Text>
      <Text style={styles.storeDescription}>{item.location}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navBar}>
        {/* Cart icon */}
        <TouchableOpacity style={styles.iconButton} onPress={handleCartPress}>
          <Ionicons name="cart" size={25} color="black" />
        </TouchableOpacity>
        {/* Home icon */}
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="home" size={25} color="black" />
        </TouchableOpacity>

        {/* Search Input */}
        <TextInput 
          placeholder="Search for stores or items" 
          style={styles.searchInput}
          value={searchQuery} // Bind the input value to the search query
          onChangeText={setSearchQuery} // Update the search query when the user types
        />
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="search" size={25} color="black" />
        </TouchableOpacity>

        {/* Account icon to navigate to AccountPage */}
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => navigation.navigate('AccountPage')} 
        >
          <Ionicons name="person" size={25} color="black" />
        </TouchableOpacity>

        {/* Settings icon to navigate to Settings */}
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => navigation.navigate('Settings')} 
        >
          <Ionicons name="settings" size={25} color="black" />
        </TouchableOpacity>
      </View>

      {/* Loading state or store list */}
      {loading ? (
        <Text style={styles.loadingText}>Loading stores...</Text>
      ) : (
        <FlatList
          data={filteredStores}
          renderItem={renderStoreItem}
          keyExtractor={(item) => item.id}
          numColumns={2} 
          columnWrapperStyle={styles.columnWrapper} 
          ListEmptyComponent={<Text>No stores available</Text>}
        />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', 
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: '#fceade',
  },
  iconButton: {
    padding: 8,
  },
  searchInput: {
    flex: 1,
    height: 38, 
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5, 
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: 'gray',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  store: {
    flex: 0.48, 
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
  },
  storeImage: {
    width: '100%',
    height: 120,
    borderRadius: 5,
  },
  storeName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  storeDescription: {
    fontSize: 12,
    marginTop: 4,
    color: 'gray',
  },
});

export default StorePage;
