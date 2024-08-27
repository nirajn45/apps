import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const VerificationSuccessScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Congratulations</Text>
      <Text style={styles.subtitle}>Your account has been verified</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  subtitle: { fontSize: 16, marginBottom: 40 },
});

export default VerificationSuccessScreen;
