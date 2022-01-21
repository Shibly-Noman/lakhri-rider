import axios from "axios";
import * as React from "react";
import { useState } from "react";
import {
  Image,
  ImageBackground,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import OrderCard from "../components/OrderCard";
import { useAuth } from "../contexts/AuthContext";

function RiderHome() {
  const [orders, setOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { user, requestHeader } = useAuth();

  // Prior check for security
  React.useEffect(async () => {
    await getOrders();
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getOrders();
    setRefreshing(false);
  }, []);

  const getOrders = async () => {
    const { data } = await axios.get(
      `https://peaceful-citadel-48843.herokuapp.com/order/rider/all/${user.id}`,
      requestHeader
    );
    console.log(data);
    setOrders(data);
  };

  const handleOrderCompletion = async (orderId) => {
    const res = await axios.patch(
      `https://peaceful-citadel-48843.herokuapp.com/payment/rider-payment-and-order-complete/${orderId}`,
      {},
      requestHeader
    );

    await getOrders();
  };

  return (
    <ImageBackground
      source={require("../../assets/images/primary_bg_fill.png")}
      resizeMode="cover"
      style={styles.bgImage}
    >
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
          Welcome {user.name}
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
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        >
          {orders.length > 0 ? (
            orders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                onComplete={handleOrderCompletion}
              />
            ))
          ) : (
            <View
              style={{
                alignItems: "center",
                marginTop: "45%",
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
          )}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
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
