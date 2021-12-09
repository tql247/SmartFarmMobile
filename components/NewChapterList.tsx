import React, { Component } from "react";
import {
    Image,
    StyleSheet,
    View,
    Dimensions,
    FlatList,
    TouchableOpacity
} from "react-native";
import { ListItem, Icon } from 'react-native-elements';
import {Text} from "./Themed";
import {APIConfig} from "../config";

interface Props {
    navigation: any
}

let itemIndex = 0;

export class NewChapterList extends Component<Props>  {

    state = {
        items: [
            {
                title: 'Comage',
                newChapter: 'Chap 32: Release That Witch',
                lastUpdate: "Just now",
                mangaId: ""
            },
            {
                title: 'Grand blue',
                newChapter: 'Chap 12: Gakkou no Minna to Isekai no Mujintou',
                lastUpdate: "30 mins ago",
                isFollowing: true,
                tag: [
                    "Action", "Adventure", "Comedy", "Drama", "Fantasy", "Harem" ,"Psychological" , "Romance"
                ]
            },
            {
                title: 'Soudouki tensei isekai',
                newChapter: 'Chap 111: Soredemo Ayumu wa Yosetekuru',
                lastUpdate: "1 hours ago",
            },
            {
                title: 'Konosuba',
                newChapter: 'Chap 45: ApretÉ El BotÓN Durante Un MillÓN new It, I Was The Strongest',
                lastUpdate: "1 hours ago",
            },
            {
                title: 'Overlord',
                newChapter: 'Chap 90: MP, 武炼巅峰',
                lastUpdate: "3 hours ago",
                isFollowing: false,
                tag: [
                    "Action" , "Adventure" , "Fantasy" , "Historical" , "Martial arts"
                ]
            },
            {
                title: 'Goblin Slayer',
                newChapter: 'Chap 78: うらら迷路帖 ; Urara 迷路帖',
                lastUpdate: "5 hours ago",
                isFollowing: false,
                tag: [
                    "Action" ,"Adventure", "Fantasy", "Historical" ,"Martial arts"
                ]
            },
            {
                title: 'Itensei Slime Dataken',
                newChapter: 'Chap 66: キルボードを駆使して最強に至る',
                lastUpdate: "1 day ago",
                isFollowing: false,
                tag: [
                    "Adventure", "Fantasy", "Shounen",
                ]
            },
            {
                title: 'Re: Zero',
                newChapter: 'Chap 12: ダイI (English); Diamond no Ace 2',
                lastUpdate: "1 day ago",
                isFollowing: false,
                tag: [
                    "Comedy" ,"School life", "Shounen", "Sports"
                ]
            },
            {
                title: 'To you, the immortal',
                newChapter: 'Chap 40: Оперативный отряд "Daishikkaku" ; 戦隊大失格',
                lastUpdate: "1 day ago",
            },
            {
                title: 'Blue Period',
                newChapter: 'Chap 72: ブルーピリオド',
                mangaProviderId: "",
                forwardScreen: "",
                lastUpdate: "1 day ago",
            }
        ]
    };

    _mapData(data: any) {
        const newItems = []
        for (let row of data) {
            const item = {
                title: row["manga_name"],
                newChapter: row["chapter_name"],
                lastUpdate: row["updated_at"] || row["create_at"],
                mangaProviderId: row["manga_provider_id"],
                forwardScreen: "",
            }

            newItems.push(item)
        }
        console.log('newItems')
        console.log(newItems)

        this.setState({items: newItems})
    }

    _getLatestChapter() {
        const axios = require('axios');

        const config = {
            method: 'get',
            url: APIConfig['api']['get_chapter_latest'],
            headers: {}
        };

        const self = this

        axios(config)
            .then(function (response: any) {
                self._mapData(response.data.latestChapters)
            })
            .catch(function (error: any) {
                console.log(error);
            });
    }

    componentDidMount() {
        this._getLatestChapter();
    }

    renderTitle(name: string, chapter: string, time: string) {
        itemIndex++;

        return (
            <View style={{backgroundColor: itemIndex%2===0?"rgba(225,225,225,0.45)":"transparent", padding: 5}}>
                <Text style={styles.title} numberOfLines={1}>
                    {name.slice(0, 50) + (name.length>50?"...":"")}
                </Text>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={styles.chapter}>
                        {chapter}
                    </Text>
                    <Text style={styles.time}>
                        {time}
                    </Text>
                </View>
            </View>
        )
    }

    renderItem(item: any) {
        return (
            <View style={styles.imgContainer}>
                {this.renderTitle(item.title, item.newChapter, item.lastUpdate)}
            </View>
        )
    }

    render() {
        return (
            <View style={styles.flatListContainer}>
                <FlatList
                    style={styles.scrollView}
                    data={this.state.items}
                    renderItem={({item}) => (
                        <View style={styles.imgContainer}>
                            <TouchableOpacity
                                onPress={() => (this.props.navigation.navigate(
                                        item.forwardScreen || "ComicDetailScreen",
                                        {
                                            mangaProviderId: item.mangaProviderId,
                                            mangaTitle: item.title
                                        }
                                    ))}
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
        marginBottom: 20
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
        marginRight: 3
    },
    time: {
        color: "#767676",
        fontWeight: "400",
        flexWrap: "wrap",
    },
    scrollView: {
        borderWidth: 0,
        borderColor: "transparent",
        shadowColor: 'transparent',
        flex: 1
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
        justifyContent: "center"
    },
});
