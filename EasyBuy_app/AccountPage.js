import React from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';

const AccountPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => {}}>
          <Text style={styles.headerText}>EasyBuy</Text>
        </Pressable>
        <View style={styles.profileContainer}>
          <View style={styles.profilePicture} />
          <Text style={styles.accountName}>John Doe</Text>
        </View>
        <Pressable onPress={() => {}}>
          <Text style={styles.headerText}>Settings</Text>
        </Pressable>
      </View>
      <Pressable style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Order History</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Change Address</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Payment Methods</Text>
      </Pressable>
    </View>
  );
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    height: height / 3,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  profileContainer: {
    alignItems: 'center',
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'gray',
    marginBottom: 10,
  },
  accountName: {
    fontSize: 16,
    color: 'black',
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: 'lightgray',
    marginVertical: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
  },
});

export default AccountPage;