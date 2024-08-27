// import React, { useState } from 'react';
// import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import { launchCamera } from 'react-native-image-picker';
// import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';

// const App = () => {
//   const [imageUri, setImageUri] = useState(null);

//   const requestCameraPermission = async () => {
//     const result = await request(PERMISSIONS.ANDROID.CAMERA);

//     if (result === RESULTS.GRANTED) {
//       openCamera();
//     } else {
//       alert('Camera permission is required to take a photo.');
//     }
//   };

//   const openCamera = () => {
//     const options = {
//       mediaType: 'photo',
//       cameraType: 'back',
//       quality: 1,
//       includeBase64: false,
//     };

//     launchCamera(options, (response) => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.errorCode) {
//         console.log('ImagePicker Error: ', response.errorMessage);
//       } else if (response.assets && response.assets.length > 0) {
//         const uri = response.assets[0].uri;
//         setImageUri(uri);
//       }
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Camera App</Text>
//       <TouchableOpacity style={styles.button} onPress={requestCameraPermission}>
//         <Text style={styles.buttonText}>Take a Photo</Text>
//       </TouchableOpacity>
//       {imageUri && (
//         <Image source={{ uri: imageUri }} style={styles.image} />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//     padding: 20,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 30,
//     color: '#333',
//   },
//   button: {
//     backgroundColor: '#4CAF50',
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 10,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 2,
//     elevation: 5,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   image: {
//     width: 300,
//     height: 300,
//     marginTop: 20,
//     borderRadius: 15,
//     borderWidth: 2,
//     borderColor: '#ddd',
//   },
// });

// export default App;


import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import PhoneNumberScreen from './screens/PhoneNumberScreen';
import OTPVerificationScreen from './screens/OTPVerificationScreen';
import VerificationSuccessScreen from './screens/VerificationSuccessScreen';

const Stack = createStackNavigator();

const App = () => {
  const [confirmation, setConfirmation] = useState(null);  // To store the confirmation result
  const [phoneNumber, setPhoneNumber] = useState('');      // To store the phone number

  // Function to request OTP
  const requestOTP = async (phone) => {
    try {
      const confirm = await auth().signInWithPhoneNumber(phone);
      setConfirmation(confirm);
      setPhoneNumber(phone);
    } catch (error) {
      console.error('Error requesting OTP:', error);
    }
  };

  // Function to verify the OTP code
  const verifyOTP = async (code) => {
    try {
      await confirmation.confirm(code);
      return true;  // OTP verified successfully
    } catch (error) {
      console.error('Invalid OTP:', error);
      return false; // OTP verification failed
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PhoneNumber">
        <Stack.Screen name="PhoneNumber">
          {(props) => (
            <PhoneNumberScreen {...props} requestOTP={requestOTP} />
          )}
        </Stack.Screen>
        <Stack.Screen name="OTPVerification">
          {(props) => (
            <OTPVerificationScreen {...props} verifyOTP={verifyOTP} phoneNumber={phoneNumber} requestOTP={requestOTP} />
          )}
        </Stack.Screen>
        <Stack.Screen name="VerificationSuccess" component={VerificationSuccessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
