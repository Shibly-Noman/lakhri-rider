import * as React from 'react';
import { useEffect } from 'react';
import { StyleSheet, ScrollView, TextInput, TouchableOpacity, ImageBackground, Text, Image, View, Dimensions, Button, Alert } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';

export default function ResetPassword({ navigation }) {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async ({ password, rePassword }) => {
    console.log(password, rePassword);

    //    if(email){
    //        navigation.navigate('CheckMail');
    //    }
  }
  return (
    <ImageBackground source={require('../../assets/images/primary_bg_fill.png')} resizeMode="cover" style={styles.bgImage}>



      <View style={styles.container}>







        <Image source={require('../../assets/images/waiting.png')}

          style={{
            height: 140,
            width: 100,
          }}

        />

        <Text style={styles.message}>Congratulations!</Text>

        <Text style={styles.messageSmall}>


          Your Account is Successfully Verified. Go home to start your Journey With Us
        </Text>



          {/* Remove the parent touchbale opacity tag, or just the method, this is only for Success Testing */}

          <TouchableOpacity 
                
                    onPress={() => {
                        navigation.navigate('TabController');
                    }}

                style={styles.appButtonContainer}>

                    <Text style={styles.appButtonText}>Back to Home</Text>
                </TouchableOpacity>


        <TouchableOpacity
          onPress={() => navigation.navigate('VerificationSuccess')}
        >
        <Text>
          <Text style={styles.messageSmallColor}> Complete Your Profile </Text>
        </Text>
        </TouchableOpacity>






      </View>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    color: "#c2c4c7"
  },
  message: {
    color: "#000",
    fontSize: 30,
    marginTop: 10,
    marginTop: 30,
    textAlign: "center",
  },
  messageSmall: {
    color: "#474747",
    fontSize: 14,
    marginTop: 10,
    marginTop: 10,
    textAlign: "center",
  },
  messageSmallColor: {
    color: "#0da5eb",
    fontSize: 14,
    marginTop: 10,
    marginTop: 10,
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
    fontWeight: '600',
    marginBottom: 10,
    color: "#FFFFFF",
  },
  primarySubTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: "#FFFFFF",
  },
  bgImage: {
    flex: 1,
    justifyContent: "center"
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
    fontWeight: '500',
    alignSelf: "center",
    textTransform: "uppercase"
  },
  secoundaryColorText: {
    color: "#02adfbdd",
    fontSize: 14,
  }
});

