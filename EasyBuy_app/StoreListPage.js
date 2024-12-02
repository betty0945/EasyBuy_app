import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image, SafeAreaView, TextInput } from 'react-native';
import { db } from './FirebaseConfig'; 
import { collection, getDocs } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 

const StorePage = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchStores = async () => {
    try {
      const storesCollection = collection(db, 'Stores');
      const storeSnapshot = await getDocs(storesCollection);
      const storeList = storeSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setStores(storeList);
    } catch (error) {
      console.error('Error fetching stores:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleStoreSelect = (storeId) => {
    navigation.navigate('ItemsPage', { storeId });
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
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="cart" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="home" size={25} color="black" />
        </TouchableOpacity>
        <TextInput 
          placeholder="Search for items" 
          style={styles.searchInput} 
        />
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="search" size={25} color="black" />
        </TouchableOpacity>
        
        {/* Account icon that navigates to AccountPage */}
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => navigation.navigate('AccountPage')} 
        >
          <Ionicons name="person" size={25} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="settings" size={25} color="black" 
          onPress={() => navigation.navigate('Settings')} />
          
        </TouchableOpacity>
      </View>

      {/* Loading state or store list */}
      {loading ? (
        <Text style={styles.loadingText}>Loading stores...</Text>
      ) : (
        <FlatList
          data={stores}
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
