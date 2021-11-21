import { setStatusBarHidden } from 'expo-status-bar';
import * as React from 'react';
import { View, Text, Image, TextInput, CheckBox, StyleSheet, TouchableWithoutFeedbackBase, ImageBackground } from 'react-native'
import { Card, Button, Avatar } from 'react-native-elements'

function PaymentHistory({navigation}) {
    return (
        <ImageBackground source={require('../../assets/images/primary_bg_fill.png')} resizeMode="cover" style={styles.bgImage}>

        <View style={{
            flex: 1,
            paddingLeft: 20,
            paddingRight: 20,

        }}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10,
            }}>
                <Text style={{

                    fontSize: 25,
                    marginTop: 50,
                    fontWeight: 'bold',
                    color: '#fff',


                }}>Payment History.</Text>
            
            </View>
            
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
                borderRadius: 8,
                marginTop: 20,
                backgroundColor: "#fafafa",
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
            }}>
                <View style={{
                    display: 'flex'
                }}>
                    <View>
                        <Text style={{ marginTop: 10,  fontSize: 12 }}>Customer Name</Text>
                        <Text style={{ marginTop: 10,  fontSize: 12 }}>Vendors</Text>
                        <Text style={{ marginTop: 10,  fontSize: 12 }}>Products</Text>
                        <Text style={{ marginTop: 10,  fontSize: 12 }}>Customer Address</Text>
                        <Text style={{ marginTop: 10,  fontSize: 12 }}>Customer Number</Text>
                        <Text style={{ marginTop: 10,  fontSize: 12 }}>Total Amount</Text>

                    </View>
                </View>
                <View style={{
                    textAlign: "right"
                }}>
                    <Text style={{ marginTop: 10,  fontSize: 12 }}>Abdul Gafur</Text>
                    <Text style={{ marginTop: 10,  fontSize: 12 }}>2</Text>
                    <Text style={{ marginTop: 10,  fontSize: 12 }}>5</Text>
                    <Text style={{ marginTop: 10,  fontSize: 12 }}>109/2 Arjotpara Mohakhali</Text>
                    <Text style={{ marginTop: 10,  fontSize: 12 }}>01644816549</Text>
                    <Text style={{ marginTop: 10,  fontSize: 12 }}>550.00 BDT</Text>
                    <Button
                        title="View Details"
                        titleStyle={{ fontSize: 12, }}
                        buttonStyle={{
                            borderRadius: 10,
                            backgroundColor: "#179BD7",
                            marginTop: 10,
                        }}
                        onPress={() => { navigation.navigate('PaymentDetails'); }}
                    />
                </View>
            </View>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
                borderRadius: 8,
                marginTop: 20,
                backgroundColor: "#fafafa",
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
            }}>
                <View style={{
                    display: 'flex'
                }}>
                    <View>
                        <Text style={{ marginTop: 10,  fontSize: 12 }}>Customer Name</Text>
                        <Text style={{ marginTop: 10,  fontSize: 12 }}>Vendors</Text>
                        <Text style={{ marginTop: 10,  fontSize: 12 }}>Products</Text>
                        <Text style={{ marginTop: 10,  fontSize: 12 }}>Customer Address</Text>
                        <Text style={{ marginTop: 10,  fontSize: 12 }}>Customer Number</Text>
                        <Text style={{ marginTop: 10,  fontSize: 12 }}>Total Amount</Text>

                    </View>
                </View>
                <View style={{
                    textAlign: "right"
                }}>
                    <Text style={{ marginTop: 10,  fontSize: 12 }}>Abdul Gafur</Text>
                    <Text style={{ marginTop: 10,  fontSize: 12 }}>2</Text>
                    <Text style={{ marginTop: 10,  fontSize: 12 }}>5</Text>
                    <Text style={{ marginTop: 10,  fontSize: 12 }}>109/2 Arjotpara Mohakhali</Text>
                    <Text style={{ marginTop: 10,  fontSize: 12 }}>01644816549</Text>
                    <Text style={{ marginTop: 10,  fontSize: 12 }}>550.00 BDT</Text>
                    <Button
                        title="View Details"
                        titleStyle={{ fontSize: 12, }}
                        buttonStyle={{
                            borderRadius: 10,
                            backgroundColor: "#179BD7",
                            marginTop: 10,
                        }}
                    />
                </View>
            </View>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
                borderRadius: 8,
                marginTop: 20,
                backgroundColor: "#fafafa",
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
            }}>
                <View style={{
                    display: 'flex'
                }}>
                    <View>
                        <Text style={{ marginTop: 10,  fontSize: 12 }}>Customer Name</Text>
                        <Text style={{ marginTop: 10,  fontSize: 12 }}>Vendors</Text>
                        <Text style={{ marginTop: 10,  fontSize: 12 }}>Products</Text>
                        <Text style={{ marginTop: 10,  fontSize: 12 }}>Customer Address</Text>
                        <Text style={{ marginTop: 10,  fontSize: 12 }}>Customer Number</Text>
                        <Text style={{ marginTop: 10,  fontSize: 12 }}>Total Amount</Text>

                    </View>
                </View>
                <View style={{
                    textAlign: "right"
                }}>
                    <Text style={{ marginTop: 10,  fontSize: 12 }}>Abdul Gafur</Text>
                    <Text style={{ marginTop: 10,  fontSize: 12 }}>2</Text>
                    <Text style={{ marginTop: 10,  fontSize: 12 }}>5</Text>
                    <Text style={{ marginTop: 10,  fontSize: 12 }}>109/2 Arjotpara Mohakhali</Text>
                    <Text style={{ marginTop: 10,  fontSize: 12 }}>01644816549</Text>
                    <Text style={{ marginTop: 10,  fontSize: 12 }}>550.00 BDT</Text>
                    <Button
                        title="View Details"
                        titleStyle={{ fontSize: 12, }}
                        buttonStyle={{
                            borderRadius: 10,
                            backgroundColor: "#179BD7",
                            marginTop: 10,
                        }}
                    />
                </View>
            </View>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
                borderRadius: 8,
                marginTop: 20,
                backgroundColor: "#fafafa",
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
            }}>
                <View style={{
                    display: 'flex'
                }}>
                    <View>
                        <Text style={{ marginTop: 10,  fontSize: 12 }}>Customer Name</Text>
                        <Text style={{ marginTop: 10,  fontSize: 12 }}>Vendors</Text>
                        <Text style={{ marginTop: 10,  fontSize: 12 }}>Products</Text>
                        <Text style={{ marginTop: 10,  fontSize: 12 }}>Customer Address</Text>
                        <Text style={{ marginTop: 10,  fontSize: 12 }}>Customer Number</Text>
                        <Text style={{ marginTop: 10,  fontSize: 12 }}>Total Amount</Text>

                    </View>
                </View>
                <View style={{
                    textAlign: "right"
                }}>
                    <Text style={{ marginTop: 10,  fontSize: 12 }}>Abdul Gafur</Text>
                    <Text style={{ marginTop: 10,  fontSize: 12 }}>2</Text>
                    <Text style={{ marginTop: 10,  fontSize: 12 }}>5</Text>
                    <Text style={{ marginTop: 10,  fontSize: 12 }}>109/2 Arjotpara Mohakhali</Text>
                    <Text style={{ marginTop: 10,  fontSize: 12 }}>01644816549</Text>
                    <Text style={{ marginTop: 10,  fontSize: 12 }}>550.00 BDT</Text>
                    <Button
                        title="View Details"
                        titleStyle={{ fontSize: 12, }}
                        buttonStyle={{
                            borderRadius: 10,
                            backgroundColor: "#179BD7",
                            marginTop: 10,
                        }}
                    />
                </View>
            </View>
            <View style={{ height: 20 }}></View>
        </View>


</ImageBackground >
    );
}

const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        justifyContent: "center"
    },
});

export default PaymentHistory;