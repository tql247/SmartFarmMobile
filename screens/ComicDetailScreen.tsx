import * as React from 'react';
import {Dimensions, FlatList, Image, StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {TopCarousel} from "../components/TopCarousel";
import {MainViewScroll} from "../components/MainViewScroll";
import {NewChapterList} from "../components/NewChapterList";
import {NewComic} from "../components/NewComic";
import {DetailItem} from "../components/DetailItem";
import {FootItemDetail} from "../components/FootItemDetail";

const {height} = Dimensions.get("window");
const {width} = Dimensions.get("window");

export default function ComicDetailScreen({props, navigation, route} : any) {
    const state = {};

    return (
        <FlatList
            extraData={state}
            data={[1]}
            numColumns={1}
            renderItem={({item}) => (
                <View style={styles.container}>
                    <DetailItem {...props} navigation={navigation} params={route.params} />
                </View>
            ) }
        />
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 0,
        borderColor: "transparent",
        shadowColor: 'transparent',
    },
});
