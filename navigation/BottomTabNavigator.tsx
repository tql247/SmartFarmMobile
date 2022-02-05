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
import MachineScreen from '../screens/MachineScreen';
import RuleScreen from '../screens/RuleScreen';
import SensorScreen from '../screens/SensorScreen';
import { BottomTabParamList, NotificationParamList, ProfileParamList, MachineParamList, RuleParamList, SensorParamList } from '../types';
import {StyleSheet} from "react-native";
import GradientHeaderTitle from "../components/GradientHeaderTitle";
import NotificationScreen from "../screens/NotificationScreen";
import LinkingConfiguration from './LinkingConfiguration';
import ListItemScreen from "../screens/ListItemScreen";
import { ListItem, Icon } from 'react-native-elements';
import ProfileDetailScreen from '../screens/ProfileDetailScreen';


const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Machine"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Machine"
        component={MachineNavigator}
        options={{
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "ios-water" : "ios-water-outline"} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Sensor"
        component={SensorNavigator}
        options={{
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "ios-radio" : "ios-radio-outline"} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Rule"
        component={RuleNavigator}
        options={{
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "ios-time" : "ios-time-outline"} color={color} />,
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
const MachineStack = createStackNavigator<MachineParamList>();

function MachineNavigator({navigation} : any) {
  return (
    <MachineStack.Navigator
        screenOptions={{
            headerTintColor: 'white',
            headerBackground: () =>
                <GradientHeaderTitle />,
            headerStyle: { backgroundColor: '#feb47b' },

        }}
    >
      <MachineStack.Screen
        name="MachineScreen"
        component={MachineScreen}
        options={{ headerTitle: "Danh sách thiết bị", headerStyle: styles.container, headerTitleAlign: "center", headerBackTitleVisible: false }}
      />
    </MachineStack.Navigator>
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
        options={{  headerTitle: "Danh sách cảm biến", headerStyle: styles.container, headerTitleAlign: "center",
            // headerLeft: () => (<Ionicons size={30} name={"ios-arrow-back"} onPress={ () => { navigation.goBack()}} />),
            headerBackTitleVisible: false,
        }}
      />
    </SensorStack.Navigator>
  );
}


const RuleStack = createStackNavigator<RuleParamList>();

function RuleNavigator() {
  return (
    <RuleStack.Navigator
        screenOptions={{
            headerTintColor: 'white',
            headerBackground: () =>
                <GradientHeaderTitle />,
            headerStyle: { backgroundColor: '#feb47b' },
        }}
    >
      <RuleStack.Screen
        name="RuleScreen"
        component={RuleScreen}
        options={{ headerTitle: "Danh sách điều kiện chạy", headerStyle: styles.container, headerTitleAlign: "center",
        // headerLeft: () => (<Ionicons size={30} name={"ios-create"} color="#fff" onPress={ () => { console.log(1) }} />),
      
        }}
      />
    </RuleStack.Navigator>
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
        options={{ headerTitle: 'Thông báo', headerTitleAlign: "center"}}
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
      <ProfileStack.Screen
        name="ProfileDetailScreen"
        component={ProfileDetailScreen}
        options={{  headerTitle: 'Profile Settings', headerTitleAlign: "center"}}
      />
    </ProfileStack.Navigator>
  );
}


const styles = StyleSheet.create({
    fff: {
        backgroundColor: 'white',
    },
    container: {
        backgroundColor: 'transparent',
    }
});
