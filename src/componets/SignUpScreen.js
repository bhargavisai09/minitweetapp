// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
// } from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from './Firebase';

// const SignUpScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [emailError, setEmailError] = useState('');

//   const validateEmail = (email) => {
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return regex.test(email);
//   };

//   // const handleSignUp = () => {
//   //   if (!validateEmail(email)) {
//   //     setEmailError('Invalid Email ID');
//   //     return;
//   //   }
//   //   setEmailError('');
//   //   // Proceed with sign-up logic
//   // };
//   const handleSignUp = async () => {
//   if (!validateEmail(email)) {
//     setEmailError('Invalid Email ID');
//     return;
//   }
//   setEmailError('');

//   try {
//     await createUserWithEmailAndPassword(auth, email, password);
//     console.log('User registered successfully!');
//     navigation.navigate('Login');
//   } catch (error) {
//     console.log('Signup error:', error.message);
//     setEmailError(error.message); // show Firebase error
//   }
// };


//   return (
//     <View style={styles.container}>
//       {/* Logo */}
//       <Image
//         source={require('../componets/assets/logo.png')}
//         style={styles.logo}
//         resizeMode="contain"
//       />

//       {/* Title */}
//       <Text style={styles.heading}>Let's get started!</Text>

//       {/* Email */}
//       <Text style={styles.label}>Email Address</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email Address"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         autoCapitalize="none"
//       />
//       {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

//       {/* Password */}
//       <Text style={styles.label}>Password</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />

//       {/* Signup Button */}
//       {/* <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('Login')}>
//         <Text style={styles.signupText}>Sign up</Text>
//       </TouchableOpacity> */}
//       <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
//   <Text style={styles.signupText}>Sign up</Text>
// </TouchableOpacity>


//       {/* OR */}
//       <Text style={styles.or}>or sign up with</Text>

//       {/* Social buttons */}
//       <View style={styles.socialRow}>
//         <TouchableOpacity style={[styles.socialBtn, { backgroundColor: '#3b5998' }]}>
//           <Text style={styles.socialText}>f</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={[styles.socialBtn, { backgroundColor: '#db4437' }]}>
//           <Text style={styles.socialText}>G</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={[styles.socialBtn, { backgroundColor: '#000' }]}>
//           <Text style={styles.socialText}>x</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Footer */}
//       <Text style={styles.footer}>
//         Already an account?{' '}
//         <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
//           Log in
//         </Text>
//       </Text>
//     </View>
//   );
// };

// export default SignUpScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: wp('7%'),
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   logo: {
//     width: wp('65%'),
//     height: hp('22%'),
//     marginTop: hp('4%'),
//     marginBottom: hp('3%'),
     
//   },
//   heading: {
//     fontSize: wp('5.5%'),
//     fontWeight: '700',
//     color: '#1c1c1c',
//     marginBottom: hp('4%'),
//      marginTop: hp('-4%'),
//   },
//   label: {
//   alignSelf: 'flex-start',
//   marginBottom: hp('1%'),
//   fontSize: wp('4%'),
//   fontWeight: '500',
//   color: '#333',
//   marginTop: hp('1.5%'),
// },

//   input: {
//     width: '100%',
//     padding: wp('4%'),
//     borderRadius: wp('3%'),
//     backgroundColor: '#f1f1f1',
//     marginBottom: hp('2%'),
//     fontSize: wp('4%'),
//   },
//   error: {
//     color: 'red',
//     alignSelf: 'flex-start',
//     marginBottom: hp('1.5%'),
//     fontSize: wp('3.5%'),
//   },
//   signupButton: {
//     backgroundColor: '#6C63FF',
//     paddingVertical: hp('1.8%'),
//     borderRadius: wp('3%'),
//     width: '50%',
//     alignItems: 'center',
//     marginTop: hp('1%'),
//     marginBottom: hp('3%'),
//   },
//   signupText: {
//     color: '#fff',
//     fontSize: wp('4.5%'),
//     fontWeight: '600',
//   },
//   or: {
//     fontSize: wp('3.8%'),
//     color: '#000',
//     marginBottom: hp('2%'),
//   },
//   socialRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '70%',
//     marginBottom: hp('4%'),
//   },
//   socialBtn: {
//     width: wp('13%'),
//     height: wp('13%'),
//     borderRadius: wp('6.5%'),
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   socialText: {
//   color: '#fff', // 👈 makes text white
//   fontSize: wp('5%'),
//   fontWeight: 'bold',
// },
//   footer: {
//     color: '#000',
//     fontSize: wp('3.5%'),
//   },
//   link: {
//     color: '#6C63FF',
//     fontWeight: '600',
//   },
// });
















import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    if (!email || !password) {
      return Alert.alert('Enter email and password');
    }

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // ✅ Save user info to Firestore in 'users' collection
      await firestore().collection('users').doc(user.uid).set({
        email: user.email,
        userId: user.uid,
        createdAt: firestore.FieldValue.serverTimestamp()
      });

      Alert.alert('Signup successful!');
      navigation.replace('Login');
    } catch (err) {
      console.error(err);
      Alert.alert('Signup failed', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity onPress={handleSignup} style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.replace('Login')}>
        <Text style={styles.loginLink}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#1DA1F2',
    textAlign: 'center',
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1DA1F2',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginLink: {
    color: '#555',
    textAlign: 'center',
    marginTop: 12,
  },
});



































