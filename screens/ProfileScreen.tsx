import * as React from 'react';
import {Image, StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {SettingList} from "../components/SettingList";
import {LogoutComponent} from "../components/LogoutComponent";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={[styles.centroid]}>
        <Image
            resizeMode="cover"
            style={[{ width: 200, height: 200 }, styles.imageCover]}
            source={require('../assets/images/logo.png')}
        />
      </View>
      <View style={styles.settings}>
        <View style={styles.settingsCombo}>
          <SettingList />
          <View style={styles.settingsCombo}>
            <LogoutComponent />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 0,
    borderColor: "transparent",
    shadowColor: 'transparent',
    backgroundColor: "#efefef"
  },
  centroid: {
    width: '100%',
    minWidth: '100%',
    margin: 0,
    padding: 0,
    alignItems: "center"
  },
  cover: {
    width: '100%',
    minWidth: '100%',
    margin: 0,
    padding: 0,
    alignItems: "center"
  },
  imageCover: {
    margin: 30,
    borderRadius: 500,
    borderWidth: 1,
    borderColor: "#ccc"
  },
  settings: {
    flexGrow: 1,
    flex: 1,
    borderWidth: 0,
    borderColor: "transparent",
    shadowColor: 'transparent',
    backgroundColor: "transparent",
  },
  settingsCombo: {
    marginTop: 10,
    flexGrow: 1,
    flex: 1,
    width: '100%',
    minWidth: '100%',
    borderWidth: 0,
    borderColor: "transparent",
    shadowColor: 'transparent',
    backgroundColor: "transparent"
  },
});
