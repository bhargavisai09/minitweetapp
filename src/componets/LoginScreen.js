

import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity, Image
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './Firebase'; // ✅ Adjust the path if needed

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user.email);
      navigation.replace('Home');
    } catch (error) {
      console.log('Login error:', error.message);
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../componets/assets/logo.png')} // 🔁 Replace with your logo path
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Welcome back!</Text>

      {/* Email Input */}
      <Text style={styles.label}>Email Address</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="sam@gmail.com"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <Icon name="chevron-down" size={wp('5%')} color="#ccc" />
      </View>

      {/* Password Input */}
      <View style={styles.passwordRow}>
        <Text style={styles.label}>Password</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
  <Text style={styles.forgotText}>Forgot Password?</Text>
</TouchableOpacity>

      </View>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureText}
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          <Icon
            name={secureText ? 'eye-off-outline' : 'eye-outline'}
            size={wp('5%')}
            color="#ccc"
          />
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
      >
        <Text style={styles.LoginButtonText}>Log in</Text>
      </TouchableOpacity>

      {/* Divider */}
      <Text style={styles.or}>or log in with</Text>

      {/* Social Buttons */}
      <View style={styles.socialRow}>
        <TouchableOpacity style={[styles.socialBtn, { backgroundColor: '#3b5998' }]}>
          <Text style={styles.socialText}>f</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.socialBtn, { backgroundColor: '#db4437' }]}>
          <Text style={styles.socialText}>G</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.socialBtn, { backgroundColor: '#000' }]}>
          <Text style={styles.socialText}>x</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Text */}
      <View style={{ flexDirection: 'row', marginTop: hp('2%') }}>
        <Text style={styles.bottomText}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.link}>Get started!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: wp('6%'),
    backgroundColor: '#fff',
  },
  logo: {
    width: wp('65%'),
    height: hp('22%'),
    marginTop: hp('4%'),
    marginBottom: hp('3%'),
  },
  title: {
    fontSize: wp('6%'),
    fontWeight: '700',
    color: '#333',
    marginBottom: hp('3%'),
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: wp('4%'),
    color: '#000',
    marginBottom: hp('1%'),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: wp('2%'),
    paddingHorizontal: wp('3%'),
    marginBottom: hp('2%'),
    width: '100%',
  },
  input: {
    flex: 1,
    height: hp('6%'),
    fontSize: wp('4%'),
    color: '#333',
  },
  passwordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  forgot: {
    fontSize: wp('3.5%'),
    color: '#7d7dff',
  },
  loginButton: {
    backgroundColor: '#5f6fff',
    paddingVertical: hp('1.8%'),
    borderRadius: wp('2%'),
    width: '50%',
    alignItems: 'center',
    marginTop: hp('2%'),
  },
  LoginButtonText: {
    color: '#fff',
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
  },
  or: {
    marginVertical: hp('2%'),
    fontSize: wp('3.5%'),
    color: '#000',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginBottom: hp('4%'),
  },
  socialBtn: {
    width: wp('13%'),
    height: wp('13%'),
    borderRadius: wp('6.5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialText: {
    color: '#fff',
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
  bottomText: {
    fontSize: wp('3.5%'),
    color: '#000',
  },
  link: {
    color: '#5f6fff',
    fontWeight: '500',
  },
});




