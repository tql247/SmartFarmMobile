import React, { Component } from "react";
import {Image, ScrollView, StyleSheet, View, Dimensions, FlatList, TouchableOpacity} from "react-native";
import {Text} from "./Themed";
import {APIConfig} from "../config";


const {height, width} = Dimensions.get("window");
const numColumn = Math.floor(width/100) - 1;
console.log('numColumn')
console.log(width)
console.log(numColumn)

interface Props {
    navigation: any;
    params: any;
}

export class ChapterList extends Component<Props> {

    state = {
        screenHeight: 0,
        item: [
            {
                chapIndexer: '1',
                chapterName: '',
                updatedAt: "Aug 26,20",
                chapterId: "",
            },
        ]
    };


    _parseChapter(data: any) {
        const len = data.length;
        const newItems = data.map((item: any, index: any) => {
            return {
                chapIndexer: len - index,
                chapterName: item.chapter_name,
                updatedAt: new Date( item.updated_at || item.create_at).toLocaleString(),
                chapterId: item.id,
            }
        });

        this.setState({item: newItems})
    }


    _getMangaChapters() {
        const axios = require('axios');

        const config = {
            method: 'get',
            url: APIConfig['api']['get_manga_chapters'] + this.props.params.mangaProviderId,
            headers: {}
        };

        const self = this;

        axios(config)
            .then(function (response: any) {
                self._parseChapter(response.data.chapters)
            })
            .catch(function (error: any) {
                console.log(error);
            });

    }

    componentDidMount() {
        this._getMangaChapters();
    }

    render() {
        return (
            <View style={{ margin: 10, flex: 1}}>
                {this.state.item.map((item) => (
                    <View key={item.chapIndexer} style={styles.chapterContainer} >
                        <TouchableOpacity
                            onPress={() => (this.props.navigation.navigate("ReadingScreen",
                                {
                                    chapterId: item.chapterId,
                                    mangaProviderId: this.props.params.mangaProviderId,
                                    chapterName: item.chapterName,
                                    updatedAt: item.updatedAt
                                }
                            ))}
                        >
                            <Text style={styles.chapterContainer}>
                                Chap {item.chapIndexer}: {item.chapterName}
                            </Text>
                            <Text style={{color: "#666666", fontStyle: "italic"}}>{item.updatedAt}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    FlatList: {
        backgroundColor: "red",
        margin: 10,
        borderWidth: 0,
    },
    chapterContainer: {
        flex: 1,
        flexWrap: "wrap",
        fontSize: 15,
        paddingVertical: 3
    },
});
