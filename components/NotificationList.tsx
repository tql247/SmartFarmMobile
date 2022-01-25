import React, { Component } from "react";
import {Image, ScrollView, StyleSheet, View, Dimensions} from "react-native";
import {Card} from "react-native-elements";
import {Text} from "./Themed";
import { APIConfig } from "../config";
import Storage from '../libs/Storage'

const {height} = Dimensions.get("window");

export class NotificationList extends Component {

    state = {
        screenHeight: 0,
        notifications: [
            {
                created_at: '',
                subject: '',
                detail: '',
            },
        ]
    };

    onContentSizeChange = (contentWidth: number, contentHeight: number) => {
        this.setState({ screenHeight: contentHeight });
    };

    
    async _getNottifications() {
        const axios = require("axios");
        const owner_id = await Storage.get('_id')

        const config = {
            method: "get",
            url: APIConfig["api"]["get_notification"].replace(
                "{owner_id}",
                `${owner_id}`
            ),
            headers: {},
        };

        const self = this;
        axios(config)
            .then(function (response: any) {
                self.setState({ notifications: response.data });
            })
            .catch(function (error: any) {
                console.log(error);
            });
    }

    componentDidMount() {
        this._getNottifications()
    }

    render() {
        const scrollEnabled = this.state.screenHeight > height;

        return (
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.scrollView}
                scrollEnabled={scrollEnabled}
                onContentSizeChange={this.onContentSizeChange}
            >
                <Card containerStyle={styles.listContainer}>
                    {
                        this.state.notifications.map((u, i) => {
                            return (
                                <View key={i} style={styles.itemContainer}>
                                    <Image
                                        style={styles.image}
                                        resizeMode="cover"
                                        source={require('../assets/images/favicon.png')}
                                    />
                                    <View style={styles.content}>
                                        <Text style={styles.from}>{u.subject}</Text>
                                        <Text style={styles.mess}>{u.detail}</Text>
                                        <Text style={styles.time}>{new Date(u.created_at).toLocaleString()}</Text>
                                    </View>
                                </View>
                            );
                        })
                    }
                </Card>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: "black",
        borderWidth: 0,
        borderColor: "transparent",
        shadowColor: 'transparent',
        flexGrow: 1,
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
        minWidth: '100%'
    },
    image: {
        height: 65,
        width: 65,
        overflow: "hidden",
        borderRadius: 100,
        margin: 10
    },
    content: {
        margin: 10,
        flex: 1
    },
    from: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    mess: {
        fontSize: 15,
    },
    time: {
        fontSize: 15,
        fontStyle: "italic"
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
