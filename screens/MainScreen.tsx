import * as React from 'react';
import {Dimensions, FlatList, RefreshControl, StyleSheet, TouchableOpacity} from 'react-native';

import { Text, View } from '../components/Themed';
import {MainViewScroll} from "../components/MainViewScroll";
import {NewChapterList} from "../components/NewChapterList";
import {NewComic} from "../components/NewComic";
import {GotMovieList} from "../components/GotMovieList";
import {TopTrend} from "../components/TopTrend";
import {Icon} from "react-native-elements";
import {ListTag} from "../components/ListTag";

const {height} = Dimensions.get("window");

const wait = (timeout: any) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
};

export default function MainScreen({ navigation, props } : any) {
    const [refreshing, setRefreshing] = React.useState(false);


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(2000).then(() => setRefreshing(false));
    }, []);

    return (
        <View style={styles.container}>
          <FlatList
              data={[1]}
              numColumns={1}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              renderItem={({item}) => (
                  <View style={styles.container}>
                      <View style={[styles.threadContainer, {margin: 0}]}>
                          <NewChapterList {...props} navigation={navigation} />
                      </View>
                  </View>
              ) }
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
    scrollView: {
        borderWidth: 0,
        borderColor: "transparent",
        shadowColor: 'transparent',
        flex: 1,
        flexGrow: 1,
        height: "100%",
        minHeight: height,
    },
    threadContainer: {
        borderWidth: 0,
        margin: 2.5,
        borderColor: "transparent",
        shadowColor: 'transparent',
        marginBottom: 10
    },
    threadTitle: {
        color: "#ff7e5f",
        borderWidth: 0,
        margin: 2.5,
        marginBottom: 3,
        fontSize: 18,
        fontWeight: "500",
        borderColor: "transparent",
        shadowColor: 'transparent',
    },
});
