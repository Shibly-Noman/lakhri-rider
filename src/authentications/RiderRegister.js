import * as React from "react";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Text,
  Image,
  View,
  Dimensions,
  Button,
  Alert,
  ScrollView,
  ToastAndroid,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

export default function RiderRegister({ navigation }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [modalVisible, setModalVisible] = useState(false);

  const [userImage, setUserImage] = useState(null);
  const [nidImage, setNidImage] = useState(null);
  const [dLicenceImage, setDLicenceImage] = useState(null);
  const [bLicenceImage, setBLicenceImage] = useState(null);
  const [vehicleType, setVehicleType] = useState(null);
  const [submitButtonText, setSubmitButtonText] = useState("SUBMIT");

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "android") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
      base64: true,
    });

    if (!result.cancelled) {
      return result;
    }
  };

  const postImageToCloud = async (image) => {
    let base64Img = `data:image/jpg;base64,${image.base64}`;

    //Add your cloud name
    let apiUrl = "https://api.cloudinary.com/v1_1/lakhrifood/image/upload";

    let data = {
      file: base64Img,
      upload_preset: "ml_default",
    };

    const res = await axios.post(apiUrl, data);
    return res.data.secure_url;
  };

  const onSubmit = async (data) => {
    if(!userImage){
      return ToastAndroid.show("Please select your profile image.", ToastAndroid.SHORT);
    }
    if(!nidImage){
      return ToastAndroid.show("Please select your NID image.", ToastAndroid.SHORT);
    }

    if(vehicleType === 'motorcycle'){
      if(!dLicenceImage){
        return ToastAndroid.show("Please select your Driving License image.", ToastAndroid.SHORT);
      }
      if(!bLicenceImage){
        return ToastAndroid.show("Please select your Car Paper image.", ToastAndroid.SHORT);
      }
    }

    
    setSubmitButtonText("Uploading Files...");

    const payload = {
      ...data,
      vehicleType,
      imgURL: userImage ? await postImageToCloud(userImage) : null,
      drivingLicenceImgURL: dLicenceImage ?  await postImageToCloud(dLicenceImage) : null,
      carPaper: bLicenceImage ? await postImageToCloud(bLicenceImage) : null,
      nidImgURL: nidImage ? await postImageToCloud(nidImage) : null,
    };

    console.log(payload);

    const res = await axios.post(
      "https://peaceful-citadel-48843.herokuapp.com/auth/rider/signup",
      payload
    );
    setSubmitButtonText("Submit");
    reset();
    setUserImage(null);
    setBLicenceImage(null)
    setDLicenceImage(null)
    setNidImage(null)

    if (res.data.errors) {
      ToastAndroid.show("Registration Failed!", ToastAndroid.SHORT);
      
    } else {
      ToastAndroid.show("Registration Successful!", ToastAndroid.SHORT);
      navigation.navigate("RiderLogin");
    }
  };
  return (
    <ImageBackground
      source={require("../../assets/images/primary_bg_fill.png")}
      resizeMode="cover"
      style={styles.bgImage}
    >
      <View style={styles.titleSectionProperties}>
        <Text style={styles.primaryTitle}>
          Welcome! We'd like to know about you
        </Text>
      </View>
      <TouchableOpacity
        onPress={async () => setUserImage(await pickImage())}
        style={{
          marginLeft: 20,
          backgroundColor: "#fff",
          borderRadius: 40,
          height: 80,
          width: 80,
          alignContent: "center",
          justifyContent: "center",
          paddingLeft: 10,
        }}
      >
        {!userImage && (
          <Image
            style={{
              height: 60,
              width: 60,
            }}
            source={require("../../assets/images/user.png")}
          />
        )}
        {userImage && (
          <Image
            source={{ uri: userImage.uri }}
            style={{ width: 60, height: 60, borderRadius: 30 }}
          />
        )}
      </TouchableOpacity>

      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLable}>Name</Text>
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </View>
            )}
            name="name"
            defaultValue=""
          />
          {errors.name && (
            <Text
              style={{
                color: "#F00",
              }}
            >
              Name is required.
            </Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLable}>Email</Text>
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </View>
            )}
            name="email"
            defaultValue=""
          />
          {errors.email && (
            <Text
              style={{
                color: "#F00",
              }}
            >
              email is required.
            </Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLable}>Phone Number</Text>
                <TextInput
                  keyboardType="numeric"
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </View>
            )}
            name="phoneNumber"
            defaultValue=""
          />
          {errors.phoneNumber && (
            <Text
              style={{
                color: "#F00",
              }}
            >
              Phone Number is required.
            </Text>
          )}

          <Controller
            control={control}
            rules={{
              maxLength: 100,
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLable}>Password</Text>
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={true}
                />
              </View>
            )}
            name="password"
            defaultValue=""
          />
          {errors.password && (
            <Text
              style={{
                color: "#F00",
              }}
            >
              Password is required.
            </Text>
          )}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLable}>Location</Text>
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </View>
            )}
            name="location"
            defaultValue=""
          />
          {errors.location && (
            <Text
              style={{
                color: "#F00",
              }}
            >
              Location is required.
            </Text>
          )}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLable}>City</Text>
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </View>
            )}
            name="city"
            defaultValue=""
          />
          {errors.city && (
            <Text
              style={{
                color: "#F00",
              }}
            >
              City is required.
            </Text>
          )}
          <Controller
            control={control}
            rules={{
              maxLength: 100,
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLable}>Vehicle type</Text>
                <View
                  style={{
                    minWidth: "100%",
                    borderWidth: 1,
                    borderColor: "#05abf7",
                    // padding: 10,
                    marginBottom: 10,
                    borderRadius: 6,
                    backgroundColor: "#fff",
                  }}
                >
                  <Picker
                    selectedValue={vehicleType}
                    onValueChange={(itemValue, itemIndex) =>
                      setVehicleType(itemValue)
                    }
                  >
                    <Picker.Item label="Cycle" value="cycle" />
                    <Picker.Item label="Motorcycle" value="motorcycle" />
                  </Picker>
                </View>
              </View>
            )}
            name="vehicleType"
            defaultValue="cycle"
          />
          {errors.vehicleType && (
            <Text
              style={{
                color: "#F00",
              }}
            >
              Vehicle Type is Required
            </Text>
          )}

          <TouchableOpacity
            onPress={async () => setNidImage(await pickImage())}
            style={{
              backgroundColor: "#fff",
              alignContent: "center",
              justifyContent: "center",
              backgroundColor: "#DDD",
              padding: 20,
              borderRadius: 15,
              marginTop: 15,
              marginBottom: 15,
            }}
          >
            {!nidImage && (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{
                    height: 40,
                    width: 40,
                  }}
                  source={require("../../assets/images/file.png")}
                />
                <Text
                  style={{
                    paddingTop: 10,
                    fontSize: 12,
                  }}
                >
                  Upload your NID
                </Text>
              </View>
            )}
            {nidImage && (
              <Image
                source={{ uri: nidImage.uri }}
                style={{ width: 100, height: 100, borderRadius: 10 }}
              />
            )}
          </TouchableOpacity>

          {vehicleType == "motorcycle" && (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={async () => setDLicenceImage(await pickImage())}
                style={{
                  backgroundColor: "#fff",
                  alignContent: "center",
                  justifyContent: "center",
                  backgroundColor: "#DDD",
                  padding: 20,
                  borderRadius: 15,
                  width: "48%",
                  // margin: 10,
                }}
              >
                {!dLicenceImage && (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{
                        height: 40,
                        width: 40,
                      }}
                      source={require("../../assets/images/file.png")}
                    />
                    <Text
                      style={{
                        paddingTop: 10,
                        fontSize: 12,
                      }}
                    >
                      Driving Licence
                    </Text>
                  </View>
                )}
                {dLicenceImage && (
                  <Image
                    source={{ uri: dLicenceImage.uri }}
                    style={{ width: 100, height: 100, borderRadius: 10 }}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={async () => setBLicenceImage(await pickImage())}
                style={{
                  backgroundColor: "#fff",
                  alignContent: "center",
                  justifyContent: "center",
                  backgroundColor: "#DDD",
                  padding: 20,
                  borderRadius: 15,
                  width: "48%",
                  // margin: 10,
                }}
              >
                {!bLicenceImage && (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{
                        height: 40,
                        width: 40,
                      }}
                      source={require("../../assets/images/file.png")}
                    />
                    <Text
                      style={{
                        paddingTop: 10,
                        fontSize: 12,
                      }}
                    >
                      Registration Paper
                    </Text>
                  </View>
                )}
                {bLicenceImage && (
                  <Image
                    source={{ uri: bLicenceImage.uri }}
                    style={{ width: 100, height: 100, borderRadius: 10 }}
                  />
                )}
              </TouchableOpacity>
            </View>
          )}

          <View
            style={{
              height: 50,
            }}
          ></View>
        </ScrollView>

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={styles.appButtonContainer}
        >
          <Text style={styles.appButtonText}>{submitButtonText}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minWidth: "100%",
    padding: 24,
    paddingTop: 40,
    paddingBottom: 80,
  },
  titleSectionProperties: {
    minWidth: "100%",
    padding: 22,
    marginTop: 20,
  },
  inputWrapper: {
    minWidth: "100%",
  },
  inputLable: {
    marginBottom: 10,
    color: "#c2c4c7",
  },
  input: {
    minWidth: "100%",
    borderWidth: 1,
    borderColor: "#05abf7",
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  primaryTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
    color: "#D3d3d3",
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
    position: "absolute",
    bottom: 5,
    elevation: 8,
    backgroundColor: "#02adfb",
    borderRadius: 6,
    paddingVertical: 14,
    paddingHorizontal: 40,
    marginTop: 20,
    marginBottom: 10,
    minWidth: "100%",
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
