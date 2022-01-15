import React, { Component } from "react";
import {
    Image,
    StyleSheet,
    View,
    Dimensions,
    Switch,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { ListItem, Icon } from "react-native-elements";
import { Text } from "./Themed";
import { APIConfig } from "../config";

interface Props {
    navigation: any;
}

let itemIndex = 0;

export class NewChapterList extends Component<Props> {
    state = {
        items: [
            {
                idx: 0,
                title: "Comage",
                newChapter: "Chap 32: Release That Witch",
                lastUpdate: "Just now",
                mangaId: "",
                active: false,
            },
            {
                idx: 1,
                title: "Grand blue",
                newChapter: "Chap 12: Gakkou no Minna to Isekai no Mujintou",
                lastUpdate: "30 mins ago",
                isFollowing: true,
                tag: [
                    "Action",
                    "Adventure",
                    "Comedy",
                    "Drama",
                    "Fantasy",
                    "Harem",
                    "Psychological",
                    "Romance",
                ],
                active: true,
            },
        ],
        active: false,
    };

    _mapData(data: any) {
        const newItems = [];
        for (let row of data) {
            const item = {
                title: row["manga_name"],
                newChapter: row["chapter_name"],
                lastUpdate: row["updated_at"] || row["create_at"],
                mangaProviderId: row["manga_provider_id"],
                forwardScreen: "",
            };

            newItems.push(item);
        }
        console.log("newItems");
        console.log(newItems);

        this.setState({ items: newItems });
    }

    _getLatestChapter() {
        const axios = require("axios");

        const config = {
            method: "get",
            url: APIConfig["api"]["get_chapter_latest"],
            headers: {},
        };

        const self = this;

        axios(config)
            .then(function (response: any) {
                self._mapData(response.data.latestChapters);
            })
            .catch(function (error: any) {
                console.log(error);
            });
    }

    componentDidMount() {
        this._getLatestChapter();
    }

    updateMachineState(value: boolean, idx: number) {
        console.log('a')
        
        const _itemIndex = this.state.items.findIndex(x => x.idx === idx);
        const cpyItems = this.state.items;

        cpyItems[_itemIndex].active = value;
        console.log(cpyItems)
        this.setState({items: cpyItems})
        console.log(this.state.items)
    }

    renderTitle(idx: number, name: string, chapter: string, time: string, active: boolean) {
        itemIndex++;
        
        return (
            <View
                style={{
                    backgroundColor:
                        itemIndex % 2 === 0 ? "rgba(225,225,225,0.45)" : "transparent",
                    padding: 5,
                }}
            >
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View>
                        <Text style={styles.title} numberOfLines={1}>
                            {name.slice(0, 50) + (name.length > 50 ? "..." : "")}
                        </Text>
                        <Text style={styles.chapter}>Trạng thái: Đang tắt</Text>
                    </View>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={active ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        value={active}
                        onValueChange={(value) => this.updateMachineState(value, idx)}
                    />
                </View>
            </View>
        );
    }

    renderItem(item: any) {
        return (
            <View style={styles.imgContainer}>
                {this.renderTitle(item.idx, item.title, item.newChapter, item.lastUpdate, item.active)}
            </View>
        );
    }

    render() {
        return (
            <View style={styles.flatListContainer}>
                <FlatList
                    style={styles.scrollView}
                    data={this.state.items}
                    extraData={this.state}
                    renderItem={({ item }) => (
                        <View style={styles.imgContainer}>
                            <TouchableOpacity
                                // onPress={() =>
                                //     this.props.navigation.navigate(
                                //         item.forwardScreen || "ComicDetailScreen",
                                //         {
                                //             mangaProviderId: item.mangaProviderId,
                                //             mangaTitle: item.title,
                                //         }
                                //     )
                                // }
                            >
                                {this.renderItem(item)}
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flatListContainer: {
        flex: 1,
        marginBottom: 20,
    },
    title: {
        color: "#666666",
        fontSize: 16,
        fontWeight: "500",
        flexWrap: "wrap",
    },
    chapter: {
        color: "#767676",
        fontWeight: "400",
        flexWrap: "wrap",
        marginRight: 3,
    },
    time: {
        color: "#767676",
        fontWeight: "400",
        flexWrap: "wrap",
    },
    scrollView: {
        borderWidth: 0,
        borderColor: "transparent",
        shadowColor: "transparent",
        flex: 1,
    },
    imgContainer: {
        flexGrow: 1,
    },
    image: {
        maxHeight: 160,
        maxWidth: 120,
        minHeight: 160,
        minWidth: 120,
        borderRadius: 5,
        flex: 1,
        flexGrow: 1,
        borderWidth: 2,
        borderColor: "#feb47b",
        color: "#feb47b",
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
    },
});
