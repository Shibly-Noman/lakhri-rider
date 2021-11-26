import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, ImageBackground, Text, Image, View, Dimensions, Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useForm, Controller } from "react-hook-form";
import { Picker } from '@react-native-picker/picker';

export default function RiderDocuments({ navigation }) {
    const [image, setImage] = useState(null);
    const [nidImage, setNidImage] = useState(null);
    const [dLicenceImage, setDLicenceImage] = useState(null);
    const [bLicenceImage, setBLicenceImage] = useState(null);
    const [vehicleType, setVehicleType] = useState(null);


    const [nidUrl, setNidUrl] = useState(null);
    const [dLicenceUrl, setDLicenceUrl] = useState(null);
    const [bLicenceUrl, setBLicenceUrl] = useState(null);




    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });
        console.log(result);
        if (!result.cancelled) {
            setImage(result.uri);
            let base64Img = `data:image/jpg;base64,${result.uri}`;

            console.log('This is result',result);

            let data = {
                "file": base64Img,
                "upload_preset": "insert your upload preset here,within quotations",
              };

              console.log(data);


        }
    };

    const pickNid = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });
        console.log(result);
        if (!result.cancelled) {
            setNidImage(result.uri);
        }
    };

    const pickDLicence = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });
        console.log(result);
        if (!result.cancelled) {
            setDLicenceImage(result.uri);
        }
    };

    const pickBLicence = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });
        console.log(result);
        if (!result.cancelled) {
            setBLicenceImage(result.uri);
        }
    };

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        if (isAuthenticated) {
            navigation.navigate('CheckActive');
        }
    })
    const { control, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        setIsAuthenticated(true);
        console.log('This is data', data);
    }
    return (
        <ImageBackground source={require('../../assets/images/primary_bg_fill.png')} resizeMode="cover" style={styles.bgImage}>
            <View style={styles.titleSectionProperties}>
                <Text style={styles.primaryTitle}>Please Upload your documents</Text>
            </View>
            <TouchableOpacity onPress={pickImage} style={{
                marginLeft: 20,
                backgroundColor: '#fff',
                borderRadius: 40,
                height: 80,
                width: 80,
                alignContent: 'center',
                justifyContent: 'center',
                paddingLeft: 10,
            }}>
                {!image &&
                    <Image style={{
                        height: 60,
                        width: 60,
                    }} source={require('../../assets/images/user.png')} />

                }
                {image && <Image source={{ uri: image }} style={{ width: 60, height: 60, borderRadius: 30, }} />}
            </TouchableOpacity >

            {/* PTT */}
            <View style={{
                minWidth: "100%",
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 70,
            }}>
                <View style={{
                    maxWidth: '80%',
                }}>

                    <Controller
                        control={control}
                        rules={{
                            maxLength: 100,
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View style={styles.inputWrapper}>
                                <Text style={styles.inputLable}>Vehicle type</Text>
                                <View style={{
                                    minWidth: "100%",
                                    borderWidth: 1,
                                    borderColor: "#05abf7",
                                    // padding: 10,
                                    marginBottom: 10,
                                    borderRadius: 6,
                                    backgroundColor: "#fff"
                                }}>
                                    <Picker
                                        selectedValue={vehicleType}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setVehicleType(itemValue)
                                        }>
                                        <Picker.Item label="Cycle" value="cycle" />
                                        <Picker.Item label="Motorcycle" value="motorcycle" />
                                    </Picker>
                                </View>
                            </View>
                        )}
                        name="vehicleType"
                        defaultValue="cycle"
                    />
                    {errors.vehicleType && <Text style={{
                        color: "#F00"
                    }}>Vehicle Type is Required</Text>}

                </View>
            </View>



            <View style={styles.container}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                }}>

                    <TouchableOpacity onPress={pickNid} style={{
                        backgroundColor: '#fff',
                        alignContent: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#DDD',
                        padding: 20,
                        borderRadius: 15,
                        margin: 10,
                    }}>
                        {!nidImage &&
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Image style={{
                                    height: 40,
                                    width: 40,
                                }} source={require('../../assets/images/file.png')} />
                                <Text style={{
                                    paddingTop: 10,
                                    fontSize: 12,
                                }}>Upload your NID</Text>
                            </View>
                        }
                        {nidImage && <Image source={{ uri: nidImage }} style={{ width: 100, height: 100, borderRadius: 10, }} />}
                    </TouchableOpacity >


                </View>

                {vehicleType == 'motorcycle' && (

                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}>

                        <TouchableOpacity onPress={pickDLicence} style={{
                            backgroundColor: '#fff',
                            alignContent: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#DDD',
                            padding: 20,
                            borderRadius: 15,
                            margin: 10,
                        }}>
                            {!dLicenceImage &&
                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Image style={{
                                        height: 40,
                                        width: 40,
                                    }} source={require('../../assets/images/file.png')} />
                                    <Text style={{
                                        paddingTop: 10,
                                        fontSize: 12,
                                    }}>Driving Licence</Text>
                                </View>
                            }
                            {dLicenceImage && <Image source={{ uri: dLicenceImage }} style={{ width: 100, height: 100, borderRadius: 10, }} />}
                        </TouchableOpacity >


                        <TouchableOpacity onPress={pickBLicence} style={{
                            backgroundColor: '#fff',
                            alignContent: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#DDD',
                            padding: 20,
                            borderRadius: 15,
                            margin: 10,
                        }}>
                            {!bLicenceImage &&
                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Image style={{
                                        height: 40,
                                        width: 40,
                                    }} source={require('../../assets/images/file.png')} />
                                    <Text style={{
                                        paddingTop: 10,
                                        fontSize: 12,
                                    }}>Registration Paper</Text>
                                </View>
                            }
                            {bLicenceImage && <Image source={{ uri: bLicenceImage }} style={{ width: 100, height: 100, borderRadius: 10, }} />}
                        </TouchableOpacity >


                    </View>

                )}






                {/* 
                <View style={styles.inputWrapper}>
                    <Text style={styles.secoundaryColorText}>Forgot Password</Text>
                </View> */}

                {/* <Button style={styles.submitButton} title="Submit" onPress={handleSubmit(onSubmit)} /> */}
                <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.appButtonContainer}>
                    <Text style={styles.appButtonText}>Submit</Text>
                </TouchableOpacity>



            </View>
        </ImageBackground>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        minWidth: "100%",
        padding: 24,
    },
    titleSectionProperties: {
        minWidth: "100%",
        padding: 22,
        marginTop: 20,
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
        borderColor: "#05abf7",
        padding: 10,
        marginBottom: 10,
        borderRadius: 6,
        backgroundColor: "#fff"
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
        position: 'absolute',
        bottom: 5,
        elevation: 8,
        backgroundColor: "#02adfb",
        borderRadius: 6,
        paddingVertical: 14,
        paddingHorizontal: 40,
        marginTop: 20,
        marginBottom: 10,
        minWidth: "100%",
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

