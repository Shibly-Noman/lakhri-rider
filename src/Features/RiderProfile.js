import * as React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  ToastAndroid
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import auth from "../auth"

import { AnimatedCircularProgress } from "react-native-circular-progress";
import axios from "axios";

export default function RiderProfile({navigation}) {
  const [user, setUser] = React.useState(null);
  const [wallet, setWallet] = React.useState(null);
  const [cashReceived, setCashReceived] = React.useState(null);
  const [dailyTarget, setDailyTarget] = React.useState(null);
  const [monthlyTarget, setMonthlyTarget] = React.useState(null);
  const [deps, setDeps] = React.useState(Math.random());

  const [isLoading, setIsLoading] = React.useState(true);

  const logout = async () => {
    await auth.logout(()=>{
      navigation.navigate('introStepper');
    });
    
  }

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const handleWithdraw = async ()=>{
    const baseURL = "https://peaceful-citadel-48843.herokuapp.com";
    const userID = await auth.getUserID();
    const headers = await auth.getHeaders();

    if(wallet.pendingAmount < 1000){
      showToast("Amount must be minimum 1000");
      return;
    }

    await axios.patch(`${baseURL}/payment/make-withdraw/${userID}`, {}, headers)
    showToast("Withdraw request successful!")
    setDeps(Math.random())
  }

  React.useEffect(async () => {
    try {
      const userID = await auth.getUserID();
      const token = await auth.getToken();
      const baseURL = "https://peaceful-citadel-48843.herokuapp.com";
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios
        .get(`${baseURL}/auth/rider/${userID}`, config)
        .then((res) => setUser(res.data));
      axios
        .get(
          `${baseURL}/payment/rider-payments/${userID}/deposited`,
          config
        )
        .then((res) => setWallet(res.data));
      axios
        .get(
          `${baseURL}/payment/rider-payments/${userID}/pending`,
          config
        )
        .then((res) => setCashReceived(res.data));
      axios
        .get(`${baseURL}/auth/rider/daily/${userID}`, config)
        .then((res) => setDailyTarget(res.data));
      axios
        .get(`${baseURL}/auth/rider/monthly/${userID}`, config)
        .then((res) => setMonthlyTarget(res.data));
    } catch (err) {
      console.log(err);
    }
  }, [deps]);

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

              <TouchableOpacity style={{
                marginTop: 10,
                height: 30,
                width: 80,
                backgroundColor: "#fff",
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8,
              }}
                onPress={() => {
                  logout();
                }}
              >
                <Text
                  style={{
                    color: "#0da5eb",
                  }}
                >
                  Logout
                </Text>
              </TouchableOpacity>

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
                  onPress={handleWithdraw}
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
                {((dailyTarget.dailyGoalReached*100) /dailyTarget.dailyGoal).toFixed(2)}%
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
                {((monthlyTarget.monthlyGoalReached*100) /monthlyTarget.monthlyGoal).toFixed(2)}%
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
