import React, { Component } from "react";
import {Image, ScrollView, StyleSheet, View, Dimensions, FlatList, TouchableOpacity} from "react-native";
import {Text} from "./Themed";
import {APIConfig} from "../config";
import {Icon} from "react-native-elements";

const {height, width} = Dimensions.get("window");
const imageWidth = width - 5;

interface Props {
    chapterId: any;
    mangaProviderId: any;
    setChapter: any;
}

export class ChapterBottomNav extends Component<Props> {
    state = {
        nextChapter: undefined,
        backChapter: undefined
    }

    getNextChapter(chapterId = this.props.chapterId) {
        const axios = require('axios');
        const url = APIConfig['api']['get_next_chapter']
            .replace("{chapterId}", chapterId)
            .replace("{mangaProviderId}", this.props.mangaProviderId);

        const config = {
            method: 'get',
            url: url,
            headers: {}
        };

        const _this = this;

        try {
            axios(config)
                .then(function (response: any) {
                    const nextChapter = response.data.chapter[0];

                    _this.setState({
                        nextChapter: nextChapter?{
                            chapterId: nextChapter.id,
                            chapterName: nextChapter.chapter_name,
                            updatedAt: nextChapter.updated_at || nextChapter.created_at
                        }: false
                    });
                })
                .catch(function (error: any) {
                    console.log(error);
                });

        } catch (e) {
        }
    }

    getBackChapter(chapterId = this.props.chapterId) {
        const axios = require('axios');
        const url = APIConfig['api']['get_back_chapter']
            .replace("{chapterId}", chapterId)
            .replace("{mangaProviderId}", this.props.mangaProviderId);

        const config = {
            method: 'get',
            url: url,
            headers: {}
        };

        const _this = this;

        try {
            axios(config)
                .then(function (response: any) {
                    const backChapter = response.data.chapter[0];
                    _this.setState({
                        backChapter: {
                            chapterId: backChapter.id,
                            chapterName: backChapter.chapter_name,
                            updatedAt: backChapter.updated_at || backChapter.created_at
                        }
                    })
                })
                .catch(function (error: any) {
                    console.log(error);
                });

        } catch (e) {
        }
    }

    _onclickNextChapter = () => {
        this.props.setChapter(this.state.nextChapter);
        const chapterId = this.state.nextChapter;
        if (chapterId) {
            this.getNextChapter(chapterId["chapterId"]);
            this.getBackChapter(chapterId["chapterId"]);
        }
    }

    _onclickBackChapter = () => {
        this.props.setChapter(this.state.backChapter);
        const chapterId = this.state.backChapter;
        if (chapterId) {
            this.getNextChapter(chapterId["chapterId"]);
            this.getBackChapter(chapterId["chapterId"]);
        }
    }

    _loadChapterAvailable = () => {
        this.getNextChapter();
        this.getBackChapter();
    }

    componentDidMount() {
        this._loadChapterAvailable();
    }

    render() {
        return (
            <View style={[styles.fab]}>
                <View style={styles.fabItem}>
                    <Icon
                        onPress={this._onclickBackChapter}
                        disabled={!this.state.backChapter}
                        disabledStyle={{backgroundColor: 'transparent'}}
                        size={27}
                        color={this.state.backChapter?"#666666":"rgba(102,102,102,0.25)"}
                        name={"arrow-back"}
                        type={"ionicon"} />
                </View>
                <View style={styles.fabItem}>
                    <Icon
                        onPress={this._onclickNextChapter}
                        disabled={!this.state.nextChapter}
                        disabledStyle={{backgroundColor: 'transparent'}}
                        size={27}
                        color={this.state.nextChapter?"#666666":"rgba(102,102,102,0.25)"}
                        name={"arrow-forward"}
                        type={"ionicon"} />
                </View>
                <View style={styles.fabItem}>
                    <Icon size={27} color={"#666666"} name={"comment-outline"} type={"material-community"} />
                    <Text style={styles.fabItemText}>20</Text>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    fab: {
        justifyContent: "space-around",
        flexDirection: "row",
        width: "100%",
        borderTopColor: "#666666",
        color: "#666666",
        zIndex: 100,
        backgroundColor: "white",
        alignItems: "center",
        paddingTop: 7,
        paddingBottom: 5
    },
    fabItem: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    fabItemText: {
        fontSize: 20,
        color: "#666666",
        alignItems: "center",
        justifyContent: "center",
    },
});
