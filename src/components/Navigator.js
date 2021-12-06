import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IntroStepper from "../steppers/IntroStepper";
import RiderRegister from "../authentications/RiderRegister";
import RiderLogin from "../authentications/RiderLogin";
import CheckActive from "../utils/CheckActive";
import RiderHome from "../Features/RiderHome";
import WaitingPage from "../utils/WaitingPage";
import TabController from "../Features/TabController";
import PaymentDetails from "../utils/PaymentDetails";
import RiderDocuments from "../authentications/RiderDocuments";
import ForgotPasswordMailView from "../utils/ForgotPasswordMailView";
import CheckMail from "../utils/CheckMail";
import ResetPassword from "../utils/ResetPassword";
import VerificationSuccess from "../utils/VerificationSuccess";
import { useAuth } from "../contexts/AuthContext";

const Stack = createNativeStackNavigator();

export default function Navigator() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user && (
          <>
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
          </>
        )}
        {user && user.status === "true" &&
        <Stack.Screen
          styles={styles.container}
          name="TabController"
          options={{
            headerShown: false,
          }}
          component={TabController}
        />}
        {user && user.status === "false" &&
        <Stack.Screen
          styles={styles.container}
          name="WaitingPage"
          options={{
            headerShown: false,
          }}
          component={WaitingPage}
        />}
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
