import { setStatusBarHidden } from "expo-status-bar";
import * as React from "react";
import { useState } from "react";
import {
  View,
  Text,
  Modal,
  Image,
  Pressable,
  Linking,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  CheckBox,
  ScrollView,
  StyleSheet,
  TouchableOpacityBase,
} from "react-native";
import { Card, Avatar, Button } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { Rating } from "react-native-elements";
import auth from "../auth";

function RiderHome({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [orders, setOrders] = React.useState([]);
  const [userInfo, setUserInfo] = React.useState(null);
  const [orderList, setOrderList] = React.useState(null);
  const [userPhone, setUserPhone] = React.useState(null);
  const [overallOrderId, setOverallOrderId] = React.useState(null);
  const [visibleActive, setVisibleActive] = useState(true);
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [rating, setRating] = useState(0);

  // Prior check for security
  React.useEffect(async () => {
    const id = await auth.getUserID();
    const token = await auth.getToken();
    const headers = await auth.getHeaders();

    if (token === null) {
      navigation.navigate("introStepper");
    }

    const { data } = await axios.get(`https://peaceful-citadel-48843.herokuapp.com/order/rider/all/${id}`, headers);
    setOrders(data);
    
  }, []);

  // const[userId, setUserId] = React.useState(null);
  // const[userToken, setUserToken] = React.useState(null);

  const getOrderList = (order) => {
    setOrderList(order.productInfo);
    setUserInfo(order.userId);
    setUserPhone(order.userPhone);
    setModalVisible(true);
    setOverallOrderId(order._id);
    console.log(order)
  };

  const orderComplete = async (orderID) => {
    const headers = await auth.getHeaders();

    const res = await axios.patch(`https://peaceful-citadel-48843.herokuapp.com/payment/rider-payment-and-order-complete/${orderID}`, {}, headers)


  };

  const markIndividualDone = async (order) => {
    let token = await auth.getToken();
    let id = await auth.getUserID();
    const body = {
      orderStatus: "delivered",
      _id: order._id,
      productId: order.productId,
      price: order.price,
      vendorID: order.vendorID._id,
      quantity: order.quantity,
      discount: order.discount,
      productType: order.productType,
    };
    try {
      console.log("Bingo", token);
      const { data } = await axios.patch(
        `https://peaceful-citadel-48843.herokuapp.com/payment/status/update/by?id=${overallOrderId}&productInfoid=${order._id}`,
        body,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      console.log(data);
      // setOrderList(data.productInfo);
      resetValues();
      // setOrderList(data.productInfo);
      // let index = orderList.findIndex(x => x._id == data._id);
      // console.log('data', data);
    } catch (err) {
      console.log(err);
    }
  };

  const resetValues = async () => {
    let token = await auth.getToken();
    let id = await auth.getUserID();
    try {
      const { data } = await axios.get(
        `https://peaceful-citadel-48843.herokuapp.com/order/rider/all/${id}`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      setOrders(data);
    } catch (err) {
      console.log(err);
    }
  };

  const rateVendor = async () => {
    let token = await auth.getToken();
    let id = await auth.getUserID();

    // https://peaceful-citadel-48843.herokuapp.com/business/give/rating/:userID?businessID=617b71fe1debbc001697ee9b&rating=5&orderID=6188f71e7e609f0016a806bb
    try {
      const { data } = await axios.get(
        `https://peaceful-citadel-48843.herokuapp.com/business/give/rating/:userID?businessID=617b71fe1debbc001697ee9b&rating=5&orderID=6188f71e7e609f0016a806bb`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      console.log(data);
      setOrders(data);
    } catch (err) {
      console.log(err);
    }
  };

  const triggerCall = () => {
    if (userPhone) {
      Linking.openURL(`tel:${userPhone}`);
    }
  };
  const triggerVendorCall = (ph) => {
    Linking.openURL(`tel: ${ph}`);
  };

  return (
    <ImageBackground
      source={require("../../assets/images/primary_bg_fill.png")}
      resizeMode="cover"
      style={styles.bgImage}
    >
      <Modal
        animationType="slide"
        // transparent={true}
        fullScreen={true}
        visible={ratingModalVisible}
        onRequestClose={() => {
          setModalVisible(!ratingModalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            padding: 50,
            margin: 0,
          }}
        >
          <View
            style={{
              marginTop: 50,
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/images/review_us_icon.png")}
              style={{
                height: 202,
                width: 270,
              }}
            />
          </View>
          <Text
            style={{
              marginTop: 20,
              fontSize: 25,
              textAlign: "center",
              paddingLeft: 10,
              paddingRight: 10,
            }}
          >
            Rate your experience with the vendor!
          </Text>
          <View
            style={{
              marginTop: 20,
            }}
          >
            <Rating
              type="star"
              ratingCount={5}
              imageSize={40}
              onFinishRating={(value) => setRating(value)}
              startingValue={rating}
              showRating={true}
              fractions={1}
            />
            <View
              style={{
                height: 40,
              }}
            ></View>
            <Button
              style={
                {
                  // paddingTop: 50,
                  // paddingBottom: 30,
                }
              }
              title="Submit Your Review"
              onPress={async () => {
                await rateVendor();
                setRating(0);
                setRatingModalVisible(!ratingModalVisible);
              }}
              buttonStyle={{ backgroundColor: "#179bd7", borderRadius: 10 }}
            />
          </View>

          {/* <TouchableOpacity style={{
                        position: 'absolute',
                        bottom: 20,
                        width: '100%',
                        marginRight: 20,
                        marginLeft: 20,
                        backgroundColor: 'red',
                    }}>
                        <Text style={{}}>
                            asdf
                        </Text>
                    </TouchableOpacity> */}
        </View>
      </Modal>

      {userInfo != null && (
        <Modal
          animationType="slide"
          // transparent={true}
          fullScreen={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          {/* USER INFO CARD */}
          <View
            style={{
              backgroundColor: "#0da5eb",
              // borderRadius: 10,
              padding: 15,
              // margin: 20,
            }}
          >
            <View style={{ display: "flex", flexDirection: "row" }}>
              <View
                style={{
                  width: "83%",
                }}
              >
                <Text
                  style={{
                    fontSize: 30,
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  {userInfo.name}
                </Text>
                <Text
                  style={{
                    color: "#fff",
                  }}
                >
                  +88 {userPhone}
                </Text>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  Cash On Delivery
                </Text>
              </View>
              <View
                style={{
                  width: "17%",
                }}
              >
                <TouchableOpacity
                  style={{
                    height: 50,
                    width: 50,
                    backgroundColor: "#fff",
                    borderRadius: 25,
                    alignContent: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    triggerCall();
                  }}
                >
                  <Ionicons name="call" size={25} color="#0da5eb" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* USER INFO CARD END */}

          {/* ORDER CARD */}
          <ScrollView>
            {orderList.map((order, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 10,
                  padding: 15,
                  margin: 20,
                  borderLeftColor: "#0da5eb",
                  borderTopColor: "#fff",
                  borderRightColor: "#fff",
                  borderBottomColor: "#fff",
                  borderWidth: 4,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
              > 
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <View
                    style={{
                      width: "83%",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 30,
                        color: "#0da5eb",
                        fontWeight: "bold",
                      }}
                    >
                      {order.vendorID.organizationName}
                    </Text>
                    <Text
                      style={{
                        color: "#000",
                      }}
                    >
                      {order.vendorID.organizationAddress}
                    </Text>
                    <Text
                      style={{
                        color: "#000",
                      }}
                    >
                      {order.vendorID.phoneNumber}
                    </Text>

                    <TouchableOpacity
                      style={{
                        // width: 80,
                        // borderWidth: 1,
                        // borderColor: '#0da5eb',
                        backgroundColor: "#fff",
                        padding: 2,
                        borderRadius: 5,
                        marginTop: 10,
                        // alignItems: 'center',
                        // justifyContent: 'center',
                        display: "flex",
                        flexDirection: "row",
                      }}
                      onPress={() => {
                        setRatingModalVisible(true);
                      }}
                    >
                      <Ionicons
                        style={{
                          marginRight: 5,
                        }}
                        name="star-outline"
                        size={12}
                        color="#DfAf37"
                      />

                      <Text
                        style={{
                          fontSize: 10,
                          textAlign: "center",
                          color: "#DfAf37",
                        }}
                      >
                        Rate Vendor
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      width: "17%",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        height: 50,
                        width: 50,
                        backgroundColor: "#0da5eb",
                        borderRadius: 25,
                        alignContent: "center",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onPress={() => {
                        triggerVendorCall(order.vendorID.phoneNumber);
                      }}
                    >
                      <Ionicons name="call" size={25} color="#FFF" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{ display: "flex", flexDirection: "row" }}>
                  <View
                    style={{
                      width: "60%",
                    }}
                  >
                    <Text
                      style={{
                        color: "#000",
                      }}
                    ></Text>
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 17,
                      }}
                    >
                      {order.productId.name}
                    </Text>
                    <Text
                      style={{
                        color: "#000",
                      }}
                    >
                      Quantity: {order.quantity}
                    </Text>

                    <Text
                      style={{
                        color: "#AA0000",
                      }}
                    >
                      Price: {order.price} BDT
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "40%",
                    }}
                  >
                    {order.orderStatus == "pending" && visibleActive == true && (
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#0da5eb",
                          borderRadius: 5,
                          alignContent: "center",
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: 40,
                          padding: 10,
                        }}
                        onPress={() => {
                          markIndividualDone(order);
                          setVisibleActive(false);
                        }}
                      >
                        <Text style={{ color: "#fff" }}>Mark as Done</Text>
                      </TouchableOpacity>
                    )}

                    {(order.orderStatus == "delivered" ||
                      visibleActive == false) && (
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#fff",
                          borderColor: "#0da5eb",
                          borderWidth: 1,
                          borderRadius: 5,
                          alignContent: "center",
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: 40,
                          padding: 10,
                        }}
                      >
                        <Text style={{ color: "#0da5eb" }}>Done</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            ))}
            <View
              style={{
                paddingBottom: 100,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#0da5eb",
                  fontSize: 25,
                  fontWeight: "bold",
                }}
              >
                Total Amount
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  color: "#36d678",
                  fontSize: 40,
                  fontWeight: "bold",
                }}
              >
                530.00 BDT
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                  style={{
                    height: 50,
                    width: "30%",
                    marginTop: 20,
                    backgroundColor: "#fff",
                    borderRadius: 5,
                    padding: 10,
                    borderWidth: 1,
                    borderColor: "#0da5eb",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#0da5eb", fontSize: 17 }}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: 50,
                    width: "30%",
                    marginTop: 20,
                    backgroundColor: "#0da5eb",
                    borderRadius: 5,
                    padding: 10,
                    marginLeft: 30,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={()=>orderComplete(overallOrderId)}
                >
                  <Text style={{ color: "#fff", fontSize: 17 }}>Complete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </Modal>
      )}

      {orders.length > 0 ? 
        <View
          style={{
            flex: 1,
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 50,
          }}
        >
          <Text
            style={{
              marginTop: 10,
              fontSize: 25,
              color: "white",
            }}
          >
            Welcome Mr. Nafis
          </Text>
          <Text
            style={{
              marginTop: 10,
              fontSize: 15,
              marginBottom: 10,
              color: "white",
            }}
          >
            Here is the delivery list for you
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {orders.map((order, index) => (
              <View key={index} style={styles.cardContainerInactive}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      width: "82%",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 24,
                      }}
                    >
                      {order.userId.name}
                    </Text>
                    <Text style={{ color: "#FF4848" }}>
                      {order.totalPrice} BDT
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "18%",
                    }}
                  >
                    <Image
                      source={{ uri: `${order.userId.imgURL}` }}
                      style={{
                        height: 50,
                        width: 50,
                        borderRadius: 50 / 2,
                        marginRight: 10,
                      }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 10,
                  }}
                >
                  <Text
                    style={{
                      marginTop: 15,
                    }}
                  >
                    Number of Item
                  </Text>
                  <Text style={{ marginTop: 15 }}>{order.totalQuantity}</Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      marginTop: 5,
                    }}
                  >
                    Delivery Location
                  </Text>
                  <Text style={{ marginTop: 5 }}>
                    {order.deliveryAddress}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 20,
                    borderRadius: 10,
                  }}
                >
                  <Button
                    style={{
                      borderRadius: 8,
                      flex: 1,
                    }}
                    title="View Details"
                    type="outline"
                    onPress={() => getOrderList(order)}
                  />
                </View>
              </View>
            ))}
          </ScrollView>
        </View> 
       :
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/images/empty_folder.png")}
            resizeMode="contain"
            style={{
              height: 250,
              width: 250,
            }}
          />

          <Text
            style={{
              fontSize: 22,
              color: "#000000",
            }}
          >
            Sorry!
          </Text>

          <Text
            style={{
              fontSize: 22,
              color: "#000000",
            }}
          >
            You have no order yet.
          </Text>
        </View>
      }
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
    backgroundColor: "#ffffff99",
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
    justifyContent: "center",
  },

  // MOdal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
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
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default RiderHome;
