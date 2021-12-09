import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

import { View } from '../components/Themed';
import {FollowingFlatList} from "../components/FollowingFlatList";
import {useActionSheet} from "@expo/react-native-action-sheet";


export default function FollowScreen({props, route, navigation} : any) {

    const { showActionSheetWithOptions } = useActionSheet();

  return (
      <View style={styles.container}>
        <FollowingFlatList
            {...props}
            navigation={navigation}
            showActionSheetWithOptions={showActionSheetWithOptions}
        />
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
});
