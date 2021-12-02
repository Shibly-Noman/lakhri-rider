import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import IntroStepper from "./src/steppers/IntroStepper";
import RiderRegister from "./src/authentications/RiderRegister";
import RiderLogin from "./src/authentications/RiderLogin";
import CheckActive from "./src/utils/CheckActive";
import RiderHome from "./src/Features/RiderHome";
import WaitingPage from "./src/utils/WaitingPage";
import TabController from "./src/Features/TabController";
import PaymentDetails from "./src/utils/PaymentDetails";
import RiderDocuments from "./src/authentications/RiderDocuments";
import ForgotPasswordMailView from "./src/utils/ForgotPasswordMailView";
import CheckMail from "./src/utils/CheckMail";
import ResetPassword from "./src/utils/ResetPassword";
import VerificationSuccess from "./src/utils/VerificationSuccess";
import auth from "./src/auth";

const Stack = createNativeStackNavigator();
export default function App() {
  const [status, setStatus] = useState(null);
  const [token, setToken] = useState(null);

  React.useEffect(async () => {
    const token = await auth.getToken();
    const status = await auth.getStatus();

    setToken(token);
    setStatus(status);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          styles={styles.container}
          name="introStepper"
          options={{
            headerShown: false,
          }}
          component={IntroStepper}
        />

        <Stack.Screen
          styles={styles.container}
          name="RiderRegister"
          options={{
            headerShown: false,
          }}
          component={RiderRegister}
        />
        <Stack.Screen
          styles={styles.container}
          name="RiderLogin"
          options={{
            headerShown: false,
          }}
          component={RiderLogin}
        />

        <Stack.Screen
          styles={styles.container}
          name="ForgotPasswordMailView"
          options={{
            headerShown: false,
          }}
          component={ForgotPasswordMailView}
        />

        <Stack.Screen
          styles={styles.container}
          name="CheckMail"
          options={{
            headerShown: false,
          }}
          component={CheckMail}
        />

        <Stack.Screen
          styles={styles.container}
          name="ResetPassword"
          options={{
            headerShown: false,
          }}
          component={ResetPassword}
        />
        <Stack.Screen
          styles={styles.container}
          name="TabController"
          options={{
            headerShown: false,
          }}
          component={TabController}
        />
        {status === "false" && (
          <Stack.Screen
            styles={styles.container}
            name="WaitingPage"
            options={{
              headerShown: false,
            }}
            component={WaitingPage}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
