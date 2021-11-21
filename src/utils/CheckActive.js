import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function CheckActive({ navigation }) {
    const [isActive, setIsActive] = React.useState(true);
    useEffect(() => {
        if(isActive){
            navigation.navigate('TabController');
        } else {
            console.log('ok')
            // navigation.navigate('WaitingPage');
        }
    })

  return (
    <View style={styles.container}>
      <Text>Please Wait. Redirecting...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
