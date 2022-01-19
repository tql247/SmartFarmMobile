import ListItemScreen from "./screens/ListItemScreen";
import ReadingScreen from "./screens/ReadingScreen";

/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  LoginScreen: undefined;
  ReadingScreen: undefined;
};

export type TabStackParamList = {
  ComicDetailScreen: undefined;
};

export type BottomTabParamList = {
  Machine: undefined;
  Sensor: undefined;
  Rule: undefined;
  Notification: undefined;
  Profile: undefined;
};

export type MachineParamList = {
  MachineScreen: undefined;
  ComicDetailScreen: undefined;
  ListItemScreen: undefined;
  ReadingScreen: undefined;
};

export type SensorParamList = {
  SensorScreen: undefined;
};

export type RuleParamList = {
  RuleScreen: undefined;
};

export type ProfileParamList = {
  ProfileScreen: undefined;
};

export type NotificationParamList = {
  NotificationScreen: undefined;
};
