import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrderHistoryPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Order History</Text>
      <Text style={styles.order}>Order #1: 2x Item A, 1x Item B - Scheduled for Delivery tommorrow at 3:15PM</Text>
      {/* Add real order history based on DB schema and what info is stored on an order */}
      <Text style={styles.order}>Order #2: 1x Item C, 3x Item D - Delivered 11/8 5:02PM</Text>
      <Text style={styles.order}>Order #3: 5x Item E - Delivered 11/5 3:38PM</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  order: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default OrderHistoryPage;