import axios from "axios";
import * as SecureStore from "expo-secure-store";
import * as React from "react";
import { useState } from "react";
import {
  Image,
  ImageBackground,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useAuth } from "../contexts/AuthContext";

export default function RiderProfile({ navigation }) {
  const { user, setUser, requestHeader } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [wallet, setWallet] = useState(0);
  const [cashReceived, setCashReceived] = useState(0);
  const [dailyTarget, setDailyTarget] = useState(0);
  const [monthlyTarget, setMonthlyTarget] = useState(0);
  const [deps, setDeps] = useState(Math.random());
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  }, []);

  const logout = async () => {
    await SecureStore.deleteItemAsync("userData");
    setUser(null);
    navigation.navigate("RiderLogin");
  };

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const handleWithdraw = async () => {
    const baseURL = "https://peaceful-citadel-48843.herokuapp.com";

    if (wallet.pendingAmount < 1000) {
      showToast("Amount must be minimum 1000");
      return;
    }

    await axios.patch(
      `${baseURL}/payment/make-withdraw/${user.id}`,
      {},
      requestHeader
    );
    showToast("Withdraw request successful!");
    setDeps(Math.random());
  };

  const getData = async () => {
    try {
      const baseURL = "https://peaceful-citadel-48843.herokuapp.com";
      axios
        .get(`${baseURL}/auth/rider/${user.id}`, requestHeader)
        .then((res) => setUserProfile(res.data));
      axios
        .get(
          `${baseURL}/payment/rider-payments/${user.id}/deposited`,
          requestHeader
        )
        .then((res) => setWallet(res.data));
      axios
        .get(
          `${baseURL}/payment/rider-payments/${user.id}/pending`,
          requestHeader
        )
        .then((res) => setCashReceived(res.data));
      axios
        .get(`${baseURL}/auth/rider/daily/${user.id}`, requestHeader)
        .then((res) => setDailyTarget(res.data));
      axios
        .get(`${baseURL}/auth/rider/monthly/${user.id}`, requestHeader)
        .then((res) => setMonthlyTarget(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(async () => {
    await getData();
    console.log(wallet);
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
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: 72,
          }}
        >
          <Image
            source={
              userProfile
                ? { uri: userProfile.imgURL }
                : require("../../assets/images/profile.jpeg")
            }
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
              {userProfile ? userProfile.name : ""}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#fff",
              }}
            >
              {userProfile ? userProfile.phoneNumber : ""}
            </Text>

            <TouchableOpacity
              style={{
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

        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={{
            paddingTop: 10,
          }}
        >
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
                fill={
                  (dailyTarget.dailyGoalReached * 100) / dailyTarget.dailyGoal
                }
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
              {(
                (dailyTarget.dailyGoalReached * 100) /
                dailyTarget.dailyGoal
              ).toFixed(2)}
              %
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
                fill={
                  (monthlyTarget.monthlyGoalReached * 100) /
                  monthlyTarget.monthlyGoal
                }
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
              {(
                (monthlyTarget.monthlyGoalReached * 100) /
                monthlyTarget.monthlyGoal
              ).toFixed(2)}
              %
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
