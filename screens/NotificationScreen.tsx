import * as React from 'react';
import { StyleSheet } from 'react-native';
import {NotificationList} from "../components/NotificationList";
import { View } from '../components/Themed';

export default function NotificationScreen() {

  return (
      <View style={styles.container}>
        <NotificationList/>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 0,
    borderColor: "transparent",
    shadowColor: 'transparent',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
