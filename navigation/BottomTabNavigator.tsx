/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ProfileScreen from '../screens/ProfileScreen';
import MainScreen from '../screens/MainScreen';
import FarmScreen from '../screens/FarmScreen';
import SensorScreen from '../screens/SensorScreen';
import { BottomTabParamList, NotificationParamList, ProfileParamList, MainParamList, FarmParamList, SensorParamList } from '../types';
import {StyleSheet} from "react-native";
import GradientHeaderTitle from "../components/GradientHeaderTitle";
import NotificationScreen from "../screens/NotificationScreen";
import ComicDetailScreen from "../screens/ComicDetailScreen";
import LinkingConfiguration from './LinkingConfiguration';
import ListItemScreen from "../screens/ListItemScreen";
import { ListItem, Icon } from 'react-native-elements';
import ReadingScreen from "../screens/ReadingScreen";


const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Main"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Main"
        component={MainNavigator}
        options={{
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "ios-flame" : "ios-flame-outline"} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Sensor"
        component={SensorNavigator}
        options={{
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "ios-search" : "ios-search-outline"} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Farm"
        component={FarmNavigator}
        options={{
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "ios-heart" : "ios-heart-outline"} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Notification"
        component={NotificationNavigator}
        options={{
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "ios-notifications" : "ios-notifications-outline"} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "ios-person" : "ios-person-outline"} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const MainStack = createStackNavigator<MainParamList>();

function MainNavigator({navigation} : any) {
  return (
    <MainStack.Navigator
        screenOptions={{
            headerTintColor: 'white',
            headerBackground: () =>
                <GradientHeaderTitle />,
            headerStyle: { backgroundColor: '#feb47b' },

        }}
    >
      <MainStack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{ headerTitle: "Danh sách thiết bị", headerStyle: styles.container, headerTitleAlign: "center", headerBackTitleVisible: false }}
      />
      <MainStack.Screen
        name="ComicDetailScreen"
        component={ComicDetailScreen}
        options={{ headerTitle: "Detail", headerStyle: styles.container, headerTitleAlign: "center", headerBackTitleVisible: false }}
      />
      <MainStack.Screen
        name="ListItemScreen"
        component={ListItemScreen}
        options={{  headerTitle: "Listing", headerStyle: styles.container, headerTitleAlign: "center",
            // headerLeft: () => (<Ionicons size={30} name={"ios-arrow-back"} onPress={ () => { navigation.goBack()}} />),
            headerBackTitleVisible: false,
        }}
      />
    </MainStack.Navigator>
  );
}


const SensorStack = createStackNavigator<SensorParamList>();

function SensorNavigator() {
  return (
    <SensorStack.Navigator
        screenOptions={{
            headerTintColor: 'white',
            headerBackground: () =>
                <GradientHeaderTitle />,
        }}
    >
      <SensorStack.Screen
        name="SensorScreen"
        component={SensorScreen}
        options={{  headerTitle: "Listing", headerStyle: styles.container, headerTitleAlign: "center",
            // headerLeft: () => (<Ionicons size={30} name={"ios-arrow-back"} onPress={ () => { navigation.goBack()}} />),
            headerBackTitleVisible: false,
        }}
      />
    </SensorStack.Navigator>
  );
}


const FarmStack = createStackNavigator<FarmParamList>();

function FarmNavigator() {
  return (
    <FarmStack.Navigator
        screenOptions={{
            headerTintColor: 'white',
            headerBackground: () =>
                <GradientHeaderTitle />,
            headerStyle: { backgroundColor: '#feb47b' },
        }}
    >
      <FarmStack.Screen
        name="FarmScreen"
        component={FarmScreen}
        options={{ headerTitle: "Farming", headerStyle: styles.container, headerTitleAlign: "center" }}
      />
    </FarmStack.Navigator>
  );
}



const NotificationStack = createStackNavigator<NotificationParamList>();

function NotificationNavigator() {
  return (
    <NotificationStack.Navigator
        screenOptions={{
            headerTintColor: 'white',
            headerBackground: () =>
                <GradientHeaderTitle />,
            headerStyle: { backgroundColor: '#feb47b' },
        }}
    >
      <NotificationStack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{ headerTitle: 'Notifications', headerTitleAlign: "center"}}
      />
    </NotificationStack.Navigator>
  );
}


const ProfileStack = createStackNavigator<ProfileParamList>();

function ProfileNavigator() {
  return (
    <ProfileStack.Navigator
        screenOptions={{
            headerTintColor: 'white',
            headerBackground: () =>
                <GradientHeaderTitle />,
            headerStyle: { backgroundColor: '#feb47b' },
        }}
    >
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{  headerTitle: 'Profile Settings', headerTitleAlign: "center"}}
      />
    </ProfileStack.Navigator>
  );
}


const styles = StyleSheet.create({
    fff: {
        flex: 1,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'transparent',
    }
});