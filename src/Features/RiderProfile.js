import * as React from 'react';
import { Text, View, Image, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


import { AnimatedCircularProgress } from 'react-native-circular-progress';


export default function RiderProfile() {
    return (
        <ImageBackground source={require('../../assets/images/primary_bg_fill.png')} resizeMode="cover" style={styles.bgImage}>
           
            <View
                style={{
                    flex: 1,
                    marginTop: 40,
                    padding: 22,
                }}
            >
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginBottom: 72,
                }}>
                    <Image
                        source={require('../../assets/images/profile.jpeg')}
                        style={{
                            height: 90,
                            width: 90,
                            borderRadius: 25,
                            marginRight: 10,
                            borderWidth: 3,
                            borderColor: '#fff',
                        }}
                    />
                    <View
                        style={{
                            padding: 10,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                color: '#fff',
                                fontWeight: 'bold',
                            }}
                        >
                            Tanvin Tushi
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                                color: '#fff',
                            }}
                        >
                            +880 1784030292
                        </Text>
                    </View>
                </View>

                <ScrollView style={{
                    paddingTop: 10,
                }}>


                <View style={{
                    padding: 10,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: '#0da5eb',
                    backgroundColor: '#fff',
                    marginBottom: 20,
                }}>
                    <Text>
                        Wallet Balance
                    </Text>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 10,

                    }}>
                    <AnimatedCircularProgress
                        size={120}
                        width={15}
                        fill={30}
                        tintColor="#0da5eb"
                        onAnimationComplete={() => console.log('onAnimationComplete')}
                        backgroundColor="#3d5875" />

                        </View>
                        <Text style={{
                            fontSize: 25,
                            textAlign: 'center',
                        }}>
                            30%
                        </Text>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingBottom: 10,
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                            }}>
                                Achived: 1000
                            </Text>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                            }}>
                                Target: 3000
                            </Text>

                        </View>
                </View>


                <View style={{
                    padding: 15,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: '#0da5eb',
                    backgroundColor: '#fff',
                    marginBottom: 20,
                }}>
                    <Text>
                        Cash Received
                    </Text>

                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Text
                            style={{
                                paddingTop: 20,
                                fontSize: 30,
                                fontWeight: 'bold',
                            }}
                        >
                            2000 BDT
                        </Text>

                        <TouchableOpacity
                            style={{
                                height: 40,
                                width: 130,
                                marginTop: 20,
                                borderRadius: 10,
                                backgroundColor: '#0da5eb',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: 10,
                            }}
                        >
                            <Text style={{
                                color: '#fff',
                                fontWeight: 'bold',
                            }}>
                                Diposit
                            </Text>

                        </TouchableOpacity>

                    </View>
                </View>


                
                <View style={{
                    padding: 10,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: '#0da5eb',
                    backgroundColor: '#fff',
                    marginBottom: 20,
                }}>
                    <Text>
                        Daily Target
                    </Text>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 10,

                    }}>
                    <AnimatedCircularProgress
                        size={120}
                        width={15}
                        fill={30}
                        tintColor="#0da5eb"
                        onAnimationComplete={() => console.log('onAnimationComplete')}
                        backgroundColor="#3d5875" />

                        </View>
                        <Text style={{
                            fontSize: 25,
                            textAlign: 'center',
                        }}>
                            30%
                        </Text>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingBottom: 10,
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                            }}>
                                Achived: 1000
                            </Text>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                            }}>
                                Target: 3000
                            </Text>

                        </View>
                </View>


                
                <View style={{
                    padding: 10,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: '#0da5eb',
                    backgroundColor: '#fff',
                    marginBottom: 20,
                }}>
                    <Text>
                        Monthly Target
                    </Text>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 10,

                    }}>
                    <AnimatedCircularProgress
                        size={120}
                        width={15}
                        fill={30}
                        tintColor="#0da5eb"
                        onAnimationComplete={() => console.log('onAnimationComplete')}
                        backgroundColor="#3d5875" />

                        </View>
                        <Text style={{
                            fontSize: 25,
                            textAlign: 'center',
                        }}>
                            30%
                        </Text>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingBottom: 10,
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                            }}>
                                Achived: 1000
                            </Text>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                            }}>
                                Target: 3000
                            </Text>

                        </View>
                </View>
                </ScrollView>
            </View>
            
        </ImageBackground>
    )
}

const styles = StyleSheet.create({




    bgImage: {
        flex: 1,
        justifyContent: "center"
    },


});