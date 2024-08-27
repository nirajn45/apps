import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const PhoneNumberScreen = ({ navigation, requestOTP }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleGetCode = async () => {
    await requestOTP(phoneNumber);
    navigation.navigate('OTPVerification');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>Verify your account details</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your mobile number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TouchableOpacity style={styles.button} onPress={handleGetCode}>
        <Text style={styles.buttonText}>GET CODE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  subtitle: { fontSize: 16, marginBottom: 40 },
  input: { width: '80%', borderBottomWidth: 1, marginBottom: 20, padding: 10 },
  button: { backgroundColor: '#FF4B5C', padding: 15, borderRadius: 5 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default PhoneNumberScreen;
