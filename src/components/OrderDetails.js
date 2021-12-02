import * as React from "react";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Text,
  Modal,
  Image,
  View,
  Dimensions,
  Button,
  Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export default function OrderDetails({ navigation, open }) {

//   const [ratingModalVisible, setRatingModalVisible] = useState(false);
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
  return (
    <View>
        <Text style={{
            fontSize: 30,
            fontWeight: 'bold',
        }}>
            This is test
        </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minWidth: "100%",
    padding: 24,
  },
  titleSectionProperties: {
    minWidth: "100%",
    padding: 22,
    marginTop: 22,
  },
  inputWrapper: {
    minWidth: "100%",
  },
  inputLable: {
    marginBottom: 10,
    color: "#c2c4c7",
  },
  messageSecondary: {
    marginTop: 10,
    color: "#484848",
  },
  message: {
    color: "#05abf7",
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    minWidth: "100%",
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#05abf7",
    padding: 14,
    marginBottom: 25,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 3,
  },
  primaryTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
    color: "#FFFFFF",
  },
  primarySubTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#FFFFFF",
  },
  bgImage: {
    flex: 1,
    justifyContent: "center",
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#02adfb",
    borderRadius: 6,
    paddingVertical: 14,
    paddingHorizontal: 40,
    marginTop: 20,
    marginBottom: 10,
  },
  appButtonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "500",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  secoundaryColorText: {
    color: "#02adfbdd",
    fontSize: 14,
  },
});


// <Modal
// animationType="slide"
// // transparent={true}
// fullScreen={true}
// visible={modalVisible}
// onRequestClose={() => {
//   setModalVisible(!modalVisible);
// }}
// >
// {/* USER INFO CARD */}
// <View
//   style={{
//     backgroundColor: "#0da5eb",
//     // borderRadius: 10,
//     padding: 15,
//     // margin: 20,
//   }}
// >
//   <View style={{ display: "flex", flexDirection: "row" }}>
//     <View
//       style={{
//         width: "83%",
//       }}
//     >
//       <Text
//         style={{
//           fontSize: 30,
//           color: "#fff",
//           fontWeight: "bold",
//         }}
//       >
//         {userInfo.name}
//       </Text>
//       <Text
//         style={{
//           color: "#fff",
//         }}
//       >
//         +88 {userPhone}
//       </Text>
//       <Text
//         style={{
//           color: "#fff",
//           fontSize: 18,
//           fontWeight: "bold",
//         }}
//       >
//         Cash On Delivery
//       </Text>
//     </View>
//     <View
//       style={{
//         width: "17%",
//       }}
//     >
//       <TouchableOpacity
//         style={{
//           height: 50,
//           width: 50,
//           backgroundColor: "#fff",
//           borderRadius: 25,
//           alignContent: "center",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//         onPress={() => {
//           triggerCall();
//         }}
//       >
//         <Ionicons name="call" size={25} color="#0da5eb" />
//       </TouchableOpacity>
//     </View>
//   </View>
// </View>
// {/* USER INFO CARD END */}

// {/* ORDER CARD */}
// <ScrollView>
//   {orderList.map((order, index) => (
//     <View
//       key={index}
//       style={{
//         backgroundColor: "#fff",
//         borderRadius: 10,
//         padding: 15,
//         margin: 20,
//         borderLeftColor: "#0da5eb",
//         borderTopColor: "#fff",
//         borderRightColor: "#fff",
//         borderBottomColor: "#fff",
//         borderWidth: 4,
//         shadowColor: "#000",
//         shadowOffset: {
//           width: 0,
//           height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//         elevation: 5,
//       }}
//     >
//       <View style={{ display: "flex", flexDirection: "row" }}>
//         <View
//           style={{
//             width: "83%",
//           }}
//         >
//           <Text
//             style={{
//               fontSize: 30,
//               color: "#0da5eb",
//               fontWeight: "bold",
//             }}
//           >
//             {order.vendorID.organizationName}
//           </Text>
//           <Text
//             style={{
//               color: "#000",
//             }}
//           >
//             {order.vendorID.organizationAddress}
//           </Text>
//           <Text
//             style={{
//               color: "#000",
//             }}
//           >
//             {order.vendorID.phoneNumber}
//           </Text>
//           {/* <TouchableOpacity
//               style={{
//                 // width: 80,
//                 // borderWidth: 1,
//                 // borderColor: '#0da5eb',
//                 backgroundColor: "#fff",
//                 padding: 2,
//                 borderRadius: 5,
//                 marginTop: 10,
//                 // alignItems: 'center',
//                 // justifyContent: 'center',
//                 display: "flex",
//                 flexDirection: "row",
//               }}
//               onPress={() => {
//                 setRatingModalVisible(true);
//               }}
//             >
//               <Ionicons
//                 style={{
//                   marginRight: 5,
//                 }}
//                 name="star-outline"
//                 size={12}
//                 color="#DfAf37"
//               />

//               <Text
//                 style={{
//                   fontSize: 10,
//                   textAlign: "center",
//                   color: "#DfAf37",
//                 }}
//               >
//                 Rate Vendor
//               </Text>
//             </TouchableOpacity> */}
//         </View>
//         <View
//           style={{
//             width: "17%",
//           }}
//         >
//           <TouchableOpacity
//             style={{
//               height: 50,
//               width: 50,
//               backgroundColor: "#0da5eb",
//               borderRadius: 25,
//               alignContent: "center",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//             onPress={() => {
//               triggerVendorCall(order.vendorID.phoneNumber);
//             }}
//           >
//             <Ionicons name="call" size={25} color="#FFF" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       <View style={{ display: "flex", flexDirection: "row" }}>
//         <View
//           style={{
//             width: "60%",
//           }}
//         >
//           <Text
//             style={{
//               color: "#000",
//             }}
//           ></Text>
//           <Text
//             style={{
//               color: "#000",
//               fontSize: 17,
//             }}
//           >
//             {order.productId.name}
//           </Text>
//           <Text
//             style={{
//               color: "#000",
//             }}
//           >
//             Quantity: {order.quantity}
//           </Text>

//           <Text
//             style={{
//               color: "#AA0000",
//             }}
//           >
//             Price: {order.price} BDT
//           </Text>
//         </View>
//         <View
//           style={{
//             width: "40%",
//           }}
//         >
//           {order.orderStatus == "pending" && visibleActive == true && (
//             <TouchableOpacity
//               style={{
//                 backgroundColor: "#0da5eb",
//                 borderRadius: 5,
//                 alignContent: "center",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 marginTop: 40,
//                 padding: 10,
//               }}
//               onPress={() => {
//                 markIndividualDone(order);
//                 setVisibleActive(false);
//               }}
//             >
//               <Text style={{ color: "#fff" }}>Mark as Done</Text>
//             </TouchableOpacity>
//           )}

//           {(order.orderStatus == "delivered" ||
//             visibleActive == false) && (
//             <TouchableOpacity
//               style={{
//                 backgroundColor: "#fff",
//                 borderColor: "#0da5eb",
//                 borderWidth: 1,
//                 borderRadius: 5,
//                 alignContent: "center",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 marginTop: 40,
//                 padding: 10,
//               }}
//             >
//               <Text style={{ color: "#0da5eb" }}>Done</Text>
//             </TouchableOpacity>
//           )}
//         </View>
//       </View>
//     </View>
//   ))}
//   <View
//     style={{
//       paddingBottom: 100,
//     }}
//   >
//     <Text
//       style={{
//         textAlign: "center",
//         color: "#0da5eb",
//         fontSize: 25,
//         fontWeight: "bold",
//       }}
//     >
//       Total Amount
//     </Text>
//     <Text
//       style={{
//         textAlign: "center",
//         color: "#36d678",
//         fontSize: 40,
//         fontWeight: "bold",
//       }}
//     >
//       530.00 BDT
//     </Text>
//     <View
//       style={{
//         display: "flex",
//         flexDirection: "row",
//         justifyContent: "center",
//       }}
//     >
//       <TouchableOpacity
//         onPress={() => setModalVisible(!modalVisible)}
//         style={{
//           height: 50,
//           width: "30%",
//           marginTop: 20,
//           backgroundColor: "#fff",
//           borderRadius: 5,
//           padding: 10,
//           borderWidth: 1,
//           borderColor: "#0da5eb",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <Text style={{ color: "#0da5eb", fontSize: 17 }}>Close</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={{
//           height: 50,
//           width: "30%",
//           marginTop: 20,
//           backgroundColor: "#0da5eb",
//           borderRadius: 5,
//           padding: 10,
//           marginLeft: 30,
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//         onPress={() => orderComplete(overallOrderId)}
//       >
//         <Text style={{ color: "#fff", fontSize: 17 }}>Complete</Text>
//       </TouchableOpacity>
//     </View>
//   </View>
// </ScrollView>
// </Modal>
