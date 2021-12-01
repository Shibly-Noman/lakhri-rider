import * as SecureStore from "expo-secure-store";

const auth = {};

auth.setStatus = async (status) => {
    await SecureStore.setItemAsync("status", status);
}

auth.getStatus = async ()=>{
    const status = await SecureStore.getItemAsync("status")
    return JSON.parse(status);
}

auth.setUserID = async (userID) => {
    await SecureStore.setItemAsync("userID", userID)
}

auth.getUserID = async () => {
    const userID = await SecureStore.getItemAsync("userID");
    return JSON.parse(userID)
}

auth.setToken = async (token) => {
    await SecureStore.setItemAsync("token", token)
}

auth.getToken = async () => {
    const token = await SecureStore.getItemAsync("token");
    return JSON.parse(token)
}

auth.getHeaders = async () => {
    return {
        headers: { Authorization: `Bearer ${await auth.getToken()}` },
      };
}

auth.logout = async (callback) => {
    await SecureStore.deleteItemAsync("token");
    callback();
}


export default auth;