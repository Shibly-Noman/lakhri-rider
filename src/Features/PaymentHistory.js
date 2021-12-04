import * as React from "react";
import { useEffect, useState } from "react";
import {
  ToastAndroid,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Text,
  Image,
  View,
  Dimensions,
  Button,
  Alert,
  Platform,
  ScrollView,
  Touchable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import auth from "../auth";

export default function Wallet({ navigation }) {
  const [pendingAmount, setPendingAmount] = useState(0);
  const [paymentHistory, setPaymentHistory] = useState(null);

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const handleWithdraw = async () => {
    const baseURL = "https://peaceful-citadel-48843.herokuapp.com";
    const userID = await auth.getUserID();
    const headers = await auth.getHeaders();

    if (pendingAmount < 1000) {
      showToast("Amount must be minimum 1000");
      return;
    }

    await axios.patch(
      `${baseURL}/payment/make-withdraw/${userID}`,
      {},
      headers
    );
    showToast("Withdraw request successful!");
    setDeps(Math.random());
  };

  useEffect(async () => {
    const headers = await auth.getHeaders();
    const id = await auth.getUserID();
    const baseURL = "https://peaceful-citadel-48843.herokuapp.com";

    let res;

    res = await axios.get(
      `${baseURL}/payment/rider-payments/${id}/deposited`,
      headers
    );
    setPendingAmount(res.data.pendingAmount);

    res = await axios.get(`${baseURL}/payment/rider/history/${id}`, headers);
    setPaymentHistory(res.data);
  }, []);

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

        <View
          style={{
            height: 50,
          }}
        ></View>

        <ImageBackground
          source={require("../../assets/images/backImage.png")}
          style={styles.backgroundImage}
        >
          <Text style={styles.imageText}>Payment Pending</Text>
          <View style={styles.imageTextContainer}>
            <Image
              style={styles.moneyImage}
              source={require("../../assets/images/taka_big.png")}
            />
            <Text style={styles.imageSubText}>{pendingAmount}</Text>
            <Text style={styles.imageBdtText}>BDT</Text>
          </View>
        </ImageBackground>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>Contact</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.withdrawButton}
            onPress={handleWithdraw}
          >
            <Text style={styles.withdrawButtonText}>Withdraw</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.horizontalLine}></View>
        <Text style={styles.secondHeaderText}>Transaction History</Text>
        {paymentHistory &&
          paymentHistory.map((item, index) => (
            <View key={index}>
              {item.status == "unpaid" && (
                <View style={styles.upWalletCard}>
                  <View style={styles.walletCardFirst}>
                    <View style={styles.dateCardDate}>
                      <Text style={styles.dateText}>
                        {new Date(item.createdAt).toString().split(" ")[2]}
                      </Text>
                      <Text style={styles.monthText}>
                        {new Date(item.createdAt).toString().split(" ")[1]}
                      </Text>
                    </View>
                    <View style={styles.textAndAmount}>
                      <Text style={styles.upAmountText}>Unpaid Amount</Text>
                      <Text style={styles.upAmountText}>Paid Amount</Text>
                    </View>
                  </View>
                  <View style={styles.textAndAmount}>
                    <Text style={styles.upAmount}>{item.amountOfPaid}</Text>
                    <Text style={styles.upAmountZero}>
                      {item.amountOfUnpaid}
                    </Text>
                  </View>
                </View>
              )}

              {item.status == "paid" && (
                <View style={styles.pWalletCard}>
                  <View style={styles.walletCardFirst}>
                    <View style={styles.dateCardDate}>
                      <Text style={styles.dateText}>
                        {new Date(item.createdAt).toString().split(" ")[2]}
                      </Text>
                      <Text style={styles.monthText}>
                        {new Date(item.createdAt).toString().split(" ")[1]}
                      </Text>
                    </View>
                    <View style={styles.textAndAmount}>
                      <Text style={styles.upAmountText}>Unpaid Amount</Text>
                      <Text style={styles.upAmountText}>Paid Amount</Text>
                    </View>
                  </View>
                  <View style={styles.textAndAmount}>
                    <Text style={styles.upAmount}>{item.amountOfUnpaid}</Text>
                    <Text style={styles.upAmountZero}>
                      {item.amountOfPaid}
                    </Text>
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
    marginRight: 20,
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
    marginBottom: 5,
  },
  imageTextContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  moneyImage: {
    height: 26,
    width: 21,
    marginRight: 5,
  },
  imageSubText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#36d678",
    marginRight: 5,
  },
  imageBdtText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#202731",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 20,
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
    alignSelf: "center",
  },
  withdrawButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "center",
    color: "#ffffff",
  },
  horizontalLine: {
    borderStyle: "dashed",
    borderWidth: 1,
    borderRadius: 1,
    borderColor: "#707070",
    marginHorizontal: 5,
    marginVertical: 10,
  },
  secondHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    marginHorizontal: 30,
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
    marginBottom: 10,
  },
  walletCardFirst: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
    alignItems: "center",
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
    paddingBottom: 0,
  },
  monthText: {
    fontSize: 14,
    fontWeight: "bold",
    padding: 10,
    paddingTop: 0,
  },
  dateCardDetails: {
    backgroundColor: "#ffffff",
    margin: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textAndAmount: {},
  textAndAmountRight: {},
  upAmountText: {
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 5,
  },
  upAmount: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#D42A3B",
    textAlign: "right",
    marginVertical: 5,
  },
  upAmountZero: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#36D678",
    textAlign: "right",
    marginVertical: 5,
  },
});
