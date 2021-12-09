import React, { Component } from "react";
import {Image, ScrollView, StyleSheet, View, Dimensions, FlatList, TouchableOpacity} from "react-native";
import {Text} from "./Themed";
import {APIConfig} from "../config";

const {height, width} = Dimensions.get("window");
const imageWidth = width - 5;

interface Props {
    chapter: any;
}

export class ChapterContent extends Component<Props> {
    state = {
        index: 0,
        screenHeight: 0,
        chapterId: this.props.chapter.chapterId,
        item: [
            {
                indexer: '1',
                imageURI: 'https://i.imgur.com/upR8yZY.jpg',
                width: 0,
                height: 0,
            },
        ]
    };

    _parseChapterContent(data: any) {
        const newItems = data.map((item: any, index: any) => {
            return {
                'indexer': index,
                'imageURI': item.chapter_content_uri,
                'width': 0,
                'height': 0,
            }
        })

        this.setState({item: newItems});

        this.state.item.map((item, idx: number) => {
            Image.getSize(item.imageURI, (width, height) => {
                this.state.item[idx].width = width;
                this.state.item[idx].height = height;
                this.setState({item: this.state.item})
            })
        })
    }

    _getChapterContent() {
        const axios = require('axios');

        const config = {
            method: 'get',
            url: APIConfig['api']['get_chapter_details'] + this.state.chapterId,
            headers: {}
        };

        const self = this;

        axios(config)
            .then(function (response: any) {
                self._parseChapterContent(response.data.chapterDetails);
            })
            .catch(function (error: any) {
                console.log(error);
            });
    }



    componentDidMount() {
        console.log('aàd')
        console.log('aàd')
        console.log('aàd')
        this._getChapterContent();

    }

    render() {
        return (
            <View>
                {this.state.item.map((item) => (
                    <View key={item.indexer} style={styles.container}>
                        <Image
                            style={[styles.image, {height: imageWidth*item.height/item.width}]}
                            resizeMode="cover"
                            source={{ uri: item.imageURI }}
                        />
                    </View>
                ))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        paddingHorizontal: 10,
        height: "auto",
        width: imageWidth,
        overflow: "hidden",
    },
});
