import * as React from "react";
import { useState } from "react";
import { View, Text, Image, Modal, StyleSheet, Linking, TouchableOpacity, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import ProductCard from "../components/ProductCard"
import {useAuth} from "../contexts/AuthContext"
import axios from "axios";

export default function Order({ order, onComplete }) {
  const [showOrderDetailsModal, setShowOrderDetailsModal] = useState(false);
  const [products, setProducts] = useState(order.productInfo);
  const {user, requestHeader} = useAuth();

  const showOrderDetails = () => {
    setShowOrderDetailsModal(true);
  };

  const triggerCall = (phone) => {
      Linking.openURL(`tel:${phone}`);
  };

  const handleOrderCompletion = async () => {
    await onComplete(order._id);
    // setShowOrderDetailsModal(false);
  }

  const handleProductCompletion = async (product) => {
    try {
      const { data } = await axios.patch(
        `https://peaceful-citadel-48843.herokuapp.com/payment/status/update/by?id=${order._id}&productInfoid=${product._id}`,
        {orderStatus: "delivered"},
        requestHeader
      );

      setProducts(data.productInfo);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Modal
        animationType="slide"
        fullScreen={true}
        visible={showOrderDetailsModal}
        onRequestClose={() => {
          setShowOrderDetailsModal(false);
        }}
      >
        <View
          style={{
            backgroundColor: "#0da5eb",
            padding: 15,
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
                {order.userId.name}
              </Text>
              <Text
                style={{
                  color: "#fff",
                }}
              >
                phone: {order.userPhone}
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
                onPress={() => triggerCall(order.userPhone)}
              >
                <Ionicons name="call" size={25} color="#0da5eb" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <ScrollView>
          {products.map((product, index) => (
            <ProductCard key={product._id} product={product} onComplete={handleProductCompletion} />
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
              {order.totalPrice} BDT
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => setShowOrderDetailsModal(false)}
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
                onPress={handleOrderCompletion}
              >
                <Text style={{ color: "#fff", fontSize: 17 }}>Complete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Modal>
      <View style={styles.cardContainerInactive}>
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
            <Text style={{ color: "#FF4848" }}>{order.totalPrice} BDT</Text>
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
          <Text style={{ marginTop: 5 }}>{order.deliveryAddress}</Text>
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
            onPress={() => showOrderDetails()}
          />
        </View>
      </View>
    </>
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
});
