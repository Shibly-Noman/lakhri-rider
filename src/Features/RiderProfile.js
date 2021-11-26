import * as React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as SecureStore from "expo-secure-store";

import { AnimatedCircularProgress } from "react-native-circular-progress";
import axios from "axios";

export default function RiderProfile() {
  const [user, setUser] = React.useState(null);
  const [wallet, setWallet] = React.useState(null);
  const [cashReceived, setCashReceived] = React.useState(null);
  const [dailyTarget, setDailyTarget] = React.useState(null);
  const [monthlyTarget, setMonthlyTarget] = React.useState(null);

  React.useEffect(async () => {
    try {
      const userID = await SecureStore.getItemAsync("userID");
      const token = await SecureStore.getItemAsync("token");
      const baseURL = "https://peaceful-citadel-48843.herokuapp.com";
      const config = {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` },
      };
      axios
        .get(`${baseURL}/auth/rider/${JSON.parse(userID)}`, config)
        .then((res) => setUser(res.data));
      axios
        .get(
          `${baseURL}/payment/rider-payments/${JSON.parse(userID)}/deposited`,
          config
        )
        .then((res) => setWallet(res.data));
      axios
        .get(
          `${baseURL}/payment/rider-payments/${JSON.parse(userID)}/pending`,
          config
        )
        .then((res) => setCashReceived(res.data));
      axios
        .get(`${baseURL}/auth/rider/daily/${JSON.parse(userID)}`, config)
        .then((res) => setDailyTarget(res.data));
      axios
        .get(`${baseURL}/auth/rider/monthly/${JSON.parse(userID)}`, config)
        .then((res) => setMonthlyTarget(res.data));
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/images/primary_bg_fill.png")}
      resizeMode="cover"
      style={styles.bgImage}
    >
      <View
        style={{
          flex: 1,
          marginTop: 40,
          padding: 22,
        }}
      >
        {user && (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: 72,
            }}
          >
            <Image
              source={{ uri: user.imgURL }}
              style={{
                height: 90,
                width: 90,
                borderRadius: 25,
                marginRight: 10,
                borderWidth: 3,
                borderColor: "#fff",
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
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                {user.name}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#fff",
                }}
              >
                {user.phoneNumber}
              </Text>
            </View>
          </View>
        )}

        <ScrollView
          style={{
            paddingTop: 10,
          }}
        >
          {wallet && (
            <View
              style={{
                padding: 15,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#0da5eb",
                backgroundColor: "#fff",
                marginBottom: 20,
              }}
            >
              <Text>Wallet</Text>

              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    paddingTop: 20,
                    fontSize: 30,
                    fontWeight: "bold",
                  }}
                >
                  {wallet.pendingAmount} BDT
                </Text>

                <TouchableOpacity
                  style={{
                    height: 40,
                    width: 130,
                    marginTop: 20,
                    borderRadius: 10,
                    backgroundColor: "#0da5eb",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    Withdraw
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {cashReceived && (
            <View
              style={{
                padding: 15,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#0da5eb",
                backgroundColor: "#fff",
                marginBottom: 20,
              }}
            >
              <Text>Cash Received</Text>

              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    paddingTop: 20,
                    fontSize: 30,
                    fontWeight: "bold",
                  }}
                >
                  {cashReceived.walletAmount} BDT
                </Text>

                <TouchableOpacity
                  style={{
                    height: 40,
                    width: 130,
                    marginTop: 20,
                    borderRadius: 10,
                    backgroundColor: "#0da5eb",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    Diposit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {dailyTarget && (
            <View
              style={{
                padding: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#0da5eb",
                backgroundColor: "#fff",
                marginBottom: 20,
              }}
            >
              <Text>Daily Target</Text>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
                }}
              >
                <AnimatedCircularProgress
                  size={120}
                  width={15}
                  fill={(dailyTarget.dailyGoalReached*100) /dailyTarget.dailyGoal}
                  tintColor="#0da5eb"
                  onAnimationComplete={() => console.log("onAnimationComplete")}
                  backgroundColor="#3d5875"
                />
              </View>
              <Text
                style={{
                  fontSize: 25,
                  textAlign: "center",
                }}
              >
                {(dailyTarget.dailyGoalReached*100) /dailyTarget.dailyGoal}%
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingBottom: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  Achived: {dailyTarget.dailyGoalReached}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  Target: {dailyTarget.dailyGoal}
                </Text>
              </View>
            </View>
          )}

          {monthlyTarget && (
            <View
              style={{
                padding: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#0da5eb",
                backgroundColor: "#fff",
                marginBottom: 20,
              }}
            >
              <Text>Monthly Target</Text>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
                }}
              >
                <AnimatedCircularProgress
                  size={120}
                  width={15}
                  fill={(monthlyTarget.monthlyGoalReached*100) /monthlyTarget.monthlyGoal}
                  tintColor="#0da5eb"
                  onAnimationComplete={() => console.log("onAnimationComplete")}
                  backgroundColor="#3d5875"
                />
              </View>
              <Text
                style={{
                  fontSize: 25,
                  textAlign: "center",
                }}
              >
                {(monthlyTarget.monthlyGoalReached*100) /monthlyTarget.monthlyGoal}%
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingBottom: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  Achived: {monthlyTarget.monthlyGoalReached}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  Target: {monthlyTarget.monthlyGoal}
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    justifyContent: "center",
  },
});
