import React, { Component } from "react";
import {Image, ScrollView, StyleSheet, View, Dimensions, FlatList, TouchableOpacity} from "react-native";
import {Text} from "./Themed";

import { ListItem, Avatar, Icon, Button } from 'react-native-elements';
import {APIConfig} from "../config";
const {width} = Dimensions.get("window");
const randomColor = require('randomcolor');

interface Props {
    navigation: any
}

export class ItemListing extends Component<Props> {

    state = {
        screenHeight: 0,
        test: false,
        mangas: [
            {
                title: '',
                subtitle: '',
                imageCover: '',
                lastUpdate: "",
                isFollowing: false,
                tag: [],
                mangaProviderId: undefined
            },
        ]
    };

    updateTest = (test: boolean) => {
        this.setState({ test });
        console.log(this.state.test)
    };

    getNewestMangas() {
        const axios = require('axios');

        const config = {
            method: 'get',
            url: APIConfig['api']['get_manga_newest'],
            headers: {}
        };

        const self = this;

        axios(config)
            .then(function (response: any) {
                self.setState({
                    mangas: response.data.latestManga.map((manga: any) => ({
                        title: manga.manga_name,
                        subtitle: manga.description,
                        imageCover: manga.image_cover_thumbnail_uri,
                        lastUpdate: manga.updated_at || manga.created_at,
                        tag: manga.tags.split("#"),
                        mangaProviderId: manga.manga_provider_id
                    }))
                })
            })
            .catch(function (error: any) {
                console.log(error);
            });
    }

    componentDidMount() {
        this.getNewestMangas();
    }

    render() {
        const { test } = this.state;

        return (
            <View style={styles.flatListContainer}>
                <FlatList
                    extraData={this.state}
                    style={styles.scrollView}
                    data={this.state.mangas}
                    renderItem={({item}) => (
                            <View style={styles.itemContainer}>
                                <TouchableOpacity
                                    onPress={() => (this.props.navigation.navigate(
                                        "ComicDetailScreen",
                                        {
                                            subject: "Got Movie/Anime",
                                            mangaProviderId: item.mangaProviderId,
                                            mangaTitle: item.title
                                        }
                                    ))}
                                >
                                <Image
                                    style={styles.image}
                                    resizeMode="cover"
                                    source={{ uri: item.imageCover }}
                                />
                                </TouchableOpacity>
                                <View style={styles.content}>
                                    <TouchableOpacity
                                        onPress={() => (this.props.navigation.navigate(
                                            "ComicDetailScreen",
                                            {
                                                subject: "Got Movie/Anime",
                                                mangaProviderId: item.mangaProviderId,
                                                mangaTitle: item.title
                                            }
                                        ))}
                                    >
                                        <Text style={styles.title}>{item.title}</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.info}>Last update {item.lastUpdate}</Text>
                                    <Text style={styles.subtitle}>{item.subtitle}</Text>
                                    <View style={styles.separator}/>
                                    <View style={styles.tagContainer}>
                                        {item.tag.map((item, index) => {
                                            return (
                                                <Text style={ { color: randomColor()}}>#{item}</Text>
                                            )
                                        })}
                                    </View>
                                </View>
                            </View>
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flatListContainer: {
        flex: 1
    },
    scrollView: {
        borderWidth: 0,
        borderColor: "transparent",
        shadowColor: 'transparent',
        flex: 1
    },
    swipeIcon: {
        height: "100%",
        minHeight: "100%",
        flex: 1,
        flexGrow: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center"
    },
    listContainer: {
        width: '100%',
        minWidth: '100%',
        margin: 0,
        padding: 0,
        borderWidth: 0,
        borderColor: "transparent",
        shadowColor: 'transparent',
        flexGrow: 1,
    },
    itemContainer: {
        flexDirection: "row",
        width: '100%',
        minWidth: '100%',
        backgroundColor: "white",
        marginBottom: 1,
        padding: 10,
        paddingBottom: 20
    },
    image: {
        height: width/3,
        width: width/4,
        overflow: "hidden",
        borderRadius: 5,
        marginRight: 10
    },
    content: {
        marginLeft: 10,
        flex: 1
    },
    tagContainer: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    tag: {
        fontSize: 15,
    },
    subtitle: {
        fontSize: 15,
        fontWeight: '300',
    },
    info: {
        fontSize: 13,
        fontStyle: "italic",
        color: "#ccc",
        marginBottom: 7
    },
    title: {
        fontSize: 17,
        fontWeight: '500',
        color: "#565656"
    },
    separator: {
        marginVertical: 10,
        height: 1,
        width: '80%',
    },
});
