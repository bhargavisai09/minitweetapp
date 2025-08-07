

import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
      <Image
        source={require('../componets/assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Create an Account</Text>

      <Text style={styles.label}>Email Address</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password</Text>
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

      <View style={styles.loginRow}>
        <Text style={styles.bottomText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: wp('6%'),
    backgroundColor: '#fff',
  },
  logo: {
    width: wp('50%'),
    height: hp('20%'),
    alignSelf: 'center',
    marginBottom: hp('3%'),
    marginTop: hp('-10%'),
  },
  title: {
    fontSize: wp('7%'),
    fontWeight: 'bold',
    marginBottom: hp('4%'),
    color: '#7d7dff',
    textAlign: 'center',
  },
  label: {
    fontSize: wp('3.5%'),
    color: '#000',
    marginBottom: hp('1%'),
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('3%'),
    borderRadius: wp('2%'),
    marginBottom: hp('3%'),
    fontSize: wp('4%'),
  },
  button: {
    backgroundColor: '#7d7dff',
    paddingVertical: hp('2%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    marginBottom: hp('3%'),
    width:wp('36%'),
    marginLeft:wp('24%'),
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: wp('4.5%'),
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottomText: {
    color: '#000',
    fontSize: wp('3.8%'),
  },
  link: {
    color: '#1DA1F2',
    fontSize: wp('3.8%'),
  },
});
























