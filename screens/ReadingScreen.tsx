import * as React from 'react';
import {Dimensions, FlatList, StyleSheet} from 'react-native';

import { Text, View } from '../components/Themed';
import {ChapterContent} from "../components/ChapterContent";
import {Icon} from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {useEffect, useState} from "react";
import {APIConfig} from "../config";
import {ChapterBottomNav} from "../components/ChapterBottomNav";

const {height} = Dimensions.get("window");

export default function ReadingScreen({props, navigation, route} : any) {
    const insets = useSafeAreaInsets();
    const [chapter, setChapter] = useState({
        chapterId: route.params.chapterId,
        chapterName: route.params.chapterName,
        updatedAt: route.params.updatedAt
    });

    return (
        <View  style={{ position: "relative", flex: 1, marginTop: insets.top, marginBottom: insets.bottom, backgroundColor: "rgba(255,255,255,0)"}}>
            <View style={{height: height - insets.top - insets.bottom, backgroundColor: "#ccc"}}>
                <View style={[styles.topFab]}>
                    <View style={styles.fabItem}>
                        <Icon onPress={() => (navigation.goBack())} size={30} color={"#666666"} name={"chevron-back"} type={"ionicon"} />
                    </View>
                    <View style={{marginHorizontal: 10}}>
                        <Text style={styles.chapterTitle}>
                            {chapter.chapterName.slice(0, 30) + (chapter.chapterName.length > 30?"...":"")}
                        </Text>
                        <Text style={{color: "#666666", fontStyle: "italic"}}>{chapter.updatedAt}</Text>
                    </View>
                </View>
                <FlatList
                    extraData={chapter}
                    data={[1]}
                    renderItem={({item}) => (
                        <ChapterContent key={chapter.chapterId} chapter={chapter} />
                    ) }
                />
                <ChapterBottomNav setChapter={setChapter} chapterId={route.params.chapterId} mangaProviderId={route.params.mangaProviderId}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    chapterTitle: {
        fontSize: 20,
        color: "#464846",
        overflow: "hidden"
    },
    topFab: {
        borderTopColor: "#666666",
        color: "#666666",
        flexDirection: "row",
        width: "100%",
        paddingTop: 3,
        paddingBottom: 3,
        zIndex: 100,
        backgroundColor: "white",
        alignItems: "center"
    },
    fabItem: {
        alignItems: "center",
        justifyContent: "center",
    },
    fabItemText: {
        fontSize: 20,
        color: "#666666",
        alignItems: "center",
        justifyContent: "center",
    },
});
