import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, ImageBackground, Text, Image, View, Dimensions, Button, Alert } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import * as SecureStore from "expo-secure-store"
import { useAuth } from '../contexts/AuthContext';

export default function RiderLogin({navigation}) {
    const { control, handleSubmit, formState: { errors }, reset } = useForm();
    const {setUser} = useAuth();
    const [wrongCred, setWrongCred] = useState(false);


    const onSubmit = async ({email, password}) => {
        setWrongCred(false);
        try{
            const {data} = await axios.post("https://peaceful-citadel-48843.herokuapp.com/auth/rider/signin", { email, password });
            
            if(data.error){
                return setWrongCred(true);
            }
            
            if(data.token){
                const user = {
                    id: data.user._id,
                    name: data.user.name,
                    email: data.user.email,
                    status: data.user.status,
                    token: data.token
                };

                await SecureStore.setItemAsync("userData", JSON.stringify(user));
                setUser(user);

                reset();

                if(data.user.status === "true"){
                    navigation.navigate("TabController");
                }else{
                    navigation.navigate("WaitingPage");
                }
            }
        }catch(err){
            console.log(err);
        }
    }
    return (
        <ImageBackground source={require('../../assets/images/primary_bg_fill.png')} resizeMode="cover" style={styles.bgImage}>
            <View style={styles.titleSectionProperties}>
                <Text style={styles.primaryTitle}>Welcome Back</Text>
                {/* <Text style={styles.primarySubTitle}>Hello there</Text> */}
                {/* <Text style={styles.primarySubTitle}>Create account now.</Text> */}
            </View>
            <View style={styles.container}>

                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputLable}>Enter Email</Text>
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
                <Controller
                    control={control}
                    rules={{
                        maxLength: 100,
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputLable}>Password</Text>
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                secureTextEntry={true}
                            />
                        </View>
                    )}
                    name="password"
                    defaultValue=""
                />
                {errors.password && <Text style={{
                    color: "#F00"
                }}>Password is required.</Text>}
                {wrongCred && <Text style={{
                    color: "#F00"
                }}>Username and password doesn't match.</Text>}
               <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.appButtonContainer}>
                    <Text style={styles.appButtonText}>Sign In</Text>
                </TouchableOpacity>
                <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text>Don't Have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("RiderRegister")}>
                    <Text style={{
                        color: "#02adfb"
                    }}>Create Account</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={{
                    paddingTop: 10,
                }} onPress={() => navigation.navigate("ForgotPasswordMailView")}>
                    <Text style={{
                        color: "#02adfb"
                    }}>Forgot Password</Text>
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

