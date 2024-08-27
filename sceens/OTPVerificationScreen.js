import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const OTPVerificationScreen = ({ navigation, verifyOTP, phoneNumber, requestOTP }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(30);  // Initial countdown timer set to 30 seconds
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  // Countdown Timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsResendDisabled(false);
    }
  }, [timer]);

  const handleVerify = async () => {
    const isVerified = await verifyOTP(otp);
    if (isVerified) {
      navigation.navigate('VerificationSuccess');
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    await requestOTP(phoneNumber);  // Request a new OTP
    setTimer(30);                   // Reset the timer to 30 seconds
    setIsResendDisabled(true);      // Disable the Resend button
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verification Code</Text>
      <Text style={styles.subtitle}>Please enter the code sent to {phoneNumber}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        keyboardType="number-pad"
        value={otp}
        onChangeText={setOtp}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>VERIFY</Text>
      </TouchableOpacity>

      <View style={styles.resendContainer}>
        {isResendDisabled ? (
          <Text style={styles.timerText}>Resend code in {timer} seconds</Text>
        ) : (
          <TouchableOpacity onPress={handleResendOTP}>
            <Text style={styles.resendText}>Resend Code</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  subtitle: { fontSize: 16, marginBottom: 40 },
  input: { width: '80%', borderBottomWidth: 1, marginBottom: 20, padding: 10 },
  error: { color: 'red', marginBottom: 10 },
  button: { backgroundColor: '#FF4B5C', padding: 15, borderRadius: 5 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  resendContainer: { marginTop: 20 },
  timerText: { color: 'gray', fontSize: 14 },
  resendText: { color: '#FF4B5C', fontWeight: 'bold', fontSize: 14 },
});

export default OTPVerificationScreen;
