import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IntroStepper from './src/steppers/IntroStepper';
import RiderRegister from './src/authentications/RiderRegister';
import RiderLogin from './src/authentications/RiderLogin';
import CheckActive from './src/utils/CheckActive';
import RiderHome from './src/Features/RiderHome';
import WaitingPage from './src/utils/WaitingPage';
import TabController from './src/Features/TabController';
import PaymentDetails from './src/utils/PaymentDetails';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen styles={styles.container} name="introStepper" options={{
          headerShown: false
        }} component={IntroStepper} />
        <Stack.Screen styles={styles.container} name="RiderRegister" options={{
          headerShown: false
        }} component={RiderRegister} />
        <Stack.Screen styles={styles.container} name="RiderLogin" options={{
          headerShown: false
        }} component={RiderLogin} />
        <Stack.Screen styles={styles.container} name="CheckActive" options={{
          headerShown: false
        }} component={CheckActive} />
        <Stack.Screen styles={styles.container} name="TabController" options={{
          headerShown: false
        }} component={TabController} />
        <Stack.Screen styles={styles.container} name="WaitingPage" options={{
          headerShown: false
        }} component={WaitingPage} />

<Stack.Screen styles={styles.container} name="PaymentDetails" options={{
          headerShown: false
        }} component={PaymentDetails} />

      </Stack.Navigator>
    </NavigationContainer>
    // <View style={styles.container}>
    //   <IntroStepper />
    // </View>
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
