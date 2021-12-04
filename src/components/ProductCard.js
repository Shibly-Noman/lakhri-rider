import * as React from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import auth from "../auth"
import axios from "axios";


export default function Product({product, onComplete}) {

  const triggerCall = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };
  return (
    <View
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
            {product.vendorID.organizationName}
          </Text>
          <Text
            style={{
              color: "#000",
            }}
          >
            {product.vendorID.organizationAddress}
          </Text>
          <Text
            style={{
              color: "#000",
            }}
          >
            phone: {product.vendorID.phoneNumber}
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
              backgroundColor: "#0da5eb",
              borderRadius: 25,
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              triggerCall(product.vendorID.phoneNumber);
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
            {product.productType === "Food" ? product.productId.name : product.craftId.name}
          </Text>
          <Text
            style={{
              color: "#000",
            }}
          >
            Quantity: {product.quantity}
          </Text>

          <Text
            style={{
              color: "#AA0000",
            }}
          >
            Price: {product.price} BDT
          </Text>
        </View>
        <View
          style={{
            width: "40%",
          }}
        >
          {product.orderStatus == "pending" && (
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
              onPress={()=>onComplete(product)}
            >
              <Text style={{ color: "#fff" }}>Mark as Done</Text>
            </TouchableOpacity>
          )}

          {product.orderStatus == "delivered" && (
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
  );
}
