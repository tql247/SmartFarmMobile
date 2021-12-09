import { ListItem, Icon } from 'react-native-elements'

import React, { Component } from "react";
import {Image, ScrollView, StyleSheet, View, Dimensions} from "react-native";
import {Card} from "react-native-elements";
import {Text} from "./Themed";

const {height} = Dimensions.get("window");

export class SettingList extends Component {
    state = {
        screenHeight: 0,
        settings: [
            {
                title: 'Account Setting',
                icon: 'account-circle'
            },
            {
                title: 'Saved',
                icon: 'cloud-download'
            },
            {
                title: 'About',
                icon: 'info'
            },
        ]
    };

    onContentSizeChange = (contentWidth: number, contentHeight: number) => {
        this.setState({ screenHeight: contentHeight });
    };

    render() {
        const scrollEnabled = this.state.screenHeight > height;

        return (
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.scrollView}
                scrollEnabled={scrollEnabled}
                onContentSizeChange={this.onContentSizeChange}
            >
                <View style={styles.listContainer}>
                    {
                        this.state.settings.map((item, i) => (
                            <ListItem key={i} style={styles.item}>
                                <Icon name={item.icon} />
                                <ListItem.Content>
                                    <ListItem.Title>{item.title}</ListItem.Title>
                                </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem>
                        ))
                    }
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        borderWidth: 0,
        borderColor: "transparent",
        shadowColor: 'transparent',
        width: '100%',
        minWidth: '100%',
        margin: 0,
        padding: 0
    },
    listContainer: {
        width: '100%',
        minWidth: '100%',
        margin: 0,
        padding: 0,
        borderWidth: 0,
        borderColor: "transparent",
        shadowColor: 'transparent',
    },
    item: {
        marginTop: 1,
        width: '100%',
        minWidth: '100%'
    },
});
