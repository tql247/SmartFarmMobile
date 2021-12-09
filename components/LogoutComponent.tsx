import { ListItem, Icon } from 'react-native-elements'

import React, { Component } from "react";
import {Image, ScrollView, StyleSheet, View, Dimensions} from "react-native";
import {Card} from "react-native-elements";
import {Text} from "./Themed";

const {height} = Dimensions.get("window");

export class LogoutComponent extends Component {

    state = {
        screenHeight: 0,
        settings: [
            {
                color: '#ff7e5f',
                title: 'Logout',
                icon: 'logout'
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
                <View style={styles.container}>
                    {
                        this.state.settings.map((item, i) => (
                            <ListItem key={i} style={[styles.listContainer]}>
                                <Icon name={item.icon} color={item.color} />
                                <ListItem.Content>
                                    <ListItem.Title style={{color: item.color}}>{item.title}</ListItem.Title>
                                </ListItem.Content>
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
        flex: 1,
        flexGrow: 1,
        borderWidth: 0,
        borderColor: "transparent",
        shadowColor: 'transparent',
        width: '100%',
        minWidth: '100%',
        margin: 0,
        padding: 0
    },
    container: {
        justifyContent: 'center',
        borderWidth: 0,
        borderColor: "transparent",
        shadowColor: 'transparent',
        width: '100%',
        minWidth: '100%',
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
});
