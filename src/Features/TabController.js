import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
// Screens
// import Dashboard from '../StationaryScreens/Dashboard';
// import RiderProfile from '../StationaryScreens/RiderProfile';
// import History from '../StationaryScreens/History';
// import LeadershipBoard from '../StationaryScreens/LeadershipBoard';
// import KFC from '../StationaryScreens/KFC';
// import PaymentHistory from '../StationaryScreens/PaymentHistory';
import RiderHome from './RiderHome';
import RiderProfile from './RiderProfile';
import PaymentHistory from './PaymentHistory';
import LeaderBoard from './LeaderBoard';
const Tab = createBottomTabNavigator();
export default function AuthNavigation() {
  return (
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused
              ? 'md-home'
              : 'md-home-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'list' : 'list';
          } else if (route.name === 'LeaderBoard') {
            iconName = focused ? 'podium' : 'ios-podium-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'ios-person' : 'ios-person-outline';
          } else if (route.name === 'Payment Que') {
            iconName = focused ? 'card' : 'card-outline';
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0da5eb',
        tabBarInactiveTintColor: 'gray',
      })}
      >
        <Tab.Screen name="Home" options={{ headerShown: false }} component={RiderHome} />
        <Tab.Screen name="Account" options={{ headerShown: false }} component={RiderProfile} />
        <Tab.Screen name="Payment Que" options={{ headerShown: false }} component={PaymentHistory} />
        <Tab.Screen name="LeaderBoard" options={{ headerShown: false }} component={LeaderBoard} />
        {/* <Tab.Screen options={{ tabBarBadge: 3 }} name="PaymentHistory" options={{ headerShown: false }} component={RiderProfile} /> */}
        {/* <Tab.Screen name="History" options={{ headerShown: false }} component={History} />
        <Tab.Screen name="Leaderboard" options={{ headerShown: false }} component={KFC} />
        <Tab.Screen name="RiderProfile" options={{ headerShown: false }} component={RiderProfile} />
        <Tab.Screen name="Payment Que" options={{ headerShown: false }} component={PaymentHistory} />     */}
      </Tab.Navigator>
    
  );
}