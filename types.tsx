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
  Main: undefined;
  Search: undefined;
  Follow: undefined;
  Notification: undefined;
  Profile: undefined;
};

export type MainParamList = {
  MainScreen: undefined;
  ComicDetailScreen: undefined;
  ListItemScreen: undefined;
  ReadingScreen: undefined;
};

export type SearchParamList = {
  SearchScreen: undefined;
};

export type FollowParamList = {
  FollowScreen: undefined;
};

export type ProfileParamList = {
  ProfileScreen: undefined;
};

export type NotificationParamList = {
  NotificationScreen: undefined;
};
