import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, ImageBackground, Text, Image, View, Dimensions, Button, Alert, Platform, ScrollView, Touchable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useForm, Controller } from "react-hook-form";

export default function Wallet({ navigation }) {
    const [image, setImage] = useState(null);
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
        }
    };
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        if (isAuthenticated) {
            navigation.navigate('RiderDocument');
        }
    })
    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        setIsAuthenticated(true);
        console.log('This is data', data);
    }
    const items = [{
        status: "paid",
        amountForLakhriFood: 0,
        amountOfPaid: 3570,
        amountOfUnpaid: 0,
        _id: "6188abd6cbc98b2f00f752be",
        riderID: "6187a11cd8fde500164af50d",
        createdAt: "2021-11-08T04:47:18.721Z",
        updatedAt: "2021-11-08T04:47:18.721Z",
        __v: 0
    }, {
        status: "unpaid",
        amountForLakhriFood: 0,
        amountOfPaid: 3570,
        amountOfUnpaid: 0,
        _id: "6188abd6cbc98b2f00f752be",
        riderID: "6187a11cd8fde500164af50d",
        createdAt: "2021-11-08T04:47:18.721Z",
        updatedAt: "2021-11-08T04:47:18.721Z",
        __v: 0
    }]
    return (

        <ScrollView>
            <View style={styles.container}>
                {/* <View style={styles.topBar}>
                    <TouchableOpacity>
                        <Image
                            style={styles.backImage}
                            source={require('../assets/images/back.png')}
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Wallet</Text>

                </View> */}

                <View style={{
                    height: 50,
                }}>

                </View>

                <ImageBackground source={require('../../assets/images/backImage.png')} style={styles.backgroundImage}>
                    <Text style={styles.imageText}>Total Earning</Text>
                    <View style={styles.imageTextContainer}>
                        <Image style={styles.moneyImage}
                            source={require('../../assets/images/taka_big.png')}
                        />
                        <Text style={styles.imageSubText}>1450.00</Text>
                        <Text style={styles.imageBdtText}>BDT</Text>
                    </View>
                </ImageBackground>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.contactButton}>
                        <Text style={styles.contactButtonText}>Contact</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.withdrawButton}>
                        <Text style={styles.withdrawButtonText}>Withdraw</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.horizontalLine}></View>
                <Text style={styles.secondHeaderText}>Transaction History</Text>
                {items.map((item, index) => (
                    <View key={index}>
                        {item.status == "unpaid" && (
                            <View style={styles.upWalletCard}>
                                <View style={styles.walletCardFirst}>
                                    <View style={styles.dateCardDate}>
                                        <Text style={styles.dateText}>{new Date(item.createdAt).toString().split(" ")[2]}</Text>
                                        <Text style={styles.monthText}>{new Date(item.createdAt).toString().split(" ")[1]}</Text>
                                    </View>
                                    <View style={styles.textAndAmount}>
                                        <Text style={styles.upAmountText}>Unpaid Amount</Text>
                                        <Text style={styles.upAmountText}>Paid Amount</Text>
                                    </View>
                                </View>
                                <View style={styles.textAndAmount}>
                                    <Text style={styles.upAmount}>{item.amountOfPaid}</Text>
                                    <Text style={styles.upAmountZero}>{item.amountOfUnpaid}</Text>
                                </View>
                            </View>
                        )}

                        {item.status == "paid" && (
                            <View style={styles.pWalletCard}>
                                <View style={styles.walletCardFirst}>
                                    <View style={styles.dateCardDate}>

                                        <Text style={styles.dateText}>{new Date(item.createdAt).toString().split(" ")[2]}</Text>
                                        <Text style={styles.monthText}>{new Date(item.createdAt).toString().split(" ")[1]}</Text>
                                    </View>
                                    <View style={styles.textAndAmount}>
                                        <Text style={styles.upAmountText}>Unpaid Amount</Text>
                                        <Text style={styles.upAmountText}>Paid Amount</Text>
                                    </View>
                                </View>
                                <View style={styles.textAndAmount}>
                                    <Text style={styles.upAmount}>{item.amountOfPaid}</Text>
                                    <Text style={styles.upAmountZero}>{item.amountOfUnpaid}</Text>
                                </View>
                            </View>
                        )}

                    </View>
                ))}
            </View>
        </ScrollView>


    );
}

const styles = StyleSheet.create({

    container: {
        padding: 10,
        backgroundColor: "#ffffff",
        flex: 1,

    },
    topBar: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 20,

    },
    backImage: {
        height: 25,
        width: 25,
        padding: 10,
        marginRight: 20
    },

    headerText: {
        fontSize: 25,
    },

    backgroundImage: {
        minWidth: "90%",
        height: 135,
        borderRadius: 10,
        alignSelf: "center",
        justifyContent: "center",
        marginBottom: 10,


    },
    imageText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#0da5eb",
        alignSelf: "center",
        marginBottom: 5
    },
    imageTextContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    moneyImage: {
        height: 26,
        width: 21,
        marginRight: 5
    },
    imageSubText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#36d678",
        marginRight: 5
    },
    imageBdtText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#202731"
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        margin: 20
    },
    contactButton: {
        paddingVertical: 10,
        width: "40%",
        borderWidth: 1,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: "#FFFFFF",
    },
    withdrawButton: {
        paddingVertical: 10,
        width: "40%",
        borderRadius: 10,
        backgroundColor: "#0da5eb",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    contactButtonText: {
        fontSize: 14,
        fontWeight: "bold",
        alignSelf: "center"
    },
    withdrawButtonText: {
        fontSize: 14,
        fontWeight: "bold",
        alignSelf: "center",
        color: "#ffffff"
    },
    horizontalLine: {
        borderStyle: 'dashed',
        borderWidth: 1,
        borderRadius: 1,
        borderColor: "#707070",
        marginHorizontal: 5,
        marginVertical: 10
    },
    secondHeaderText: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 10,
        marginHorizontal: 30
    },
    upWalletCard: {
        backgroundColor: "#ffffff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderLeftWidth: 3,
        borderColor: "#FF0000",
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 5,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10,
    },
    pWalletCard: {
        backgroundColor: "#ffffff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderLeftWidth: 3,
        borderColor: "#36D678",
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 5,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10
    },
    walletCardFirst: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    dateCardDate: {
        backgroundColor: "#ffffff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,
        margin: 5,
        marginLeft: 0,
        marginRight: 15,
        alignItems: "center"
    },
    dateText: {
        fontSize: 18,
        fontWeight: "bold",
        padding: 10,
        paddingBottom: 0
    },
    monthText: {
        fontSize: 14,
        fontWeight: "bold",
        padding: 10,
        paddingTop: 0
    },
    dateCardDetails: {
        backgroundColor: "#ffffff",
        margin: 15,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    textAndAmount: {

    },
    textAndAmountRight: {

    },
    upAmountText: {
        fontSize: 14,
        fontWeight: "bold",
        marginVertical: 5
    },
    upAmount: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#D42A3B",
        textAlign: "right",
        marginVertical: 5
    },
    upAmountZero: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#36D678",
        textAlign: "right",
        marginVertical: 5
    },
});
