import * as React from 'react';
import { useEffect } from 'react';
import { StyleSheet, ScrollView, TextInput, TouchableOpacity, ImageBackground, Text, Image, View, Dimensions, Button, Alert } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';

export default function ForgotPasswordMailView({navigation}) {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async ({email}) => {
        const res = await axios.patch(`https://peaceful-citadel-48843.herokuapp.com/auth/rider/forgot/password?email=${email}`);
        if(!res.errors){
            navigation.navigate('CheckMail', {email});
        }
    }
    return (
        <ImageBackground source={require('../../assets/images/primary_bg_fill.png')} resizeMode="cover" style={styles.bgImage}>
            <View style={styles.titleSectionProperties}>
                <Text style={styles.primaryTitle}>Reset Password</Text>
            </View>
            
            
            <View style={styles.container}>
            
                <Text style={styles.message}>Enter the Email associate with your account. We'll send the OTP to reset your password.</Text>
                
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
                    name="email"
                    defaultValue=""
                />
                {errors.email && <Text style={{
                    color: "#F00"
                }}>Email is required.</Text>}
                
                <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.appButtonContainer}>
                    <Text style={styles.appButtonText}>Send OTP</Text>
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
    message:{
        color: "#05abf7",
        fontSize: 16,
        marginTop: 10,
        marginBottom: 30,
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

