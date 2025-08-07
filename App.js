






import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignupScreen from './src/componets/SignUpScreen';
import LoginScreen from './src/componets/LoginScreen';
import HomeScreen from './src/componets/HomeScreen';
import { onAuthStateChanged } from 'firebase/auth';
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // ✅ Add this
import { auth } from './src/componets/Firebase';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FF0202" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {user ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              
            </>
          ) : (
            <>
              
             
              <Stack.Screen name="Signup" component={SignupScreen} />
               <Stack.Screen name="Login" component={LoginScreen} />
            

            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
