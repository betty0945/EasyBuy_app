import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList, Image, TextInput, TouchableOpacity,SafeAreaView } from 'react-native';

const stores = [
  { id: '1', name: 'ALDI', distance: '2.5 mile', logo: 'https://corporate.aldi.us/fileadmin/fm-dam/logos/ALDI_2017.png' },
  { id: '2', name: 'Walmart', distance: '3.2 mile', logo: 'https://logocreator.io/wp-content/uploads/2023/11/walmart-logo-vector.png' },
  { id: '3', name: 'Walgreens', distance: '5 mile', logo: 'https://robclarke.com/wp-content/uploads/2022/10/Walgreens_2-1.jpg' },
  { id: '1', name: 'ALDI', distance: '2.5 mile', logo: 'https://corporate.aldi.us/fileadmin/fm-dam/logos/ALDI_2017.png' },
  { id: '2', name: 'Walmart', distance: '3.2 mile', logo: 'https://logocreator.io/wp-content/uploads/2023/11/walmart-logo-vector.png' },
  { id: '3', name: 'Walgreens', distance: '5 mile', logo: 'https://robclarke.com/wp-content/uploads/2022/10/Walgreens_2-1.jpg' },
  { id: '1', name: 'ALDI', distance: '2.5 mile', logo: 'https://corporate.aldi.us/fileadmin/fm-dam/logos/ALDI_2017.png' },
  { id: '2', name: 'Walmart', distance: '3.2 mile', logo: 'https://logocreator.io/wp-content/uploads/2023/11/walmart-logo-vector.png' },
  { id: '3', name: 'Walgreens', distance: '5 mile', logo: 'https://robclarke.com/wp-content/uploads/2022/10/Walgreens_2-1.jpg' },
];

export default function StoreListPage() {
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    // Implement search functionality here
    console.log('Search:', search);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <Text style={styles.title}>EasyBuy</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search stores..."
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={stores}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.storeItem}>
            <Image source={{ uri: item.logo }} style={styles.storeLogo} />
            <View>
              <Text style={styles.storeName}>{item.name}</Text>
              <Text style={styles.storeDistance}>{item.distance}</Text>
            </View>
          </View>
        )}
      />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', 
  },
  container: {
    flex: 1,
    backgroundColor: '#FCEADE',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  searchButton: {
    padding: 10,
    backgroundColor: '#25CED1',
    borderRadius: 5,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  storeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  storeLogo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  storeDistance: {
    fontSize: 14,
    color: '#666',
  },
});