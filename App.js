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
import RiderDocuments from './src/authentications/RiderDocuments';
import ForgotPasswordMailView from './src/utils/ForgotPasswordMailView';
import CheckMail from './src/utils/CheckMail';
import ResetPassword from './src/utils/ResetPassword';
import VerificationSuccess from './src/utils/VerificationSuccess';


import * as SecureStore from "expo-secure-store";

const Stack = createNativeStackNavigator();
export default function App() {
  const [token, setToken] = React.useState(null);
  const [isAuth, setIsAuth] = React.useState(false);
  React.useEffect(async () => {
    const token = await SecureStore.getItemAsync("token");
    const tempCarier = await SecureStore.getItemAsync("authenticRider");
    const isAuthencateRider = tempCarier ? JSON.parse(tempCarier) : null;
    console.log('this is it ', typeof isAuthencateRider);
    if (token && isAuthencateRider) {
      setToken(token);
      setIsAuth(true);
    }
  }, []);

  return (
    <NavigationContainer>
      {isAuth == true && (
        <Stack.Navigator>


          <Stack.Screen styles={styles.container} name="TabController" options={{
            headerShown: false
          }} component={TabController} />

          <Stack.Screen styles={styles.container} name="RiderLogin" options={{
            headerShown: false
          }} component={RiderLogin} />

          <Stack.Screen styles={styles.container} name="WaitingPage" options={{
            headerShown: false
          }} component={WaitingPage} />

          <Stack.Screen styles={styles.container} name="PaymentDetails" options={{
            headerShown: false
          }} component={PaymentDetails} />

          <Stack.Screen styles={styles.container} name="introStepper" options={{
            headerShown: false
          }} component={IntroStepper} />

        </Stack.Navigator>
      )}
      {(isAuth == false || isAuth == null) && (
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

          

          {/* <Stack.Screen styles={styles.container} name="RiderDocuments" options={{
            headerShown: false
          }} component={RiderDocuments} /> */}


          <Stack.Screen styles={styles.container} name="ForgotPasswordMailView" options={{
            headerShown: false
          }} component={ForgotPasswordMailView} />
          
<Stack.Screen styles={styles.container} name="CheckMail" options={{
            headerShown: false
          }} component={CheckMail} />

<Stack.Screen styles={styles.container} name="ResetPassword" options={{
            headerShown: false
          }} component={ResetPassword} />

          {/* <Stack.Screen styles={styles.container} name="CheckActive" options={{
          headerShown: false
        }} component={CheckActive} /> */}

          <Stack.Screen styles={styles.container} name="TabController" options={{
            headerShown: false
          }} component={TabController} />

          <Stack.Screen styles={styles.container} name="WaitingPage" options={{
            headerShown: false
          }} component={WaitingPage} />
          <Stack.Screen styles={styles.container} name="VerificationSuccess" options={{
            headerShown: false
          }} component={VerificationSuccess} />

          <Stack.Screen styles={styles.container} name="PaymentDetails" options={{
            headerShown: false
          }} component={PaymentDetails} />



        </Stack.Navigator>
      )}

    </NavigationContainer>
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
