import * as React from "react";
import { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Text,
  Image,
  View,
  Dimensions,
  Button,
  Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

export default function CheckMail({ navigation, route }) {
  const { email } = route.params;
  const [sendingText, setSendingText] = useState("PROCEED");
  const [otpError, setOtpError] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ otp }) => {
    setOtpError(false);
    setSendingText("Please Wait...");
    const { data } = await axios.get(
      `https://peaceful-citadel-48843.herokuapp.com/auth/rider/verify/otp?email=${email}&otp=${otp}`
    );
    setSendingText("PROCEED");

    if (data.error) {
      return setOtpError(true);
    }
    navigation.navigate("ResetPassword", { email, otp });
  };

  return (
    <ImageBackground
      source={require("../../assets/images/primary_bg_fill.png")}
      resizeMode="cover"
      style={styles.bgImage}
    >
      <View
        style={{
          marginTop: 60,
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            width: 100,
            height: 100,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/images/mail.png")}
            style={{
              height: 50,
              width: 65,
            }}
          />
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.message}>
          We have sent a verification code to your mail
        </Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </View>
          )}
          name="otp"
          defaultValue=""
        />
        {errors.otp && (
          <Text
            style={{
              color: "#F00",
            }}
          >
            OTP is required.
          </Text>
        )}

        {otpError && (
          <Text
            style={{
              color: "#F00",
            }}
          >
            Invalid OTP.
          </Text>
        )}

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={styles.appButtonContainer}
        >
          <Text style={styles.appButtonText}>{sendingText}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <Text style={styles.messageSecondary}>Resend Mail</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minWidth: "100%",
    padding: 24,
  },
  titleSectionProperties: {
    minWidth: "100%",
    padding: 22,
    marginTop: 22,
  },
  inputWrapper: {
    minWidth: "100%",
  },
  inputLable: {
    marginBottom: 10,
    color: "#c2c4c7",
  },
  messageSecondary: {
    marginTop: 10,
    color: "#484848",
  },
  message: {
    color: "#05abf7",
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    minWidth: "100%",
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#05abf7",
    padding: 14,
    marginBottom: 25,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 3,
  },
  primaryTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
    color: "#FFFFFF",
  },
  primarySubTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#FFFFFF",
  },
  bgImage: {
    flex: 1,
    justifyContent: "center",
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#02adfb",
    borderRadius: 6,
    paddingVertical: 14,
    paddingHorizontal: 40,
    marginTop: 20,
    marginBottom: 10,
  },
  appButtonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "500",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  secoundaryColorText: {
    color: "#02adfbdd",
    fontSize: 14,
  },
});
