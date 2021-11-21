
import { setStatusBarHidden } from 'expo-status-bar';
import * as React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ImageBackground } from 'react-native'
import { Button } from 'react-native-elements';
function PaymentDetails() {
    return (
        // <ImageBackground source={require('../../assets/images/primary_bg_fill.png')} resizeMode="cover" style={styles.bgImage}>
        <View style={{
            flex: 1,
            padding: 20,
            marginTop: 30,
        }}>
            <Text
                style={{
                    fontSize: 25,
                    // color: '#0da5eb',
                    color: '#000',
                    // fontWeight: 'bold',
                }}
            >
                Payment Details
            </Text>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    alignItems: 'center',

                }}>
                    <Text style={{
                        fontSize: 20,
                        color: "#179BD7",
                        padding: 5
                    }}>
                        Customer Details
                    </Text>
                    <View style={{
                        alignItems: 'center',
                        // padding: 15
                    }}>
                        <Text style={{
                            padding: 5,
                        }}>
                            Abdul Gafur
                        </Text>
                        <Text style={{
                            padding: 5,
                        }}>
                            109/2 Arjotpara Mohakhali
                        </Text>
                        <Text style={{
                            padding: 5,
                        }}>
                            01644816549
                        </Text>
                        <Text style={{
                            padding: 5,
                        }}>
                            Cash on Delivery
                        </Text>
                    </View>
                </View>
                <View style={{
                    alignItems: 'center',

                }}>
                    <Text style={{
                        fontSize: 20,
                        color: "#179BD7",

                        padding: 5
                    }}>
                        Vendor and Product Details
                    </Text>
                    <View style={{
                        alignItems: 'center',        
                    }}>
                        <Text style={{
                            padding: 5,
                        }}>
                            Abdul Gafur
                        </Text>
                        <Text style={{
                            padding: 5,
                        }}>
                            109/2 Arjotpara Mohakhali
                        </Text>
                        <Text style={{
                            padding: 5,
                        }}>
                            01644816549
                        </Text>
                        
                    </View>
                    <View style={{
                        alignItems: 'center',
                        padding: 10
                    }}>
                        <Text style={{
                            padding: 5,
                        }}>
                            Kacchi Biriyani
                        </Text>
                        <Text style={{
                            padding: 5,
                        }}>
                            Half x 2
                        </Text>
                        <Text style={{
                            padding: 5,
                        }}>
                            350.00 BDT
                        </Text>
                        
                    </View>
                    <View style={{
                        alignItems: 'center',
                        padding: 10
                    }}>
                        <Text style={{
                            padding: 5,
                        }}>
                            Abdul Gafur
                        </Text>
                        <Text style={{
                            padding: 5,
                        }}>
                            109/2 Arjotpara Mohakhali
                        </Text>
                        <Text style={{
                            padding: 5,
                        }}>
                            01644816549
                        </Text>
                        
                    </View>
                    <View style={{
                        alignItems: 'center',
                        padding: 10
                    }}>
                        <Text style={{
                            padding: 5,
                        }}>
                            Chicken BBQ
                        </Text>
                        <Text style={{
                            padding: 5,
                        }}>
                            2
                        </Text>
                        <Text style={{
                            padding: 5,
                        }}>
                            180.00 BDT
                        </Text>
                        
                    </View>
                </View>
                <View style={{
                    alignItems: 'center',

                }}>
                    <Text style={{
                        fontSize: 25,
                        color: "#179BD7",

                        padding: 5,
                        paddingBottom: 0,
                    }}>
                        Total Amount
                    </Text>
                    <Text style={{
                        fontSize: 40,
                        color: "#36D678",

                        padding: 0
                    }}>
                    480.00 BDT
                    </Text>
                </View>
                <View style={{
                    height: 20
                }}>
                </View>
            </ScrollView>
        </View>
        // </ImageBackground>

    );
}

const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        justifyContent: "center"
    },
});

export default PaymentDetails;