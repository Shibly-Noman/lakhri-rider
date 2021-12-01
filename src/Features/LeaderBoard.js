import { setStatusBarHidden } from "expo-status-bar";
import * as React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Rating, AirbnbRating } from "react-native-elements";
 
function RiderLeadershipBoard() {
  const [data, setData] = React.useState(null);
 
  React.useEffect(async () => {
    const token = await SecureStore.getItemAsync("token");
 
    try {
      const res = await axios.get(
        "https://peaceful-citadel-48843.herokuapp.com/rider/leader-ship-board",
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );
      setData(res.data.data);
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
          padding: 20,
          marginTop: 30,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginBottom: 20,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {/* <Image
                        source={require('../../../assets/images/hamburger_menu.svg')}
                        style={{
                            height: 27,
                            width: 30,
                            marginRight: 20
                        }}
                    /> */}
            <Text
              style={{
                fontSize: 25,
                color: "#fff",
              }}
            >
              Rider Leadership Board
            </Text>
          </View>
          {data &&
            data.map((el) => (
              <View
                key={el.rider._id}
                style={{
                  marginBottom: 20,
                  padding: 10,
                  borderRadius: 8,
                  margin: 0,
                  borderWidth: 1,
                  backgroundColor: "#fafafa",
                  borderColor: "#ddd",
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
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      borderWidth: 5,
                      borderColor: "#179BD7",
                      height: 120,
                      width: 120,
                      borderRadius: 120 / 2,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      source={{uri: el.rider.imgURL}}
                      style={{
                        height: 100,
                        width: 100,
                        borderRadius: 100 / 2,
                        borderColor: "#707070",
                        borderWidth: 1,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      paddingLeft: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        color: "#707070",
                      }}
                    >
                      {el.rider.name}
                    </Text>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingTop: 5,
                      }}
                    >
                      <Rating
                        ratingCount={5}
                        startingValue={(el.rider.averageRatingOfUser + el.rider.averageRatingOfVendor) /2}
                        imageSize={20}
                        readonly
                      />
                      <Text
                        style={{
                          fontSize: 15,
                          marginLeft: 20,
                        }}
                      >
                         {(el.rider.averageRatingOfUser + el.rider.averageRatingOfVendor) /2}
                      </Text>
                    </View>
                    <View
                      style={{
                        marginRight: "auto",
                        fontSize: 12,
                        backgroundColor: "#fafafa",
                        padding: 5,
                        borderRadius: 5,
                        shadowColor: "#000",
                        shadowOpacity: 0.25,
                        shadowRadius: 5,
                        flexDirection: "row",
                        align: "left",
                        marginTop: 5,
                        borderRadius: 5,
                        paddingHorizontal: 10,
                      }}
                    >
                      <Image
                        source={require("../../assets/images/truck.png")}
                        style={{
                          height: 20,
                          width: 23,
                          marginRight: 15,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 15,
                        }}
                      >
                        {el.totalCompletedOrders}
                      </Text>
                    </View>
                    <View
                      style={{
                        marginRight: "auto",
                        fontSize: 12,
                        backgroundColor: "#fafafa",
                        padding: 5,
                        borderRadius: 5,
                        shadowColor: "#000",
                        shadowOpacity: 0.25,
                        shadowRadius: 5,
                        flexDirection: "row",
                        align: "left",
                        marginTop: 10,
                        borderRadius: 5,
                        paddingHorizontal: 10,
                      }}
                    >
                      <Image
                        source={require("../../assets/images/taka.png")}
                        style={{
                          height: 20,
                          width: 15,
                          marginRight: 15,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 15,
                        }}
                      >
                        {el.riderTotalEarnings}/=
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
 
          <View
            style={{
              height: 20,
            }}
          ></View>
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
 
export default RiderLeadershipBoard;