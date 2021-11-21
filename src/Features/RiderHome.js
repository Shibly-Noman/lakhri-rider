import { setStatusBarHidden } from 'expo-status-bar';
import * as React from 'react';
import { useState } from 'react';
import { View, Text, Modal, Image, Pressable, Linking, TouchableOpacity, ImageBackground, TextInput, CheckBox, ScrollView, StyleSheet } from 'react-native'
import { Card, Avatar, Button } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons';


function RiderHome({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const orders = [{
        pickStatus: true,
        activeStatus: true,
    }, {
        pickStatus: false,
        activeStatus: false,
    }, {
        pickStatus: false,
        activeStatus: false,
    }];

    const triggerCall = (ph) => {
        Linking.openURL(ph);
    }

    return (
        <ImageBackground source={require('../../assets/images/primary_bg_fill.png')} resizeMode="cover" style={styles.bgImage}>

            <Modal
                animationType="slide"
                // transparent={true}
                fullScreen={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                {/* USER INFO CARD */}
                <View style={{
                    backgroundColor: '#0da5eb',
                    // borderRadius: 10,
                    padding: 15,
                    // margin: 20,
                }}>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <View style={{
                            width: '83%',
                        }}>
                            <Text style={{
                                fontSize: 30,
                                color: '#fff',
                                fontWeight: 'bold',
                            }}>Tanvin Jahan Mridula</Text>
                            <Text
                                style={{
                                    color: '#fff',
                                }}
                            >109/2 Arjotpara Mohakhali, oposite of Jame Mosque</Text>
                            <Text style={{
                                color: '#fff',
                            }}>+880 1307609911</Text>
                            <Text style={{
                                color: '#fff',
                                fontSize: 18,
                                fontWeight: 'bold',
                            }}>Cash On Delivery</Text>

                        </View>
                        <View
                            style={{
                                width: '17%',
                            }}
                        >
                            <TouchableOpacity style={{
                                height: 50,
                                width: 50,
                                backgroundColor: '#fff',
                                borderRadius: 25,
                                alignContent: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            onPress={() => {triggerCall('tel://+8801307609911')}}
                            >
                                <Ionicons name="call" size={25} color="#0da5eb" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {/* USER INFO CARD END */}

                {/* ORDER CARD */}
                <ScrollView>

                {orders.map((order, index) => (

                    <View key={index} style={{
                        backgroundColor: '#fff',
                        borderRadius: 10,
                        padding: 15,
                        margin: 20,
                        borderLeftColor: '#0da5eb',
                        borderTopColor: '#fff',
                        borderRightColor: '#fff',
                        borderBottomColor: '#fff',
                        borderWidth: 4,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                    }}>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <View style={{
                                width: '83%',
                            }}>
                                <Text style={{
                                    fontSize: 30,
                                    color: '#0da5eb',
                                    fontWeight: 'bold',
                                }}>KFC</Text>
                                <Text
                                    style={{
                                        color: '#000',
                                    }}
                                >109/2 Arjotpara Mohakhali, oposite of Jame Mosque</Text>
                                <Text style={{
                                    color: '#000',
                                }}>+880 1307609911</Text>
                            </View>
                            <View
                                style={{
                                    width: '17%',
                                }}
                            >
                                <TouchableOpacity style={{
                                    height: 50,
                                    width: 50,
                                    backgroundColor: '#0da5eb',
                                    borderRadius: 25,
                                    alignContent: 'center',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onPress={() => {triggerCall('tel://+8801677035212')}}
                                >
                                    <Ionicons name="call" size={25} color="#FFF" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ display: 'flex', flexDirection: 'row',  }}>
                            <View style={{
                                width: '60%',
                            }}>
                                <Text
                                    style={{
                                        color: '#000',
                                    }}
                                ></Text>
                                <Text style={{
                                    color: '#000',
                                    fontSize: 17,
                                }}>Chicken Fry</Text>
                                <Text style={{
                                    color: '#000',
                                }}>Half x 2</Text>

                                <Text style={{
                                    color: '#000',
                                }}>350.00 BDT</Text>
                            </View>
                            <View
                                style={{
                                    width: '40%',
                                }}
                            >
                                <TouchableOpacity style={{
                                    // height: 50,
                                    // width: 50,
                                    backgroundColor: '#0da5eb',
                                    borderRadius: 5,
                                    alignContent: 'center',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 40,
                                    padding: 10,
                                }}>
                                    <Text style={{ color: "#fff" }}>Mark as Done</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                    


                ))}
                <View style={{
                    paddingBottom: 100,

                }}>
                    <Text style={{
                        textAlign: 'center',
                        color: '#0da5eb',
                        fontSize: 25,
                        fontWeight: 'bold',
                    }}>
                        Total Amount
                    </Text>
                    <Text style={{
                        textAlign: 'center',
                        color: '#36d678',
                        fontSize: 40,
                        fontWeight: 'bold',
                    }}>
                        530.00 BDT
                    </Text>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}>
                        <TouchableOpacity
                        onPress={() => setModalVisible(!modalVisible)} style={{
                            height: 50,
                            width: '30%',
                            marginTop: 20,
                            backgroundColor: '#fff',
                            borderRadius: 5,
                            padding: 10,
                            borderWidth: 1,
                            borderColor: '#0da5eb',
                            justifyContent: 'center',
                            alignItems: 'center',
                            
                        }}>
                            <Text style={{color: '#0da5eb', fontSize: 17}}>
                            Close
                            </Text>
                            </TouchableOpacity>
                        <TouchableOpacity style={{
                            height: 50,
                            width: '30%',
                            marginTop: 20,
                            backgroundColor: '#0da5eb',
                            borderRadius: 5,
                            padding: 10,
                            marginLeft: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Text style={{color: '#fff', fontSize: 17}}>
                                    Complete
                                </Text>
                            </TouchableOpacity>
                    </View>
                </View>
                </ScrollView>

            </Modal>


            <View style={{
                flex: 1,
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 50,
            }}>
                <Text style={{
                    marginTop: 10,
                    fontSize: 25,
                    color: 'white'
                }}>Welcome Mr. Nafis</Text>
                <Text style={{
                    marginTop: 10,
                    fontSize: 15,
                    marginBottom: 10,
                    color: 'white'
                }}>Here is the delivery list for you</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {orders.map((order, index) => (
                        <View key={index} style={[order.activeStatus ? styles.cardContainerActive : styles.cardContainerInactive]}>
                            <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }} >
                                <View style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    width: '82%'
                                }}>
                                    <Text style={{
                                        fontSize: 24
                                    }}>Jennifer Lawrence</Text>
                                    <Text style={{ color: '#FF4848' }}>350.00 BDT</Text>
                                </View>
                                <View style={{
                                    width: '18%'
                                }} >
                                    <Image
                                        source={require('../../assets/images/profile.jpeg')}
                                        style={{
                                            height: 50,
                                            width: 50,
                                            borderRadius: 50 / 2,
                                            marginRight: 10
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 10,
                            }}>
                                <Text style={{
                                    marginTop: 15
                                }}>Number of Item</Text>
                                <Text style={{ marginTop: 15 }}>3</Text>
                            </View>
                            <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <Text style={{
                                    marginTop: 10
                                }}>Pickup Destination</Text>
                                <Text style={{ marginTop: 15 }}>2</Text>
                            </View>
                            <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <Text style={{

                                    marginTop: 5
                                }}>Delivery Location</Text>
                                <Text style={{ marginTop: 15 }}>Inside Dhaka</Text>

                            </View>
                            <View style={{
                                marginTop: 20,
                                borderRadius: 10,
                                // display: 'flex',
                                // flexDirection: 'row',
                                // justifyContent: 'space-between'
                            }}>

                                <Button
                                    style={{
                                        borderRadius: 8,
                                        flex: 1,
                                    }}
                                    title="View Details"
                                    type="outline"
                                    // onPress={() => navigation.navigate('OrderDetail')}
                                    onPress={() => setModalVisible(true)}
                                />



                                {/* { order.pickStatus &&(
                                <Button
                                    style={{
                                    }}
                                    title="Complete Order"
                                    // type="outline"
                                    // disabled
                                    // onPress={() => navigation.navigate('Single Order Detail')}
                                />
                                )} */}
                                {/* {order.pickStatus == false &&(
                                <Button
                                    style={{
                                    }}
                                    title="Confirm Order"
                                    // type="outline"
                                    // disabled
                                    // onPress={() => navigation.navigate('Order Detail')}
                                />
                            )} */}

                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </ImageBackground>

    );
}

const styles = StyleSheet.create({
    cardContainerInactive: {
        padding: 10,
        borderRadius: 8,
        marginTop: 15,
        borderWidth: 1,
        borderColor: "#E9E9FF",
        backgroundColor: "#ffffff99"
    },
    cardContainerActive: {
        padding: 10,
        borderRadius: 8,
        marginTop: 15,
        borderWidth: 1,
        backgroundColor: "#d0f0c0",
        borderColor: "#E9E9FFff",
    },
    bgImage: {
        flex: 1,
        justifyContent: "center"
    },


    // MOdal
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },

});

export default RiderHome;